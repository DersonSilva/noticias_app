import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    GNEWS_API_KEY: process.env.GNEWS_API_KEY,
    GNEWS_BASE_URL: process.env.GNEWS_BASE_URL,
  },
});
