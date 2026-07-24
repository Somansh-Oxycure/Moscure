// src/data/shippingRates.js

export const SHIPPING_ZONES = [
  {
    id: 'delhi_ncr',
    name: 'Delhi NCR',
    estimatedDays: { min: 1, max: 2 }, // 48 hours
    rates: {
      'IPO': 200,
      'IPI': 25
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
    name: 'Kolkata, Bangalore, Hyderabad, Kochi, Goa',
    estimatedDays: { min: 3, max: 4 }, // 3-4 days
    rates: {
      'IPO': 500,
      'IPI': 60
    },
    pincodeRanges: [
      [700001, 700160], // Kolkata
      [560001, 560105], // Bangalore
      [500001, 500100], // Hyderabad
      [682001, 682050], // Kochi
      [403001, 403814], // Goa
    ],
  }
]

export function getShippingInfo(pincode, sku) {
  const pin = parseInt(pincode, 10)
  if (isNaN(pin) || String(pincode).length !== 6) {
    return null
  }

  for (const zone of SHIPPING_ZONES) {
    for (const [start, end] of zone.pincodeRanges) {
      if (pin >= start && pin <= end) {
        const baseSku = sku?.includes('IPO') ? 'IPO' : 'IPI'
        return {
          zone: zone.id,
          zoneName: zone.name,
          estimatedDays: zone.estimatedDays,
          shippingCost: zone.rates[baseSku],
          isSupported: true
        }
      }
    }
  }

  // Not supported location
  return {
    isSupported: false
  }
}

export function getEstimatedDeliveryLabel(pincode, sku) {
  const info = getShippingInfo(pincode, sku)
  if (!info) return 'Enter pincode for delivery estimate'
  if (!info.isSupported) return 'We are currently not delivering here. Please contact us directly.'

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
