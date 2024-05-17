import { checkSchema } from 'express-validator'

export default checkSchema({
  first_number: {
    notEmpty: {
      bail: true,
      errorMessage: 'First number is required'
    },
    isNumeric: {
      errorMessage: 'First number should be a number'
    }
  }
})
