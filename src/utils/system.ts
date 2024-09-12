import { exec } from "child_process";

const execSystem = (cmd: string): Promise<string> => {
  return new Promise((resolve) => {
    exec(cmd, (err, stdout, _stderr) => {
      if (err) {
        console.log(err);
      }
      resolve(stdout);
    });
  });
};

export { execSystem };
