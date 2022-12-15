import e from 'express';
import { FC, ReactElement, useEffect, useState } from 'react';
import { useCartItems } from '../../context/useCart';
import { useUser } from '../../context/useUser';
import { checkoutUser } from '../../services/checkout';
import { Navigate } from 'react-router-dom';
import { removeFromCart, updateQuant } from '../../services/cart';
import { BsFillCartDashFill } from 'react-icons/bs';
import styles from './Checkout.module.css';
import { usePopup } from '../../context/usePopup';
import popupFn from '../Popup/Popup';
const Popup = popupFn();

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  //also adress difficulty of increasing/decreasing quantity
  //potentially spamming server
  const component = (props: Props): ReactElement => {
    const { user, loading } = useUser();
    const { message, setmChange } = usePopup();
    const {
      cartItems,
      cLoading,
      itemData,
      setCartChange,
      total,
      numOfItems,
    } = useCartItems();
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
    //handle quantity increase/decrease
    const handleIncrease = async (itemId: number, index: number) => {
      const newQuant = parseInt(cartItems[index].item_quantity) + 1;
      if (newQuant > 5) {
        setmChange('Cannot exceed maximum quantity');
        return;
      }
      await updateQuant(itemId, newQuant);
      setCartChange({ newQuant, change: 'increase' });
      console.log('quant increased');
    };
    const handleDecrease = async (itemId: number, index: number) => {
      const newQuant = parseInt(cartItems[index].item_quantity) - 1;
      if (newQuant < 1) {
        setmChange('Cannot exceed minimum quantity');
        return;
      }
      await updateQuant(itemId, newQuant);
      setCartChange({ newQuant, change: 'decrease' });
    };

    const handleCheckout = async () => {
      await checkoutUser(cartItems);
    };

    const handleRemove = async (itemid: bigint) => {
      console.log(itemid);
      const rmFromCart = await removeFromCart(itemid);
      if (!rmFromCart) {
        setmChange('Failed to remove item from cart.');
        return;
      }
      setCartChange({ change: itemid });
    };
    //fix way of inc dec functions
    return (
      <div id={styles.pageContainer}>
        <div id={styles.cartContainer}>
          {cartItems.map((item: any, index: number) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={accessItemData(item.item_id).images[0]}></img>
              <div className={styles.cartItemInfo}>
                <div>{item.item_name}</div>
                <div id={styles.quantContainer}>
                  <div className={styles.itemQuantity}>
                    Quantity:{item.item_quantity}
                  </div>
                  <div id={styles.quantButtonsContainer}>
                    <button
                      className={styles.quantButtons}
                      onClick={(e) => handleIncrease(item.id, index)}
                    >
                      +
                    </button>
                    <button
                      className={styles.quantButtons}
                      onClick={(e) => handleDecrease(item.id, index)}
                    >
                      -
                    </button>
                  </div>
                </div>
                <div>
                  $
                  {(
                    (item.item_quantity * item.item_price) /
                    100
                  ).toFixed(2)}
                </div>
              </div>
              <button
                onClick={(e) => handleRemove(item.id)}
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
              <span>{numOfItems} Items</span>
              <div>
                <span>Subtotal: ${(total / 100).toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                id={styles.checkoutButton}
              >
                Checkout
              </button>
            </>
          ) : (
            <div id={styles.empty}>Your Cart is Empty!</div>
          )}
        </div>
        {message && <Popup />}
      </div>
    );
  };
  component.displayname = 'Checkout';
  return component;
};
