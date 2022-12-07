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
import { postImage } from '../../services/itemImage';

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { user, loading, vendor } = useUser();
    const { vItems, setChange, viLoading } = useVendor();
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');

    const [files, setFiles] = useState<any[]>([]);

    function handleChange(event: any, id: bigint) {
      event.target.files[0].tempId = id;
      const newImage = event.target.files[0];
      //insures there is only image uploaded per item at a time.
      for (let i = 0; i < files.length; i++) {
        if (files[i].tempId === newImage.tempId) {
          files.splice(i, 1);
        }
      }
      setFiles([newImage, ...files]);
    }
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

    const handleImageSubmit = async (e: any) => {
      e.preventDefault();
      //matches the image file with selected item to upload by the items ID
      for (let i = 0; i < files.length; i++) {
        if (files[i].tempId === e.target.value) {
          console.log(files[i]);
          await postImage(files[i], files[i].tempId);
        }
      }
    };
    const submitItem = async (e: any) => {
      e.preventDefault();
      const itemPInt = parseInt(itemPrice);
      await postItem(itemName, itemPInt);
      setChange(itemName);
    };
    const submitDeleteItem = async (e: any) => {
      e.preventDefault();
      await deleteItem(e.target.value);
      setChange({ id: e.target.value });
    };

    const submitUpdateItem = async (e: any) => {
      e.preventDefault();
      await updateItem(e.target.value, itemName);
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

          {vItems ? (
            vItems.map((item: any) => (
              <div key={item.id}>
                <span>{item.item_name}</span>
                <span>{item.item_price}</span>
                {item.images.length >= 3 ? (
                  item.images.map((image: any, index: number) => (
                    <div key={index}>
                      <span>picture {index} is here</span>
                      <button>Remove Pic</button>
                      <img src={image.image_url}></img>
                    </div>
                  ))
                ) : (
                  <div>
                    {item.images.map((image: any, index: number) => (
                      <div key={index}>
                        <span>picture {index} is here</span>
                        <button>Remove Pic</button>
                        <img src={image.image_url}></img>
                      </div>
                    ))}
                    <form>
                      <input
                        type="file"
                        accept=".png, .jpeg, .jpg"
                        name="imgForm"
                        onChange={(e) => handleChange(e, item.id)}
                      ></input>
                      <button
                        value={item.id}
                        onClick={handleImageSubmit}
                      >
                        SubmitNewImage
                      </button>
                    </form>
                  </div>
                )}
                <button value={item.id} onClick={submitDeleteItem}>
                  Delete Item
                </button>
              </div>
            ))
          ) : (
            <>Post Your First Items!</>
          )}
        </div>
      </>
    );
  };
  component.displayName = 'Vendor';
  return component;
};
