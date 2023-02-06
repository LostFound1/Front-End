import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuthUser } from 'react-auth-kit';
import { Link } from 'react-router-dom'
import PostCard from '../Posts/PostCard'

const Posts = () => {

  const [posts , setPosts] = useState([]);
  const user = useAuthUser();

  useEffect(()=>{
    getAllPosts()
  },[])

  async function getAllPosts() {
    let res =await axios.get('http://127.0.0.1:8000/api/posts');
    let allPosts = res.data.data;
    res =await axios.get('http://127.0.0.1:8000/api/getAllUsers');
    let users = res.data;
    res =await axios.get('http://127.0.0.1:8000/api/categories');
    let categories = res.data;
    let newPosts = updatePosts(allPosts,users,categories);
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
    newPosts = newPosts.filter(post=>post.user_id==user().user.id);
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
          <h1 className="mb-3">Posts</h1>
        </div>
        <div className="row g-4 justify-content-evenly">
          {posts?.map(post=> <PostCard post={post} />)}
          <div
            className="col-12 text-center wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <Link className="btn btn-primary py-3 px-5" to='/posts'>
              Browse All Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Posts