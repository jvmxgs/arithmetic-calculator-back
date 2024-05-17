export class InsuficientCreditsError extends Error {
  constructor () {
    super('Insuficient Credits')
    this.name = 'InvalidToken'
  }
}
