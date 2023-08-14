import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {useState} from 'react';
import Header from './components/Header.js';
import SideNavigationBar from './components/SideNavigationBar.js';
import Footer from './components/Footer.js';
import MainPage from './pages/MainPage.js';
import LoginPage from './pages/LoginPage.js';
import ProductSearchResult from './pages/ProductSearchResult.js';
import ProductViewPage from './pages/ProductViewPage.js';
import MyOrders from './pages/MyOrders.js';
import Profile from './pages/Profile.js';
import { useRef,createContext,useEffect} from 'react';
import axios from 'axios';
import { API_ADDRESS } from './config.js';
import ConfirmPage from './pages/ConfirmPage.js';


export const C1=createContext();

document.getElementsByTagName('meta')[0].setAttribute('content',getComputedStyle(document.documentElement).getPropertyValue('--themecolor'));


function App(){
       
       const [userinfo,setUserInfo]=useState(null);   //null when token is absent else store user info.
       const [isSideNavBarOpen,setSideNavBar]=useState(false);
       const content=useRef(null);
      

       useEffect(()=>{
         
         axios({
            method:"post",
            url:`${API_ADDRESS}/users/login`,
            data:null,
            withCredentials:true
         }).then(r=>{
            const {name,phone,orders,address,email}=r.data;
            setUserInfo({name,phone,orders,address,email});
         }).catch(e=>{ alert('relogin');  });

        },[]);

        


      return <C1.Provider value={[userinfo,setUserInfo]}><BrowserRouter>
             <Header setSideNavigationBar={setSideNavBar} divref={content}  />
             <SideNavigationBar open={isSideNavBarOpen}  setSideNavigationBar={setSideNavBar} divref={content}/>
             <div ref={content}>
           
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='order/' element={<MyOrders/>}/>
                <Route path='/search/:search' element={<ProductSearchResult />}/>
                <Route path='/product/:pid' element={<ProductViewPage  />}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path="/confirm/:pid" element={<ConfirmPage/>}/>
            </Routes>
            <Footer/>
            </div>
      </BrowserRouter></C1.Provider>
}
export default App;