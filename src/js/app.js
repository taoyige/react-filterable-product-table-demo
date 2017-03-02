(function(exports, document, React, ReactDOM) {
  'use strict';

  var data = [
    { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
    { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
    { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
    { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
    { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
    { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },
    { category: "Courses", price: "$299.49", stocked: true, name: "Angular" },
    { category: "Courses", price: "$145.00", stocked: false, name: "Vue" },
    { category: "Courses", price: "$544.31", stocked: false, name: "React" }
  ];

  /**
   * FilterableProductTable 商品过滤入口
   */
  var FilterableProductTable = React.createClass({
    getInitialState: function () {
      return {
        // 过滤文本
        filterText: '',
        // 只显示Stock
        inStockOnly: false,
      };
    },
    // 处理用户输入
    handleUserInput: function (filterText, inStockOnly) {
      this.setState({
        filterText: filterText,
        inStockOnly: inStockOnly,
      })
    },
    render: function() {
      return (
        <div id="FilterableProductTable" className="col-md-4 col-md-offset-4">
          <h2 className="text-center">商品过滤</h2>
          <SearchBar handleUserInput={this.handleUserInput}/>
          <ProductTable filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} data={this.props.data}/>
        </div>
      )
    }
  })

  /**
   * SearchBar 商品过滤入口
   */
  var SearchBar = React.createClass({
    handleChange: function () {
      this.props.handleUserInput(
        this.refs.filterTextInput.value,
        this.refs.inStockOnlyInput.checked,
      )
    },
    render: function() {
      return (
        <div id="SearchBar">
          <form className="form-horizontal">
            <div className="form-group">
              <label htmlFor="inputSearch" className="col-sm-2 control-label">Search</label>
              <div className="col-sm-10">
                <input onChange={this.handleChange} ref="filterTextInput" type="Search" className="form-control" id="inputSearch" placeholder="Search"></input>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <div className="checkbox">
                  <label>
                    <input onChange={this.handleChange} ref="inStockOnlyInput" type="checkbox"></input> 显示待采购的
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      )
    }
  })

  /**
   * ProductTable 商品过滤入口
   */
  var ProductTable = React.createClass({
    render: function() {
      // 除去数组重复值
      function unique(arr){
        // 遍历arr，把元素分别放入tmp数组(不存在才放)
        var tmp = new Array();
        for(var i in arr){
          //该元素在tmp内部不存在才允许追加
          if(tmp.indexOf(arr[i])==-1){
          tmp.push(arr[i]);
          }
        }
        return tmp;
      }
      var filterText = this.props.filterText;
      var inStockOnly = this.props.inStockOnly;
      var data = this.props.data;
      var categorys = [];
      for(var i=0; i<data.length; i++){
        categorys.push(data[i].category);        
      }
      categorys = unique(categorys);

      return (
        <div id="ProductTable">
          {
            categorys.map(function (category, index) {
              return (
                <div key={index}>
                  <h3>{category}</h3>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data.map(function (item, index) {
                          if(category === item.category && item.name.toUpperCase().match(filterText.toUpperCase())){
                            if(!inStockOnly){
                              return (
                                <tr className={item.stocked ? 'stocked' : ''} key={index}>
                                  <td>{item.name}</td>
                                  <td>{item.price}</td>
                                </tr>
                              )
                            }else if(item.stocked){
                              return (
                                <tr className='stocked' key={index}>
                                  <td>{item.name}</td>
                                  <td>{item.price}</td>
                                </tr>
                              )
                            }
                          }
                        })
                      }
                    </tbody>
                  </table>
                </div>
              )
            })
          }
        </div>
      )
    }
  })


  /**
   * 渲染
   */
  ReactDOM.render(
    <FilterableProductTable data={data}/>,
    document.getElementById('example')
  )

})(window, document, React, ReactDOM)
