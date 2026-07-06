import app from "./app";
import env from "./app/config/env";
import prisma from "./app/config/prisma";

const PORT = Number(env.PORT);

async function bootstrap() {
  try {
    await prisma.$connect();

    console.log("Database connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect database:", error);
    process.exit(1);
  }
}

bootstrap();