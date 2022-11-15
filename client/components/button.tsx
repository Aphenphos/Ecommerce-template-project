import {
  type FC,
  type ReactNode,
  type ReactElement,
  type ReactEventHandler
} from 'react'

export type Props = {
  children: ReactNode,
  dataTestId?: string,
  onClick?: ReactEventHandler<HTMLButtonElement>,
}

export type Component = FC<Props>

export default (className: string): FC<Props> => {
  const component = (props: Props): ReactElement => {
    return <button
      className={className}
      data-testid={props.dataTestId}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  }
  component.displayName = 'Button'
  return component
}
