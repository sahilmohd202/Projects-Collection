import "./MyOrders.css";
import BookedOrder from '../components/BookedOrder.js';
import {useEffect,useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCartArrowDown, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { API_ADDRESS } from "../config";
function MyOrders()
{
    const [orders,setOrders]=useState([]);
    useEffect(()=>{
          
           axios.get(`${API_ADDRESS}/users/234Ea-098/orders`).then(r=>{
            if(Array.isArray(r.data))
            {
                setOrders(r.data);
                console.log(r.data);
            }
            else  // internal server error 
               setOrders(null);
           }).catch(e=>{ setOrders(null)});
    },[]);



    return <div id='MyOrders'>
        { 
        (orders===null||orders===undefined)?<div className='error' style={{textAlign:"center"}}><FontAwesomeIcon icon={faTriangleExclamation}/><p>internal server error</p></div>
        :(orders.length>0)?(orders.map((item,index)=><BookedOrder name={item.name} price={item.price} status="CONFIRMED!" placedon={item.placedon} deliveryon={item.deliveryon} address={item.address} image={item.image}/>)).reverse():<div className="empty" style={{textAlign:'center'}}><FontAwesomeIcon icon={faCartArrowDown}/><p>no orders placed.</p></div>
        
        }
    </div>
}
export default MyOrders;

