export interface Configuration {
  GUILD: string;

  OWNER_USER: string;

  LOG_CHANNELS: {
    ACTIVITY: string;
  };
}

let config: Configuration;
if (process.env.NODE_ENV === "production") {
  config = (await import("./makeshift.ts")).default;
} else {
  console.log("Loaded configuration for development mode");
  config = (await import("./development.ts")).default;
}

export default config;
