import React from 'react'
import loaderImg from '../../assets/images/loader.gif';

function Loader() {
  return (
    <div>
      <div className="loader">
        <div className="loader-text">
          <img src={loaderImg} alt="loader" />
            <p>Data is loading...</p>
        </div>
    </div>
    </div>
  )
}
export default Loader
