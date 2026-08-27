import { ProfileExtractor } from "../extractors/profile.extractor";
import { ProfileCache } from "../cache/profile.cache";
import { ProfileResponse } from "../types/profile";
import { normalizeProfileUrl } from "../utils/profile-url";

export class ProfileService {
  constructor(
    private readonly extractor: ProfileExtractor,
    private readonly cache: ProfileCache
  ) {}

  async getProfile(url: string): Promise<ProfileResponse> {
 const normalizedUrl = normalizeProfileUrl(url);

const cached = this.cache.get(normalizedUrl);

if (cached) {
  return cached;
}

const profile = await this.extractor.extract(url);

    const response: ProfileResponse = {
      success: true,
      profile,
      metadata: {
        source: this.extractor.getSource(),
        retrievedAt: new Date().toISOString(),
        availableFields: this.getAvailableFields(profile),
      },
    };

    this.cache.set(
  normalizedUrl,
  response
);

    return response;
  }

  private getAvailableFields(
    profile: ProfileResponse["profile"]
  ): string[] {
    return Object.entries(profile)
      .filter(([, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        }

        return value !== null && value !== "";
      })
      .map(([key]) => key);
  }
}