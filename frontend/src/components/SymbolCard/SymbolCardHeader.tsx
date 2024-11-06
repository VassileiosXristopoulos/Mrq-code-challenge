import React from 'react';
import TrendSymbol from '../TrendSymbol/TrendSymbol';
type SymbolCardHeaderProps = {
  id: string;
  trend: string | null;
};
const SymbolCardHeader = ({ id, trend }: SymbolCardHeaderProps) => {
  console.log("SymbolCardHeader re-rendered!")
  return (
    <div className='symbolCard__header'>
      <div className="symbolCard__header__id">{id}</div>
      <TrendSymbol classesProp={"symbolCard__header__trend"} trend={trend} width={30} height={30} />
    </div>
  );
};

export default React.memo(SymbolCardHeader);
