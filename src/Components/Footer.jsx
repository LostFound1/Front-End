import React from 'react'
import $ from "jquery"

const Footer = () => {

     // Back to top button
     $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

  return (
    <>
     {/* <!-- Footer Start --> */}
 <div className="container-fluid bg-dark text-white-50 footer mt-5 wow fadeIn" data-wow-delay="0.1s">
  <div className="container pt-5 pb-2">
    <div className="row g-5">
      <div className="col-lg-4 col-md-6">
        <h5 className="text-white mb-4">Get In Touch</h5>
        <p className="mb-2"><i className="fa fa-map-marker-alt me-3" />Amman, Jordan</p>
        <p className="mb-2"><i className="fa fa-phone-alt me-3" />+962 771 678 900</p>
        <p className="mb-2"><i className="fa fa-envelope me-3" />info@lostfound.com</p>
        <div className="d-flex pt-2">
          <a className="btn btn-outline-light btn-social" href><i className="fab fa-twitter" /></a>
          <a className="btn btn-outline-light btn-social" href><i className="fab fa-facebook-f" /></a>
          <a className="btn btn-outline-light btn-social" href><i className="fab fa-youtube" /></a>
          <a className="btn btn-outline-light btn-social" href><i className="fab fa-linkedin-in" /></a>
        </div>
      </div>
      <div className="col-lg-4 col-md-6">
        <h5 className="text-white mb-4">Quick Links</h5>
        <a className="btn btn-link text-white-50" href="/about">About Us</a>
        <a className="btn btn-link text-white-50" href="/contact">Contact Us</a>
        <a className="btn btn-link text-white-50" href="/privacy">Privacy Policy</a>
        <a className="btn btn-link text-white-50" href="/terms">Terms &amp; Condition</a>
      </div>
      <div className="col-lg-4 col-md-6">
        <h5 className="text-white mb-4">Newsletter</h5>
        <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
        <div className="position-relative mx-auto" style={{maxWidth: '400px'}}>
          <input className="form-control bg-transparent w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email" />
          <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
        </div>
      </div>
    </div>
  </div>
  <div className="container">
    <div className="copyright">
      <div className="row">
        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
          © <a className="border-bottom" href="/">Lost And Found</a>, All Right Reserved. 
          {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. 
                      If you'd like to use the template without the footer author’s credit link/attribution link/backlink, 
                      you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
          Designed By <a className="border-bottom" href="https://htmlcodex.com">HTML Codex</a>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* <!-- Footer End --> */}


        {/* <!-- Back to Top --> */}
        <a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>
    </>
  )
}

export default Footer