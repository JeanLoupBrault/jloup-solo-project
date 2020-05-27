import React from "react";
import styled from "styled-components";
// import ListingGrid from '../ListingGrid/ListingGrid';
// import Paragraph from './Paragraph';

// import { items } from '../data/data';
import { useSelector } from 'react-redux';
// import DropDown from "../DropDown/DropDown";
import ErrorPage from '../ErrorPage/ErrorPage';
import CircularProgress from "@material-ui/core/CircularProgress"

function Home() {

  // const countriesStatus = useSelector((state) => state.country.status);

  return (
    <>
      <LandingWrapper>
        <PageDescription>
          Farm Hook Market sells the finest fruits and vegetables from the region.
        </PageDescription>
        <Paragraph>
          <p>
            Farm Hook Market is founded on a very simple principle:{' '}
            <strong>Fruits and vegetables from local farmers is good for the planet.</strong>
          </p>
          <p>
            We sell the finest selection of products from regional farms. Our sellers are proud of their products, and your
            vegetable basket is guaranteed to satisfy our customers.
          </p>
        </Paragraph>
        <Paragraph>
          <p>
            At <strong>Farm Hook Market</strong>, we want to <strong>create a proximity between the customer and the farmers</strong>. Customers will have <strong>advantages</strong> by signing up and create an account with us. They will have access to <strong>fresh fruits</strong>, <strong>herbs</strong> and <strong>vegetables</strong> each week (the products are harvested the day of the delivery). These products come from known local farmers and <strong>grown organically</strong>. Some products are <strong>exclusive</strong> to Farm Hook Market. The basket price is slightly lower than the same basket that is sold at the grocery store. Signed-up customers have access to <strong>recipes</strong> and special farm events. Additionally, a <strong>donation</strong> corresponding to <strong>ten percent</strong> of the amount of each basket subscription is given to a local food bank.
            <strong>Three vegetable basket subscriptions</strong> are offered:
            </p>
          <ol>
            1.	the <strong>standard basket</strong> for a family of <strong>4-5 people</strong>, 59$/week for 24 weeks
            </ol>
          <ol>
            2.	the basket for <strong>3-4 people</strong>, 29,50$/week for 24 weeks
            </ol>
          <ol>
            3.	and the basket for <strong>1-2 people</strong>, 30,50$/week for 12 weeks
          </ol>
          <p>
            The <strong>period covered</strong> goes from the beginning of June until mid-November. You may <strong>pay in 1, 2 or 3 installments</strong> in monthly equal payments. Baskets are delivered in one of our <strong>three drop off locations</strong>. There is a possibility of deferred delivery in case of vacation or missed basket.
            <strong>It is also possible for any customer with or without an account to buy single products -extra vegetables for the weekly chosen basket or no basket at all. You will not find that offer anywhere else!</strong>
            And <strong>farmers will benefit</strong> from the signed-up customers by gaining <strong>financial security</strong>, by being able to <strong>plan the harvests</strong> for the season, and most importantly by the <strong>close relationship created with the customers</strong>.
            We are proud to serve our community!
          </p>
          <p>
            Farm Hook Market
            Email : info@farmhookmarket.com
          </p>
        </Paragraph>
        {/* <DropDown /> */}
      </LandingWrapper>
    </>
  );
}

const LandingWrapper = styled.div`
  padding-bottom: 24px;
  width: 100%;
  height: 100vh;
  background-image: url("/bee.jpg");
  background-size: cover;
`;

const PageDescription = styled.p`
  background-color: black;
  color: white;
  text-align: center;
  font-size: 20px;
  padding: 10px;
`;

const Paragraph = styled.p`
    width: 100%;
height: 100px;
    font-size: 21px;
    margin-bottom: 32px;
    padding: 5px 200px 5px 10px;
    color: black;
`;

export default Home;
