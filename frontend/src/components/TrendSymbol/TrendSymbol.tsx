import { useMemo } from 'react'
import downIcon from '../../assets/down.png';
import upIcon from '../../assets/up.png';

type TrendSymbolProps = {
  trend: string | null;
  width: number;
  height: number;
  classesProp: string | null;
};


const TrendSymbol = ({width, height, classesProp, trend }: TrendSymbolProps) => {
  
  const iconSrc = useMemo(() => {
    if (trend === 'UP') return upIcon;
    if (trend === 'DOWN') return downIcon;
    return null;
  }, [trend]);
  
  if (!iconSrc) return null;
  
  return  <img className={`trendSymbol ${classesProp}`} src={iconSrc} alt="My Image" width={width} height={height} />
}

export default TrendSymbol;