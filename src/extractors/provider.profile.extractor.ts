import { ProfileExtractor } from "./profile.extractor";
import { Profile } from "../types/profile";
import { ProviderClient } from "../clients/provider.client";
import { ScrappaProfileMapper } from "../mappers/scrappa.mapper";
import { AppError } from "../errors/app-error";

export class ProviderProfileExtractor
  implements ProfileExtractor {

  constructor(
    private readonly client: ProviderClient
  ) {}

  getSource(): string {
    return "scrappa";
  }

  async extract(url: string): Promise<Profile> {
    try {
      const data = await this.client.getProfile(url);

      return ScrappaProfileMapper.map(
        data,
        url
      );
   } catch (error: any) {

  if (error instanceof AppError) {
    throw error;
  }

  const status = error.response?.status;

  if (status === 404) {
    throw new AppError(
      "PROFILE_NOT_FOUND",
      404,
      "LinkedIn profile was not found or is not publicly accessible"
    );
  }

  if (status === 401 || status === 403) {
    throw new AppError(
      "PROVIDER_AUTH_ERROR",
      502,
      "Profile provider authentication failed"
    );
  }

  if (status === 429) {
    throw new AppError(
      "PROVIDER_RATE_LIMITED",
      429,
      "Profile provider rate limit exceeded"
    );
  }

  throw new AppError(
    "PROVIDER_REQUEST_FAILED",
    502,
    "Unable to retrieve profile from provider"
  );
}
  }
}