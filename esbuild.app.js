const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/app.ts"],
  outfile: "dist/app.js",
  bundle: true,
  minify: true,
  platform: "node",
  sourcemap: true,
});
