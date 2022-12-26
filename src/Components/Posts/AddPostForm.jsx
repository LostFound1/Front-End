import React from 'react'

const AddPostForm = () => {
  return (
    <div className='row g-4 mt-5'>
      <div className="col-md-6 offset-md-3">
        <div className="panel-heading text-center">
            <h1>Post Item</h1>
        </div>
        <div className="wow fadeInUp" data-wow-delay="0.5s">
        <form id="login-form">
            <div className="row g-3">
              <div className="col-12">
                <select class="form-select form-select-lg py-3 mb-3" aria-label=".form-select-lg example">
                        <option disabled selected>Choose whether you lost or found the item</option>
                        <option>I'm Lost This Item</option>
                        <option>I'm Found This Item</option>
                </select>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <input type="text" className="form-control" id="title" placeholder="Title" />
                  <label htmlFor="title">Title</label>
                </div>
              </div>
              <div className="col-12">
                <select class="form-select py-3" aria-label=".form-select-lg example">
                        <option disabled selected>Choose Category of Item</option>
                        <option>I'm Lost This Item</option>
                        <option>I'm Found This Item</option>
                </select>
              </div>
              <div className="col-12">
                <select class="form-select py-3" aria-label=".form-select-lg example">
                        <option disabled selected>Choose Kind of place</option>
                        <option>I'm Lost This Item</option>
                        <option>I'm Found This Item</option>
                </select>
              </div>
              <div className="col-md-4">
                <select class="form-select py-3" aria-label=".form-select-lg example">
                        <option disabled selected>Choose City</option>
                        <option>I'm Lost This Item</option>
                        <option>I'm Found This Item</option>
                </select>
              </div>
              <div className="col-md-8">
                <div className="form-floating">
                  <input type="text" className="form-control" id="location" placeholder="location" />
                  <label htmlFor="location">Location</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <textarea className="form-control" placeholder="Leave a message here" id="desc" style={{height: '150px'}} defaultValue={""} />
                  <label htmlFor="desc">Descrption</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <input type="file" className="form-control" id="image" placeholder="Images" multiple />
                  <label htmlFor="image">Upload Image For Item</label>
                </div>
              </div>
              <div className="col-12">
                <button className="btn btn-primary w-100 py-3 " type="submit">Post</button>
              </div>
            </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default AddPostForm