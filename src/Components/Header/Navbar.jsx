/* eslint-disable no-undef */
import { Link, NavLink } from "react-router-dom";
import $ from "jquery";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";

const Navbar = () => {
  const isAuth = useIsAuthenticated();
  const user = useAuthUser();
  const signOut = useSignOut();

  // console.log(isAuth());
  // console.log(user());

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 45) {
      $(".nav-bar").addClass("sticky-top");
    } else {
      $(".nav-bar").removeClass("sticky-top");
    }
  });

  const handleLogout = ()=> {
    signOut();
    axios.request({
        method: "post",
        url: "http://127.0.0.1:8000/api/logout",
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          Authorization: `Bearer ${user().token}`,
        },
    });
  }

  return (
    <>
      {/* Navbar Start */}
      {/* <div className="container-fluid nav-bar bg-transparent position-sticky">
    <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4">
      <Link
        to="/"
        className="navbar-brand d-flex align-items-center text-center"
      >
        <div className="icon p-2 me-2">
          <img
            className="img-fluid"
            src="img/icon-deal.png"
            alt="Icon"
            style={{ width: "30px", height: "30px" }}
          />
        </div>
        <h1 className="m-0 text-primary">Makaan</h1>
      </Link>
      <button
        type="button"
        className="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto">
          <NavLink to="/" className="nav-item nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-item nav-link">
            About
          </NavLink>
          <div className="nav-item dropdown">
            <Link
              to="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Property
            </Link>
            <div className="dropdown-menu rounded-0 m-0">
              <Link to="property-list.html" className="dropdown-item">
                Property List
              </Link>
              <Link to="property-type.html" className="dropdown-item">
                Property Type
              </Link>
              <Link to="property-agent.html" className="dropdown-item">
                Property Agent
              </Link>
            </div>
          </div>
          <div className="nav-item dropdown">
            <Link
              to="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Pages
            </Link>
            <div className="dropdown-menu rounded-0 m-0">
              <Link to="testimonial.html" className="dropdown-item">
                Testimonial
              </Link>
              <Link to="404.html" className="dropdown-item">
                404 Error
              </Link>
            </div>
          </div>
          <NavLink to="/contact" className="nav-item nav-link">
            Contact
          </NavLink>
        </div>
        <Link to className="btn btn-primary px-3 d-none d-lg-flex">
          Add Property
        </Link>
      </div>
    </nav>
  </div> */}
      <div className="container-fluid nav-bar bg-transparent">
        <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4">
          <a
            href="index.html"
            className="navbar-brand d-flex align-items-center text-center"
          >
            <div className="icon p-2 me-2">
              <img
                className="img-fluid"
                src="img/logo.png"
                alt="Icon"
                style={{ width: "40px", height: "30px" }}
              />
            </div>
            <h1 className="m-0 text-primary">Lost And Found</h1>
          </a>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="visible collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto">
              <Link to="/" className="nav-item nav-link active">
                Home
              </Link>
              <Link to="/about" className="nav-item nav-link">
                About
              </Link>
              <Link to="/posts" className="nav-item nav-link">
                Posts
              </Link>
              <Link to="/contact" className="nav-item nav-link">
                Contact
              </Link>
              {isAuth() ? (
                <>
                  <div className="nav-item dropdown">
                    <Link
                      to="/profile"
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      {user().name}
                    </Link>
                    <div className="dropdown-menu rounded-0 m-0">
                      <Link to='/profile' className="dropdown-item">
                        Profile
                      </Link>
                      <Link  className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <Link to="/login" className="nav-item nav-link">
                  Login
                </Link>
              )}
            </div>
            <Link to="/add" className="btn btn-primary px-3 d-none d-lg-flex">
              Add Post
            </Link>
          </div>
        </nav>
      </div>

      {/* Navbar End */}
    </>
  );
};

export default Navbar;
