import e from 'express';
import { FC, ReactElement, useState } from 'react';
import { useUser } from '../../context/useUser';
import {
  deleteItem,
  postItem,
  updateItem,
} from '../../services/item';
import { Navigate } from 'react-router-dom';
import { useVendor } from '../../context/useVendor';

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { user, loading, vendor } = useUser();
    const { vItems, setChange, viLoading } = useVendor();
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    if (loading) {
      return <>LOADING</>;
    }
    if (!user) {
      return <Navigate replace to="/auth/sign-in" />;
    }
    if (!vendor) {
      return <Navigate replace to="/" />;
    }
    if (viLoading) {
      return <>Loading Your Items</>;
    }

    const submitItem = async (e: any) => {
      e.preventDefault();
      const itemPInt = parseInt(itemPrice);
      await postItem(itemName, itemPInt);
    };
    const submitDeleteItem = async (e: any) => {
      e.preventDefault();
      await deleteItem(e.target.value);
      setChange({ id: e.target.value });
    };

    const submitUpdateItem = async (e: any) => {
      e.preventDefault();
      updateItem(e.target.value, itemName);
    };
    return (
      <>
        <div>
          <form onSubmit={submitItem}>
            <label>
              Item Name
              <input
                type="text"
                onChange={(e) => {
                  setItemName(e.target.value);
                }}
                placeholder="Item Name"
              ></input>
              <input
                type="number"
                onChange={(e) => {
                  setItemPrice(e.target.value);
                }}
                placeholder="Item Price"
              ></input>
            </label>
            <button>Submit New Item</button>
          </form>

          {vItems.map((item: any) => (
            <div key={item.id}>
              <span>{item.item_name}</span>
              <span>{item.item_price}</span>
              <button value={item.id} onClick={submitDeleteItem}>
                Delete Item
              </button>
            </div>
          ))}
        </div>
      </>
    );
  };
  component.displayName = 'Vendor';
  return component;
};
