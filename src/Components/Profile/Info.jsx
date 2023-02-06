import React, { useRef } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';

import EditModal from './EditModal';
import { useEffect } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default function ProfilePage() {

  const user = useAuthUser();
  const [userInfo , setUserInfo] = useState([]);
  const [render , setRender] = useState(true);
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const inputRefP = useRef(null);
  
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user()){
      navigate('/login');
    }
  })

  async function getUserInfo(id) {
    let res =await axios.get(`http://127.0.0.1:8000/api/getUser/${id}`);
    const user = res.data[0];
    console.log(user);
    setUserInfo(user);
    setImgUrl(user.image)
  }

  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
        return;
    }
  
    // 👇️ reset file input
    event.target.value = null;
  
    const storageRef = ref(storage, `files/${fileObj.name}`);
    const uploadTask = uploadBytesResumable(storageRef, fileObj);
  
    uploadTask.on("state_changed",
        (snapshot) => {
            const progress =
                Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgresspercent(progress);
            console.log(progress);
  
        },
        (error) => {
            alert(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImgUrl(downloadURL)
                // updateUserImg(downloadURL)
                // console.log("URL");
                console.log(downloadURL);
                var data = new FormData();
                data.append('image', downloadURL);

                var config = {
                  method: 'post',
                  url: `http://127.0.0.1:8000/api/updateImage/${user().user.id}`,
                  data : data
                };

                axios(config)
                .then(function (response) {
                  console.log(response.data);
                })
                .catch(function (error) {
                  console.log(error);
                });
                //TODO: save url to database
            });
        }
    );
  }

  useEffect(()=>{
    getUserInfo(user().user.id)
  },[render])

  return (
    <section>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <h1 className='text-primary text-center mb-3'>Profile</h1>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={imgUrl}
                  alt="avatar"
                  className="rounded-circle mx-auto"
                  style={{ width: '150px' }}
                  fluid />
                <div className="d-flex justify-content-center my-3">
                  {/* <MDBBtn>Edit Profile</MDBBtn> */}
                  <EditModal user={userInfo} setRender={setRender}/>
                  <div className='p-2'></div>
                  <Button variant="primary" onClick={()=>inputRefP.current.click()}>
                    Edit Image
                  </Button>
                  <input type="file" className="form-control" id="image" placeholder="Images" ref={inputRefP} multiple hidden onChange={handleFileChange}/>
                </div>
              </MDBCardBody>
            </MDBCard>

          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userInfo.first_name + " " + userInfo.last_name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userInfo.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userInfo.phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                {/* <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                  </MDBCol>
                </MDBRow> */}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}