import { describe, expect, it, vi } from "vitest";
import { ProfileService } from "./profile.service";
import { ProfileCache } from "../cache/profile.cache";
import { ProfileExtractor } from "../extractors/profile.extractor";
import { Profile } from "../types/profile";

const mockProfile: Profile = {
  url: "https://www.linkedin.com/in/test-user/",
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
};

describe("ProfileService", () => {
  it("uses the cache for repeated profile requests", async () => {
    const extractor: ProfileExtractor = {
      extract: vi.fn().mockResolvedValue(mockProfile),
      getSource: vi.fn().mockReturnValue("scrappa"),
    };

    const cache = new ProfileCache();

    const service = new ProfileService(
      extractor,
      cache
    );

    const url =
      "https://www.linkedin.com/in/test-user/";

    const first = await service.getProfile(url);

    const second = await service.getProfile(
      "https://www.linkedin.com/in/test-user"
    );

    expect(first).toEqual(second);

    expect(extractor.extract).toHaveBeenCalledTimes(1);
  });
});