import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

const PostCard = ({post}) => {

  const [modalShow, setModalShow] = useState(false);
  const [user , setUser] = useState({});
  const [category , setCategory] = useState("");

  // console.log(post);

  return (
    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
      <MyVerticallyCenteredModal
        post={post}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
            <div className="property-item rounded overflow-hidden">
              <div className="position-relative overflow-hidden">
                <img className="img-fluid w-100" src={post.image} alt="" style={{height : '350px' }}/>
                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">{post.type} Item</div>
                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{post.category}</div>
              </div>
              <div className="p-4 pb-0">
                <a className="d-block h5 mb-2" onClick={() => setModalShow(true)} href>{post.title.slice(0,30)}</a>
                <p><i className="fa fa-map-marker-alt text-primary me-2" />{post.city} , {post.location}</p>
                
              </div>
              <div className="d-flex border-top">
                <span className="flex-fill text-center border-end py-2 w-50 m-auto"><i className="fa fa-time text-primary me-2" />{post.time}</span>
                <span className="flex-fill text-center border-end py-2 w-50 d-flex justify-content-center align-items-center">
                    <img className='img-fluid rounded-circle mx-3' src={post.user.image} alt='' style={{height: '40px' , width: '40px'}}></img>
                    {/* <p className='mx-3 d-flex align-items-center'>Osama Dasooky</p> */}
                    {post.user.first_name.slice(0,20)}
                </span>
              </div>
            </div>
    </div>
  )
}


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
          Item Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="property-item rounded overflow-hidden">
              <div className="position-relative overflow-hidden">
                {/* <img className="img-fluid w-100" src={props.post.image} alt="" style={{height : '350px' }}/> */}
                {/* <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">{props.post.type} Item</div> */}
                {/* <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{props.post.category}</div> */}
              </div>
              <div className="p-4 pb-0">
                <a className="d-block h5 mb-2" href>{props.post.title}</a>
                <p><h4>Description : </h4>
                {props.post.desc}
                </p>
                <p><i className="fa fa-map-marker-alt text-primary me-2" />{props.post.city} , {props.post.location}</p>
              </div>
              <div className="d-flex border-top">
                <span className="flex-fill text-center border-end py-2 w-50 m-auto"><i className="fa fa-time text-primary me-2" />{props.post.time}</span>
                <span className="flex-fill text-center border-end py-2 w-50 d-flex justify-content-center align-items-center">
                    <img className='img-fluid rounded-circle mx-3' src={props.post.user.image} alt='' style={{height: '40px' , width: '40px'}}></img>
                    {/* <p className='mx-3 d-flex align-items-center'>Osama Dasooky</p> */}
                    {props.post.user.first_name.slice(0,17)}
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

export default PostCard