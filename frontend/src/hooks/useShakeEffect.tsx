import { useState, useEffect, useRef } from 'react';

const useShakeEffect = (price: number) => {
  const previousPriceRef = useRef(price);
  const [shakeClass, setShakeClass] = useState('');
  
  useEffect(() => {
    const previousPrice = previousPriceRef.current;
    const priceDifference = price - previousPrice;
    const priceDifferencePercentage = (priceDifference / previousPrice) * 100;

    if (priceDifferencePercentage > 25 || priceDifferencePercentage < -25) {
      setShakeClass(' symbolCard__shake');
      setTimeout(() => {
        setShakeClass('');
      }, 500); // Shake duration
    }
    previousPriceRef.current = price;
  }, [price]);

  return shakeClass;
};

export default useShakeEffect;
