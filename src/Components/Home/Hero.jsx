/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import $ from 'jquery'

const Hero = () => {

    useEffect(()=>{
        (function ($) {
    
        $(".header-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            items: 1,
            dots: true,
            loop: true,
            nav : true,
            navText : [
                '<i class="bi bi-chevron-left"></i>',
                '<i class="bi bi-chevron-right"></i>'
            ]
        });
    })(jQuery);

    },[])


  return (
    <>
    {/* <!-- Header Start --> */}
    <div className="container-fluid header bg-white p-0">
  <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
    <div className="col-md-6 p-5 mt-lg-5">
      <h1 className="display-5 animated fadeIn mb-4">Have you 
        <span className="text-primary"> Lost or Found </span> something?</h1>
      <p className="animated fadeIn mb-4 pb-2">You are in the best place to post about this</p>
      <a href className="btn btn-primary py-3 px-5 me-3 animated fadeIn">Get Started</a>
    </div>
    <div className="col-md-6 animated fadeIn">
      <div className="owl-carousel header-carousel">
        <div className="owl-carousel-item">
          <img className="img-fluid" src="img/carousel-1.jpg" alt="" style={{height: '500px'}} />
        </div>
        <div className="owl-carousel-item">
          <img className="img-fluid" src="img/carousel-2.jpg" alt="" style={{height: '500px'}} />
        </div>
      </div>
    </div>
  </div>
</div>

        {/* <!-- Header End --> */}
    </>
  )
}

export default Hero