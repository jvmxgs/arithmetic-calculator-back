import { checkSchema } from 'express-validator'

export default checkSchema({
  first_name: {
    notEmpty: {
      errorMessage: 'First name is required'
    }
  },
  last_name: {
    notEmpty: {
      errorMessage: 'Last name is required'
    }
  },
  email: {
    notEmpty: {
      bail: true,
      errorMessage: 'Email is required'
    },
    isEmail: {
      errorMessage: 'Invalid email address'
    }
  },
  password: {
    notEmpty: {
      bail: true,
      errorMessage: 'Password is required'
    },
    isLength: {
      options: { min: 8 },
      errorMessage: 'Password should be at least 8 chars'
    }
  }
})
