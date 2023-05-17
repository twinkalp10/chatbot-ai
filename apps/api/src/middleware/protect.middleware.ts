import jwt from 'jsonwebtoken';
import { NextFunction, RequestHandler } from "express"
import { Req, Res } from "../type"
import { User } from "@prisma/client"

export const protect: RequestHandler = async (req: Req, res: Res, next: NextFunction) => {
 const bearer = req.headers.authorization

 if (!bearer || !bearer.startsWith('Bearer ')) {
  return res.status(401).send({ message: 'Unauthorized' })
 }

 const token = bearer.split('Bearer ')[1].trim()
 try {
  const user = jwt.verify(token, process.env.JWT_TOKEN || 'change-log')
  req.user = user as User
  next()
 } catch (e) {
  console.error(e)
  return res.status(401).send({ message: 'Unauthorized' })
 }
}
