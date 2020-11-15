/**
 * Keyboard names contain a non-fixed number of '/' characters,
 * so we remove them before putting the name in a URL.
 */
const encodeName = (name: string) => name.replaceAll('/', '__')

const decodeName = (name: string) => name.replaceAll('__', '/')

export { encodeName, decodeName }
