import esbuild from 'esbuild';
import { runStyledScript } from './scripUtils/styledScript.js';
import glob from 'glob';
import path from 'path';

const yi = './src/config/databaseMigrations.ts';

const buildMigrations = async () => {
  const sourceDir = 'src/infrastructure/database/migrations';
  const configFile = './src/config/migrations.ts';
  const outputDir = `lib/${sourceDir}`;

  const files = [...glob.sync(`${sourceDir}/**/*.ts`), configFile];

  await esbuild
    .build({
      entryPoints: files,
      bundle: true,
      outdir: outputDir,
      format: 'cjs',
      platform: 'node',
      sourcemap: true,
      tsconfig: 'tsconfig.json',
      write: false, // Do not write to disk initially
      loader: {
        '.ts': 'ts',
        '.js': 'js',
      },
    })
    .then(() => {
      files.forEach((file) => {
        const isConfigFile = file === configFile;
        const outputPath = isConfigFile
          ? 'lib/src/config/migrations.cjs'
          : path.join(outputDir, path.basename(file.replace(/\.ts$/, '.cjs')));

        esbuild.build({
          entryPoints: [file],
          bundle: true,
          outfile: outputPath,
          format: 'cjs',
          platform: 'node',
          sourcemap: true,
          tsconfig: 'tsconfig.json',
          write: true,
        });
      });
    })
    .catch(() => process.exit(1));
};

runStyledScript({
  startMsg: 'Building migrations files...',
  successMsg: 'Migration files built successfully',
  failMessage: 'Error while building migration files',
  script: buildMigrations,
});
