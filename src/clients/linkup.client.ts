import axios from "axios";
import { ProviderClient } from "./provider.client";
import { AppError } from "../errors/app-error";

export class LinkUpClient implements ProviderClient {
  private readonly baseUrl =
    "https://api.linkupapi.com/v2/profiles";

  constructor(
    private readonly apiKey: string,
    private readonly accountId: string
  ) {}

  async getProfile(url: string): Promise<unknown> {
    if (!this.apiKey || !this.accountId) {
      throw new AppError(
        "LINKUP_NOT_CONFIGURED",
        503,
        "LinkUp API credentials are not configured"
      );
    }

    try {
      const response = await axios.post(
        this.baseUrl,
        {
          account_id: this.accountId,
          action: "get",
          params: {
            profile_url: url,
          },
        },
        {
          headers: {
            "x-api-key": this.apiKey,
            "Content-Type": "application/json",
          },
          timeout: 30000,
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
          throw new AppError(
            "LINKUP_AUTH_FAILED",
            502,
            "LinkUp API authentication failed"
          );
        }

        if (status === 404) {
          throw new AppError(
            "PROFILE_NOT_FOUND",
            404,
            "The requested LinkedIn profile could not be found"
          );
        }
      }

      throw new AppError(
        "LINKUP_REQUEST_FAILED",
        502,
        "Unable to retrieve profile from LinkUp"
      );
    }
  }
}