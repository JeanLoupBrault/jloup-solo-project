// import React, { Component } from 'react';
// import { render } from 'react-dom';
// import './style.css';
// // import { TshirtList } from './TshirtList';
// // import { Cart } from './Cart';
// // import { CartProvider } from './CartContext';
// import App from './App';
// import About from './About';
// import Header from './Header/Header';
// import {
//   BrowserRouter,
//   Switch,
//   Route
// } from 'react-router-dom';
// import styled from 'styled-components';

import React from "react";
import ReactDOM, { render } from "react-dom";
import { Provider } from "react-redux";

import configureStore from "./store";

import App from "./App";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);


// const App = () => {
//   return (

//     <BrowserRouter>
//       <Wrapper>
//         <Header />
//         <Main>
//           <Switch>
//             <Route exact path="/">
//               {/* <Home /> */}
//               {/* <CartProvider>
//                 <div>
//                   <Cart />
//                   <TshirtList />
//                 </div>
//                 <div class="container"></div>
//               </CartProvider> */}
//             </Route>
//             <Route path="/about">

//               <About />


//             </Route>
//             {/* <Route path="/items/:itemId">
//                             <ItemDetails />
//                         </Route>
//                         <Route path="/sellers">
//                             <Sellers />
//                         </Route>
//                         <Route path="/sellers/:sellerId">
//                             <ItemDetailsSeller />
//                         </Route> */}
//           </Switch>
//         </Main>
//       </Wrapper>

//       {/* <GlobalStyles /> */}
//     </BrowserRouter>

//   )
// }

// const Wrapper = styled.div`
// max-width: 800px;
// margin: auto;
// `;

// const Main = styled.main`
// padding-top: 32px;
// padding-bottom: 32px;
// `;

// const ImageBackground = `
// `;


render(<App />, document.getElementById('root'));
