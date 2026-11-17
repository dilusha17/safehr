import { z } from "zod";

export const shopSearchSchema = z.object({
  q: z.string().optional().catch(undefined),
  sort: z.enum(["featured", "price-asc", "price-desc", "name"]).optional().catch(undefined),
  min: z.coerce.number().optional().catch(undefined),
  max: z.coerce.number().optional().catch(undefined),
  tag: z.string().optional().catch(undefined),
});
export type ShopSearch = z.infer<typeof shopSearchSchema>;
