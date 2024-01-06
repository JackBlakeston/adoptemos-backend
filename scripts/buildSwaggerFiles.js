import esbuild from 'esbuild';
import { runStyledScript } from './scripUtils/styledScript.js';

const buildSwaggerFiles = async () => {
  await esbuild.build({
    entryPoints: ['./src/fixtures/**/*.ts'],
    bundle: true,
    outdir: './lib/src/fixtures',
    platform: 'node',
    format: 'esm',
    sourcemap: true,
    target: 'node18',
    tsconfig: './tsconfig.json',
  });
};

runStyledScript({
  startMsg: 'Building fixtures for swagger autodoc...',
  successMsg: 'Fixtures built successfully',
  failMessage: 'Error while building fixtures',
  script: buildSwaggerFiles,
});
