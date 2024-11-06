import { useState, useEffect, useRef } from 'react';

const usePriceChangeEffect = (price: number) => {
  const previousPriceRef = useRef(price);
  const [upDownClass, setUpDownClass] = useState('');
  
  useEffect(() => {
    const previousPrice = previousPriceRef.current;
    const priceDifference = price - previousPrice;

    if (price && previousPrice && priceDifference !== 0) {
      const newClass = price > previousPrice ? ' symbolCard__up' : ' symbolCard__down';
      setUpDownClass(newClass);
      setTimeout(() => {
        setUpDownClass('');
      }, 2000); // Animation duration
    }
    previousPriceRef.current = price;
  }, [price]);

  return upDownClass;
};

export default usePriceChangeEffect;
