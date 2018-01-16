import React from 'react';
//const lodash = require('lodash');

export default class TableFilter extends React.Component {
  constructor(props) {
    super(props);
    if(!this.props.changeEvent) {
      throw new Error('Event Call back is requried!', this);
    }
    this.state = {
      isSearch: this.props.isSearch || false
    };
  }

  search() {
    return (
      <div className="field">
        <div className="control has-icons-left has-icons-right">
          <input type="text"
                  placeholder={this.props.placeholder || 'Search...'}
                  onChange={(evt) => {evt.persist(); this.props.changeEvent(evt)}}
                  className="input"/>
          <span className="icon is-small is-right">
            <i className="fa fa-search"></i>
          </span>
        </div>
      </div>
    );
  }

  render() {
    let element = this.state.isSearch ? this.search() : null;
    return element;
    
  }
}



