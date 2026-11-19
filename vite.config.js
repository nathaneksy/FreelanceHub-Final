import adapter from "@sveltejs/adapter-node";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, loadEnv } from "vite";
export default defineConfig(({ mode }) => ({
  plugins: [
    sveltekit({
      adapter: adapter(),
      paths: {
        origin:
          process.env.APP_ORIGIN ||
          process.env.RENDER_EXTERNAL_URL ||
          loadEnv(mode, process.cwd(), "APP_").APP_ORIGIN ||
          undefined,
      },
    }),
  ],
}));
