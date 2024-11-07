import React from 'react';
import './listItem.css';
type ListItemProps = {
  Icon: React.ReactNode;
  label: string;
  spacing?:
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline'
    | undefined;
  classNames?: string;
};
const ListItem = ({ Icon, label, spacing, classNames }: ListItemProps) => {
  console.log("listitem re-rendered!")
  return (
    <div style={{ justifyContent: spacing }} className={`listItem ${classNames}`}>
      <div className="listItem__icon">{Icon}</div>
      <div className="listItem__value">{label}</div>
    </div>
  );
};

export default React.memo(ListItem);
