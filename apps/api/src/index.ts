import * as dotenv from "dotenv";
dotenv.config();

import server from "./server";
const port = process.env.PORT || 5001;

server.listen(port, () => {
  console.log(`api running on ${port}`);
});
