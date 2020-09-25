import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { connect } from 'react-redux';
import * as actions from '../store/Favorite.action'
Modal.setAppElement('#root');

const Favorities = (props) => {
  const {masterData, myFavoritisList} = props;
  const [modalIsOpen, setmodalIsOpen] = useState(true);
  const [favoritiesData, setFavoritiesData] = useState([]);

  // Getting favorities data from masterdata
  useEffect(() => {
    let selectedFavId = myFavoritisList; 
    let filterdFavData = [];
    masterData.map(ele => selectedFavId.includes(ele.id) ? filterdFavData.push(ele) : filterdFavData)
    setFavoritiesData(filterdFavData);
  }, [myFavoritisList, masterData])

  // Favorities modal status changing
  function closeModal() {
    setmodalIsOpen(false);
    props.showHideFavModal(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '750px',
      maxHeight: '435px'
    }
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Favorities Modal"
      >
        <div className="popup-header">
          <h4 className="popup-title">Favorities List</h4>
          <button className="close-btn" onClick={closeModal}><i className="fas fa-times"></i></button>
        </div>
        <div className="favorities-data">
          <table className="table table-bordered table-striped table-sm">
            <thead>
              <tr>
                <th>S.No </th>
                <th>Name </th>
                <th>Full Name </th>
                <th>Repository Link </th>
              </tr>
            </thead>
            <tbody>
              {
                favoritiesData.map((item, index) =>
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.full_name}</td>
                    <td><a href={item.html_url} className="btn btn-sm custom-btn2" rel="noopener noreferrer" target="_blank">View Repository</a></td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
        <div className="records-count">
          {favoritiesData.length === 0 && <p>No records found</p>}
          {favoritiesData.length > 0 && <p>Displaying {favoritiesData.length} records.</p>}
        </div>
      </Modal>
    </div>
  )
}

// Getting modals status from redux state
const mapStateToProps=(state)=>{
  return{
    myFavoritisList: state.myFavoritisList,
    showFavoritiesModal:state.showFavoritiesModal
  }
}

// Changing modal status in redux state
const mapDispatchToProps = (dispatch) => {
  return {
    showHideFavModal: (isDone) => { dispatch(actions.showHideFavoriteModal(isDone)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorities)
