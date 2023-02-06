import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useAuthUser } from 'react-auth-kit';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddPostForm = () => {

  const typePlaces =['Restaurant','Hotel','Transport','College','Museum','Gardens','Airport'];

  const user = useAuthUser();
  const navigate = useNavigate();
  const [categories , setCategories] = useState([]);

  useEffect(()=>{
    if(!user()){
      navigate('/login');
    }
    window.scrollTo(0, 0);
    getCategories();
  },[]);

  // console.log(user());

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const inputRefP = useRef(null);

   async function getCategories() {
    let res =await axios.get('http://127.0.0.1:8000/api/categories');
    let categories = res.data;
    console.log(res.data);
    setCategories(categories);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const postData = {
      type: data.get('type'),
      title: data.get('title'),
      desc: data.get('desc'),
      location: data.get('location'),
      city: data.get('city'),
      type_place: data.get('type_place'),
      category_id: data.get('category_id'),
      user_id: user().user.id,
      image: imgUrl,
    }

    var config = {
      method: 'post',
      url: 'http://127.0.0.1:8000/api/addPost',
      headers: { 
        'Authorization': `Bearer ${user().token}`, 
      },
      data : postData
    };
    
    axios(config).then(res => {
      Swal.fire({
        icon: 'success',
        title: 'Succussfully Added Item',
        text: 'The Page will redirect to posts page after 5 seconds',
        footer: '<a href="">Why do I have this issue?</a>'
      })

      setTimeout(() => {
        navigate('/posts');
      }, 5000);
      
    }).catch(res => {
      console.log(res.response.data);
    })
  };

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
                console.log("URL");
                console.log(downloadURL);
                //TODO: save url to database
            });
        }
    );
  }

  return (
    <div className='row g-4 mt-5'>
      <div className="col-md-6 offset-md-3">
        <div className="panel-heading text-center">
            <h1>Post Item</h1>
        </div>
        <div className="wow fadeInUp" data-wow-delay="0.5s">
        <form id="login-form" onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <select class="form-select form-select-lg py-3 mb-3" aria-label=".form-select-lg example" name='type'>
                        <option disabled selected>Choose whether you lost or found the item</option>
                        <option value='Lost'>I'm Lost This Item</option>
                        <option value='Found'>I'm Found This Item</option>
                </select>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <input type="text" className="form-control" id="title" placeholder="Title" name='title'/>
                  <label htmlFor="title">Title</label>
                </div>
              </div>
              <div className="col-12">
                <select class="form-select py-3" aria-label=".form-select-lg example" name='category_id'>
                        <option disabled selected>Choose Category of Item</option>
                        {categories?.map(category => <option value={category.id}>{category.name}</option>)}
                        
                </select>
              </div>
              <div className="col-12">
                <select class="form-select py-3" aria-label=".form-select-lg example" name='type_place'>
                        <option disabled selected>Choose Kind of place</option>
                        {typePlaces.map(typeplace=><option value={typeplace}>{typeplace}</option>)}
                </select>
              </div>
              <div className="col-md-4">
                <select class="form-select py-3" aria-label=".form-select-lg example" name='city'>
                        <option disabled selected>Choose City</option>
                        <option value='Amman'>Amman</option>
                        <option value='Zarqa'>Zarqa</option>
                        <option value='Irbid'>Irbid</option>
                </select>
              </div>
              <div className="col-md-8">
                <div className="form-floating">
                  <input type="text" className="form-control" id="location" placeholder="location" name='location'/>
                  <label htmlFor="location">Location</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <textarea className="form-control" placeholder="Leave a message here" id="desc" style={{height: '150px'}} defaultValue={""} name='desc'/>
                  <label htmlFor="desc">Descrption</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <input type="file" className="form-control" id="image" placeholder="Images" multiple onChange={handleFileChange}/>
                  <label htmlFor="image">Upload Image For Item</label>
                </div>
              </div>
              <div className="col-12">
                <button className="btn btn-primary w-100 py-3 " type="submit">Post</button>
              </div>
            </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default AddPostForm