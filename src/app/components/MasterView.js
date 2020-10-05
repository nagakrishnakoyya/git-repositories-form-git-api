import React, { useState, useEffect } from 'react'
import { apiBaseUrl } from '../constants/constants'
import Contributors from './Contributors';
import Favorities from './Favorities';
import Loader from './Loader';
import { connect } from 'react-redux';
import * as actions from '../store/Favorite.action';

const MasterView = (props) => {
  const { showFavoritiesModal, showContributorModal } = props;
  const [masterData, setMasterData] = useState([]);
  const [contributorsData, setContributorsData] = useState([]);
  const [favoritiesList, setFavoritiesList] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  // Getting data from Github API
  useEffect(() => {
    setIsLoader(true);
    const getDataFromGithub = () => {
      const baseUrl = apiBaseUrl();
      const urlEndpoint = "repositories";
      fetch(`${baseUrl}/${urlEndpoint}`)
        .then(res => res.json())
        .then(res => {
          setMasterData(res);
          setIsLoader(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getDataFromGithub();

  }, [])

  // Getting particular repository contributors data from API
  const contributorsHandler = (url) => {
    props.showHideConModal(false);
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        setContributorsData(data);
        props.showHideConModal(true);
      })
      .catch(err => console.log(err))
  }

  // Adding/removing repositories to/from favoritieslist
  const favoritiesHandler = (id) => {
    let masterDataList = [...masterData];
    let favArr = [...favoritiesList];
    let itemIndex = masterDataList.findIndex(ele => ele.id === id);
    if (masterDataList[itemIndex].isFavorite) {
      masterDataList[itemIndex].isFavorite = false;
      let favIndex = favArr.indexOf(id);
      favArr.splice(favIndex, 1);
    } else {
      masterDataList[itemIndex].isFavorite = true;
      favArr.push(id);
    }
    setFavoritiesList([...favArr]);
    setMasterData(masterDataList);
  }

  // Favorities modal open and updating favoritiesList to state
  const openFavoriteModalHandler = () => {
    props.showHideFavModal(true);
    props.listOfFavorities(favoritiesList);
  }

  return (
    <div className="container-fluid mt-2">
      <div className="row header-section mb-3">
        <div className="col-lg-2">
          <div className="records">
            <b>Total records : {masterData.length}</b>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="title text-center">
            <h1>Master View Details</h1>
          </div>
        </div>

        <div className="col-lg-2">
          <div className="favorities text-right">
            <button className="btn custom-btn1" onClick={openFavoriteModalHandler}>Favorities List</button>
          </div>
        </div>
      </div>

      <div className="masterdata-table">
        <table className="table table-bordered table-striped table-sm">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Full Name</th>
              <th>Repositories Details</th>
              <th>Contributors Details </th>
              <th>Favorities</th>
            </tr>
          </thead>
          <tbody>
            {
              masterData.map((item, index) =>
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.full_name}</td>
                  <td><a href={item.html_url} className="btn btn-sm custom-btn2" rel="noopener noreferrer" target="_blank">View Repository</a></td>
                  <td><button className="btn btn-sm custom-btn1" onClick={() => contributorsHandler(item.contributors_url)}>View Contributors</button></td>
                  <td>
                    <span onClick={() => favoritiesHandler(item.id)} >
                      <i className={item.isFavorite ? "fas fa-heart red-color" : "fas fa-heart"}></i>
                    </span>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>

      </div>
      {showFavoritiesModal && <Favorities
        masterData={masterData} />}
      {showContributorModal && <Contributors contributorsData={contributorsData} />}
      {isLoader && <Loader />}

    </div>
  )

}

// Getting modals status from redux state
const mapStateToProps = (state) => {
  return {
    showFavoritiesModal: state.showFavoritiesModal,
    showContributorModal: state.showContributorModal
  }
}
// Storing favorities list and changing modals status in redux state
const mapDispatchToProps = (dispatch) => {
  return {
    listOfFavorities: (favoritiesList) => { dispatch(actions.listOfFavorities(favoritiesList)) },
    showHideFavModal: (isDone) => { dispatch(actions.showHideFavoriteModal(isDone)) },
    showHideConModal: (isDone) => { dispatch(actions.showHideContributorModal(isDone)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterView)
