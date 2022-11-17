import { FC, ReactElement, useState } from 'react';
import { postItem } from '../../services/item';
export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const [itemName, setItemName] = useState('');
    const [itemList, setItemList] = useState([]);

    const submitItem = async (e: any) => {
      e.preventDefault();
      postItem(itemName);
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
        </div>
      </>
    );
  };
  component.displayName = 'Vendor';
  return component;
};
