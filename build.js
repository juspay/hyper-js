const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const baseConfig = {
  entryPoints: ["./src/Index.bs.js"],
  minify: true,
  bundle: true,
  loader: { ".js": "jsx" },
  plugins: [],
  sourcemap: true,
  platform: "browser",
  target: ["es2018"],
};

const builds = [
  { format: "esm", outfile: "dist/index.mjs" },
  { format: "cjs", outfile: "dist/index.js" },
];

async function main() {
  try {
    // Ensure dist directory exists
    if (!fs.existsSync("dist")) {
      fs.mkdirSync("dist", { recursive: true });
    }

    // Copy type definitions to dist
    const typeDefSource = path.join(__dirname, "src/index.d.ts");
    const typeDefDest = path.join(__dirname, "dist/index.d.ts");

    if (fs.existsSync(typeDefSource)) {
      fs.copyFileSync(typeDefSource, typeDefDest);
      console.log("✓ Type definitions copied to dist");
    } else {
      console.warn(
        "⚠ Warning: Type definitions file not found at src/index.d.ts"
      );
    }

    // Run builds in parallel
    await Promise.all(
      builds.map(async ({ format, outfile }) => {
        try {
          await esbuild.build({
            ...baseConfig,
            format,
            outfile,
          });
          console.log(`✓ Built ${format} bundle: ${outfile}`);
        } catch (error) {
          throw new Error(`Failed to build ${format} bundle: ${error.message}`);
        }
      })
    );

    console.log("✓ Build completed successfully");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

main();
