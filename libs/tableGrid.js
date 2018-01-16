import React from 'react';
import TableHeader from './components/tableHeader';
import TableBody from './components/tableBody';
import TableFooter from './components/tableFooter';
import TableFilter from './components/tableFilter';
import '../node_modules/bulma/css/bulma.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import './tableGrid.css';
var lodash = require('lodash');
export default class TableGrid extends React.Component {
  constructor(props) {
    super(props);
    this.tableConfig = Object.assign({
      isSorting: false,
      data: [],
      isRowSelection: false,
      filterBy: ''
    }, this.props.tableConfig);
    this.update = this.update.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      showTable: this.tableConfig.data.length === 0 ? false : true,
      data: this.tableConfig.data
    }
    this.sortType = 'asc';
    this.originalData = lodash.clone(this.props.tableConfig.data);
    if(this.tableConfig.isRowSelection && !this.tableConfig.onRowSelect) {
      throw new Error('Row Selection is enabled, It is required a callback function.');
    }
  }

  showTableMsg() {
    return <span>Nothing to display.</span>;
  }

  sortHandler(evt, index) {
    let key = Object.keys(this.state.data[0])[index];
    
    let sortObj = null;
    if(this.sortType === 'asc') {
       sortObj = lodash.sortBy(this.tableConfig.data, (a) => {
        if(typeof a[key] === 'number') {
          return a[key];
        }else {
          return a[key].charCodeAt();
        }
      });
      this.sortType = 'dsc';
    } else {
      sortObj = lodash.sortBy(this.tableConfig.data, (a) => {
        if(typeof a[key] === 'number') {
          return a[key] * -1;
        }else {
          return a[key].charCodeAt() * -1;
        }
      });
      this.sortType = 'asc';
    }
    this.setState({data: sortObj});
  }
  showTableHeader() {
    return (<TableHeader headers={Object.keys(this.state.data[0] || [])}
                         isSorting={this.tableConfig.isSorting}
                         onSortHandler={this.sortHandler.bind(this)}
       />);
  }

  showTableBody() {
    return (<TableBody data={this.state.data}
                       isRowSelection={this.tableConfig.isRowSelection}
                       onRowSelect={this.tableConfig.onRowSelect}/>);
  }

  showTableFooter() {
    return <TableFooter data={this.state.data} updateData={this.update} recordPerPage={5}/>
  }

  update(data) {
    this.tableConfig.data = data;
    this.setState({data: this.tableConfig.data});
  }

  onSearch(evt) {
    const filterBy = this.tableConfig.filterBy;
    let filtered = [];
    if (!evt.target.value) {
      this.tableConfig.data = this.originalData;
      this.setState({data: this.tableConfig.data});
      filtered = []
    }else {
      filtered = lodash.filter(this.state.data, (item) => {
        return item[filterBy].toLowerCase().includes(evt.target.value.toLowerCase());
      });
      if(filtered) {
        this.tableConfig.data = filtered;
        this.setState({data: this.tableConfig.data});
      }
    }
  }

  render() {
    return (
      <section className="tableContainer">
        {!this.state.showTable ? this.showTableMsg() : null}
        <TableFilter changeEvent={this.onSearch} isSearch={this.tableConfig.isSearch} />
        <table className="table is-striped is-hoverable is-fullwidth">
          <thead>
            {this.state.showTable ? this.showTableHeader(): null}
          </thead>  
          <tbody>
              {this.showTableBody()}
          </tbody>
        </table>
        <div className="footerContainer">
          {this.state.data.length > 0 ? this.showTableFooter(): null}
        </div>
      </section>
    )
  }
}