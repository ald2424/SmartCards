module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/test/**/*.test.ts"],
  setupFiles: ["./test/setup.ts"],
};
