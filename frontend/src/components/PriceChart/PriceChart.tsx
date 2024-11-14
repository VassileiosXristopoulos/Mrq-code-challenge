import { useEffect, useRef } from 'react';
import './priceChart.css';
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchPriceHistory, selectors } from '@/store/priceHistorySlice';
import Loading from '@/components/Loading';
type PriceChartProps = {
  headerText: string | null;
};

const PriceChart = ({ headerText }: PriceChartProps) => {
  const dispatch = useAppDispatch();
  const symbolId = useAppSelector((state) => state.store.activeSymbol);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (symbolId) {
      if (abortControllerRef.current) {
        // if there is an api call already in progress, cancel it because user requested something else
        abortControllerRef.current.abort();
      }
    
      const abortController = new AbortController(); // attach an abbort controller so we can cancel previous calls if multiple happen at the same time
      abortControllerRef.current = abortController;
      dispatch(fetchPriceHistory({ symbolId, signal: abortController.signal }));
    }
    
    return () => {
      // If the component unmounts, cancel the api call
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    }
  }, [dispatch, symbolId]);

  const apiState = useAppSelector(selectors.apiState);
  const data = useAppSelector(selectors.selectPriceHistory);
  const symbolInfo = useAppSelector(selectors.selectSymbolInfo);

  const header = headerText ? (<div className="priceChart__header">
        <h3>PRICE HISTORY</h3>
      </div>) : null;
  
  let body;
  
  if (apiState.loading && symbolId !== null) {
    body = (
      <Loading />
    );
  }
  else if (apiState.error) body = "Failed to get price history!";
  else if (!symbolId) body = "Select stock";
  else {
    body = (
      <>
      <div>{symbolInfo}</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.map((e) => ({ ...e, time: new Date(e.time).toLocaleTimeString() }))}>
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
          <XAxis dataKey="time" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </>
    )
  }
  
  return <div className="priceChart">
    {header}
    {body}
  </div>
};

export default PriceChart;
