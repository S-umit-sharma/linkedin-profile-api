
export interface ProviderClient {
  getProfile(url: string): Promise<unknown>;
}