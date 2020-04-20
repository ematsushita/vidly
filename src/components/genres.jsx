import React, { Component } from 'react';

class Genres extends Component {

  render() { 
    const { items, textProperty, valueProperty, onItemSelect, selectedItem } = this.props;
    return ( 
    <ul className="list-group">
      { items.map(item => (
         <li key={item[valueProperty]} onClick={() => onItemSelect(item)} className={selectedItem === item ? "list-group-item active" : "list-group-item"}>{item[textProperty]}</li>
      ))}
    </ul>
     );
  }
}

Genres.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
}
 
export default Genres;