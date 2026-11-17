export const company = {
  name: "Safe HR Consultants",
  shortName: "SAFE HR",
  // TODO: owner to confirm brand name, authorised distributor wording and logo permission.
  distributorBrand: { name: "a well-known premium safety brand" },
  tagline: "Smart safety, delivered.",
  address: {
    line1: "17B Farnham Street",
    suburb: "Parnell",
    city: "Auckland",
    postcode: "1010",
    country: "New Zealand",
    full: "17B Farnham Street, Parnell, Auckland 1010, New Zealand",
    short: "Parnell, Auckland",
  },
  phone: { display: "+64 800 894 512", href: "tel:+64800894512" },
  whatsapp: { display: "+64 21 282 0409", number: "64212820409", href: "https://wa.me/64212820409" },
  // TODO: confirm email (carried over from the old site)
  email: "info@safehrconsultants.co.nz",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=17B+Farnham+Street%2C+Parnell%2C+Auckland+1010",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=17B+Farnham+Street,+Parnell,+Auckland+1010&output=embed",
} as const;
