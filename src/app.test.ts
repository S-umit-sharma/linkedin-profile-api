import { describe, expect, it } from "vitest";
import { buildApp } from "./app";

describe("Profile API", () => {
  it("returns health status", async () => {
    const app = buildApp();

    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    expect(response.statusCode).toBe(200);

    expect(response.json()).toEqual({
      status: "ok",
      service: "linkedin-profile-api",
    });

    await app.close();
  });

  it("returns a profile for a valid URL", async () => {
    const app = buildApp();

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/profile",
      payload: {
        url: "https://www.linkedin.com/in/test-user/",
      },
    });

    expect(response.statusCode).toBe(200);

    const body = response.json();

    expect(body.success).toBe(true);
    expect(body.profile.url).toBe(
      "https://www.linkedin.com/in/test-user/"
    );

    await app.close();
  });

  it("rejects an invalid profile URL", async () => {
    const app = buildApp();

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/profile",
      payload: {
        url: "https://google.com",
      },
    });

    expect(response.statusCode).toBe(400);

    const body = response.json();

    expect(body.success).toBe(false);
    expect(body.error.code).toBe(
      "INVALID_PROFILE_URL"
    );

    await app.close();
  });
});