import { createRequire } from "node:module";
import { pathsToModuleNameMapper } from "ts-jest";
const require = createRequire(import.meta.url);
const { compilerOptions } = require("../tsconfig.json");

const modulePath = "<rootDir>/../src";

export default {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  modulePaths: [modulePath],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: modulePath,
  }),
  testRegex: [".*\\.spec\\.ts$", ".e2e-spec.ts$"],
  transform: { "^.+\\.(t|j)s$": "ts-jest" },
  collectCoverageFrom: ["**/*.(t|j)s"],
  // coverageDirectory: "../coverage",
  testEnvironment: "node",
};
