import './ProductViewPage.css';
import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import ProductView from '../components/ProductView.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import { API_ADDRESS } from '../config';
function ProductViewPage(){

    const {pid}=useParams();
    const [product,setProduct]=useState(null);
    useEffect(()=>{
      axios.get(`${API_ADDRESS}/products/${pid}`).then(r=>{
         console.log(r.data);
            setProduct(r.data);
       }).catch(e=>console.log(e));
    },[pid]);
   

    return <div id='productviewpage'>
       {
          (product===null)?<FontAwesomeIcon icon={faSpinner}/>:<ProductView product_id={product._id} product_name={product.name} product_images={product.images} product_discount={product.discount} product_price={product.price} product_rating={product.rating}  />
       }
    </div>
}
export default ProductViewPage;


