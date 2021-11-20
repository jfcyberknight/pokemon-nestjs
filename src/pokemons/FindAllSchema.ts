import Joi from '@hapi/joi';

export const FindAllSchema = Joi.object({
  limit: Joi.number().min(1).required(),
  offset: Joi.number().min(0).required(),
});
