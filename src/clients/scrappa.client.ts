import axios from "axios";
import { ProviderClient } from "./provider.client";

export class ScrappaClient implements ProviderClient{
  private readonly baseUrl = "https://scrappa.co/api";

  constructor(private readonly apiKey: string) {}

  async getProfile(url: string): Promise<unknown> {
    const response = await axios.get(
      `${this.baseUrl}/linkedin/profile`,
      {
        params: {
          url,
        },
        headers: {
          "X-API-KEY": this.apiKey,
        },
        timeout: 30_000,
      }
    );

    return response.data;
  }
}