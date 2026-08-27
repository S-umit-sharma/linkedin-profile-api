import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { profileRoutes } from "./routes/profile.routes";
import { AppError } from "./errors/app-error";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(swagger, {
    openapi: {
      info: {
        title: "LinkedIn Profile API",
        description:
          "API for retrieving structured LinkedIn profile information",
        version: "1.0.0",
      },
    },
  });

  app.register(swaggerUi, {
    routePrefix: "/docs",
  });

  app.get("/health", async () => {
    return {
      status: "ok",
      service: "linkedin-profile-api",
    };
  });

  app.register(profileRoutes);

  app.setErrorHandler((error, request, reply) => {
    request.log.error(error);

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        success: false,
        error: {
          code: error.code,
          message: error.message,
        },
      });
    }

    return reply.status(500).send({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      },
    });
  });

  return app;
}
