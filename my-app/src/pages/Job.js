import React from 'react'
import { faBriefcase} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faIndianRupeeSign} from "@fortawesome/free-solid-svg-icons";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons"
import {faCalendarDays} from "@fortawesome/free-solid-svg-icons"
import { useLocation } from 'react-router-dom';
import '../component/Form.css';

function Card(props) {
   
    return (
    <div>
    
    <div class=" d-flex mx-5 mb-3 mt-4">
        <div class="card shadow border " style={{width: '40rem', height:'22rem'}}>
        <div class="card-body">
            <h3 class="card-title ps-2">{props.title}</h3>
            <h4 class="card-subtitle ps-2 mb-2 text-muted">{props.comp_name}</h4>

            <div class="list-group list-group-horizontal ps-2">
            <div class="d-flex pt-1 pe-5">
            <div class="pe-1">
            <FontAwesomeIcon icon={faBriefcase} />
            </div>
                {props.reqd_exp}
                
            </div>
            <div class="d-flex pt-1 pe-5">
            <div class="pe-1">
            <FontAwesomeIcon icon={faIndianRupeeSign}/>
            </div>
                {props.salary}LPA
            </div>
            <div class="d-flex pt-1 pe-5">
            <div class="pe-1">
            <FontAwesomeIcon icon={faLocationDot}/>
            </div>
                {props.location}</div>
            
            </div>

            <div class="p-2 pb-3">
            {props.jd}
            </div>

            <div class="list-group list-group-horizontal">
            <div class="list-group list-group-horizontal list-group-item d-flex">
            <div class="pe-1">
            <FontAwesomeIcon icon= {faCalendarDays}/> 
            </div>
            {props.start_date}
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>  
    )
}
    

export default function Job() {
    var loggedIn = localStorage.getItem("loggedIn");
    console.log(loggedIn);
    if(loggedIn == null || loggedIn == "false"){
        window.location.href = "/";
    }
    let location = useLocation();

    var params=new URLSearchParams(location.search);
    const [data, setData] = React.useState([]); //variable data
    // const ls = [];
    React.useEffect(() => {
    fetch("/getjobs?"+ params)
        .then((res) => res.json())
        .then((data2) => {    //data2 is value that comes from url
            setData(data2);   //makes data from line 73 to data2
        }).catch((error) => {alert(error)});
    }, []);
 

  

  return (
    <div class=" vh-100" >
        <div>
        <nav class="navbar navbar-dark bg-dark">
            <div class="container-fluid">
            <h1 class="navbar-brand text-light ms-2">JobsForYou.</h1>
            <ul class="nav justify-content-end">
             <li class="nav-item">
                 <a class="nav-link active text-light"  href="/home">
                 <FontAwesomeIcon icon="fa-sharp fa-solid fa-house" />Home</a>
            </li>

            <li class="nav-item">
                <a class="nav-link text-light" href="/">Logout</a>
            </li>
            </ul>
            </div>
        </nav>
        <div class="px-5 pt-5 text-light display-4" >Showing results for your search</div>
        <div>
       
        {data.map(item => (    //variable data which is equal to data2
            <Card title={item.title} comp_name={item.comp_name} reqd_exp={item.reqd_exp} salary={item.salary} location={item.location} jd={item.jd} start_date={item.start_date}/>
        
        ))}
    
    </div>
    </div>
    </div>
  
  )

}