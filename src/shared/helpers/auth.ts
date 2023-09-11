import { random } from "lodash";

export async function getRandomPort() {
    const port = random(1000, 9999);
    return port;
  }