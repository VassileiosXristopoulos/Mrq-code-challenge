import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import TrendSymbol from '../TrendSymbol/TrendSymbol';
import StockPrice from '../StockPrice/StockPrice';
import { useEffect, useMemo, useRef, useState } from 'react';
import { formatCurrency } from '@/utilities/helpers';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
};

const SymbolCard = ({ id, onClick, price }: SymbolCardProps) => {
  const previousPriceRef = useRef(price); // Store the previous price without causing re-renders
  const shakeRef = useRef(false); // Track shake status without causing re-renders
  const displayDifferenceRef = useRef(false); // Track color display status without re-renders
  const [cardClassNames, setCardClassNames] = useState('');
  const { trend, companyName, industry, marketCap } = useAppSelector((state) => state.stocks.entities[id]);
  const activeSymbol = useAppSelector((state) => state.store.activeSymbol);
  const handleOnClick = () => {
    onClick(id);
  };
  
  useEffect(() => {
    const previousPrice = previousPriceRef.current;
    const priceDifference = price - previousPrice;
    const priceDifferencePercentage = (priceDifference / previousPrice) * 100;

    if (priceDifferencePercentage > 25) {
      shakeRef.current = true;
      setTimeout(() => {
        shakeRef.current = false;
      }, 500); // Reset shake after animation duration
    }
    
    if (priceDifference !== 0) {
      displayDifferenceRef.current = true;
      setTimeout(() => {
        displayDifferenceRef.current = false;
      }, 2000); // Reset after 2 seconds
    }
    previousPriceRef.current = price; // Update for next comparison

    let newClassNames = ''; // Start with the base class

    if (priceDifferencePercentage > 25 || priceDifferencePercentage < -25) {
      newClassNames += ' symbolCard__shake';
    }
    
    if(priceDifference !== 0) {
      newClassNames += price > previousPrice ? ' symbolCard__up' : ' symbolCard__down';
      setCardClassNames(newClassNames); // Update class names for color change
      setTimeout(() => {
        setCardClassNames(prev => prev.replace(/ symbolCard__up| symbolCard__down| symbolCard__shake/g, ''));
      }, 2000);
    }
  }, [price]);
  
  const getFocusedClass = () => {
    let focusedClass = '';
    if(activeSymbol) {
      focusedClass = activeSymbol === id ? "symbolCard__focused" : "symbolCard__not_focused";
    }
    
    return focusedClass;
  }
  
  return (
    <div onClick={handleOnClick} className={`symbolCard ${cardClassNames} ${getFocusedClass()}`}>
      <div className='symbolCard__header'>
        <div className="symbolCard__header__id">{id}</div>
        <TrendSymbol classesProp={"symbolCard__header__trend"} trend={trend} width={30} height={30} />
      </div>
      <div className="symbolCard__content">
        <div className="symbolCard__priceSection">
          <div className='symbolCard_priceSection__label'>Price:</div>
          <StockPrice classesProp={"symbolCard_priceSection__price"} price={price} />
        </div>
        <ListItem Icon={<CompanyIcon />} label={companyName} />
        <ListItem Icon={<IndustryIcon />} label={industry} />
        <ListItem Icon={<MarketCapIcon />} label={formatCurrency(marketCap)} />
      </div>
    </div>
  );
};
export default SymbolCard;
