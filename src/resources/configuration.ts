import { ExitErrors } from "../utils/ExitErrors.js";

/*
console.log("Running in development mode");
export * from "./development.js";
//*/

//*
if (process.env.NODE_ENV !== "production") {
  console.error("Error: Application is configured for production but running in development mode. Exiting.");
  process.exit(ExitErrors.WRONG_ENVIRONMENT);
}
export * from "./makeshift.js";
//*/
