import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import AppFirebase from './AuthenticationFe/AppFirebase';
import GlobalStyles from "./GlobalStyles/GlobalStyles";
import Header from "./Header/Header";
import LandingPage from "./LandingPage/LandingPage";
import MainPage from "./MainPage/MainPage";
import CategoryPage from "./CategoryPage/CategoryPage";
import ProductPage from "./ProductPage/ProductPage";
import ProductsPage from "./ProductsPage/ProductsPage";
import CartPage from "./CartPage/CartPage";

import styled from "styled-components";
import Footer from "./Footer/Footer";


import configureStore from './store';

import UpdateQtyForm from "./UpdateQtyForm/UpdateQtyForm";
import VacationForm from "./VacationForm/VacationForm.js";
import UpdatePriceForm from "./UpdatePriceForm/UpdatePriceForm";
import AdminForm from "./AdminForm/AdminForm.js";


const store = configureStore();

function App() {

    return (
        <BrowserRouter>
            <Wrapper>
                <GlobalStyles />

                <TheHead>
                    <Header />
                </TheHead>
                <Main>
                    <Switch>
                        <Route exact path="/">
                            <LandingPage />
                        </Route>
                        <Route path="/categories/:region">
                            <CategoryPage />
                        </Route>
                        <Route path="/products">
                            <ProductsPage />
                        </Route>
                        <Route path="/detail/:productId">
                            <ProductPage />
                        </Route>
                        <Route path="/cart">
                            <CartPage />
                        </Route>
                        <Route path="/vacation">
                            <VacationForm />
                        </Route>
                        <Route path="/productId/updatePrice">
                            <UpdatePriceForm />
                        </Route>
                        <Route path="/productId/updateQty">
                            <UpdateQtyForm />
                        </Route>
                        <Route path="/adminView">
                            <AdminForm />
                        </Route>
                        <Route path="/users">
                            <AppFirebase />
                        </Route>
                    </Switch>
                </Main>
                <TheFooter>
                    <Footer />
                </TheFooter>

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

