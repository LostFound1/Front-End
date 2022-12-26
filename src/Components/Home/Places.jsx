import React from 'react'

const Places = () => {
  return (
  <div className="container-xxl py-5">
   <div className="container">
    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: '600px'}}>
      <h1 className="mb-3">What kind of place would you like to search?</h1>
      <p>Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
    </div>
    <div className="row g-4 justify-content-evenly places">
      <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
        <a className="cat-item d-block bg-light text-center rounded p-3" href>
          <div className="rounded p-4">
            <div className="icon mb-3">
              <img className="img-fluid" src="img/hotel.png" alt="Icon" />
            </div>
            <h6>Hotel</h6>
            </div>
        </a>
      </div>
      <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
        <a className="cat-item d-block bg-light text-center rounded p-3" href>
          <div className="rounded p-4">
            <div className="icon mb-3">
              <img className="img-fluid" src="img/restaurant.png" alt="Icon" />
            </div>
            <h6>Restaurant</h6>
            </div>
        </a>
      </div>
      <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
        <a className="cat-item d-block bg-light text-center rounded p-3" href>
          <div className="rounded p-4">
            <div className="icon mb-3">
              <img className="img-fluid" src="img/public-transport.png" alt="Icon" />
            </div>
            <h6>Public-Transport</h6>
            </div>
        </a>
      </div>
      <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
        <a className="cat-item d-block bg-light text-center rounded p-3" href>
          <div className="rounded p-4">
            <div className="icon mb-3">
              <img className="img-fluid" src="img/airport.png" alt="Icon" />
            </div>
            <h6>Airport</h6>
            </div>
        </a>
      </div>
      <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
        <a className="cat-item d-block bg-light text-center rounded p-3" href>
          <div className="rounded p-4">
            <div className="icon mb-3">
              <img className="img-fluid" src="img/garden.png" alt="Icon" />
            </div>
            <h6>Gardens</h6>
            </div>
        </a>
      </div>
      <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
        <a className="cat-item d-block bg-light text-center rounded p-3" href>
          <div className="rounded p-4">
            <div className="icon mb-3">
              <img className="img-fluid" src="img/museum.png" alt="Icon" />
            </div>
            <h6>Museum</h6>
            </div>
        </a>
      </div>
      <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
        <a className="cat-item d-block bg-light text-center rounded p-3" href>
          <div className="rounded p-4">
            <div className="icon mb-3">
              <img className="img-fluid" src="img/college.png" alt="Icon" />
            </div>
            <h6>College</h6>
            </div>
        </a>
      </div>
    </div>
  </div>
</div>

  )
}

export default Places