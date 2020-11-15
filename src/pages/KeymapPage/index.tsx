import React, { PropsWithChildren } from 'react'
import { RouteComponentProps } from '@reach/router'

const KeymapPage = (props: PropsWithChildren<RouteComponentProps>) => <>{props.children}</>

export default KeymapPage
export { default as KeyboardPageIndex } from './KeyboardPageIndex'
export { default as KeyboardPageContainer } from './KeyboardPageContainer'
export { default as KeyboardPageContent } from './KeyboardPageContent'
