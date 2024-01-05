const esbuild = require('esbuild');
const path = require('path');

esbuild
  .build({
    entryPoints: ['./src/fixtures/**/*.ts'],
    bundle: true,
    outdir: './lib/src/fixtures',
    platform: 'node',
    format: 'cjs',
    sourcemap: true,
    target: 'node18',
    tsconfig: './tsconfig.json',
  })
  .catch(() => process.exit(1));
