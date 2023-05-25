import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import auth from './routers/auth.routers'
import scrap from './routers/scrap.routers'
import user from './routers/user.routers'
import chatbot from './routers/chatbot.router'
import { protect } from "./middleware/protect.middleware";
import chatbotSettings from './routers/chatbot-settings.router'
import chatbotData from './routers/chatbot-data.routers'
import { Req, Res } from "./type";

const app = express();
app
  .disable("x-powered-by")
  .use(morgan("dev"))
  .use(urlencoded({ extended: true }))
  .use(json())
  .use(cors())

app.get('/', (req: Req, res: Res) => {
  res.send('welcome to chatbot-ai api')
})

app.get('/health', (req: Req, res: Res) => {
  res.send('ok')
})

app.use('/v1/auth', auth)
app.use('/v1/scrap', scrap)

app.use('/v1/user', protect, user)
app.use('/v1/chatbot', protect, chatbot)
app.use('/v1/chatbot-settings', protect, chatbotSettings)
app.use('/v1/chatbot-data', protect, chatbotData)

app.use((req: Req, res: Res) => {
  res.status(400).send({ message: 'invalid route' })
});

export default app
