import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
    client: "@hey-api/client-fetch",
    input: "src/client/weather/swagger.json",
    output: "src/client/weather/generated",
});
