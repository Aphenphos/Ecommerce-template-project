import e from 'express';
import { FC, ReactElement, useState } from 'react';
import { useUser } from '../../context/useUser';
import {
  deleteItem,
  postItem,
  updateItem,
} from '../../services/item';
import { Navigate } from 'react-router-dom';

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { user, loading, vendor } = useUser();
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemList, setItemList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(-1);
    if (loading) {
      return <>LOADING</>;
    }
    if (!user) {
      return <Navigate replace to="/auth/sign-in" />;
    }

    if (!vendor) {
      return <Navigate replace to="/" />;
    }

    const submitItem = async (e: any) => {
      e.preventDefault();
      const itemPInt = parseInt(itemPrice);
      await postItem(itemName, itemPInt);
    };
    const submitDeleteItem = async (e: any) => {
      e.preventDefault();
      deleteItem(selectedItem);
    };
    const getItems = async () => {
      setItemList([]);
    };
    const submitUpdateItem = async (e: any) => {
      e.preventDefault();
      updateItem(selectedItem, itemName);
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
                placeholder="Item Name"
              ></input>
            </label>
            <button>Submit New Item</button>
          </form>
          <button onClick={getItems}></button>
          <span>{itemList}</span>
          <form onSubmit={submitDeleteItem}>
            <input
              type="number"
              placeholder="item id to delete"
              onChange={(e) => {
                setSelectedItem((e as any).target.value);
              }}
            ></input>
          </form>
          <form onSubmit={submitUpdateItem}>
            <input
              type="number"
              placeholder="item id to update"
              onChange={(e) => {
                setSelectedItem((e as any).target.value);
              }}
            ></input>
            <input
              type="text"
              onChange={(e) => {
                setItemName(e.target.value);
              }}
              placeholder="Updated Item name"
            ></input>
            <button>SUbmit</button>
          </form>
        </div>
      </>
    );
  };
  component.displayName = 'Vendor';
  return component;
};
