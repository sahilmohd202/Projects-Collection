import './ConfirmPage.css';
import OrderBookedSuccessImg from '../components/check.png';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect,useState,useContext,useRef} from 'react';
import axios from 'axios';
import { API_ADDRESS } from '../config';
import {C1} from '../App.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';


function ConfirmPage()
{ 
    const X=useContext(C1); 
    const loadinghere=useRef(null);
    const SD=useRef(null);
    const navigateTo=useNavigate(); 
    const UserInfo=X[0];
    const {pid}=useParams();
    const [product,setProduct]=useState({ name:'',price:''});
    useEffect(()=>{
      axios.get(`${API_ADDRESS}/products/${pid}`).then(r=>{
            setProduct(r.data);
       }).catch(e=>console.log(e));
       loadinghere.current.style.display='none';
    },[pid]);

   
    const book=function(){
        if(document.cookie.indexOf('token')!==-1)
        { 
          loadinghere.current.style.display='block';    // loading bar visible
          let placedon=new Date();
          let body={
                "name":product.name,
                "image":product.images[0],
                "price":product.price,
                "placedon":`${placedon.getFullYear()}-${placedon.getMonth()}-${placedon.getDay()}`,
                 "deliveryon":"2022-05-20"
          };
          let headersjson={
              "Content-type":"application/json",
          };
           axios.post(`${API_ADDRESS}/users/asdx23/orders`,body,{headers:headersjson,withCredentials:true})
           .then(r=>{
                console.log(r);
                alert('your order is placed check your email.');
                loadinghere.current.style.display='none';    // loading bar invisible.
                SD.current.style.display='block';
                setTimeout(()=>{ SD.current.style.display='none';  },2500);
                setTimeout(()=>{navigateTo('/');  },2500);  // go back to home page.
                
           })
           .catch(e=>{
                console.log('your error',e);
                alert('something went wrong.')
           });
       
          }
          else
          navigateTo('/login')
       
          }
    










    return <div id='confirmPage'>
         <table >
            <tr><td width='30%'>Product Name</td><td width='70%' className='values'>{product.name}</td></tr>
            <tr><td>price</td><td  className='values'>{product.price}</td></tr>
            <tr><td>Booked on</td><td  className='values'>{new Date().toUTCString()}</td></tr>
            <tr><td>Arriving on</td><td  className='values'>05-03-2022</td></tr>
            <tr><td>name</td><td  className='values'>{UserInfo.name}</td></tr>
            <tr><td>address</td><td  className='values'>{UserInfo.address}</td></tr>
            <tr><td>phone</td><td  className='values'>{UserInfo.phone}</td></tr>
            <tr><td>tax:</td><td  className='values'>0</td></tr>
            <tr><td>Total:</td><td  className='values'>{product.price}</td></tr>
            <tr><td colspan="2" align='center'> <div id='loadingbar' ref={loadinghere}><FontAwesomeIcon icon={faSpinner}/></div> </td></tr>
            <tr><td colspan="2" align='center'><button id="buynowbtn" onClick={()=>{
                     book();
                  }}>Buy Now</button> </td></tr>

         </table>
         <div id='SuccessDialog' ref={SD}>
            <img   src={OrderBookedSuccessImg}/>
            <p className="success">Your Order is Successfully booked.</p>
    </div>
    </div>
}
export default ConfirmPage;

