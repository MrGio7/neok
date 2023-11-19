const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/public/**/*.ts"],
  outdir: "public/js",
  bundle: true,
  minify: true,
  platform: "node",
  sourcemap: false,
});
