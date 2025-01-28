import Joi from 'joi';

const signUpValidator = Joi.object().keys({
  headers: Joi.object({}).options({ allowUnknown: true }),
  body: Joi.object({
    firstName: Joi.string().required().label('First name is a mandatory field'),
    lastName: Joi.string().required().label('Last name is a mandatory field'),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .required()
      .label(
        'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.',
      ),
    confirmPassword: Joi.string()
      .valid(Joi.ref('password')) // Ensure confirmPassword is equal to password
      .required()
      .label('Confirm Password must be equal to Password'),
    email: Joi.string().email().required().label('Email is a mandatory field'),
  }),
  query: Joi.object().empty().optional(),
});

const signInValidator = Joi.object().keys({
  headers: Joi.object({}).options({ allowUnknown: true }),
  body: Joi.object({
    email: Joi.string().email().required().label('Email is a mandatory field'),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .required()
      .label(
        'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.',
      ),
  }),
  query: Joi.object().empty().optional(),
});

export {
  signUpValidator as SignUpValidator,
  signInValidator as signInValidator,
};
