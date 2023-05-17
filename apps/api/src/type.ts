import { User } from '@prisma/client';
import { NextFunction, Request, RequestHandler, Response } from 'express';

export interface Res extends Response {
}
export interface Req extends Request {
 user?: User
}

