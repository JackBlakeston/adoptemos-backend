import esbuild from 'esbuild';
import { runStyledScript } from './scripUtils/styledScript.js';

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
  });
};

runStyledScript({
  startMsg: 'Building...',
  successMsg: 'Build success',
  failMessage: 'Error during build process',
  script: buildFiles,
});
