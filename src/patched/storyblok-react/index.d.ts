import * as React from 'react'
export interface SbEditableContent {
  _uid: string
  _editable?: string
  component: string
  [index: string]: any
}
interface SbEditableProps {
  content: SbEditableContent
}
declare class SbEditable extends React.Component<SbEditableProps, {}> {
  constructor(props: SbEditableProps)
  public componentDidMount(): void
  public render(): React.ReactNode
  private addClass(el: HTMLElement, className: string): void
}
export default SbEditable
