import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const PopupContext = createContext('' as any);

const PopupProvider = ({ children }: { children: any }) => {
  const [message, setMessage] = useState('');
  const [mchange, setmChange] = useState('');

  useEffect(() => {
    setMessage(mchange);
    setTimeout(() => {
      setmChange('');
    }, 2000);
  }, [mchange]);

  return (
    <PopupContext.Provider
      value={{ message, setMessage, mchange, setmChange }}
    >
      {children}
    </PopupContext.Provider>
  );
};

function usePopup() {
  const context = useContext(PopupContext);
  if (context === undefined || context === null) {
    throw new Error('Missing PopupProvider');
  }
  return context;
}

export { usePopup, PopupProvider };
