import { describe, expect, it, vi } from "vitest";
import { ProviderProfileExtractor } from "./provider.profile.extractor";
import { AppError } from "../errors/app-error";

describe("ProviderProfileExtractor", () => {
  it("returns a profile when provider succeeds", async () => {
    const client = {
      getProfile: vi.fn().mockResolvedValue({
        name: "Test User",
        location: "India",
      }),
    };

    const extractor = new ProviderProfileExtractor(client);

    const result = await extractor.extract(
      "https://www.linkedin.com/in/test-user/"
    );

    expect(result.name).toBe("Test User");
    expect(result.location).toBe("India");
    expect(client.getProfile).toHaveBeenCalledTimes(1);
  });

  it("converts provider 404 into PROFILE_NOT_FOUND", async () => {
    const client = {
      getProfile: vi.fn().mockRejectedValue({
        response: {
          status: 404,
          data: {
            message:
              "Profile not found or not publicly accessible",
          },
        },
      }),
    };

    const extractor = new ProviderProfileExtractor(client);

    await expect(
      extractor.extract(
        "https://www.linkedin.com/in/not-found/"
      )
    ).rejects.toMatchObject({
      code: "PROFILE_NOT_FOUND",
      statusCode: 404,
    });
  });

  it("converts provider 401 into PROVIDER_AUTH_ERROR", async () => {
    const client = {
      getProfile: vi.fn().mockRejectedValue({
        response: {
          status: 401,
        },
      }),
    };

    const extractor = new ProviderProfileExtractor(client);

    await expect(
      extractor.extract(
        "https://www.linkedin.com/in/test-user/"
      )
    ).rejects.toMatchObject({
      code: "PROVIDER_AUTH_ERROR",
      statusCode: 502,
    });
  });

  it("converts provider 403 into PROVIDER_AUTH_ERROR", async () => {
    const client = {
      getProfile: vi.fn().mockRejectedValue({
        response: {
          status: 403,
        },
      }),
    };

    const extractor = new ProviderProfileExtractor(client);

    await expect(
      extractor.extract(
        "https://www.linkedin.com/in/test-user/"
      )
    ).rejects.toMatchObject({
      code: "PROVIDER_AUTH_ERROR",
      statusCode: 502,
    });
  });

  it("converts provider 429 into PROVIDER_RATE_LIMITED", async () => {
    const client = {
      getProfile: vi.fn().mockRejectedValue({
        response: {
          status: 429,
        },
      }),
    };

    const extractor = new ProviderProfileExtractor(client);

    await expect(
      extractor.extract(
        "https://www.linkedin.com/in/test-user/"
      )
    ).rejects.toMatchObject({
      code: "PROVIDER_RATE_LIMITED",
      statusCode: 429,
    });
  });

  it("converts unknown provider errors into PROVIDER_REQUEST_FAILED", async () => {
    const client = {
      getProfile: vi.fn().mockRejectedValue(
        new Error("Network error")
      ),
    };

    const extractor = new ProviderProfileExtractor(client);

    await expect(
      extractor.extract(
        "https://www.linkedin.com/in/test-user/"
      )
    ).rejects.toMatchObject({
      code: "PROVIDER_REQUEST_FAILED",
      statusCode: 502,
    });
  });

  it("preserves existing AppError", async () => {
    const client = {
      getProfile: vi.fn().mockRejectedValue(
        new AppError(
          "PROFILE_NOT_FOUND",
          404,
          "Profile not found"
        )
      ),
    };

    const extractor = new ProviderProfileExtractor(client);

    await expect(
      extractor.extract(
        "https://www.linkedin.com/in/test-user/"
      )
    ).rejects.toMatchObject({
      code: "PROFILE_NOT_FOUND",
      statusCode: 404,
    });
  });
});