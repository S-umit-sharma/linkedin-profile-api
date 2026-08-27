import { describe, expect, it } from "vitest";
import { normalizeProfileUrl } from "./profile-url";

describe("normalizeProfileUrl", () => {
  it("removes trailing slash", () => {
    expect(
      normalizeProfileUrl(
        "https://www.linkedin.com/in/test/"
      )
    ).toBe(
      "https://www.linkedin.com/in/test"
    );
  });

  it("removes query parameters", () => {
    expect(
      normalizeProfileUrl(
        "https://www.linkedin.com/in/test/?trk=abc"
      )
    ).toBe(
      "https://www.linkedin.com/in/test"
    );
  });

  it("removes fragments", () => {
    expect(
      normalizeProfileUrl(
        "https://www.linkedin.com/in/test/#about"
      )
    ).toBe(
      "https://www.linkedin.com/in/test"
    );
  });

  it("normalizes hostname", () => {
    expect(
      normalizeProfileUrl(
        "HTTPS://WWW.LINKEDIN.COM/in/test/"
      )
    ).toBe(
      "https://www.linkedin.com/in/test"
    );
  });
});