import React from 'react'

const Hero = () => {
  return (
    <div className="container-fluid header bg-white p-0">
  <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
    <div className="col-md-6 p-5 mt-lg-5">
      <h1 className="display-5 animated fadeIn mb-4">Contact Us</h1> 
      <nav aria-label="breadcrumb animated fadeIn">
        <ol className="breadcrumb text-uppercase">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Pages</a></li>
          <li className="breadcrumb-item text-body active" aria-current="page">Contact</li>
        </ol>
      </nav>
    </div>
    <div className="col-md-6 animated fadeIn">
      <img className="img-fluid" src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
    </div>
  </div>
</div>

  )
}

export default Hero