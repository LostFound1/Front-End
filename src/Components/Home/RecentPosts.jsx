import React from "react";
import { Link } from "react-router-dom";
import PostCard from "../Posts/PostCard";

const RecentPosts = () => {
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
          <PostCard img={"header.jpg"} />
          <PostCard img={"property-2.jpg"} />
          <PostCard img={"carousel-1.jpg"} />
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
