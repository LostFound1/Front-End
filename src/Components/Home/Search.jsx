import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = ({render , setRender}) => {
    const typePlaces =['Restaurant','Hotel','Transport','College','Museum','Gardens','Airport'];
    const [categories , setCategories] = useState([]);

    const [category , setCategory] =useState("all");
    const [typePlace , setTypePlace] =useState("all");
    const [city, setCity] =useState("all");

    const navigate = useNavigate();

    useEffect(()=>{
        getCategories();
    },[])
    async function getCategories() {
        let res =await axios.get('http://127.0.0.1:8000/api/categories');
        let categories = res.data;
        console.log(res.data);
        setCategories(categories);
      }

      function handleSearch() {
        setRender(!render);
        navigate(`/posts?cat=${category}&type=${typePlace}&city=${city}`)
      }

  return (
    <div class="container-fluid bg-primary mb-5 wow fadeIn" data-wow-delay="0.1s" style={{padding: "35px"}}>
            <div class="container">
                <div class="row g-2">
                    <div class="col-md-10">
                        <div class="row g-2">
                            <div class="col-md-4">
                                <select class="form-select border-0 py-3" onChange={(e)=>setCategory(e.target.value)}>
                                    <option selected disabled>Categories</option>
                                    {categories?.map(category => <option value={category.id}>{category.name}</option>)}
                                </select>
                            </div>
                            <div class="col-md-4">
                                <select class="form-select border-0 py-3" onChange={(e)=>setTypePlace(e.target.value)}>
                                    <option selected disabled>Type Of Place</option>
                                    {typePlaces.map(typeplace=><option value={typeplace}>{typeplace}</option>)}
                                </select>
                            </div>
                            <div class="col-md-4">
                                <select class="form-select border-0 py-3" onChange={(e)=>setCity(e.target.value)}>
                                    <option selected disabled>Location</option>
                                    <option value="Amman">Amman</option>
                                    <option value="Zarqa">Zarqa</option>
                                    <option value="Irbid">Irbid</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-dark border-0 w-100 py-3" onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Search