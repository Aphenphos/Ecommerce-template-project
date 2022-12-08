import e from 'express';
import { FC, ReactElement } from 'react';
import { useCartItems } from '../../context/useCart';
import { useUser } from '../../context/useUser';
import { checkoutUser } from '../../services/checkout';
import { Navigate } from 'react-router-dom';
import { removeFromCart } from '../../services/cart';
import styles from './Checkout.module.css';

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  //also adress difficulty of increasing/decreasing quantity
  //potentially spamming server
  const component = (props: Props): ReactElement => {
    const { user, loading } = useUser();
    const { cartItems, cLoading, itemData, setCartChange } =
      useCartItems();
    if (loading) {
      return <>LOADING</>;
    }
    if (!user) {
      return <Navigate replace to="/auth/sign-in" />;
    }
    if (cLoading) {
      return <>Loading Items</>;
    }
    function accessItemData(itemId: number) {
      let item;
      for (let i = 0; i < itemData.length; i++) {
        if (itemData[i].id === itemId) {
          item = itemData[i];
        }
      }
      return item;
    }
    const handleIncrease = async () => {};
    const handleDecrease = async () => {};

    const handleCheckout = async () => {
      await checkoutUser(cartItems);
    };

    const handleRemove = async (e: any) => {
      await removeFromCart(e.target.value);
      setCartChange({ change: e.target.value });
    };

    return (
      <div id={styles.pageContainer}>
        <div id={styles.cartContainer}>
          {cartItems.map((item: any) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={accessItemData(item.item_id).images[0]}></img>
              <div className={styles.cartItemInfo}>
                <div>{accessItemData(item.item_id).item_name}</div>
                <div>{accessItemData(item.item_id).item_price}</div>
                <div>
                  <div>Quantity:{item.item_quantity}</div>
                  <button value={item.id}>+</button>
                  <button value={item.id}>-</button>
                </div>
              </div>
              <button value={item.id} onClick={handleRemove}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <div id={styles.checkoutContainer}>
          {cartItems[0] ? (
            <>
              <span>Items(Amount)</span>
              <span>Subtotal: (Amount)</span>
              <button
                onClick={handleCheckout}
                id={styles.checkoutButton}
              >
                Checkout
              </button>
            </>
          ) : (
            <>Your Cart is Empty!</>
          )}
        </div>
      </div>
    );
  };
  component.displayname = 'Checkout';
  return component;
};
