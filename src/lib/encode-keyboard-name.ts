/**
 * Keyboard names contain '/' character, so we remove it before putting it in a URL.
 */
const encodeName = (name: string) => name.replaceAll('/', '__')

const decodeName = (name: string) => name.replaceAll('__', '/')

export { encodeName, decodeName }
