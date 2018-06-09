import React from 'react';
import { MenuItemContainer } from '../Containers';

const MenuSection = ({ data }) => {
  if (!data.MenuItems || data.MenuItems.length === 0) {
    return (
      <div className="menu-section">
        <h2 className="menu-section-name">{data.name}</h2>
        <div className="menu-section-subheader">
          <p >This menu section is currently empty.</p>
        </div>
      </div>
    );
  }

  const items = data.MenuItems.map(item => (item.status === 'published' ? <MenuItemContainer key={item.id} data={item} /> : null));
  return (
    <div className="menu-section">
      <div className="menu-section-name">
        <h2>{data.name}</h2>
      </div>
      <div className="menu-section-body">
        {items}
      </div>
    </div>
  );
};

export default MenuSection;
