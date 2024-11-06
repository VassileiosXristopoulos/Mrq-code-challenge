import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import StockPrice from '../StockPrice/StockPrice';
import { useMemo } from 'react';
import { formatCurrency } from '@/utilities/helpers';
import SymbolCardHeader from './SymbolCardHeader';
import useFocusedEffect from '@/hooks/useFocusedEffect';
import usePriceChangeEffect from '@/hooks/usePriceChangeEffect';
import useShakeEffect from '@/hooks/useShakeEffect';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
};

const SymbolCard = ({ id, onClick, price }: SymbolCardProps) => {
  const companyIconMemo = useMemo(() => <CompanyIcon />, []);
  const industryIconMemo = useMemo(() => <IndustryIcon />, []);
  const marketCapIconMemo = useMemo(() => <MarketCapIcon />, []);
  
  const { trend, companyName, industry, marketCap } = useAppSelector((state) => state.stocks.entities[id]);
  const activeSymbol = useAppSelector((state) => state.store.activeSymbol);
  const focusedClass = useFocusedEffect(activeSymbol, id); // Use custom hook for focused state
  const shakeClass = useShakeEffect(price); // Use custom hook for shake animation
  const upDownClass = usePriceChangeEffect(price); // Use custom hook for up/down effect
  
  const handleOnClick = () => {
    onClick(id);
  };

  return (
    <div onClick={handleOnClick} className={`symbolCard ${focusedClass}`}>
      <div className={`symbolCard__inner${shakeClass}${upDownClass}`}>
        <SymbolCardHeader id={id} trend={trend} />
        <div className="symbolCard__content">
          <div className="symbolCard__priceSection">
            <div className='symbolCard_priceSection__label'>PRICE:</div>
            <StockPrice classesProp={"symbolCard_priceSection__price"} price={price} />
          </div>
          <ListItem Icon={companyIconMemo} label={companyName} />
          <ListItem Icon={industryIconMemo} label={industry} />
          <ListItem Icon={marketCapIconMemo} label={formatCurrency(marketCap)} />
        </div>
      </div>
    </div>
  );
};

export default SymbolCard;
