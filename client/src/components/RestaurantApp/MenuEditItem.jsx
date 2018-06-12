import React from 'react';

const MenuEditItem = ({ view, toggleEdit, data }) => {
  if (!view) {
    return null;
  }
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="edit-item">
        <p>This is the <strong>Menu Edit Item</strong> component</p>
        </div>
        <div>
          <label for="item-name">Item name: </label><input id="item-name" type="text" value={data.name} />
          <label for="item-price">Price: </label><input id="item-price" type="number" min="1" step="any" value={data.price} />
          <label for="item-description">Description: </label><textarea id="item-description" value={data.description} />
          <label for="item-ingredients">Ingredients: </label><textarea id="item-ingredients" value={data.ingredients} />
          <label for="item-prep">Estimated Prep Time: </label><input id="item-prep" type="number" min="1" value={data.prepTime} />

        </div>

        <div>
          <button onClick={toggleEdit}>Cancel</button><button>Save</button>
        </div>
      </div>
    </div>
  );
};

export default MenuEditItem;
