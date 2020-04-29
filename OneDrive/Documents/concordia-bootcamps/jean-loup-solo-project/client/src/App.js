import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import AppFirebase from './AuthenticationFe/AppFirebase';
import GlobalStyles from "./GlobalStyles/GlobalStyles";
import Header from "./Header/Header";
import LandingPage from "./LandingPage/LandingPage";
import MainPage from "./MainPage/MainPage";
import CategoryPage from "./CategoryPage/CategoryPage";
import ProductPage from "./ProductPage/ProductPage";
import CartPage from "./CartPage/CartPage";
import ErrorPage from "./ErrorPage/ErrorPage";
import styled from "styled-components";
import Footer from "./Footer/Footer";
import { useSelector, Provider } from "react-redux";

import configureStore from './store';

// import FormPage from './FormManageProducts/FormPage';
// import './App.css';
import AddNinja from "./FormNinja/AddNinja.js";
import PostList from "./Post/PostList.js";
// import PostMongo from "./PostMongo/PostMongo.js";

// class AddNinja extends Component {
//     state = {
//         ninjas: [
//             { name: 'Ryu', age: 30, belt: 'black', id: 1 },
//             { name: 'Yoshi', age: 20, belt: 'green', id: 1 },
//             { name: 'Crystal', age: 25, belt: 'pink', id: 1 }
//         ]
//     }
// }

const store = configureStore();

function App() {
    // const countriesStatus = useSelector((state) => state.country.status);
    // const categoryStatus = useSelector((state) => state.category.status);
    // const productStatus = useSelector((state) => state.product.status);
    // const cartStatus = useSelector((state) => state.cart.status)
    // const isError = useSelector((state) => {
    //     return Object.keys(state)
    //         .map((reducer) => {
    //             return state[reducer].status;
    //         })
    //         .filter((status) => status === "error");
    // });
    return (
        <BrowserRouter>
            <Wrapper>
                <GlobalStyles />
                {/* {isError.length ? (
                    <ErrorPage />
                ) : (
                        <> */}
                <TheHead>
                    <Header />
                </TheHead>
                <Main>
                    <Switch>
                        <Route exact path="/">
                            <LandingPage />
                        </Route>
                        <Route path="/products/:country">
                            <MainPage />
                        </Route>
                        <Route path="/categories/:country">
                            <CategoryPage />
                        </Route>
                        <Route path="/detail/:productId">
                            <ProductPage />
                        </Route>
                        <Route path="/cart">
                            <CartPage />
                        </Route>
                        {/* <Provider store={store}>
                            <FormPage />
                        </Provider> */}
                        <Route path="/form">
                            <AddNinja />
                        </Route>
                        <Route path="/post">
                            <PostList />
                        </Route>
                        <Route path="/postMongo">
                            {/* <PostMongo /> */}
                        </Route>
                        <Route path="/users">
                            <AppFirebase />
                        </Route>
                    </Switch>
                </Main>
                <TheFooter>
                    <Footer />
                </TheFooter>
                {/* </>
                    )} */}
            </Wrapper>
        </BrowserRouter>
    );
}

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-areas:
    "header header header header"
    "main main main main"
    "main main main main"
    "main main main main"
    "main main main main"
    "main main main main"
    "main main main main"
    "footer footer footer footer";
  /* grid-gap: 32px; */
  width: 100vw;
  min-height: 100vh;
`;

const TheHead = styled.header`
  grid-area: header;
`;

const Main = styled.main`
  grid-area: main;
  padding: 0px;
`;

const TheFooter = styled.div`
  grid-area: footer;
  padding: 0px;
  height: 70px;
  display: flex;
  width: 100%;
  justify-content: center;
  background-color: #f2f2f2;
  color: #050594;
`;

export default App;



// import React from 'react';

// import {
//     BrowserRouter,
//     Switch,
//     Route
// } from 'react-router-dom';
// import ProductPage from './ProductPage/ProductPage';
// import Header from './Header/Header';
// import About from './About';
// import Home from './Home';

// // import ItemDetails from './ItemDetails';
// import GlobalStyles from '../src/GlobalStyles';
// import styled from 'styled-components';
// import Sellers from './Sellers';
// // import ItemDetailsSeller from './ItemDetailsSeller';

// function App() {
//     return (
//         <BrowserRouter>
//             <Wrapper>
//                 <Header />
//                 <Main>
//                     <Switch>
//                         <Route exact path="/">
//                             <Home />
//                         </Route>
//                         <Route path="/about">
//                             <About />
//                         </Route>
//                         {/* <Route path="/items/:itemId">
//                             <ItemDetails />
//                         </Route> */}
//                         <Route path="/sellers">
//                             <Sellers />
//                         </Route>
//                         <Route path="/sellers/:sellerId">
//                             {/* <ItemDetailsSeller /> */}
//                         </Route>
//                         <Route path="/detail/:productId">
//                             {/* <ProductPage /> */}
//                         </Route>
//                     </Switch>
//                 </Main>
//             </Wrapper>

//             <GlobalStyles />
//         </BrowserRouter>
//     );
// }

// const Wrapper = styled.div`
// max-width: 800px;
// margin: auto;
// `;

// const Main = styled.main`
// padding-top: 32px;
// padding-bottom: 32px;
// `;

// export default App;
