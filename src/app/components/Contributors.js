import React, { useState } from 'react'
import Modal from 'react-modal';
Modal.setAppElement('#root');

function Contributors({ contributorsData }) {
  const [modalIsOpen, setmodalIsOpen] = useState(true);

  // Contributors modal open
  function closeModal() {
    setmodalIsOpen(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '700px',
      maxHeight: '435px'
    }
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Contributors Modal"
      >
        <div className="popup-header">
          <h4 className="popup-title">Contributors List</h4>
          <button className="close-btn" onClick={closeModal}><i className="fas fa-times"></i></button>
        </div>
        <div className="contributors-data">
          <table className="table table-bordered table-striped table-sm">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Type</th>
                <th>No. of Contributors</th>
                <th>Avatar</th>
              </tr>
            </thead>
            <tbody>
              {
                contributorsData.map((item, index) =>
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.login}</td>
                    <td>{item.type}</td>
                    <td>{item.contributions}</td>
                    <td><img width="40" src={item.avatar_url} alt={item.avatar_url} /></td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
        <div className="records-count">
          {contributorsData.length === 0 && <p>No records found</p>}
          {contributorsData.length > 0 && <p>Displaying {contributorsData.length} records.</p>}
        </div>
      </Modal>
    </div>
  )
}

export default Contributors
