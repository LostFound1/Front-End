import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../Posts/PostCard";

const RecentPosts = () => {

  const [posts , setPosts] = useState([]);

  useEffect(()=>{
    getRecentPosts()
  },[])

  async function getRecentPosts() {
    let res =await axios.get('http://127.0.0.1:8000/api/posts');
    let posts = res.data.data.slice(0,3);
    res =await axios.get('http://127.0.0.1:8000/api/getAllUsers');
    let users = res.data;
    res =await axios.get('http://127.0.0.1:8000/api/categories');
    let categories = res.data;
    let newPosts = updatePosts(posts,users,categories);
    setPosts(newPosts);
  }

  function updatePosts(posts,users,categories) {
    let newPosts = posts.map((post)=>{
      let user = users.filter(user=>user.id==post.user_id)
      let category = categories.filter(category=>category.id==post.category_id)
      user = user[0];
      category = category[0].name;
      return {...post , user , category}
    })
    return newPosts;
  }

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div
          className="text-center mx-auto mb-5 wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ maxWidth: "600px" }}
        >
          <h1 className="mb-3">Recent Posts</h1>
        </div>
        <div className="row g-4 justify-content-evenly">
          {console.log(posts)}
          {posts?.map(post=>{
            return(
            <PostCard post={post} />
            )
          })}
          {/* <PostCard img={"header.jpg"} />
          <PostCard img={"property-2.jpg"} />
          <PostCard img={"carousel-1.jpg"} /> */}
          <div
            className="col-12 text-center wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <Link className="btn btn-primary py-3 px-5" to='/posts'>
              Browse More Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentPosts;
