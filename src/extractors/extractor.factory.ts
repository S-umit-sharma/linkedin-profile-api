import { config } from "../config";
import { ProfileExtractor } from "./profile.extractor";
import { MockProfileExtractor } from "./mock.profile.extractor";
import { ProviderProfileExtractor } from "./provider.profile.extractor";
import { ScrappaClient } from "../clients/scrappa.client";

export function createProfileExtractor(): ProfileExtractor {
  switch (config.profileSource) {
    case "mock":
      return new MockProfileExtractor();

    case "scrappa":
      return new ProviderProfileExtractor(
        new ScrappaClient(
          config.scrappaApiToken
        )
      );

    default:
      throw new Error(
        `Unsupported PROFILE_SOURCE: ${config.profileSource}`
      );
  }
}