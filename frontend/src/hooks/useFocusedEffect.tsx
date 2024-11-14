import { useMemo } from 'react';

const useFocusedEffect = (activeSymbol: string | null, id: string) => {
  return useMemo(() => {
    if (activeSymbol) {
      return activeSymbol === id ? "symbolCard__focused" : "symbolCard__not_focused";
    }
    return '';
  }, [activeSymbol, id]);
};

export default useFocusedEffect;
