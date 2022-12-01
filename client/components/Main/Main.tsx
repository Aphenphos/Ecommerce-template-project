import { FC, ReactElement, useContext, useState } from 'react';
import { useCartItems } from '../../context/useCart';
import { useItems } from '../../context/useItem';
import { useUser } from '../../context/useUser';
import { addToCart } from '../../services/cart';
import styles from './Main.module.css';

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { user, loading } = useUser();
    const { items, iLoading } = useItems();
    const { setCartChange } = useCartItems();
    if (loading || iLoading) {
      return <div>loading</div>;
    }

    const handleAddToCart = async (e: any) => {
      e.preventDefault();
      await setCartChange({ newItem: e.target.id.value });
      await addToCart(e.target.id.value, 1);
    };
    return (
      <div id={styles.displayContainer}>
        {items.map((item: any) => (
          <div key={item.id} className={styles.itemContainer}>
            <span>{item.item_name}</span>
            <span>{item.item_price}</span>
            <form onSubmit={handleAddToCart}>
              <button value={item.id} name="id">
                +
              </button>
            </form>
          </div>
        ))}
      </div>
    );
  };
  component.displayName = 'Main';
  return component;
};
