-- ─────────────────────────────────────────────────────────────────────────────
-- MOSCURE Supabase Database Schema
-- Run this once in your Supabase project: Dashboard → SQL Editor → New Query
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Profiles table — auto-populated on first OTP login
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  phone       text,
  email       text,
  created_at  timestamptz default now()
);

-- Trigger: auto-create profile row when user signs up via OTP
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Orders table
create table if not exists public.orders (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid references public.profiles(id) on delete set null,

  -- Razorpay fields
  razorpay_order_id     text unique,
  razorpay_payment_id   text,

  -- Order contents
  items                 jsonb not null,        -- [{ sku, name, qty, price }]

  -- Shipping address snapshot
  address               jsonb not null,        -- { name, email, phone, line1, line2, city, state, pincode }

  -- Financials
  amount_paise          integer not null,      -- Total in paise (₹ × 100)

  -- Fulfillment
  status                text not null default 'pending'
                          check (status in ('pending','confirmed','packed','dispatched','delivered')),
  vendor_order_id       text,                  -- Your delivery vendor's reference ID
  estimated_delivery    date,                  -- Expected delivery date (set by admin)

  created_at            timestamptz default now(),
  updated_at            timestamptz default now()
);

-- Auto-update updated_at timestamp
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- 3. Row Level Security — customers see only their own orders
alter table public.profiles enable row level security;
alter table public.orders enable row level security;

-- Profiles: users can read and update their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Orders: users can read their own orders
create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id);

-- Orders: anyone can insert (needed for guest checkout)
-- The user_id is matched or null for guests
create policy "Allow order creation"
  on public.orders for insert
  with check (true);

-- Note: UPDATE and DELETE on orders is admin-only via service role key (bypasses RLS)
-- The Express server uses service role key for admin operations — never exposed to frontend

-- 4. Index for faster order lookups
create index if not exists orders_user_id_idx on public.orders(user_id);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists orders_created_at_idx on public.orders(created_at desc);
