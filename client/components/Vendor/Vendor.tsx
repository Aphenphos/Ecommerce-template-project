import { FC, ReactElement, useState } from 'react';
import { deleteItem, postItem } from '../../services/item';
export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const [itemName, setItemName] = useState('');
    const [itemList, setItemList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(-1);

    const submitItem = async (e: any) => {
      e.preventDefault();
      postItem(itemName);
    };
    const submitDeleteItem = async (e: any) => {
      e.preventDefault();
      deleteItem(selectedItem);
    };
    const getItems = async () => {
      console.log('getting items');
      console.log(itemName);
      setItemList([]);
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
            </label>
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
        </div>
      </>
    );
  };
  component.displayName = 'Vendor';
  return component;
};
