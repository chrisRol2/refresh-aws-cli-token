const scanf = (prompt: string): Promise<string> => {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    readline.question(prompt, (input) => {
      readline.close();
      resolve(input);
    });
  });
};

export { scanf };
