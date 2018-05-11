import React from 'react';
import { MenuItemContainer } from '../Containers';

const MenuSection = ({ data, toggleModal }) => {
  if (!data.MenuItems || data.MenuItems.length === 0) {
    return (
    <div className="menu-section">
      <h2>{data.name}</h2>
      <p>This menu section is currently empty.</p>
    </div>
    );
  }

  const items = data.MenuItems.map(item => <MenuItemContainer key={item.id} data={item} />);
  return (
    <div className="menu-section">
      <h2 className="menu-section-name">{data.name}</h2>
      {items}
    </div>
  );
};

export default MenuSection;
