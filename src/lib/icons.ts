import { addCollection } from "@iconify/react";
import type { IconifyIcon } from "@iconify/react";
import fluent from "@iconify-json/fluent-emoji-flat/icons.json";
import flat from "@iconify-json/flat-color-icons/icons.json";
import logos from "@iconify-json/logos/icons.json";

export const iconNames = {
  newspaper: "fluent-emoji-flat:newspaper", "bar-chart": "flat-color-icons:bar-chart",
  ambulance: "fluent-emoji-flat:ambulance", sparkles: "fluent-emoji-flat:sparkles",
  cut: "fluent-emoji-flat:scissors", chemical: "fluent-emoji-flat:test-tube",
  gloves: "fluent-emoji-flat:gloves", impact: "fluent-emoji-flat:hammer", garden: "fluent-emoji-flat:seedling",
  safety: "flat-color-icons:data-protection", bulk: "flat-color-icons:shipped",
  whatsapp: "logos:whatsapp-icon", phone: "flat-color-icons:phone", email: "fluent-emoji-flat:e-mail",
  address: "fluent-emoji-flat:round-pushpin", cart: "fluent-emoji-flat:shopping-cart",
  air: "fluent-emoji-flat:wind-face", warning: "fluent-emoji-flat:warning",
  sensor: "flat-color-icons:electrical-sensor", camera: "flat-color-icons:camera",
  dashboard: "flat-color-icons:bar-chart", privacy: "flat-color-icons:data-protection",
  support: "flat-color-icons:online-support", agriculture: "fluent-emoji-flat:tractor",
  logistics: "fluent-emoji-flat:delivery-truck", warehousing: "fluent-emoji-flat:package",
  manufacturing: "fluent-emoji-flat:factory", quote: "fluent-emoji-flat:speech-balloon",
  success: "flat-color-icons:checkmark", info: "flat-color-icons:info", buy: "flat-color-icons:shipped",
} as const;
export type IconName = keyof typeof iconNames;
export const bundledIcons = {} as Record<IconName, IconifyIcon>;

// Register only the used subset of each bundled set; never request an icon API.
for (const collection of [fluent, flat, logos]) {
  const used = Object.values(iconNames).filter(id => id.startsWith(`${collection.prefix}:`)).map(id => id.split(":")[1]);
  const icons = Object.fromEntries(used.flatMap(name => {
    if (!name) return [];
    const icon = (collection.icons as Record<string, { body: string }>)[name];
    return icon ? [[name, icon]] : [];
  }));
  addCollection({ ...collection, icons });
  for (const [semantic, id] of Object.entries(iconNames)) {
    if (!id.startsWith(`${collection.prefix}:`)) continue;
    const icon = icons[id.slice(collection.prefix.length + 1)];
    if (icon) bundledIcons[semantic as IconName] = {
      width: collection.width, height: collection.height, ...icon,
    };
  }
}

export function featureIcon(title: string): IconName {
  const text = title.toLowerCase();
  if (/carbon|alert|escalation|unsafe|breach/.test(text)) return "warning";
  if (/air quality/.test(text)) return "air";
  if (/environment|iot/.test(text)) return "sensor";
  if (/dashboard|digital/.test(text)) return "dashboard";
  if (/access|privacy/.test(text)) return "privacy";
  return "safety";
}