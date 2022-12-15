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
import { postImage, rmImage } from '../../services/itemImage';
import loader from '../../styles/loader.module.css';
import styles from './Vendor.module.css';
export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { user, loading, vendor, setLoading } = useUser();
    const { vItems, setChange, viLoading } = useVendor();
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemDescrip, setItemDescrip] = useState('');

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
      return (
        <div id={loader.center}>
          <div className={loader.loader}></div>
        </div>
      );
    }
    if (!user) {
      return <Navigate replace to="/auth/sign-in" />;
    }
    if (!vendor) {
      return <Navigate replace to="/" />;
    }
    if (viLoading) {
      return (
        <div id={loader.center}>
          <div className={loader.loader}></div>
        </div>
      );
    }
    const submitItem = async (e: any) => {
      e.preventDefault();
      setLoading(true);
      const itemPInt = parseInt(itemPrice);
      await postItem(itemName, itemDescrip, itemPInt);
      setChange(itemName);
      setLoading(false);
    };
    const submitDeleteItem = async (e: any) => {
      e.preventDefault();
      setLoading(true);
      await deleteItem(e.target.value);
      setChange({ id: e.target.value });
      setLoading(false);
    };
    const submitUpdateItem = async (e: any) => {
      e.preventDefault();
      await updateItem(e.target.value, itemName);
    };

    const handleImageSubmit = async (e: any) => {
      e.preventDefault();
      setLoading(true);
      //matches the image file with selected item to upload by the items ID
      for (let i = 0; i < files.length; i++) {
        if (files[i].tempId === e.target.value) {
          await postImage(files[i], files[i].tempId);
          setChange(files[i].tempId + Math.random());
          files.splice(i, 1);
        }
      }
      setLoading(false);
    };

    const handleImageRm = async (e: any) => {
      e.preventDefault();
      setLoading(true);
      await rmImage(e.target.value);
      setChange(e.target.value);
      setLoading(false);
    };
    return (
      <>
        <div>
          <form onSubmit={submitItem} id={styles.creationInputs}>
            <label className={styles.label}>Item Name</label>
            <input
              className={styles.input}
              type="text"
              onChange={(e) => {
                setItemName(e.target.value);
              }}
              placeholder="Item Name"
            ></input>

            <label className={styles.label}>Item Description</label>
            <textarea
              className={styles.input}
              onChange={(e) => {
                setItemDescrip(e.target.value);
              }}
            ></textarea>
            <label className={styles.label}>
              Item Price In Pennies
            </label>
            <input
              className={styles.input}
              type="number"
              onChange={(e) => {
                setItemPrice(e.target.value);
              }}
              placeholder="Item Price In Pennies"
            ></input>
            <button className={styles.submit}>Submit New Item</button>
          </form>
          <div id={styles.activeItemsContainer}>
            {vItems ? (
              vItems.map((item: any) => (
                <div key={item.id} className={styles.item}>
                  <h1>{item.item_name}</h1>
                  <h2>${(item.item_price / 100).toFixed(2)}</h2>
                  {item.images.length >= 3 ? (
                    item.images.map((image: any, index: number) => (
                      <div key={index}>
                        <button
                          value={image}
                          onClick={handleImageRm}
                          className={styles.remove}
                        >
                          Remove Pic
                        </button>
                        <img
                          src={image}
                          key={index}
                          className={styles.prodImage}
                        ></img>
                      </div>
                    ))
                  ) : (
                    <div>
                      <form>
                        <input
                          type="file"
                          accept=".png, .jpeg, .jpg"
                          name="imgForm"
                          onChange={(e) => handleChange(e, item.id)}
                        ></input>
                        <button
                          className={styles.submit}
                          value={item.id}
                          onClick={handleImageSubmit}
                        >
                          Submit New Image
                        </button>
                      </form>
                      {item.images.map(
                        (image: any, index: number) => (
                          <div key={index}>
                            <img
                              src={image}
                              key={index}
                              className={styles.prodImage}
                            ></img>
                            <button
                              className={styles.remove}
                              value={image}
                              onClick={handleImageRm}
                            >
                              Remove Pic
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  )}
                  <span>{item.item_description}</span>
                  <button
                    value={item.id}
                    onClick={submitDeleteItem}
                    className={styles.remove}
                  >
                    Delete Item
                  </button>
                </div>
              ))
            ) : (
              <>Post Your First Items!</>
            )}
          </div>
        </div>
      </>
    );
  };
  component.displayName = 'Vendor';
  return component;
};
