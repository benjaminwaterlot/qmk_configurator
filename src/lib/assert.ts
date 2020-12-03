import { AssertionError } from 'assert'

function assert(condition: any, msg?: string): asserts condition {
  if (condition === undefined || condition === null)
    throw new AssertionError({ message: msg })
}

export default assert
