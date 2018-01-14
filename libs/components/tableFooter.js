import React from 'react';

export default class TableFooter extends React.Component {
  constructor(props) {
    super(props);
    this.config = Object.assign({
      currentPage: 1,
      recordPerPage: 3,
    }, this.props);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.updatePage = this.updatePage.bind(this);
    this.state = {
      pagesInfo: '',
      nextBtnState: false,
      prvBtnState: false
    };
  }

  componentDidMount() {
    this.updatePage(this.config.currentPage);
  }
  numberOfPages() {
    return Math.ceil(this.config.data.length / this.config.recordPerPage);
  }
  previous() {
    if(this.config.currentPage > 1) {
      this.config.currentPage--;
      this.updatePage(this.config.currentPage);
    }
  }

  next() {
    if(this.config.currentPage < this.numberOfPages()) {
      this.config.currentPage++;
      this.updatePage(this.config.currentPage);
    }
  }

  updatePage(page) {
    this.paginatedData = [];
    if(page < 1) {page = 1};
    if(page > this.numberOfPages()) {
       page = this.numberOfPages(); 
    }
    for(var i = (page-1) * this.config.recordPerPage; i < (page * this.config.recordPerPage) 
      && i < this.config.data.length; i++) {
      this.paginatedData.push(this.config.data[i]);
    }
    this.setState({pagesInfo: `Pages: ${page}/${this.numberOfPages()}`});
    if (page === 1) {
      this.setState({prvBtnState: true});
    } else {
      this.setState({prvBtnState: false});
    }

    if (page === this.numberOfPages()) {
      this.setState({nextBtnState: true});
    } else {
      this.setState({nextBtnState: false});
    }
    this.config.updateData(this.paginatedData);
  }
  render() {
    return(
    <div className="pagination">
      <div>
        <button onClick={this.next}
                disabled={this.state.nextBtnState}>Next</button>
      </div>
      <p>{this.state.pagesInfo}</p>
      <div>  
        <button onClick={this.previous}
                disabled={this.state.prvBtnState}>Previous</button>
      </div>  
    </div>
    )
  }
}