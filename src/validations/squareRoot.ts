import { checkSchema } from 'express-validator'

export default checkSchema({
  first_number: {
    notEmpty: {
      bail: true,
      errorMessage: 'First number is required'
    },
    isNumeric: {
      bail: true,
      errorMessage: 'First number should be a number'
    },
    custom: {
      options: (value) => parseFloat(value) >= 0,
      errorMessage: 'First number should be greater or equal to zero'
    }
  }
})
