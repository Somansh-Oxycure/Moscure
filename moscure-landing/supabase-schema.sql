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

-- Trigger: auto-create profile row w hen user signs up via OTP
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

-- 5. Reviews table
create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  product     text not null,
  rating      integer not null check (rating >= 1 and rating <= 5),
  name        text,
  email       text,
  comment     text,
  created_at  timestamptz default now()
);

-- Note: The Express server uses the service role key to insert reviews, which bypasses RLS.
-- If you plan to query reviews from the frontend, uncomment the following:
-- alter table public.reviews enable row level security;
-- create policy "Anyone can view reviews" on public.reviews for select using (true);

-- 6. Coupons table
create table if not exists public.coupons (
  id                  uuid primary key default gen_random_uuid(),
  code                text unique not null,
  discount_percentage integer not null check (discount_percentage > 0 and discount_percentage <= 100),
  is_used             boolean not null default false,
  valid_until         timestamptz not null,
  product_sku         text, -- if null, valid for all products
  created_at          timestamptz default now(),
  used_at             timestamptz
);

-- Anyone can validate a coupon
alter table public.coupons enable row level security;
create policy ""Anyone can validate coupons""
  on public.coupons for select
  using (true);

-- Admin updates (or service role) handle marking as used
create policy ""No public updates to coupons""
  on public.coupons for update
  using (false);

-- Insert the 6 required one-time 50% discount codes for IPI product, valid until Sept 15, 2026.
insert into public.coupons (code, discount_percentage, valid_until, product_sku)
values 
  ('IPI50-X9M4-YQ7W', 50, '2026-09-15 23:59:59+05:30', 'MOSCURE-IPI'),
  ('IPI50-B3K8-ZT2L', 50, '2026-09-15 23:59:59+05:30', 'MOSCURE-IPI'),
  ('IPI50-F7P5-RV9J', 50, '2026-09-15 23:59:59+05:30', 'MOSCURE-IPI'),
  ('IPI50-H2N6-CX4D', 50, '2026-09-15 23:59:59+05:30', 'MOSCURE-IPI'),
  ('IPI50-W5L1-MQ8G', 50, '2026-09-15 23:59:59+05:30', 'MOSCURE-IPI'),
  ('IPI50-T8J3-KS6F', 50, '2026-09-15 23:59:59+05:30', 'MOSCURE-IPI')
on conflict (code) do nothing;

-- 7. Alter orders table to include coupon
alter table public.orders
add column if not exists coupon_code text;
