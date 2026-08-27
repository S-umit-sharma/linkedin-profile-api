import { buildApp } from "./app";
import "dotenv/config";

const app = buildApp();

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    await app.listen({
      port,
      host: "0.0.0.0",
    });

    console.log("Server running on http://localhost:3000");
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
