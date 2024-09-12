import * as dotenv from "dotenv";
import { scanf } from "./utils/stdio";
import { execSystem } from "./utils/system";
dotenv.config();
const ARN_MFA = process.env.ARN_MFA;
const AWS_PROFILE = process.env.AWS_PROFILE;
(async () => {
  let value = "";
  do {
    value = await scanf("Enter your MFA Token: ");
  } while (!value);
  const cmd = `aws sts get-session-token --serial-number ${ARN_MFA} --token-code ${value} --duration-seconds 129600 --profile ${AWS_PROFILE}`;
  try {
    const credentials = await execSystem(cmd);
    console.log(credentials);
    // execSystem(`export AWS_PROFILE=${AWS_PROFILE}`);

    const { Credentials } = credentials && JSON.parse(credentials);

    execSystem(
      `aws configure set aws_access_key_id ${Credentials.AccessKeyId} --profile ${AWS_PROFILE}`
    );

    execSystem(
      `aws configure set aws_secret_access_key ${Credentials.SecretAccessKey} --profile ${AWS_PROFILE}`
    );

    execSystem(
      `aws configure set aws_session_token ${Credentials.SessionToken} --profile ${AWS_PROFILE}`
    );
    console.log(Credentials);
  } catch (e) {
    console.log(e);
  }
})();
