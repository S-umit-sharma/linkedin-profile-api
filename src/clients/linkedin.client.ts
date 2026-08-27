import axios from "axios";

export class LinkedInClient {
  private readonly baseUrl = "https://api.linkedin.com";

  constructor(
    private readonly accessToken: string
  ) {}

  async getCurrentMemberProfile() {
    const response = await axios.get(
      `${this.baseUrl}/v2/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }
    );

    return response.data;
  }
}