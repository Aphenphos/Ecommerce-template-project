import { FC, ReactElement } from 'react';

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    return <div>ITEMS WILL SHOW HERE!</div>;
  };
  component.displayName = 'Main';
  return component;
};
