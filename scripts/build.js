import esbuild from 'esbuild';
import { runStyledScript } from './scripUtils/styledScript.js';

const OPTIONS_TO_FIX_FIREBASE_ESBUILD_CONFLICT = {
  banner: {
    js: "const require = (await import('node:module')).createRequire(import.meta.url);const __filename = (await import('node:url')).fileURLToPath(import.meta.url);const __dirname = (await import('node:path')).dirname(__filename);",
  },
};

const buildFiles = async () => {
  await esbuild.build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    outfile: './lib/main.js',
    platform: 'node',
    format: 'esm',
    sourcemap: true,
    target: 'node18',
    tsconfig: './tsconfig.json',
    external: ['express', 'mongoose', 'swagger-ui-express'],
    ...OPTIONS_TO_FIX_FIREBASE_ESBUILD_CONFLICT,
  });
};

runStyledScript({
  startMsg: 'Building...',
  successMsg: 'Build success',
  failMessage: 'Error during build process',
  script: buildFiles,
});
