import { Router } from 'express';

import { registerOrLogin } from './../controllers/auth';
import {validate } from './../middlewares'
import { joinSchema } from '../routes/schema-validations';
import { asyncHandler} from './../utils/asyncHandler';

const router = Router();

router.post('/join', validate(joinSchema), asyncHandler(registerOrLogin));

export { router };

