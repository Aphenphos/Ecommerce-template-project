import { FC, ReactElement, useContext } from 'react';
import { useUser } from '../../context/useUser';

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { user, loading } = useUser();
    if (loading) {
      return <div>loading</div>;
    }
    return <div>ITEMS WILL SHOW HERE!</div>;
  };
  component.displayName = 'Main';
  return component;
};
