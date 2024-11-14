import SymbolsGrid from '@/components/SymbolsGrid';
import PriceChart from '@/components/PriceChart';
import DesktopInfo from './src/DesktopInfo';
import { setActiveSymbol } from '@/store/dashboardOptionsSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import "./symbolsView.css";

const SymbolsView = () => {
  const dispatch = useAppDispatch();
  const activeSymbol = useAppSelector((state) => state.store.activeSymbol);
  const handleSymbolClick = (symbolId: string) => {
    const newActiveSymbol = activeSymbol === symbolId ? null : symbolId;
    dispatch(setActiveSymbol(newActiveSymbol));
  };

  return (
      <div className="symbolsView">
        <DesktopInfo/>
        <div className="symbolsView__content">
          <div className="symbolsView__cards">
            <SymbolsGrid onSymbolClick={handleSymbolClick}/>
          </div>
          <PriceChart headerText={"PRICE HISTORY"}/>
        </div>
      </div>
  );
};

export default SymbolsView;
