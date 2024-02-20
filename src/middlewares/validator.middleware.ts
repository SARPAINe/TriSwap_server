/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

export const validator = (
  storage: 'body' | 'param' | 'query',
  schema: Joi.ObjectSchema<any>,
) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    const data = req[storage]
    const value = await schema.validateAsync(data, {
      abortEarly: false,
      stripUnknown: true,
    })
    req[storage] = value
    next()
  }
}
