import { z } from "zod";

export const profileRequestSchema = z.object({
  url: z
    .string()
    .url("Invalid URL")
    .refine(
      (value) => {
        try {
          const url = new URL(value);

          return (
            url.protocol === "https:" &&
            (
              url.hostname === "linkedin.com" ||
              url.hostname === "www.linkedin.com"
            ) &&
            url.pathname.startsWith("/in/")
          );
        } catch {
          return false;
        }
      },
      {
        message: "URL must be a public LinkedIn profile URL",
      }
    ),
});