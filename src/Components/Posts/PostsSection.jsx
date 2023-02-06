import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PostCard from './PostCard';

const PostsSection = ({render , setRender}) => {

  const [posts , setPosts] = useState([]);
  const [allPosts , setAllPosts] = useState([]);
  const [users , setUsers] = useState([]);
  const [categories , setCategories] = useState([]);
  const [maxPosts , setMaxPosts] = useState(15);
  const [isMaxPosts , setIsMaxPosts] = useState(false);

  // const params = useParams("cat");
  const search = useLocation().search;
  const cat = new URLSearchParams(search).get('cat');
  const type = new URLSearchParams(search).get('type');
  const city = new URLSearchParams(search).get('city');

  useEffect(()=>{
    getAllPosts()
  },[render])

  function handleFilter(posts) {
    let newPosts = posts.map(post=>post);
    if(!cat) return newPosts;
    if(cat!="all") {
      newPosts = newPosts.filter(post=>post.category_id == cat);
    } 
    if(type!="all"){
      newPosts = newPosts.filter(post=>post.type_place == type);
    }
    if(city!="all"){
      newPosts = newPosts.filter(post=>post.city == city);
    }
    return newPosts;
  }

  async function getAllPosts() {
    let res =await axios.get('http://127.0.0.1:8000/api/posts');
    let allPosts = res.data.data;
    res =await axios.get('http://127.0.0.1:8000/api/getAllUsers');
    let users = res.data;
    res =await axios.get('http://127.0.0.1:8000/api/categories');
    let categories = res.data;
    let newPosts = updatePosts(allPosts,users,categories);
    setAllPosts(newPosts);
    newPosts = handleFilter(newPosts);
    setPosts(newPosts);
    setUsers(users);
    setCategories(categories);
  }

  // async function getAllUsers() {
  //   let res =await axios.get('http://127.0.0.1:8000/api/getAllUsers');
  //   let users = res.data;
  //   // console.log(res.data);
  //   setUsers(users);
  // }

  // async function getCategories() {
  //   let res =await axios.get('http://127.0.0.1:8000/api/categories');
  //   let categories = res.data;
  //   console.log(res.data);
  //   setCategories(categories);
  // }

  function getLostItem() {
    let lostItems = allPosts.filter((post)=>{
      return post.type =="Lost";
    })
    setMaxPosts(15);
    setIsMaxPosts(false);
    setPosts(lostItems);
    // updatePosts()
  }

  function getFoundItem() {
    let foundItems = allPosts.filter((post)=>{
      return post.type =="Found";
    })
    setMaxPosts(15);
    setIsMaxPosts(false);
    setPosts(foundItems);
    // updatePosts()
  }

  function updatePosts(posts,users,categories) {
    // console.log(users , categories);
    let newPosts = posts.map((post)=>{
      let user = users.filter(user=>user.id==post.user_id)
      let category = categories.filter(category=>category.id==post.category_id)
      user = user[0];
      category = category[0].name;
      return {...post , user , category}
    })
    // console.log(newPosts);
    return newPosts;
  }

  function handleMaxPosts(){
    setMaxPosts(maxPosts + 15);
    if(posts.length < maxPosts) {
      setIsMaxPosts(true)
    }
  }

return (
<div className="container-xxl py-5">
  <div className="container">
    <div className="row g-0 gx-5 align-items-end">
      <div className="col-lg-6">
        <div className="text-start mx-auto mb-5 wow slideInLeft" data-wow-delay="0.1s">
          <h1 className="mb-3">Posts List</h1>
          <p>Here You can Browse All Posts of Items.</p>
        </div>
      </div>
      <div className="col-lg-6 text-start text-lg-end wow slideInRight" data-wow-delay="0.1s">
        <ul className="nav nav-pills d-inline-flex justify-content-end mb-5">
          <li className="nav-item me-2">
            <a className="btn btn-outline-primary active" data-bs-toggle="pill"  onClick={getAllPosts} href="#tab-1">All</a>
          </li>
          <li className="nav-item me-2">
            <a className="btn btn-outline-primary" data-bs-toggle="pill" onClick={getLostItem} href="#tab-2">Lost Item</a>
          </li>
          <li className="nav-item me-0">
            <a className="btn btn-outline-primary" data-bs-toggle="pill" onClick={getFoundItem} href="#tab-3">Found Item</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="tab-content">
      <div id="tab-1" className="tab-pane fade show p-0 active">
        <div className="row g-4">
          {posts.slice(0,maxPosts)?.map(post=> <PostCard post={post} />
          )}
          <div className="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
            
            {isMaxPosts ? <button className="btn btn-primary py-3 px-5" disabled>No More Posts</button> : 
            <a className="btn btn-primary py-3 px-5" onClick={handleMaxPosts}>Browse More Posts</a>}
          </div>
        </div>
      </div>
      {/* <div id="tab-2" className="tab-pane fade show p-0">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="property-item rounded overflow-hidden">
              <div className="position-relative overflow-hidden">
                <a href><img className="img-fluid" src="img/property-1.jpg" alt="" /></a>
                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Sell</div>
                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Appartment</div>
              </div>
              <div className="p-4 pb-0">
                <h5 className="text-primary mb-3">$12,888</h5>
                <a className="d-block h5 mb-2" href>Golden Urban House For Sell</a>
                <p><i className="fa fa-map-marker-alt text-primary me-2" />123 Street, New York, USA</p>
              </div>
              <div className="d-flex border-top">
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2" />1000 Sqft</small>
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2" />3 Bed</small>
                <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2" />2 Bath</small>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="property-item rounded overflow-hidden">
              <div className="position-relative overflow-hidden">
                <a href><img className="img-fluid" src="img/property-2.jpg" alt="" /></a>
                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Rent</div>
                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Villa</div>
              </div>
              <div className="p-4 pb-0">
                <h5 className="text-primary mb-3">$12,888</h5>
                <a className="d-block h5 mb-2" href>Golden Urban House For Sell</a>
                <p><i className="fa fa-map-marker-alt text-primary me-2" />123 Street, New York, USA</p>
              </div>
              <div className="d-flex border-top">
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2" />1000 Sqft</small>
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2" />3 Bed</small>
                <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2" />2 Bath</small>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="property-item rounded overflow-hidden">
              <div className="position-relative overflow-hidden">
                <a href><img className="img-fluid" src="img/property-3.jpg" alt="" /></a>
                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Sell</div>
                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Office</div>
              </div>
              <div className="p-4 pb-0">
                <h5 className="text-primary mb-3">$12,345</h5>
                <a className="d-block h5 mb-2" href>Golden Urban House For Sell</a>
                <p><i className="fa fa-map-marker-alt text-primary me-2" />123 Street, New York, USA</p>
              </div>
              <div className="d-flex border-top">
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2" />1000 Sqft</small>
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2" />3 Bed</small>
                <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2" />2 Bath</small>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="property-item rounded overflow-hidden">
              <div className="position-relative overflow-hidden">
                <a href><img className="img-fluid" src="img/property-4.jpg" alt="" /></a>
                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Rent</div>
                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Building</div>
              </div>
              <div className="p-4 pb-0">
                <h5 className="text-primary mb-3">$12,345</h5>
                <a className="d-block h5 mb-2" href>Golden Urban House For Sell</a>
                <p><i className="fa fa-map-marker-alt text-primary me-2" />123 Street, New York, USA</p>
              </div>
              <div className="d-flex border-top">
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2" />1000 Sqft</small>
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2" />3 Bed</small>
                <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2" />2 Bath</small>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="property-item rounded overflow-hidden">
              <div className="position-relative overflow-hidden">
                <a href><img className="img-fluid" src="img/property-5.jpg" alt="" /></a>
                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Sell</div>
                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Home</div>
              </div>
              <div className="p-4 pb-0">
                <h5 className="text-primary mb-3">$12,345</h5>
                <a className="d-block h5 mb-2" href>Golden Urban House For Sell</a>
                <p><i className="fa fa-map-marker-alt text-primary me-2" />123 Street, New York, USA</p>
              </div>
              <div className="d-flex border-top">
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2" />1000 Sqft</small>
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2" />3 Bed</small>
                <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2" />2 Bath</small>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="property-item rounded overflow-hidden">
              <div className="position-relative overflow-hidden">
                <a href><img className="img-fluid" src="img/property-6.jpg" alt="" /></a>
                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Rent</div>
                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Shop</div>
              </div>
              <div className="p-4 pb-0">
                <h5 className="text-primary mb-3">$12,345</h5>
                <a className="d-block h5 mb-2" href>Golden Urban House For Sell</a>
                <p><i className="fa fa-map-marker-alt text-primary me-2" />123 Street, New York, USA</p>
              </div>
              <div className="d-flex border-top">
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2" />1000 Sqft</small>
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2" />3 Bed</small>
                <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2" />2 Bath</small>
              </div>
            </div>
          </div>
          <div className="col-12 text-center">
            <a className="btn btn-primary py-3 px-5" href>Browse More Property</a>
          </div>
        </div>
      </div>
      <div id="tab-3" className="tab-pane fade show p-0">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="property-item rounded overflow-hidden">
              <div className="position-relative overflow-hidden">
                <a href><img className="img-fluid" src="img/property-1.jpg" alt="" /></a>
                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Sell</div>
                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Appartment</div>
              </div>
              <div className="p-4 pb-0">
                <h5 className="text-primary mb-3">$12,999</h5>
                <a className="d-block h5 mb-2" href>Golden Urban House For Sell</a>
                <p><i className="fa fa-map-marker-alt text-primary me-2" />123 Street, New York, USA</p>
              </div>
              <div className="d-flex border-top">
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2" />1000 Sqft</small>
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2" />3 Bed</small>
                <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2" />2 Bath</small>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="property-item rounded overflow-hidden">
              <div className="position-relative overflow-hidden">
                <a href><img className="img-fluid" src="img/property-2.jpg" alt="" /></a>
                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Rent</div>
                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Villa</div>
              </div>
              <div className="p-4 pb-0">
                <h5 className="text-primary mb-3">$12,999</h5>
                <a className="d-block h5 mb-2" href>Golden Urban House For Sell</a>
                <p><i className="fa fa-map-marker-alt text-primary me-2" />123 Street, New York, USA</p>
              </div>
              <div className="d-flex border-top">
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2" />1000 Sqft</small>
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2" />3 Bed</small>
                <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2" />2 Bath</small>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="property-item rounded overflow-hidden">
              <div className="position-relative overflow-hidden">
                <a href><img className="img-fluid" src="img/property-3.jpg" alt="" /></a>
                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Sell</div>
                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Office</div>
              </div>
              <div className="p-4 pb-0">
                <h5 className="text-primary mb-3">$12,345</h5>
                <a className="d-block h5 mb-2" href>Golden Urban House For Sell</a>
                <p><i className="fa fa-map-marker-alt text-primary me-2" />123 Street, New York, USA</p>
              </div>
              <div className="d-flex border-top">
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2" />1000 Sqft</small>
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2" />3 Bed</small>
                <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2" />2 Bath</small>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="property-item rounded overflow-hidden">
              <div className="position-relative overflow-hidden">
                <a href><img className="img-fluid" src="img/property-4.jpg" alt="" /></a>
                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Rent</div>
                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Building</div>
              </div>
              <div className="p-4 pb-0">
                <h5 className="text-primary mb-3">$12,345</h5>
                <a className="d-block h5 mb-2" href>Golden Urban House For Sell</a>
                <p><i className="fa fa-map-marker-alt text-primary me-2" />123 Street, New York, USA</p>
              </div>
              <div className="d-flex border-top">
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2" />1000 Sqft</small>
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2" />3 Bed</small>
                <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2" />2 Bath</small>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="property-item rounded overflow-hidden">
              <div className="position-relative overflow-hidden">
                <a href><img className="img-fluid" src="img/property-5.jpg" alt="" /></a>
                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Sell</div>
                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Home</div>
              </div>
              <div className="p-4 pb-0">
                <h5 className="text-primary mb-3">$12,345</h5>
                <a className="d-block h5 mb-2" href>Golden Urban House For Sell</a>
                <p><i className="fa fa-map-marker-alt text-primary me-2" />123 Street, New York, USA</p>
              </div>
              <div className="d-flex border-top">
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2" />1000 Sqft</small>
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2" />3 Bed</small>
                <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2" />2 Bath</small>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="property-item rounded overflow-hidden">
              <div className="position-relative overflow-hidden">
                <a href><img className="img-fluid" src="img/property-6.jpg" alt="" /></a>
                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Rent</div>
                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Shop</div>
              </div>
              <div className="p-4 pb-0">
                <h5 className="text-primary mb-3">$12,345</h5>
                <a className="d-block h5 mb-2" href>Golden Urban House For Sell</a>
                <p><i className="fa fa-map-marker-alt text-primary me-2" />123 Street, New York, USA</p>
              </div>
              <div className="d-flex border-top">
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2" />1000 Sqft</small>
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2" />3 Bed</small>
                <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2" />2 Bath</small>
              </div>
            </div>
          </div>
          <div className="col-12 text-center">
            <a className="btn btn-primary py-3 px-5" href>Browse More Property</a>
          </div>
        </div>
      </div> */}
    </div>
  </div>
</div>

  )
}

export default PostsSection