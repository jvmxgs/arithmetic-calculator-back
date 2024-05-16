import crypto from 'crypto'
import chalk from 'chalk'

const secretKey = crypto.randomBytes(64).toString('hex')

console.info(chalk.green('Secret key generated and saved to .env file.'))
console.info(chalk.blue('Secret key:'))
console.log(chalk.cyan(secretKey))
