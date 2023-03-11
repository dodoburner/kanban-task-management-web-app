import { cleanEnv } from "envalid";
import { port } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  PORT: port(),
});
