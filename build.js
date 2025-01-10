const esbuild = require("esbuild");

const baseConfig = {
  entryPoints: ["./src/Index.bs.js"],
  minify: true,
  bundle: true,
  loader: { ".js": "jsx" },
  plugins: [],
};

const builds = [
  { format: "esm", outfile: "dist/index.mjs" },
  { format: "cjs", outfile: "dist/index.js" },
];

Promise.all(
  builds.map(({ format, outfile }) =>
    esbuild.build({
      ...baseConfig,
      format,
      outfile,
    })
  )
).catch((error) => {
  console.error("Build failed:", error);
  process.exit(1);
});
