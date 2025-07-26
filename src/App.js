// // App.jsx
// import { Routes, Route } from 'react-router-dom';
// import Layout from './Layout';
// import Home from './components/home/Home';
// import SignIn from './components/login-register/SignIn';
// import SignUp from './components/login-register/SignUp';
// import Product from './components/product/Product';
// import Cart from './components/cart/Cart';
// import Profile from './components/profile/Profile';
// import Orders from './components/profile/Orders';

// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         {/* Routes with Layout (Navbar + Footer) */}
//         <Route element={<Layout />}>
//           <Route path='/' element={<Home />} />
//           <Route path='/product/:id' element={<Product />} />
//           <Route path='/cart' element={<Cart />} />
//           <Route path='/profile' element={<Profile />} />
//           <Route path='/orders' element={<Orders />} />
//         </Route>

//         {/* Auth Routes without Layout */}
//         <Route path='/login' element={<SignIn />} />
//         <Route path='/register' element={<SignUp />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;














import { Routes, Route } from 'react-router-dom';
import SignIn from './components/login-register/SignIn';
import SignUp from './components/login-register/SignUp';
import Home from './components/home/Home';
import Banner from './components/home/Banner';
import Navbar from './components/header/Navbar';
import Product from './components/product/Product';
import Orders from './components/profile/Orders';
import Footer from './components/footer/Footer';
import Cart from './components/cart/Cart';
import Profile from './components/profile/Profile';


function App() {
  return (
    <>

      <Routes>
       
        <Route path="/" element={ <> <Navbar /> <Home /> <Footer /> </> } />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/product/:id" element={ <> <Navbar /> <Product /> <Footer /> </> } />
        <Route path="/cart" element={ <> <Navbar /> <Cart /> <Footer /> </> } />
        <Route path='/profile' element={ <> <Navbar /> <Profile /> <Footer /> </> } />
        <Route path='/banner' element={<Banner/>}></Route>
         <Route path="/orders" element={<Orders/>} />


      </Routes>
    </>
    
  );
}

export default App;
