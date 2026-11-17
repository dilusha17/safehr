import type { IconName } from "@/lib/icons";
import { company } from "./company";

export type Block =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "bulletList"; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "table"; caption: string; columns: string[]; rows: string[][] }
  | { type: "barList"; caption: string; items: { label: string; value: number }[]; note: string };
export const blogCategories: { name: string; icon: IconName }[] = [
  { name: "Industry News", icon: "newspaper" },
  { name: "Research and Statistics", icon: "bar-chart" },
  { name: "Accidents and Lessons", icon: "ambulance" },
  { name: "New Products", icon: "sparkles" },
];
export type Article = {
  id: string; slug: string; title: string; category: string; excerpt: string;
  publishedAt: string; readMinutes: number; icon: IconName; featured?: boolean;
  keyStats?: { value: string; label: string }[]; body: Block[];
  sources: { title: string; url: string }[]; relatedProductSlugs?: string[];
};
const p = (text: string): Block => ({ type: "paragraph", text });
const h = (text: string): Block => ({ type: "heading", text });
const bullets = (...items: string[]): Block => ({ type: "bulletList", items });
export const blogCopy = {
  intro: "News, research and practical lessons for New Zealand workplaces.",
  disclaimer: "General information only, not legal advice. Figures come from the sources above; check the originals for the latest data.",
  help: "Need help choosing protection?",
};
// TODO: owner to confirm publish dates. All dates below are supplied placeholders.
export const articles: Article[] = [
  {
    id: "a01", slug: "health-and-safety-reform-april-2027", featured: true,
    title: "New Zealand's biggest health and safety reform in a decade: what changes on 1 April 2027",
    category: "Industry News", publishedAt: "2026-11-16", readMinutes: 3, icon: "newspaper",
    excerpt: "A sharper focus on critical risks, with practical suggestions for preparing your workplace for the changes.",
    body: [
      p("New Zealand workplaces have a health and safety law change to prepare for. The Health and Safety at Work Amendment Bill was introduced to Parliament on 9 February 2026. It received Royal Assent on 9 July 2026 as the Health and Safety at Work Amendment Act 2026. Most provisions take effect on 1 April 2027. That leaves employers with a reason to review their approach without treating every existing practice as obsolete."),
      h("A change of emphasis"),
      p("The main theme is a sharper focus on critical risks: risks that can result in death, serious injury or illness. Commentators describe the reform as a change of emphasis rather than a replacement. The Health and Safety at Work Act 2015 remains at the centre of the system. The amendment also changes the WorkSafe New Zealand Act 2013 and the Health and Safety at Work (General Risk and Workplace Management) Regulations 2016."),
      p("WorkSafe says large businesses must manage both critical and other risks. A focus on the most serious consequences should therefore not be read as permission to disregard everything else. Officers are expected to keep their health and safety knowledge current and appropriate to their business. For a workplace discussion, it is useful to distinguish what the sources say from assumptions about how the changes will operate."),
      h("Practical suggestions for preparing"),
      bullets("Review your critical-risk list against the work actually happening on site.", "Check that your PPE choices match the hazards people encounter.", "Brief your officers on the changes and the questions relevant to your business.", "Watch for WorkSafe guidance before changing your arrangements."),
      p("These are suggestions, not a statement of new legal duties. WorkSafe says it will provide guidance, training and support before the changes take effect. Some members of the health and safety community have questioned whether the reform will create practical clarity or fresh uncertainty. Keep those concerns in view, consult the original material, and avoid making decisions on a headline alone. A considered review is more useful than assuming the entire system has been replaced."),
    ],
    sources: [
      { title: "WorkSafe — Understanding the changes to health and safety law", url: "https://www.worksafe.govt.nz/laws-and-regulations/acts/changes/understanding-the-changes-to-health-and-safety-law/" },
      { title: "Simpson Grierson — Health and safety reform becomes law", url: "https://www.simpsongrierson.com/insights-news/legal-updates/health-and-safety-reform-becomes-law" },
      { title: "SafetyNews — Explainer on law changes", url: "https://safetynews.co.nz/story/explainer-how-new-zealand-s-workplace-safety-law-changed" },
      { title: "MyHR — Amendment Act", url: "https://blog.myhr.works/health-and-safety-at-work-amendment-act" },
      { title: "Bell Gully — Refocusing health and safety", url: "https://www.bellgully.com/insights/refocusing-health-and-safety-health-and-safety-at-work-amendment-bill-proposes-significant-amendments/" },
      { title: "Anderson Lloyd — Amendment Act 2026", url: "https://www.al.nz/health-and-safety-at-work-amendment-act-2026/" },
    ],
  },
  {
    id: "a02", slug: "worksafe-working-with-industry", title: "WorkSafe is changing how it works with industry",
    category: "Industry News", publishedAt: "2026-11-12", readMinutes: 3, icon: "newspaper",
    excerpt: "Proportionate action, practical guidance and consistent advice: what WorkSafe's direction could mean for your business.",
    body: [
      p("The way WorkSafe works with industry matters to employers trying to turn safety advice into everyday practice. In an April 2026 interview, chief executive Sharon Thompson said more than one person dies at work in New Zealand every week. That is a sobering reason to pay attention to the organisation's direction. Behind that statement are people, families and workplaces, not simply an enforcement discussion."),
      h("The direction of travel"),
      p("WorkSafe is changing how it writes guidance, how it enforces the law and how it works with industry. The Minister's 2025 Letter of Expectations set out three shifts: proportionate action, practical guidance, and clear, consistent advice. These themes are useful context when reading new material from WorkSafe, but they should not be treated as a substitute for the material itself."),
      p("For a business, guidance is most useful when it can be connected to the tasks people actually carry out. Our suggestion is to read new advice alongside your own work arrangements. Ask whether the people doing the work understand the guidance in the same way as the people responsible for it. Where something is unclear, record the question rather than filling the gap with an assumption."),
      h("What this means for your business"),
      bullets("Expect more practical guidance and review it against your workplace tasks.", "Keep your records and training evidence in order.", "Keep protective equipment programmes documented, including the reasons for your choices."),
      p("These are practical suggestions for staying organised, not a prediction about an inspection or a new set of legal requirements. A documented PPE programme gives your team a place to record what protection has been selected and what still needs attention. Training evidence and clear records can support the same conversation: what has been explained, what is understood, and what needs further discussion."),
      p("The interview describes a changing approach, not a reason to pause your own safety work. Continue reviewing the guidance as it appears, keep the original source available to the people who need it, and bring questions back to the work on site. Practical, consistent advice is a worthwhile aim; your own records and conversations remain part of putting it into practice."),
    ],
    sources: [{ title: "SafetyNews — How WorkSafe is changing the way it works with industry", url: "https://safetynews.co.nz/story/how-worksafe-is-changing-the-way-it-works-with-industry" }],
  },
  {
    id: "a03", slug: "serious-non-fatal-work-injuries", title: "Serious non-fatal work injuries in New Zealand: what the numbers say",
    category: "Research and Statistics", publishedAt: "2026-11-09", readMinutes: 3, icon: "bar-chart",
    excerpt: "Read the serious-injury rates in context, and understand why hospital-based measures and ACC claims are not interchangeable.",
    keyStats: [{ value: "14.7", label: "serious non-fatal injuries per 100,000 FTEs in 2021" }, { value: "11%", label: "lower than the 2020 rate" }],
    body: [
      p("Serious non-fatal injuries deserve attention even when a worker survives. WorkSafe's measure covers an injury where the patient is admitted to hospital with a probability of death of 6.9 percent or more. This is a specific measure of serious harm, rather than a count of every workplace injury. Understanding that definition is important before comparing it with other information about injury."),
      h("The rates in the supplied releases"),
      p("The serious non-fatal injury rate was 14.7 per 100,000 full-time equivalent employees in 2021, 11% lower than the 2020 rate. The figures below come from successive Stats NZ releases. Early figures were provisional, and 2018 is not shown. Read the sequence with those limits in mind rather than assuming it is a complete, final annual series."),
      { type: "barList", caption: "Serious non-fatal injuries per 100,000 full-time equivalent employees", items: [{ label: "2016", value: 14.3 }, { label: "2017", value: 16.9 }, { label: "2019", value: 18.3 }, { label: "2020", value: 16.5 }, { label: "2021", value: 14.7 }], note: "Figures from successive Stats NZ releases; early figures were provisional. 2018 is not shown." },
      p("The most recent official serious-injury figures covered by these sources run to the end of 2021 and were released in December 2022. Check Stats NZ for newer releases before using this article as a picture of current conditions. A historical rate can inform a conversation, but it should not be presented as a fresh measurement of your own workplace."),
      h("Who is affected, and what the measures mean"),
      p("WorkSafe's overview reports that men account for about 85% of serious non-fatal injuries. Rates are significantly higher for workers over 55, and the rate for Māori workers is at least 30% higher than for non-Māori. These differences deserve thoughtful attention when discussing protection and work arrangements, without making assumptions about an individual worker."),
      p("Separate ACC data reported by Stats NZ shows work-related injury claims fell by 11,500 in 2025. Workers aged 75 and over had the highest claim rate, at 116 claims per 1,000 FTEs. Claims data and the hospital-based serious-injury measure describe different things. Keep their definitions, time periods and units visible. Our suggestion is to use the figures to prompt questions about your hazards and protective choices, not to claim that a national trend proves a particular site is safe."),
    ],
    sources: [
      { title: "WorkSafe — Serious injury fact sheet, December 2022", url: "https://registers.worksafe.govt.nz/dmsdocument/56880-fact-sheet-work-related-serious-injury-outcome-indicators-december-2022/latest" },
      { title: "WorkSafe — Progress report, October 2021", url: "https://worksafe.govt.nz/dmsdocument/45520-final-progress-report-towards-the-2020-acute-injury-target-october-2021/latest" },
      { title: "WorkSafe — Overview of work-related harm and risk", url: "https://registers.worksafe.govt.nz/dmsdocument/67185-report-overview-of-work-related-harm-and-risk-in-aotearoa-new-zealand/latest" },
      { title: "Stats NZ via Scoop — 2019 serious injury data", url: "https://www.scoop.co.nz/stories/GE2012/S00053/serious-injury-outcome-indicators-2000-19.htm" },
      { title: "Stats NZ via Scoop — 2017 serious injury data", url: "https://m.scoop.co.nz/stories/BU1810/S00792/work-related-serious-non-fatal-injuries-increase.htm" },
      { title: "HRD — ACC claims in 2025", url: "https://www.hcamag.com/nz/specialisation/workplace-health-and-safety/new-zealands-workplace-injury-rate-falls-but-risks-remain/590994" },
    ],
  },
  {
    id: "a04", slug: "work-related-deaths-new-zealand", title: "Work-related deaths in New Zealand: the fatal injury picture",
    category: "Research and Statistics", publishedAt: "2026-11-05", readMinutes: 3, icon: "bar-chart",
    excerpt: "A respectful look at fatal injury figures and the importance of critical-risk management and thoughtful inductions.",
    keyStats: [{ value: "70", label: "people died from work-related injuries in 2024" }, { value: "2.4", label: "fatalities per 100,000 workers, 5-year average to 2021" }],
    body: [
      p("Every work-related death represents a person who did not return home, and a loss carried by family, colleagues and community. Lane Neave, citing WorkSafe's fatalities summary, reports that 70 people died from work-related injuries in New Zealand in 2024. That is more than one a week. The figures should be read with respect for the people behind them, not as an abstract performance score."),
      h("Putting the figures in context"),
      p("WorkSafe reports that, in the five years to 2021, New Zealand's average rate was 2.4 fatalities per 100,000 workers. That was 68% higher than Australia's rate of 1.4. The comparison concerns a particular period and measure. It is not a description of every industry or an explanation of the circumstances of an individual death."),
      p("About 90% of work-related fatalities are men, according to WorkSafe. This is another reason to look carefully at who is exposed to the hazards in your operation. Our suggestion is to use the information as an opening for respectful discussion, rather than assuming that a national pattern tells you everything about your own workers or tasks."),
      h("New starters need attention"),
      p("A 2025 report for the Business Leaders' Health and Safety Forum put the cost of New Zealand's health and safety performance at $5.4 billion in 2024. It also said that 41% of employees in 2023 had been in their job for a year or less. The latter finding makes good inductions an important subject for employers to consider. Do not assume familiarity with a workplace simply because someone has done similar work elsewhere."),
      h("What employers can do"),
      bullets("Focus your discussions and reviews on critical risks.", "Give new starters strong inductions that connect to the work they will do.", "Choose protective equipment that matches the task and its hazards."),
      p("These are practical suggestions rather than a claim that protective equipment alone can prevent fatal harm. Bring the conversation back to the hazards, the work arrangements and what people understand. Use the original reports to check definitions and context before repeating their figures. Taking the time to explain a task and listen to questions is a constructive way to respond to information that can otherwise feel distant or overwhelming."),
    ],
    sources: [
      { title: "Lane Neave — Workplace fatalities", url: "https://www.laneneave.co.nz/news-events/workplace-fatalities/" },
      { title: "WorkSafe — Harm and risk dashboard", url: "https://registers.worksafe.govt.nz/dmsdocument/67140-dashboard-overview-of-work-related-harm-and-risk-in-aotearoa-new-zealand/latest" },
      { title: "WorkSafe — Overview report", url: "https://registers.worksafe.govt.nz/dmsdocument/67185-report-overview-of-work-related-harm-and-risk-in-aotearoa-new-zealand/latest" },
      { title: "Business Leaders' Health and Safety Forum — State of a Thriving Nation 2025", url: "https://www.forum.org.nz/assets/Uploads/State-of-a-Thriving-Nation-report-2025.pdf" },
    ],
  },
  {
    id: "a05", slug: "hand-injuries-gloves-last-line-of-defence", title: "Hand injuries at work: why gloves are the last line of defence",
    category: "Accidents and Lessons", publishedAt: "2026-11-02", readMinutes: 3, icon: "ambulance",
    excerpt: "Start with safer tools and work arrangements, then match hand protection to the hazard rather than relying on gloves alone.",
    body: [
      p("Hand protection is important, but a glove should not be the starting point for dealing with a hazardous task. Site Safe has said cuts and lacerations are the most commonly reported workplace injury, as reported by SafetyNews in 2020. NZ Safety Blackwoods has said the hand is the part of the body most injured in workplace accidents, as reported by Engineering News NZ in 2023. Those observations make hand safety a practical subject for a team discussion."),
      h("Be careful with broad estimates"),
      p("DermNet NZ notes that published estimates of hand and finger injuries range from 25% to 80% of workplace accidents. That wide range is a reminder not to choose a single figure and present it as a universal fact. Different sources may be describing different situations. The practical question for your workplace is what could injure someone's hands during the tasks they actually perform."),
      h("Reduce the hazard before selecting gloves"),
      p("Advice reported from WorkSafe includes securing bladed equipment to the bench. Industry commentary also stresses that gloves should not be the first line of defence. Remove or reduce the hazard first through safer tools and set-ups, training and good systems of work. Choosing gloves comes after considering those arrangements, not instead of them."),
      p("Our suggestion is to discuss the task with the people who carry it out. Look at the tool, the way the work is arranged and the instructions people receive. Ask what can be changed before relying on protective equipment. This is a practical review, not a promise that any particular glove will make a hazardous task safe."),
      h("Match protection to the hazard"),
      p("For glove selection, start with the hazard rather than a familiar product name. Our shop groups hand protection into Cut Resistance, Chemical Resistance, Impact Protection and General Use. Those categories can help you begin a product conversation, but they do not replace understanding the task. Check the product description and ask the seller when you need help choosing."),
      p("The related products below offer a starting point for comparing the range. Keep safer work arrangements at the centre of the discussion. Gloves are the last line of defence in this approach: an additional protective choice after the hazard, tools, training and systems of work have been considered."),
    ],
    relatedProductSlugs: ["safe-hr-cut-resistant-glove-cut-level-3-a3", "safe-hr-chemical-resistant-pvc-glove-blue-sandy-finish", "safe-hr-anti-impact-glove-nitrile-sandy-grip-with-tpr-back"],
    sources: [
      { title: "SafetyNews — Preventing workplace cuts and lacerations", url: "https://safetynews.co.nz/story/how-to-prevent-workplace-cuts-and-lacerations" },
      { title: "SafetyNews — Why gloves are not enough", url: "https://safetynews.co.nz/story/why-gloves-are-not-enough" },
      { title: "Engineering News NZ — Hand protection for the job", url: "https://engineeringnews.co.nz/2023/08/11/choose-the-right-hand-protection-for-the-job/" },
      { title: "DermNet NZ — Gloves for hand protection", url: "https://dermnetnz.org/topics/gloves-for-hand-protection" },
    ],
  },
  {
    id: "a06", slug: "serious-injury-help-and-worksafe-notification", title: "After a serious workplace injury: when to get help and when to notify WorkSafe",
    category: "Accidents and Lessons", publishedAt: "2026-10-28", readMinutes: 3, icon: "ambulance",
    excerpt: "BRANZ guidance on seeking medical care and notifying WorkSafe, with a reminder to check current advice.",
    body: [
      { type: "callout", title: "Emergency care comes first", text: "General information only. In an emergency call 111. Check WorkSafe's current guidance." },
      p("A serious workplace injury can be distressing for the injured person and everyone nearby. This summary draws on BRANZ guidance about getting medical help and notifying WorkSafe. It is general information, not an assessment of a particular injury or a replacement for medical advice. In an emergency, call 111. Do not use an article to decide that someone can safely go without help."),
      h("When to seek medical care"),
      p("BRANZ guidance says to always seek medical care for cuts deeper than 5 mm or longer than 20 mm. It also identifies cuts that will not stop bleeding after 10 minutes of pressure, cuts on the face, chest or abdomen, and cuts with jagged edges or foreign material in them. These descriptions are reasons to get care, not a checklist proving that a different injury is harmless."),
      h("Some injuries must be reported"),
      p("The guidance gives examples of work injuries that must be reported to WorkSafe. These include serious deep cuts, loss of consciousness, a burn needing a compression garment or skin graft, a metal fragment or wood chip in the eye, a serious head injury and a spinal injury. The examples should not be treated as a complete account of every situation that may require notification."),
      { type: "callout", title: "Contact WorkSafe", text: "Report by phone on 0800 030 040 or online at worksafe.govt.nz/notify-worksafe. If there is a death, call the WorkSafe number immediately, whatever the time or day." },
      p("Our practical suggestion is to keep the current WorkSafe notification guidance available to the people responsible for responding at your workplace. Read the original material rather than relying on memory of a brief summary. Make sure a discussion about reporting does not distract from the injured person's immediate need for medical attention."),
      p("Treat the person involved with care and respect. Avoid turning an injury into speculation about blame while people are seeking help. This article outlines the supplied guidance only; it does not determine whether your particular event is notifiable or tell you how to treat an injury. Check WorkSafe's current guidance for notification decisions, and seek appropriate medical care when help is needed."),
    ],
    sources: [{ title: "BRANZ — When there's an accident on site", url: "https://www.branz.co.nz/design-build/articles/when-theres-an-accident-on-site" }],
  },
  {
    id: "a07", slug: "anti-impact-a5-touchscreen-chemical-flock-lined-gloves", title: "New in our range: Anti-Impact, A5 Touchscreen and Chemical Flock-Lined gloves",
    category: "New Products", publishedAt: "2026-10-24", readMinutes: 3, icon: "sparkles",
    excerpt: "Compare anti-impact, touchscreen cut protection and flock-lined chemical gloves from the Safe HR range.",
    body: [
      // TODO: owner to confirm which products are the newest releases and the launch date.
      p("Choosing hand protection starts with the task, not simply with choosing the newest item. This look at the Safe HR range brings together anti-impact, touchscreen cut-resistant and flock-lined chemical gloves. The descriptions below come from our existing product information. They are a starting point for a conversation about what your team needs, rather than a claim that a product suits every workplace."),
      h("Anti-impact protection with grip"),
      p("The SAFE HR Anti-Impact Glove, with Nitrile Sandy Grip and TPR Back, is priced at $24.95. Its description says it protects the back of the hand from knocks, with excellent grip. If knocks are part of the task you are reviewing, this is a product to discuss with the seller. Keep the actual work and hazards in view when comparing it with other gloves."),
      h("A5 protection and touchscreen compatibility"),
      p("The SAFE HR Cut Resistant Glove, Cut Level 5 (A5) Touchscreen, is priced at $19.95. The range describes maximum cut protection with a comfortable nitrile foam grip and touchscreen compatibility. Those are the supplied product features; this article does not add a certification, a test result or a promise about performance in a particular task."),
      h("Long, flexible chemical protection"),
      p('The SAFE HR Green Nitrile Chemical Glove, Flock Lined 13", is priced at $11.95. It is described as light and comfortable, with long, flexible protection against oils and chemicals. Start with the substances and work arrangements involved, then ask the seller about selecting from the range. A product description is not a substitute for reviewing your workplace hazards.'),
      p(`Safe HR supplies premium-quality safety equipment through ${company.distributorBrand.name}. Our About page explains how we bring equipment supply together with the safety know-how of a consultancy. We have not added standards, certifications or test claims to these descriptions. The linked product pages remain the place to read the existing product details.`),
      p("For team and site quantities, bulk orders are handled by contacting the seller. Tell us which products you are considering and discuss your requirements before choosing. The related products below lead directly to the existing shop pages, so you can compare the descriptions and prices without losing the context of the task."),
    ],
    relatedProductSlugs: ["safe-hr-anti-impact-glove-nitrile-sandy-grip-with-tpr-back", "safe-hr-cut-resistant-glove-cut-level-5-a5-touchscreen", "safe-hr-green-nitrile-chemical-glove-flock-lined-13"],
    sources: [{ title: "Safe HR product range", url: "/shop" }],
  },
];
