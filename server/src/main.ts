import { configDotenv } from "dotenv";
import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { useContainer } from "class-validator";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    const PORT = process.env.SERVER_PORT || 3002;
    app.enableCors({ origin: "*" });
    app.setGlobalPrefix("/api");
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: { strategy: "exposeAll" },
      }),
    );
    await app.listen(PORT, () =>
      Logger.log(`Server started on PORT: \x1b[33m${PORT}\x1b[0m`),
    );
  } catch (e) {
    console.log(e);
  }
}

configDotenv();
bootstrap();
