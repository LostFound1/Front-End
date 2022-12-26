import React from 'react'

const PostCard = (props) => {
  return (
    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div className="property-item rounded overflow-hidden">
              <div className="position-relative overflow-hidden">
                <img className="img-fluid w-100" src={'img/'+props.img} alt="" style={{height : '350px' }}/>
                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">Lost Item</div>
                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Villa</div>
              </div>
              <div className="p-4 pb-0">
                <a className="d-block h5 mb-2" href>Golden Urban House For Sell</a>
                <p><i className="fa fa-map-marker-alt text-primary me-2" />123 Street, New York, USA</p>
              </div>
              <div className="d-flex border-top">
                <span className="flex-fill text-center border-end py-2 w-50"><i className="fa fa-time text-primary me-2" />3h ago</span>
                <span className="flex-fill text-center border-end py-2 w-50 d-flex justify-content-center align-items-center">
                    <img className='img-fluid rounded-circle mx-3' src='img/call-to-action.jpg' alt='' style={{height: '40px' , width: '40px'}}></img>
                    {/* <p className='mx-3 d-flex align-items-center'>Osama Dasooky</p> */}
                    Osama Dasooky
                </span>
              </div>
            </div>
    </div>
  )
}

export default PostCard