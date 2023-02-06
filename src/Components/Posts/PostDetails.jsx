import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="property-item rounded overflow-hidden">
              <div className="position-relative overflow-hidden">
                {/* <img className="img-fluid w-100" src={props.post.image} alt="" style={{height : '350px' }}/> */}
                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">{props.post.type} Item</div>
                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{props.post.category}</div>
              </div>
              <div className="p-4 pb-0">
                <a className="d-block h5 mb-2" href>{props.post.title.slice(0,30)}</a>
                <p><i className="fa fa-map-marker-alt text-primary me-2" />{props.post.city} , {props.post.location}</p>
              </div>
              <div className="d-flex border-top">
                <span className="flex-fill text-center border-end py-2 w-50 m-auto"><i className="fa fa-time text-primary me-2" />{props.post.time}</span>
                <span className="flex-fill text-center border-end py-2 w-50 d-flex justify-content-center align-items-center">
                    <img className='img-fluid rounded-circle mx-3' src='img/call-to-action.jpg' alt='' style={{height: '40px' , width: '40px'}}></img>
                    {/* <p className='mx-3 d-flex align-items-center'>Osama Dasooky</p> */}
                    Osama Dasooky
                </span>
              </div>
            </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function App({post}) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <MyVerticallyCenteredModal
        post={post}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
