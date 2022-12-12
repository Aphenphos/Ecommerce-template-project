import { FC, ReactElement, useEffect, useState } from 'react';
import { getItemById } from '../../services/item';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styles from './Detail.module.css';
import { usePopup } from '../../context/usePopup';
import { useUser } from '../../context/useUser';
import { useCartItems } from '../../context/useCart';
import { addToCart } from '../../services/cart';
import { BsFillCartPlusFill } from 'react-icons/bs';
import popupFn from '../Popup/Popup';

export type Props = {};
export type Component = FC<Props>;
const Popup = popupFn();

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const params = new URLSearchParams(window.location.search);
    const { user } = useUser();
    const { setCartChange } = useCartItems();
    const nav = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState({} as any);
    const { message, setmChange } = usePopup();
    const [quant, setQuant] = useState(1);

    const handleAddToCart = async (e: any) => {
      e.preventDefault();
      if (!user) {
        setmChange('Must be signed in to add items to cart');
        return nav('/auth/sign-in');
      }
      const resp = await addToCart(e.target.id.value, quant);
      setCartChange({ newItem: e.target.id.value });
      setmChange(resp);
    };

    useEffect(() => {
      async function fetchItemDetails() {
        const itemData = await getItemById(parseInt(id!));
        setItem(itemData);
        setLoading(false);
      }
      fetchItemDetails();
    }, [id]);
    if (loading) {
      return <>Loading</>;
    }
    console.log(item.item_description);
    if (!id) {
      return <Navigate replace to="/" />;
    }
    return (
      <div id={styles.container}>
        <h1 id={styles.itemName}>{item.item_name}</h1>
        {item.images.map((img: string, index: number) => (
          <img className={styles.image} src={img}></img>
        ))}
        <h1>${(item.item_price / 100).toFixed(2)}</h1>
        <p>{item.item_description}</p>
        <form onSubmit={handleAddToCart}>
          <input
            type="number"
            max="5"
            min="1"
            defaultValue="1"
            onChange={(e) => {
              setQuant(parseInt(e.target.value));
            }}
          ></input>
          <button value={item.id} name="id" id={styles.toCart}>
            <BsFillCartPlusFill />
          </button>
        </form>
        {message && <Popup />}
      </div>
    );
  };
  component.displayName = 'Detail';
  return component;
};
