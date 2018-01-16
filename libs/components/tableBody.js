import React from 'react';
let lodash = require('lodash');

export default class TableBody extends React.Component {
  constructor(props) {
    super(props);
    this.onRowHandler = this.onRowHandler.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      data: this.props.data,
      isRowSelection: this.props.isRowSelection,
      selectedRow: null
    };
    this.styles = {
      backgroundColor: 'hsl(204, 86%, 53%)',
      color: 'hsl(0, 0%, 96%)'
    };
  }
  
  componentWillReceiveProps(newProps, oldProps) {
    this.setState({data: newProps.data});
  }

  reset() {
    lodash.forEach(this.state.data, (item) => {
      if(item.selectedRow) {
        delete item.selectedRow;
      }
    });
  }
  onRowHandler(ev, item) {
    if(!this.props.isRowSelection) {
      return;
    }
    ev.persist();
    if(item.selectedRow) {
      this.reset();  
    }else {
      this.reset();
      item.selectedRow = true
      this.props.onRowSelect(item);
    }
    
    this.setState({data: this.props.data});
    
  }
  render() {
    const datas = this.state.data;
    if(datas.length === 0) {return (<tr><td>No Data Found!</td></tr>)}
    let keys = Object.keys(datas[0]);
    if(keys.indexOf('selectedRow') !== -1) {
      keys = keys.splice(0, keys.indexOf('selectedRow'));
    }
    let element = datas.map((item, index) => {
      return(
        <tr key={index} onClick={(evt) => this.onRowHandler(evt, item)}
            className={this.state.data[index].selectedRow ? 'is-selected' : null}>
         {keys.map((key, i) => {
           const td = (
           <td key={key + i}>{item[key]}</td>);
           return td; 
         })}
        </tr>
      );
    }); 
    return element;
  }
}