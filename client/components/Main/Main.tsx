import { FC, ReactElement, useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCartItems } from '../../context/useCart';
import { useItems } from '../../context/useItem';
import { usePopup } from '../../context/usePopup';
import { useUser } from '../../context/useUser';
import { addToCart } from '../../services/cart';
import { BsFillCartPlusFill } from 'react-icons/bs';
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
    const nav = useNavigate();
    if (loading || iLoading) {
      return <div>loading</div>;
    }

    const handleAddToCart = async (e: any) => {
      e.preventDefault();
      if (!user) {
        setmChange('Must be signed in to add items to cart');
        return nav('/auth/sign-in');
      }
      const resp = await addToCart(e.target.id.value, 1);
      setCartChange({ newItem: e.target.id.value });
      setmChange(resp);
    };
    return (
      <div id={styles.displayContainer}>
        {items.map((item: any) => (
          <div key={item.id} className={styles.itemContainer}>
            <span className={styles.itemName}>{item.item_name}</span>
            <img src={item.images[0]}></img>
            <div className={styles.toCart}>
              <span>{item.item_price / 100}</span>
              <form onSubmit={handleAddToCart}>
                <button value={item.id} name="id">
                  <BsFillCartPlusFill />
                </button>
              </form>
            </div>
          </div>
        ))}
        {message && <Popup />}
      </div>
    );
  };
  component.displayName = 'Main';
  return component;
};
