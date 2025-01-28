import Joi from 'joi';

const createUsersValidator = Joi.object().keys({
  headers: Joi.object({
    'org-id': Joi.string().uuid().required().label('Organization Id is missing'),
    'role-id': Joi.string().required().label('User Id is missing'),
  }).options({ allowUnknown: true }),
  body: Joi.object({
    firstName: Joi.string().required().label('First name is a mandatory field'),
    lastName: Joi.string().required().label('Last name is a mandatory field'),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .required()
      .label(
        'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.',
      ),
    email: Joi.string().email().required().label('Email is a mandatory field'),
  }),
  query: Joi.object().empty().optional(),
});

const updateUsersValidator = Joi.object().keys({
  headers: Joi.object({}).options({ allowUnknown: true }),
  body: Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
  }),
  query: Joi.object().empty().optional(),
});

export {
  createUsersValidator as CreateUsersValidator,
  updateUsersValidator as UpdateUsersValidator,
};
