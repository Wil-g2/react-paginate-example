import React, { useEffect, useState } from 'react';
import './App.css';
import ReactPaginate from 'react-paginate';
import Pagination from 'rc-pagination';
import api from './services/api'; 

function App() {
  
  const [products, setProducts] = useState([]);
  
  async function loadData() {
    const response = await api.get('products?_page=1&_limit=5');
    setProducts(response.data);
  }

  useEffect(() => {
    loadData();
  }, []); 

  const handlePageClick = async (data) => { 
    const response = await api.get(`products?_page=${data.selected+1}&_limit=5`);
    setProducts(response.data);
  }

  return (
    <div className="App">
      {/* <Pagination className="ant-pagination" defaultCurrent={3} total={450} /> */}
      <div>
        { products && products.map( product => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
      <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={5}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          initialPage={0}
          disabledClassName={'disabled'}
        />
    </div>
  );
}

/* 
https://www.npmjs.com/package/rc-pagination
https://www.npmjs.com/package/react-paginate

*/ 

export default App;
