import {  useState } from 'react';
import AllCardsList from './AllCardsList';
import './Cards.css';

function Cards() {
  const [display, setDisplay] = useState('grid');
  

  function handleDisplayclick(displayMode: string) {
    setDisplay(displayMode);
  }

  return (
    <>


      <div className='m-3'>
        <button className="btn btn-light mx-1"
          onClick={(e) => handleDisplayclick('grid')}
        >
          <i className="bi-grid-3x3-gap-fill"></i>
        </button>
        <button className="btn btn-light "
          onClick={(e) => handleDisplayclick('list')}
        >
          <i className="bi-list-ul"></i>

        </button>

        
        {/* <button className="btn btn-light "
          onClick={(e) => handleDisplayclick('list2')}
        >
          <i className="bi-list-ul"></i>

        </button> */}
      </div>
      <div className={`${display} row row-cols-1 row-cols-md-3 g-4 mt-4`}>

        {/* <AllCardsList /> */}

      </div>
    </>
  );
}

export default Cards;