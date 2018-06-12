import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/MenuManager.css';
import AuthService from '../../services/AuthService';
import ApiService from '../../services/ApiService';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: {
        id: null,
      },
      data: {
        id: null,
        status: null,
        name: null,
      }
    };
  }

  componentWillMount() {
    let data = this.props.data;
    this.setState({ data, hasChanged: false })
  }

  imageUpload = (e) => {
    this.refs.imageUploader.click();
  }

  _onChange = (itemId) => {
    var file = this.refs.imageUploader.files[0];
    var formData = new FormData()
    formData.append('file', file)

    fetch(`http://localhost:3000/upload/${itemId}`, {
      method: 'POST',
      body: formData
    }).then((res) => {
      return res.json()
    }).then(res => {
      let url = res.data.Location;
      let data = this.state.data;
      data.image = url
      this.setState({data, hasChanged: true})
    })
    .catch((err)=>{
      console.log('error uploading: ', err)
    }); 
  }

  removePhoto = () => {
    let data = this.state.data
    let imageKey = data.image.substring(50);
    data.image = null;
    this.setState({data, imageKey, hasChanged: true})
  }

  toggleSlider = (e) => {
    let data = this.state.data
    data.status = data.status === 'published' ? 'draft' : 'published',
    this.setState({
      data, 
      hasChanged: true,
    });
  }

  inputChange = (e) => {
    let name = e.target.name;
    let value;
    if (name === "name" || name === "status" || name === "description") {
      value = e.target.value
    } else if(typeof JSON.parse(e.target.value) === "number") {
      value = JSON.parse(e.target.value)
    } else {
      value = null;
    }
    let data = this.state.data;
    data[name] = value;
    this.setState({ data, hasChanged: true, [name + 'Edited']: true})
  }

  dropDownChange = (name, selectedOption) => {
    let data = this.state.data
    data[name] = JSON.parse(selectedOption.value)
    this.setState({ data, hasChanged: true, [name + 'Edited']: true });
  }

  updateItem = () => {
    const { RestaurantId, id } = this.state.data;
    const imageKey = this.state.imageKey
    ApiService.updateMenuItem(RestaurantId, id, this.state.data)
      .then((updatedItem) => {
        let data = this.state.data;
        data.id = updatedItem.item.id
        this.setState({
          data,
          hasChanged: false, 
          nameEdited: false,
          priceEdited: false,
          prepTimeEdited: false,
          veganEdited: false,
          vegetarianEdited: false,
          glutenFreeEdited: false,
          descriptionEdited: false,
          spicyEdited: false}, () => {
          if(imageKey) 
          ApiService.deletePhoto(imageKey)
        })
      }).catch(err => 
        console.log('error updating item', err)
      )
  }

  deleteItem = () => {
    let data = this.state.data;
    data.status = 'archived'
    const { RestaurantId, id } = this.state.data;
    this.setState({ data }, () => {
        this.props.updateCount(-1);
        ApiService.updateMenuItem(RestaurantId, id, this.state.data)
      }
    )
  }

  render() {
    const { id, name, status, image, price, prepTime, vegan, vegetarian, glutenFree, spicy, description } = this.state.data;
    const { selectedOption, veganEdited, vegetarianEdited, glutenFreeEdited, spicyEdited, descriptionEdited } = this.state;
  	const value = selectedOption && selectedOption.value;
    const img = <div className='image-container'>
                {
                  image
                  ? <div className='image-wrapper'>
                      <img onClick={this.imageUpload} className='item-image' src={image} alt='food' />
                      <div className='remove-photo-button'>
                        <button onClick={this.removePhoto}>Remove photo</button>
                      </div>
                    </div> 
                  : <span className='no-image' onClick={this.imageUpload}>Upload image.</span>
                }
                  <input type='file' accept='image/*' ref='imageUploader' style={{display: 'none'}} 
                    onChange={()=>{this._onChange(id)}}/>
                </div>;
    const others = ['vegan', 'vegetarian', 'glutenFree', 'spicy'];
    const render = {
      nutriFacts: others.map((attr, i) => {
        const options = [ { label: 'Yes', value: 'true', clearableValue: false, color: '#E31864' },
                          { label: 'No', value: 'false', clearableValue: false, color: '#E31864' },
                          { label: 'N/A', value: 'null', clearableValue: false, color: '#E31864' } ];
        return <div key={i} className='nutri-facts'>
          <p className='option-name'>{attr}:</p>
          <Select className='option-select' 
            options={options}
            clearable={false}
            valueRenderer={(option) => {
                if(this.state[attr + 'Edited']){
                  return <strong style={{ color: option.color }}>{option.label}</strong>
                } else {
                  return <strong style={{ color: 'black' }}>{option.label}</strong>
                }
            }}
            value={eval(attr) === null ? 'null' : eval(attr)}
            onChange={(e)=>{this.dropDownChange(attr, e)}}/>
          </div>}),
      name: <div className='item-input-div name '>
        <input className={'item-input ' + (this.state.nameEdited ? 'edited' : null)}
        name='name'
        type='text'
        defaultValue={name}
        placeholder='Item name.'
        onChange={(e) => { this.inputChange(e); }}
      />
      </div>,
      price: <div className='item-input-div price '>
        <i className='material-icons manager-icons'>attach_money</i><input
        className={'item-input ' + (this.state.priceEdited ? 'edited' : null)}
        name='price'
        type='text'
        placeholder='Price.'
        defaultValue={price}
        onChange={(e) => { this.inputChange(e); }}/>
        </div>,
      description: <div className='item-input-div item-description'>
        <i className='material-icons manager-icons'>format_align_justify</i>
        <textarea className={'item-input ' + (this.state.descriptionEdited ? 'edited' : null)}
        name='description'
        type='text'
        placeholder='Description about food item'
        defaultValue={description}
        maxLength='255'
        rows='1'
        onChange={(e) => { this.inputChange(e); }}
      />
      </div>,
      prepTime: <div className='item-input-div prep'>
        <i className='material-icons manager-icons'>timer</i><input
        className={'item-input ' + (this.state.prepTimeEdited ? 'edited' : null)}
        name='prepTime'
        type='text'
        placeholder='Estimated item prep time (in minutes).'
        defaultValue={prepTime}
        onChange={(e) => { this.inputChange(e); }}/>
        </div>,
      status: <div>
        <label className='switch'>
          <input type='checkbox' checked={status === 'published'} onChange={this.toggleSlider}/>
          <span className='slider round'></span>
        </label>
        {
          status === 'published'
          ? <div className='status-published'>Published</div>
          : <div className='status-draft'>Draft</div>
        }
        </div>,
      saveChanges:
        <button disabled={!this.state.hasChanged}
        onClick={this.updateItem}
        className="change-button save-changes-button">Save Changes</button>,
      deleteItem:
        <button className="change-button delete-item-button"
          onClick={this.deleteItem}><span>Delete Item  </span> 
          <i className='material-icons delete'>delete_forever</i>
        </button>
    };
    return (
      <div>
        {this.state.data.status !== 'archived'
        ? <div className='form-group menu-manager-item'>
          <div className='item-header'>
            {render.status}
            {img}
          </div>
          {render.name}
          {render.description}
          {render.price}
          {render.prepTime}
          <div className='item-specs'>
            {render.nutriFacts}
          </div>
          <div className="two-buttons">
            {render.saveChanges}
            <div className="divider"/>
            {render.deleteItem}
          </div>
        </div>
        : <div></div>
        }
      </div>
    );
  }
};

MenuItem.propTypes = {
};

export default MenuItem;
