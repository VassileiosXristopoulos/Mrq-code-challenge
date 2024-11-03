import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import TrendSymbol from '../TrendSymbol/TrendSymbol';
import StockPrice from '../StockPrice/StockPrice';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
};

const SymbolCard = ({ id, onClick, price }: SymbolCardProps) => {
  const { trend, companyName } = useAppSelector((state) => state.stocks.entities[id]);
  const handleOnClick = () => {
    onClick(id);
  };
  return (
    <div onClick={handleOnClick} className="symbolCard">
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
      </div>
    </div>
  );
};
export default SymbolCard;
