import React, { type FC, type ReactElement } from 'react'

export type Props = {
}

export type Component = FC<Props>

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    return <>
      This is the dashboard!
    </>
  }
  component.displayName = 'Dashboard'
  return component
}
