import { FastifyInstance } from "fastify";
import { profileRequestSchema } from "../schemas/profile.schema";
import { ProfileService } from "../services/profile.service";
import { createProfileExtractor } from "../extractors/extractor.factory";
import { ProfileCache } from "../cache/profile.cache";

export async function profileRoutes(
  app: FastifyInstance
) {
  const extractor = createProfileExtractor();
  
  const cache = new ProfileCache();

const profileService = new ProfileService(
  extractor,
  cache
);

 app.post(
  "/api/v1/profile",
  {
    schema: {
      body: {
        type: "object",
        required: ["url"],
        properties: {
          url: {
            type: "string",
            format: "uri",
            description: "LinkedIn profile URL"
          },
        },
      },
    },
  },
  async (request, reply) => {
    const result = profileRequestSchema.safeParse(
      request.body
    );

    if (!result.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: "INVALID_PROFILE_URL",
          message:
            result.error.issues[0]?.message ??
            "Invalid request",
        },
      });
    }

    const response = await profileService.getProfile(
      result.data.url
    );

    return reply.status(200).send(response);
  });
}