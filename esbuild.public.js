const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/views/public/**/*.js"],
  outdir: "public/js",
  bundle: true,
  minify: true,
  platform: "node",
  sourcemap: false,
});
