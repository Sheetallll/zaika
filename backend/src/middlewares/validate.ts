import { NextFunction, Request, Response, RequestHandler } from "express";
import { Schema, ValidationError } from "yup";

export const validate = (schema: Schema<unknown>): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next(); // Call next() to proceed to the next middleware/handler
        } catch (err) {
            if (err instanceof ValidationError) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
    };
};
