import { type FC, type ReactNode, type ReactElement } from 'react'

export type Props = {
  url: string,
  children: ReactNode,
}

export type Component = FC<Props>

export default (className: string): FC<Props> => {
  const component = (props: Props): ReactElement => {
    return <a className={className} href={props.url}>
      {props.children}
    </a>
  }
  component.displayName = 'Link'
  return component
}
