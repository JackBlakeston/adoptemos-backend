import restoreCursor from 'restore-cursor';

export const hideCursor = () => {
  console.log('\u001b[?25l');
  restoreCursor();
};
