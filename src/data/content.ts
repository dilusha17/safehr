export const industries = [
  { name: "Agriculture", description: "Remote team visibility and machinery risk controls." },
  { name: "Logistics", description: "Loading bay hazards, fleet compliance and fatigue controls." },
  { name: "Warehousing", description: "Traffic segregation, lift truck events and digital SOPs." },
  { name: "Manufacturing", description: "Plant safety, environmental monitoring and worker wellbeing." },
] as const;

// TODO: owner to confirm named approval for each testimonial.
export const testimonials = [
  { quote: "Safe HR transformed our safety culture with a platform our teams actually use.", role: "Operations Manager", company: "Waikato Logistics" },
  { quote: "The AI camera alerts helped us prevent repeat unsafe loading practices.", role: "HSE Lead", company: "Northland Warehousing" },
  { quote: "From audits to dashboards, they delivered a complete safety system.", role: "Director", company: "Canterbury Agri Group" },
] as const;

export const whyShop = [
  { title: "Safety expertise behind every product", body: "We are a workplace safety consultancy, so we know what protection looks like on the job." },
  { title: "Bulk orders welcome", body: "Contact us for team and site quantities and we will come back to you with pricing." },
  { title: "Fast help on WhatsApp", body: "Chat with us directly about sizing, products or your order." },
] as const;

export const aboutServices = [
  { title: "Compliance Systems", body: "Gap analysis, audits, documentation and policy design aligned with NZ standards." },
  { title: "Digital Safety Solutions", body: "Mobile inductions, live hazard reporting and manager dashboards." },
  { title: "AI and IoT Monitoring", body: "Camera analytics and sensor-driven alerts." },
] as const;

export const premiumEquipment = {
  opening: "Safe HR Consultants is a New Zealand workplace safety consultancy and safety equipment supplier based in Parnell, Auckland. We pair practical compliance know-how with premium protective equipment and technology for modern operations.",
  title: "Premium safety equipment you can rely on",
  introduction: "We supply premium-quality safety equipment, chosen to protect people in demanding New Zealand workplaces.",
  closing: "we put trusted products together with the safety know-how of a consultancy.",
  cards: [
    { title: "Premium brand products", body: "Premium-quality safety equipment for demanding New Zealand workplaces.", icon: "safety" },
    { title: "Expert safety advice", body: "We are a safety consultancy, bringing practical safety know-how to equipment supply.", icon: "support" },
    { title: "Bulk supply for teams and sites", body: "Contact the seller to discuss products and quantities for your team or site.", icon: "bulk" },
  ],
} as const;

export const contactTopics = [
  { value: "general", label: "General enquiry" },
  { value: "order", label: "Order help" },
  { value: "bulk", label: "Bulk order" },
  { value: "air-quality", label: "Air Quality Monitoring Device" },
  { value: "ai-camera", label: "AI Safety Camera System" },
] as const;
export type ContactTopic = (typeof contactTopics)[number]["value"];

export type TechContent = {
  slug: string;
  topic: ContactTopic;
  name: string;
  summary: string;
  features: { title: string; body: string }[];
  steps: string[];
  faq: { q: string; a: string }[];
};

// Use only owner-supplied facts. TODO: owner to supply further technical detail before adding specifications.
export const airQuality: TechContent = {
  slug: "air-quality-monitoring",
  topic: "air-quality",
  name: "Air Quality Monitoring Device",
  summary: "IoT sensors for air quality, carbon monoxide and environmental data that feed a live compliance and risk view.",
  features: [
    { title: "Air quality monitoring", body: "Keep an eye on the air your team works in." },
    { title: "Carbon monoxide (CO) detection", body: "Sensors watch for carbon monoxide on site." },
    { title: "Environmental data collection", body: "Gather environmental data alongside your safety records." },
    { title: "Live dashboards", body: "View by site, shift and business unit." },
    { title: "Automated escalation", body: "High-priority events are escalated to the right people." },
    { title: "Audit-ready logs", body: "Logs and action tracking ready for review." },
  ],
  steps: [
    "Sensors are installed at your site.",
    "Readings feed the Safe HR platform.",
    "Managers see trends and alerts, and actions are tracked to closure.",
  ],
  faq: [
    { q: "Which environments suit it?", a: "Workplaces where air quality or carbon monoxide is a concern, such as warehouses, plant rooms and manufacturing floors. Contact us to talk through your site." },
    { q: "What gets monitored?", a: "Air quality, carbon monoxide and environmental data. Contact us for the details relevant to your site." },
    { q: "How are alerts handled?", a: "High-priority events are escalated automatically to the people you nominate, and actions are tracked to closure." },
    { q: "How do we get started?", a: "Contact us to request a demo and we will talk through your site and needs." },
  ],
};

export const aiCamera: TechContent = {
  slug: "ai-safety-camera-system",
  topic: "ai-camera",
  name: "AI Safety Camera System",
  summary: "AI camera analytics with Redvision integration that help detect unsafe acts, restricted-area access and PPE breaches.",
  features: [
    { title: "Unsafe act detection", body: "Helps flag potential unsafe acts earlier." },
    { title: "Restricted access alerts", body: "Alerts when restricted areas are entered." },
    { title: "PPE breach detection", body: "Helps spot missing personal protective equipment." },
    { title: "Real-time dashboards", body: "Live views with automated escalation." },
    { title: "Audit-ready logs", body: "A clear record of events and actions." },
  ],
  steps: [
    "Cameras are set up around agreed risk areas.",
    "AI analytics flag potential events.",
    "Alerts go to the right people and actions are tracked.",
  ],
  faq: [
    { q: "Does it work with our existing cameras?", a: "The system integrates with Redvision. Contact us to discuss your current set-up." },
    { q: "What can it detect?", a: "It helps detect unsafe acts, restricted-area access and PPE breaches so risks can be addressed earlier." },
    { q: "How is privacy handled?", a: "We help you plan worker notification, footage access, retention and storage before anything is switched on." },
    { q: "How do we get started?", a: "Contact us to request a demo and we will talk through your site and needs." },
  ],
};
