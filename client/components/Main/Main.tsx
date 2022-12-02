import { FC, ReactElement, useContext, useState } from 'react';
import { useCartItems } from '../../context/useCart';
import { useItems } from '../../context/useItem';
import { usePopup } from '../../context/usePopup';
import { useUser } from '../../context/useUser';
import { addToCart } from '../../services/cart';
import styles from './Main.module.css';
import popupFn from '../Popup/Popup';
const Popup = popupFn();

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { user, loading } = useUser();
    const { items, iLoading } = useItems();
    const { setCartChange } = useCartItems();
    const { message, setmChange } = usePopup();
    if (loading || iLoading) {
      return <div>loading</div>;
    }

    const handleAddToCart = async (e: any) => {
      e.preventDefault();
      const resp = await addToCart(e.target.id.value, 1);
      setCartChange({ newItem: e.target.id.value });
      setmChange(resp);
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
        {message && <Popup></Popup>}
      </div>
    );
  };
  component.displayName = 'Main';
  return component;
};
