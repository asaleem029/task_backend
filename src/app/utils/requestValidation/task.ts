import Joi from 'joi';

const TaskCreationValidator = Joi.object().keys({
  headers: Joi.object({}).options({ allowUnknown: true }),
  body: Joi.object({
    name: Joi.string().required().label('Name is required'),
    description: Joi.string().required().label('Description is required'),
    userId: Joi.number().required().label('User Id is required'),
  }),
  query: Joi.object().empty().optional(),
});

const TaskUpdationValidator = Joi.object().keys({
  headers: Joi.object({}).options({ allowUnknown: true }),
  body: Joi.object({
    name: Joi.string().required().label('Name is required'),
    description: Joi.string().required().label('Description is required'),
    userId: Joi.number().required().label('User Id is required'),
  }),
  query: Joi.object().empty().optional(),
});

export { TaskCreationValidator, TaskUpdationValidator };
