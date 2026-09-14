// src/data/shippingRates.js

export const SHIPPING_ZONES = [
  {
    id: 'delhi_ncr',
    name: 'Delhi NCR',
    estimatedDays: { min: 1, max: 2 }, // 48 hours
    rates: {
      'IPO': 0,
      'IPI': 0
    },
    pincodeRanges: [
      [110001, 110096], // Delhi
      [201301, 201310], // Noida
      [201001, 201017], // Ghaziabad
      [122001, 122022], // Gurugram
      [121001, 121010], // Faridabad
    ],
  },
  {
    id: 'other_cities',
    name: 'Mumbai, Pune, Nagpur, Ahmedabad, Jaipur, Chandigarh, Goa, Kochi, Bangalore, Hyderabad, Chennai, Kolkata',
    estimatedDays: { min: 3, max: 4 }, // 3-4 days
    rates: {
      'IPO': 0,
      'IPI': 0
    },
    pincodeRanges: [
      [700001, 700160], // Kolkata
      [560001, 560105], // Bangalore
      [500001, 500100], // Hyderabad
      [682001, 682050], // Kochi
      [403001, 403814], // Goa
      [400001, 400104], // Mumbai
      [411001, 411065], // Pune
      [440001, 440037], // Nagpur
      [380001, 380085], // Ahmedabad
      [302001, 302040], // Jaipur
      [160001, 160102], // Chandigarh
      [600001, 600138], // Chennai
    ],
  },
  {
    id: 'all_india',
    name: 'All India',
    estimatedDays: { min: 4, max: 7 }, // 4-7 days
    rates: {
      'IPO': 0,
      'IPI': 0
    },
  }
]

export function getShippingInfo(pincode, sku) {
  const pin = parseInt(pincode, 10)
  if (isNaN(pin) || String(pincode).trim().length !== 6 || pin < 100000 || pin > 999999) {
    return {
      isSupported: false
    }
  }

  const baseSku = sku?.includes('IPO') ? 'IPO' : 'IPI'

  // Check specific express delivery zones first
  for (const zone of SHIPPING_ZONES) {
    if (zone.pincodeRanges) {
      for (const [start, end] of zone.pincodeRanges) {
        if (pin >= start && pin <= end) {
          return {
            zone: zone.id,
            zoneName: zone.name,
            estimatedDays: zone.estimatedDays,
            shippingCost: zone.rates[baseSku] ?? 0,
            isSupported: true
          }
        }
      }
    }
  }

  // Open to all other locations across India (standard delivery)
  const allIndiaZone = SHIPPING_ZONES.find(z => z.id === 'all_india') || {
    id: 'all_india',
    name: 'All India',
    estimatedDays: { min: 4, max: 7 },
    rates: { 'IPO': 0, 'IPI': 0 }
  }

  return {
    zone: allIndiaZone.id,
    zoneName: allIndiaZone.name,
    estimatedDays: allIndiaZone.estimatedDays,
    shippingCost: allIndiaZone.rates[baseSku] ?? 0,
    isSupported: true
  }
}

export function getEstimatedDeliveryLabel(pincode, sku) {
  const info = getShippingInfo(pincode, sku)
  if (!info) return 'Enter pincode for delivery estimate'
  if (!info.isSupported) return 'Enter a valid 6-digit Indian pincode'

  const today = new Date()
  let daysAdded = 0
  let date = new Date(today)
  while (daysAdded < info.estimatedDays.min) {
    date.setDate(date.getDate() + 1)
    if (date.getDay() !== 0) daysAdded++
  }
  const minDate = date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })

  daysAdded = 0
  date = new Date(today)
  while (daysAdded < info.estimatedDays.max) {
    date.setDate(date.getDate() + 1)
    if (date.getDay() !== 0) daysAdded++
  }
  const maxDate = date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })

  return `Estimated delivery: ${minDate} – ${maxDate}`
}
