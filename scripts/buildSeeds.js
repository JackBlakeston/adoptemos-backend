import esbuild from 'esbuild';
import { runStyledScript } from './scripUtils/styledScript.js';

const buildSeeds = async () => {
  await esbuild.build({
    entryPoints: ['./src/infrastructure/database/seeds/**/*.ts'],
    bundle: true,
    outdir: './lib/src/infrastructure/database/seeds',
    platform: 'node',
    format: 'esm',
    sourcemap: true,
    target: 'node18',
    tsconfig: './tsconfig.json',
    external: ['mongoose'],
  });
};

runStyledScript({
  startMsg: 'Building database seeds...',
  successMsg: 'Seeds built successfully',
  failMessage: 'Error while building seeds',
  script: buildSeeds,
});
