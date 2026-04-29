/* Side-effect CSS imports (next.js handles these at build time, but the
   TypeScript language server needs an explicit module declaration so it
   doesn't flag `import "./globals.css"` as TS2882). */
declare module "*.css";
