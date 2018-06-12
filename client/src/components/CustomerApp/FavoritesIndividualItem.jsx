import React from 'react';
import { emojify } from 'react-emojione';

import '../../styles/Favorites.css';

export default class FavoritesIndividualItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBounce: false,
      showDrool: false,
    };
  }

  handleClick() {
    const { userId, itemId } = this.props;

    this.setState({
      showBounce: true,
    });
    const context = this;
    setTimeout(() => {
      context.setState({
        showBounce: false,
      });
    }, 500);
    this.props.handleIncrement(userId, itemId);
  }

  renderDrool() {
    const drool = (
      <span className="drool" onClick={this.handleClick.bind(this)}>{emojify('🤤')}</span>
    );
    const droolBounce = (
      <span className="drool-bounce" onClick={this.handleClick.bind(this)}>{emojify('🤤')}</span>
    );

    return this.state.showBounce ? droolBounce : drool;
  }

  renderItem(name) {
    return (
      <div>
        {name} {this.renderDrool()}
      </div>
    );
  }

  render() {
    const { name, likes, restaurant } = this.props;

    if (this.props.unliked) {
      return (
        <div className="FavoritesIndividualItem">
          <p
            onMouseOver={() => {
            this.setState({
              showDrool: true,
            });
          }}

            onMouseLeave={() => {
            this.setState({
              showDrool: false,
            });
          }}
          >
            <strong>{name}</strong> from {restaurant} { this.state.showDrool ? this.renderDrool() : ''}
          </p>
        </div>
      );
    }
    return (
      <div className="FavoritesIndividualItem">
        <p>
          <strong>{name}</strong> from {restaurant}
        </p>
        <p>
          <strong>{this.props.likes}</strong> {this.renderDrool()}
        </p>
      </div>
    );
  }
}
