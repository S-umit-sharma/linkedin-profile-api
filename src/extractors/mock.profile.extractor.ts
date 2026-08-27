import { ProfileExtractor } from "./profile.extractor";
import { Profile } from "../types/profile";

export class MockProfileExtractor implements ProfileExtractor {
  getSource(): string {
    return "mock";
  }

  async extract(url: string): Promise<Profile> {
    return {
      url,
      name: "Test User",
      headline: "Software Engineer",
      location: "India",
      about: "Test profile",
      profileImage: null,
      backgroundImage: null,
      experience: [],
      education: [],
      skills: [
        "JavaScript",
        "TypeScript",
        "Node.js",
      ],
      certifications: [],
      languages: [],
    };
  }
}