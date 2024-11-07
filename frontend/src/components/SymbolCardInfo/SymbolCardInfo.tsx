import React from 'react';
import ListItem from '@/components/ListItem';
import { useAppSelector } from '@/hooks/redux';

type ListItemType = {
  icon: React.ReactNode;
  label: string;
};

type SymbolCardInfoProps = {
  listItems: ListItemType[];
};

const SymbolCardInfo = ({ listItems }: SymbolCardInfoProps) => {
  const showCardInfo = useAppSelector((state) => state.store.showCardInfo);

  console.log("SymbolCardInfo re-rendered!");

  return (
    showCardInfo && (
      <div>
        {listItems.map((listItem) => (
          <ListItem key={listItem.label} Icon={listItem.icon} label={listItem.label} classNames='space-between' />
        ))}
      </div>
    )
  );
};

export default React.memo(SymbolCardInfo);