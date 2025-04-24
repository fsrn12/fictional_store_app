import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from "@nestjs/swagger";
import helmet from "helmet";
import { AppModule } from "./app.module.js";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>("appConfig.port");
  const url = configService.get<string>("appConfig.url");
  const apiVersion = configService.get<string>("appConfig.apiVersion");
  // console.log(port, url, apiVersion);
  app.enableCors();
  app.use(helmet());
  app.disable("x-powered-by");
  app.setGlobalPrefix("api");

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Nestjs E-commerce Shop")
    .setDescription(
      `Backend Api documentation.\nUse base Api url ${url}:${port}`,
    )
    .setVersion(apiVersion)
    .addServer(`${url}:${port}`)
    .addBearerAuth()
    .addSecurityRequirements("bearer")
    .setTermsOfService(`${url}/terms-of-service`)
    .setLicense(
      "MIT License",
      "http://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt",
    )
    .build();

  const swaggerOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig, swaggerOptions);
  SwaggerModule.setup("api", app, documentFactory);

  await app.listen(port);
}
bootstrap();
