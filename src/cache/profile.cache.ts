import { ProfileResponse } from "../types/profile";

interface CacheEntry {
  profile: ProfileResponse;
  expiresAt: number;
}

export class ProfileCache {
  private readonly cache = new Map<string, CacheEntry>();

  constructor(
    private readonly ttlMs = 5 * 60 * 1000
  ) {}

  get(key: string): ProfileResponse | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    if (Date.now() >= entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.profile;
  }

  set(key: string, profile: ProfileResponse): void {
    this.cache.set(key, {
      profile,
      expiresAt: Date.now() + this.ttlMs,
    });
  }

  clear(): void {
    this.cache.clear();
  }
}