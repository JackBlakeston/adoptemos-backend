import { color, logColor } from './cliColors.js';
import { startTimer } from './timer.js';
import dotenv from 'dotenv';

dotenv.config();
const { ENVIRONMENT } = process.env;

export const runStyledScript = async ({
  startMsg,
  successMsg,
  failMessage,
  script,
  shouldBubbleError = false,
  timerInterval,
  timerDecimals,
}) => {
  const isDev = ENVIRONMENT === 'dev';

  try {
    console.log(color([34, 1, 4], `\n\n${startMsg}`));
    const stopTimer = isDev ? startTimer(timerDecimals, timerInterval) : null;

    await script();

    stopTimer && stopTimer();
    logColor([32, 1, 4], `\n${successMsg}`);
  } catch (err) {
    logColor([31, 1, 4], `\n${failMessage}`);
    shouldBubbleError && logColor([31], err.message);
    console.log('\n');
    process.exit(1);
  }
};
