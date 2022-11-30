import { FC, ReactElement, useContext } from 'react';
import { useItems } from '../../context/useItem';
import { useUser } from '../../context/useUser';
import styles from './Main.module.css';

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { user, loading } = useUser();
    const { items, iLoading } = useItems();
    if (loading || iLoading) {
      return <div>loading</div>;
    }
    console.log(items);

    return (
      <div id={styles.displayContainer}>
        {items.map((item: any) => (
          <div key={item.id} className={styles.itemContainer}>
            <span>{item.item_name}</span>
            <span>{item.item_price}</span>
          </div>
        ))}
      </div>
    );
  };
  component.displayName = 'Main';
  return component;
};
