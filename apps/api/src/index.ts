import * as dotenv from "dotenv";
dotenv.config();

import server from "./server";
import { log } from "logger";
const port = process.env.PORT || 5001;

server.listen(port, () => {
  log(`api running on ${port}`);
});
