export type OperationFunction = (a: string, b: string) => number
export type OptionalOperationFunction = (a: string, b?: string) => number
export type NoSecondParameterOperationFunction = (a: string) => number
