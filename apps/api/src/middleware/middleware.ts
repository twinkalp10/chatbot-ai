import { AnyZodObject } from "zod";
import { Req, Res } from "../type";
import { NextFunction } from "express";

export const validate = (schema: AnyZodObject) =>
 async (req: Req, res: Res, next: NextFunction) => {
  try {
   await schema.parseAsync({
    body: req.body,
    query: req.query,
    params: req.params,
   });
   return next();
  } catch (error) {
   return res.status(401).send({ error })
  }
 };
