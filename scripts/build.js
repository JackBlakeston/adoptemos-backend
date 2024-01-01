const esbuild = require('esbuild');
const path = require('path');

esbuild
  .build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    outfile: './lib/main.js',
    platform: 'node',
    format: 'cjs',
    sourcemap: true,
    target: 'node18',
    tsconfig: './tsconfig.json',
    external: ['express', 'mongoose', 'swagger-ui-express'],
  })
  .catch(() => process.exit(1));
