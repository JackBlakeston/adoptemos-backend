import { spawn } from 'child_process';

export const runShellCommand = async (command) => {
  return new Promise(async (resolve, reject) => {
    const childProcess = spawn(command, {
      shell: true,
      env: { ...process.env, FORCE_COLOR: true },
      stdio: 'inherit',
    });

    childProcess.on('close', (code) => {
      if (code !== 0) {
        reject();
      }
      resolve();
    });
  });
};
