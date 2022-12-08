import e from 'express';
import { FC, ReactElement, useEffect, useState } from 'react';
import { useCartItems } from '../../context/useCart';
import { useUser } from '../../context/useUser';
import { checkoutUser } from '../../services/checkout';
import { Navigate } from 'react-router-dom';
import { removeFromCart } from '../../services/cart';
import { BsFillCartDashFill } from 'react-icons/bs';
import styles from './Checkout.module.css';

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  //also adress difficulty of increasing/decreasing quantity
  //potentially spamming server
  const component = (props: Props): ReactElement => {
    const { user, loading } = useUser();
    const { cartItems, cLoading, itemData, setCartChange, total } =
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
                <div>{item.item_name}</div>
                <div>${(item.item_price / 100).toFixed(2)}</div>
                <div>
                  <div className={styles.itemQuantity}>
                    Quantity:{item.item_quantity}
                  </div>
                  <button value={item.id}>+</button>
                  <button value={item.id}>-</button>
                </div>
              </div>
              <button
                value={item.id}
                onClick={handleRemove}
                className={styles.removeCart}
              >
                <BsFillCartDashFill />
              </button>
            </div>
          ))}
        </div>

        <div id={styles.checkoutContainer}>
          {cartItems[0] ? (
            <>
              <span>Items(Amount)</span>
              <div>
                <span>Subtotal</span>
                <span>${(total / 100).toFixed(2)}</span>
              </div>
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
