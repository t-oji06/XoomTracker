const isProduction = process.env.NODE_ENV === "production";

function getJwtSecret() {
  if (process.env.JWT_SECRET) {
    return process.env.JWT_SECRET;
  }

  if (isProduction) {
    throw new Error("JWT_SECRET is required in production.");
  }

  console.warn("JWT_SECRET is not set. Using a development-only fallback secret.");
  return "development_only_secret_change_me";
}

module.exports = {
  JWT_SECRET: getJwtSecret()
};
