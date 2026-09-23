import "dotenv/config"
import express from "express"
import { loggerMiddleware } from "./middlewares/logger.middleware.js"
import authRouter from "./routes/auth.routes.js"
import bibliotecaRouter from "./routes/biblioteca.routes.js"

const app = express()

app.use(express.json())
app.use(loggerMiddleware)
app.use("/auth", authRouter)
app.use("/libro",bibliotecaRouter)

app.listen(3000, () => {
  console.log("puerto 3mil");
});