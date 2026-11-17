import { company } from "./company";

export type LegalSection = { heading: string; body: string };
export type LegalPage = { title: string; intro: string; sections: LegalSection[] };

const TBC = "[TO CONFIRM]";

export const privacy: LegalPage = {
  title: "Privacy",
  intro: "This page explains, in plain language, how this website handles your information.",
  sections: [
    { heading: "Forms", body: "Details you type into our forms are not stored by this website. They are only sent when you choose to send them via WhatsApp or your email app." },
    { heading: "Your cart", body: "Your cart is saved in your browser's local storage on your own device so it is still there when you come back." },
    { heading: "Map", body: "The embedded Google map on our Contact page may set its own cookies. Google's privacy policy applies to it." },
    { heading: "Privacy Act 2020", body: "We aim to handle personal information in line with the New Zealand Privacy Act 2020." },
    { heading: "Privacy requests", body: `To ask about, access or correct your information, email ${company.email} or call ${company.phone.display}.` },
  ],
};

export const terms: LegalPage = {
  title: "Terms",
  intro: "Terms of use for this website.",
  sections: ["Use of the site", "Product information", "Orders and confirmation", "Pricing", "Liability", "Contact"].map(
    (heading) => ({ heading, body: TBC }),
  ),
};

export const shippingReturns: LegalPage = {
  title: "Shipping and Returns",
  intro: "Delivery and returns information.",
  sections: ["Delivery areas", "Delivery times", "Delivery costs", "Returns and exchanges", "Damaged items", "Bulk orders"].map(
    (heading) => ({ heading, body: TBC }),
  ),
};
