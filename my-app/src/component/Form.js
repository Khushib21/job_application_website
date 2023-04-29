import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Form = () => {

    const navigate = useNavigate();
    const [sliderValue, setSliderValue] = React.useState(5);
    var loggedIn = localStorage.getItem("loggedIn");
    if(loggedIn == null || loggedIn == "false"){
        window.location.href = "/";
    }

    function displayValue() {
        var slider = document.getElementById("work_ex");
        setSliderValue(slider.value);

        var thumb = document.getElementById("thumb");
        thumb.style.marginLeft = (parseInt(slider.value)*20).toString() + "%";
    }
    

    const toComponentB=()=>{
        var var1=document.getElementById('location');
        var var2=document.getElementById('domain');
        var var3=document.getElementById('salary');
        var var4=document.getElementById('work_ex');
        const params ={
            location : var1.value,
            domain : var2.value,
            salary : var3.value,
            work_ex : var4.value
        }
    navigate('/job?'+new URLSearchParams(params));

  }



  return (
    
<div>
    <div class="bgimage" >
    <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
        <h1 class="navbar-brand text-light ms-2" >JobsForYou.</h1>
      <ul class="nav justify-content-end">
             <li class="nav-item">
                 <a class="nav-link active text-light"  href="/home">Home</a>
            </li>

            <li class="nav-item">
                <a class="nav-link text-light" href="/">Logout</a>
            </li>
        </ul>
        </div>

    </nav>



   <div class=" d-flex justify-content-left ms-5 align-items-center vh-100">
    <div class="card shadow border" style={{width: '18rem'}}>
        <div class="card-body">
              <h5 class="card-title">Find Jobs</h5>
              <div class="form-floating mb-3">
                <select class="form-select" id="location">
                <option selected>Select a location</option>
                <option value="delhi">Delhi</option>
                <option value="mumbai">Mumbai</option>
                <option value="pune">Pune</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="kolkata">Kolkata</option>
                <option value="chennai">Chennai</option>
                <option value="bangalore">Bangalore</option>
                <option value="gurgaon">Gurgaon</option>
                <option value="noida">Noida</option>
            </select>
            <label>Location</label>
            </div>

           
        
        <div class="form-floating mb-3">
            <select class="form-select" id="domain">
            <option selected>Select a Domain</option>
                <option value="ba">BA</option>
                <option value="barch">BArch</option>
                <option value="bcom">BCom</option>
                <option value="btech">BTech</option>
                <option value="mba">MBA</option>
                <option value="mtech">MTech</option>
            </select>
            <label>Domain</label>
        </div>


     

         
        <div class="input-group mb-3" >
        <span class="input-group-text">₹</span>
        <input type="text" class="form-control" id="salary" placeholder='Min Salary Expected'></input> 
        <span class="input-group-text">LPA</span>
        </div>

        <div class="mb-3">    
        <label for="customRange3" class="form-label">Work Experience</label>
        <div class="range">
            <input type="range" class="form-range" id="work_ex" min="0" max="5" step="0.5" onChange={displayValue}></input>
        </div>
        <div><p id="thumb" style={{marginLeft: '100%'}}>{sliderValue}</p></div>
        </div>
       
       
        </div>
              <a href="#" class="btn btn-dark" onClick={toComponentB}>Search</a>
   </div>
   </div>

   <style>
    @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Rubik+Distressed&display=swap');
    </style>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap');
    </style>
   <div class="text">
     <p>FIND THE </p>
    <p>BEST JOBS</p>
    <p>MADE FOR YOU!</p>
    </div>
    </div> 
</div>

  )
}

export default Form;
