import React from 'react';
//const _ = require('lodash');

export default class TableHeader extends React.Component {
  constructor(props) {
    super(props);
    this.styles = {
      paddingLeft: '5px',
      cursor: 'pointer'
    };
    this.state = {
      headers: this.props.headers || []
    };
  }
  showSorting() {
    return (<i className="fa fa-sort" 
               style={this.styles}></i>);
  }
  render() {
    if(this.state.headers.indexOf('selectedRow') !== -1) {
      let keys = this.props.headers.splice(0, this.props.headers.indexOf('selectedRow'));
      this.setState({headers: keys}); 
    }
    const headers = this.state.headers;
    const sorting = this.props.isSorting ? this.showSorting() : null;
    const element = headers.map((value, index) => {  
      return headers.length !== 0 ? (<th className="column"
                  key={`headers_${index}`}
                  onClick={(evt) => this.props.onSortHandler(evt, index)}> {value}
                {sorting}
            </th>) : (<th className="column">No data found!</th>)
    });
    return <tr>{element}</tr>;
  }
}