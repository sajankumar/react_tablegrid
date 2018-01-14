# table grid react library. 
  A simple configurable table grid react library along with sorting, filtering/search, paginated and row selection functionality enabled.

# Installing
  ```npm install table_grid_react```

# usage
  ```//define your config objects
    this.config = {
      data: [{name: 'test', 'age': 30, 'email': 'test@123.com', 'country': 'india'},{name: 'test2', 'age': 10, 'email': 'ab@123.com', 'country': 'russia'}],
      isSorting: true, //enable or disable sorting
      isRowSelection: false, //enable or disable row selection
      isSearch: true, //enable or disable search
      filterBy: 'name', // define a key for searc e.g 'name/age/email' etc.
      onRowSelect: (item) => { console.log('selected row data', item); } // this will invoke only if you enable isRowSelection = true.
    };
 ```
 ```render(){
        return(
        //pass it to the component
        <div className="container">
          <TableGrid tableConfig={this.config}/>
        </div>
      );
    }
 ```
# Todo
    *server side pagination
    *designing table
    *drag and drop re-order

# Contribution
  I am welcoming everyone whosoever interested to build this simple tableGrid into super tableGrid. Please fork this repo and implement your changes, submit pull request.

# Development
  ```sudo npm install -g create-react-app newApp```
  copy the libs folder from this repo and make your changes to and push it. 

# License
  ISC



