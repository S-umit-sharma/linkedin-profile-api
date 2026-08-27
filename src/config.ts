import "dotenv/config";

export const config = {
  profileSource: process.env.PROFILE_SOURCE ?? "mock",

  linkedinAccessToken:
    process.env.LINKEDIN_ACCESS_TOKEN ?? "",

    scrappaApiToken:
  process.env.SCRAPPA_API_TOKEN ?? "",

  providerApiUrl:
    process.env.PROVIDER_API_URL ?? "",

  providerApiKey:
    process.env.PROVIDER_API_KEY ?? "",

  linkupApiKey:
    process.env.LINKUP_API_KEY ?? "",

  linkupAccountId:
    process.env.LINKUP_ACCOUNT_ID ?? "",
};