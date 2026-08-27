import { LinkedInClient } from "../clients/linkedin.client";
import { mapLinkedInUserInfo } from "../mappers/linkedin.mapper";
import { Profile } from "../types/profile";

export interface ProfileExtractor {
  extract(url: string): Promise<Profile>;

  getSource(): string;
}

export class MockProfileExtractor implements ProfileExtractor {
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
  getSource(): string {
  return "mock";
}

}

export class LinkedInProfileExtractor implements ProfileExtractor {
  constructor(
    private readonly client: LinkedInClient
  ) {}

  async extract(url: string): Promise<Profile> {
    const data = await this.client.getCurrentMemberProfile();

    return mapLinkedInUserInfo(data, url);
  }
  getSource(): string {
  return "linkedin-api";
}
}