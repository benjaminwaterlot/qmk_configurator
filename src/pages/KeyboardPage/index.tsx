import React, { PropsWithChildren } from 'react'
import { RouteComponentProps } from '@reach/router'

const KeyboardPage = (props: PropsWithChildren<RouteComponentProps>) => <>{props.children}</>

export default KeyboardPage
export { default as KeyboardPageIndex } from './KeyboardPageIndex'
export { default as KeyboardPageContainer } from './KeyboardPageContainer'
export { default as KeyboardPageContent } from './KeyboardPageContent'
