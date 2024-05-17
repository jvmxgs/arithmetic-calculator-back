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
  },
  second_number: {
    notEmpty: {
      bail: true,
      errorMessage: 'Second number is required'
    },
    isNumeric: {
      bail: true,
      errorMessage: 'Second name should be a number'
    },
    custom: {
      options: (value) => (Math.abs(parseFloat(value)) !== 0),
      errorMessage: 'Second number don\'t should be zero'
    }
  }
})
