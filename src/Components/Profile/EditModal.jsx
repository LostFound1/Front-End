import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAuthUser } from 'react-auth-kit';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Example({user , setRender}) {
  const [show, setShow] = useState(false);
  const [email , setEmail] = useState(user.email);
  const [firstName , setFirstName] = useState(user.first_name);
  const [lastName , setLastName] = useState(user.last_name);
  const [phone , setPhone] = useState(user.phone);
  const [userInfo , setUserInfo] = useState({});
  const userAuth = useAuthUser();


  async function getUserInfo(id) {
    let res =await axios.get(`http://127.0.0.1:8000/api/getUser/${id}`);
    const user = res.data[0];
    console.log(user);
    setUserInfo(user);
    setEmail(user.email)
    setFirstName(user.first_name)
    setLastName(user.last_name)
    setPhone(user.phone)
  }

  useEffect(()=>{
    getUserInfo(userAuth().user.id)
  },[])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateInfo = () =>{
    handleClose();
    var data = new FormData();
    data.append('first_name', firstName);
    data.append('last_name', lastName);
    data.append('email', email);
    data.append('phone', phone);

    var config = {
      method: 'post',
      url: `http://127.0.0.1:8000/api/updateInfo/${userAuth().user.id}`,
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(response.data);
      setRender(false);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit Profile
      </Button>

      <Modal show={show} onHide={handleClose} className='mt-5' aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Smith"
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="+962 78 981 5611"
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateInfo}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;