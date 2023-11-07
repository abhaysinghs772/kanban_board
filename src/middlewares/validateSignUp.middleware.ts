import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export function signUpValidator(
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response {
  const signUpSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    phone_number: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
  });

  const { error } = signUpSchema.validate(req.body);

  if (error) {
    // If validation fails, send an error response
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}
