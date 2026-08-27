import { describe, expect, it } from "vitest";
import { ProfileCache } from "./profile.cache";
import { ProfileResponse } from "../types/profile";

describe("ProfileCache", () => {
  const profile: ProfileResponse = {
    success: true,
    profile: {
      url: "https://www.linkedin.com/in/test/",
      name: "Test User",
      headline: "Software Engineer",
      location: "India",
      about: "Test profile",
      profileImage: null,
      backgroundImage: null,
      experience: [],
      education: [],
      skills: ["TypeScript"],
      certifications: [],
      languages: [],
    },
    metadata: {
      source: "scrappa",
      retrievedAt: new Date().toISOString(),
      availableFields: ["name", "skills"],
    },
  };

  it("returns null when profile is not cached", () => {
    const cache = new ProfileCache();

    expect(
      cache.get(profile.profile.url)
    ).toBeNull();
  });

  it("returns cached profile", () => {
    const cache = new ProfileCache();

    cache.set(
      profile.profile.url,
      profile
    );

    expect(
      cache.get(profile.profile.url)
    ).toEqual(profile);
  });

  it("expires cached profile after TTL", async () => {
    const cache = new ProfileCache(50);

    cache.set(
      profile.profile.url,
      profile
    );

    expect(
      cache.get(profile.profile.url)
    ).toEqual(profile);

    await new Promise((resolve) =>
      setTimeout(resolve, 60)
    );

    expect(
      cache.get(profile.profile.url)
    ).toBeNull();
  });

  it("clears the cache", () => {
    const cache = new ProfileCache();

    cache.set(
      profile.profile.url,
      profile
    );

    cache.clear();

    expect(
      cache.get(profile.profile.url)
    ).toBeNull();
  });
});