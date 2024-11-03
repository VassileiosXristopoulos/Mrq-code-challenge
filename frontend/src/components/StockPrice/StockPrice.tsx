import { useMemo } from 'react'
import { formatCurrency } from '@/utilities/helpers';

type StockPriceProps = {
  price: number | null;
  classesProp: string | null;
};


const StockPrice = ({classesProp, price }: StockPriceProps) => {
  const priceNumber = useMemo(() => { 
    return price ? formatCurrency(price) : "-"}
  , [price]);
  
  return  <div className={`stockPrice ${classesProp}`}>{priceNumber}</div>
}

export default StockPrice;