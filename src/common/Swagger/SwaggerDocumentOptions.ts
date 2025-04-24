import { OpenAPIObject, OperationIdFactory } from "@nestjs/swagger";
import { SwaggerUiOptions } from "@nestjs/swagger/dist/interfaces/swagger-ui-options.interface.js";

export interface SwaggerDocumentOptions {
  include?: Function[];
  extraModels?: Function[];
  ignoreGlobalPrefix?: boolean;
  deepScanRoutes?: boolean;
  operationIdFactory?: OperationIdFactory;
  linkNameFactory?: (
    controllerKey: string,
    methodKey: string,
    fieldKey: string,
  ) => string;
  autoTagControllers?: boolean;
  useGlobalPrefix?: boolean;
  swaggerUiEnabled?: boolean;
  ui?: boolean;
  raw?: boolean | Array<"json" | "yaml">;
  swaggerUrl?: string;
  jsonDocumentUrl?: string;
  yamlDocumentUrl?: string;
  patchDocumentOnRequest?: <TRequest = any, TResponse = any>(
    req: TRequest,
    res: TResponse,
    document: OpenAPIObject,
  ) => OpenAPIObject;
  explorer?: boolean;
  swaggerOptions?: SwaggerUiOptions;
  customCss?: string;
  customCssUrl?: string | string[];
  customJs?: string | string[];
  customJsStr?: string | string[];
  customfavIcon?: string;
  customSiteTitle?: string;
  customSwaggerUiPath?: string;
  validatorUrl?: string;
  url?: string;
  urls?: Record<"url" | "name", string>[];
}
