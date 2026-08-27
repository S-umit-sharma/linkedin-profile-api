import { describe, expect, it } from "vitest";
import { profileRequestSchema } from "./profile.schema";

describe("profileRequestSchema", () => {
  it("accepts a valid LinkedIn profile URL", () => {
    const result = profileRequestSchema.safeParse({
      url: "https://www.linkedin.com/in/john-doe/",
    });

    expect(result.success).toBe(true);
  });

  it("rejects a non-LinkedIn URL", () => {
    const result = profileRequestSchema.safeParse({
      url: "https://www.google.com/",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a LinkedIn company URL", () => {
    const result = profileRequestSchema.safeParse({
      url: "https://www.linkedin.com/company/example/",
    });

    expect(result.success).toBe(false);
  });

  it("accepts a valid LinkedIn profile URL", () => {
  const result = profileRequestSchema.safeParse({
    url: "https://www.linkedin.com/in/test-user/",
  });

  expect(result.success).toBe(true);
});

it("rejects a non-LinkedIn URL", () => {
  const result = profileRequestSchema.safeParse({
    url: "https://google.com",
  });

  expect(result.success).toBe(false);
});

it("rejects a LinkedIn company URL", () => {
  const result = profileRequestSchema.safeParse({
    url: "https://www.linkedin.com/company/microsoft/",
  });

  expect(result.success).toBe(false);
});

  it("rejects an invalid URL", () => {
    const result = profileRequestSchema.safeParse({
      url: "not-a-url",
    });

    expect(result.success).toBe(false);
  });
});