import { FC, ReactElement, useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useCartItems } from '../../context/useCart';
import { useItems } from '../../context/useItem';
import { usePopup } from '../../context/usePopup';
import { useUser } from '../../context/useUser';
import { addToCart } from '../../services/cart';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { SlMagnifier } from 'react-icons/sl';
import styles from './Main.module.css';
import loader from '../../styles/loader.module.css';
import { getItemBySearch } from '../../services/item';
import popupFn from '../Popup/Popup';
const Popup = popupFn();

export type Props = {};
export type Component = FC<Props>;
//something is missing from this main page, unsure what.
export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { user, loading, setLoading } = useUser();
    const { items, iLoading, setItems } = useItems();
    const { setCartChange } = useCartItems();
    const { message, setmChange } = usePopup();
    const [searchParams, setSearchParams] = useState('');
    const nav = useNavigate();
    if (loading || iLoading) {
      return (
        <div id={loader.center}>
          <div className={loader.loader}></div>
        </div>
      );
    }
    async function resetSearchParams() {
      setLoading(true);
      const result = await getItemBySearch('');
      setItems(result);
      setLoading(false);
    }
    function handleChange(e: any) {
      setSearchParams(e.target.value);
    }
    const submitItemSearch = async (e: any) => {
      e.preventDefault();
      setLoading(true);
      const result = await getItemBySearch(searchParams);

      setItems(result);
      setLoading(false);
    };

    const handleAddToCart = async (e: any) => {
      e.preventDefault();
      if (!user) {
        setmChange('Must be signed in to add items to cart');
        return nav('/auth/sign-in');
      }
      const resp = await addToCart(e.target.id.value, 1);
      setCartChange({ newItem: e.target.id.value });
      setmChange(resp);
    };
    //put a react magnifying glass next to the search
    return (
      <>
        {message && <Popup />}
        <form onSubmit={submitItemSearch} id={styles.searchContainer}>
          <button id={styles.resetButton} onClick={resetSearchParams}>
            Reset
          </button>
          <input
            type="text"
            id={styles.searchbar}
            onChange={(e) => handleChange(e)}
          ></input>
          <button>
            <SlMagnifier id={styles.magnifyingGlass} />
          </button>
        </form>
        <div id={styles.displayContainer}>
          {items[0] ? (
            items.map((item: any) => (
              <div key={item.id} className={styles.itemContainer}>
                <Link to={`/detail/${item.id}`}>
                  <img src={item.images[0]}></img>
                  <span className={styles.itemName}>
                    {item.item_name}
                  </span>
                </Link>
                <div className={styles.toCart}>
                  <span>${(item.item_price / 100).toFixed(2)}</span>
                  <form onSubmit={handleAddToCart}>
                    <button value={item.id} name="id">
                      <BsFillCartPlusFill />
                    </button>
                  </form>
                </div>
              </div>
            ))
          ) : (
            <div id={styles.noResults}>No Results Found</div>
          )}
        </div>
      </>
    );
  };
  component.displayName = 'Main';
  return component;
};
