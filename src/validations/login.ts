import { checkSchema } from 'express-validator'

export default checkSchema({
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
      errorMessage: 'Password is required'
    }
  }
})
