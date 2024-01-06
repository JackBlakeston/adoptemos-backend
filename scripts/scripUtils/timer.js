import { color, logColor } from './cliColors.js';
import { hideCursor } from './clirCursor.js';

export const startTimer = (decimals = 1, intervalMs = 10) => {
  let time = 0;
  hideCursor();

  const timerInterval = setInterval(() => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    time = Number(time) + Number(intervalMs / 1000);

    process.stdout.write(color([90], `  --  Time: ${time.toFixed(decimals)} s  --\r`));
  }, intervalMs);

  const stopTimer = () => {
    clearInterval(timerInterval);
  };

  return stopTimer;
};
