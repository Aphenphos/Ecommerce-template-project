import { FC, ReactElement, useState } from 'react';
import { usePopup } from '../../context/usePopup';
import styles from './Popup.module.css';

export type Props = {};
export type Component = FC<Props>;

// Used to display error or success messages as a pop up for the user.
export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { message, setmChange } = usePopup();

    const handleClick = (e: any) => {
      setmChange('');
    };
    return (
      <>
        <div id={styles.popupContainer} onClick={handleClick}>
          {message}
        </div>
      </>
    );
  };
  component.displayname = 'Popup';
  return component;
};
