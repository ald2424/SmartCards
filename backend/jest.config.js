module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/test/**/*.test.ts"],
  setupFilesAfterEnv: ["./test/setup.ts"],
};
