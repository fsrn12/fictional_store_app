// import { compilerOptions } from "./tsconfig.json";
import { createRequire } from "node:module";
import { pathsToModuleNameMapper } from "ts-jest";
const require = createRequire(import.meta.url);
const { compilerOptions } = require("./tsconfig.json");

export default {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  modulePaths: ["<rootDir>"],
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths,
    {
      useESM: true,
    },
    // {
    //   prefix: "<rootDir>",
    // }
  ),
  testRegex: ".*\\.spec\\.ts$",
  transform: { "^.+\\.(t|j)s$": "ts-jest" },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
};
