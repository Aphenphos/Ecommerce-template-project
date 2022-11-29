import e from 'express';
import { FC, ReactElement } from 'react';
import { useItems } from '../../context/useCart';
import { useUser } from '../../context/useUser';
import { checkoutUser } from '../../services/checkout';

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { user, loading } = useUser();
    const { items, iloading } = useItems();
    if (loading || iloading) {
      return <>LOADING</>;
    }

    const handleCheckout = async () => {
      await checkoutUser(items);
    };
    return (
      <div>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    );
  };
  component.displayname = 'Checkout';
  return component;
};
