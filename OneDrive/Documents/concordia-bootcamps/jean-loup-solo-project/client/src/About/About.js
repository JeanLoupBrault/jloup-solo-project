import React from 'react';
import styled from 'styled-components';

// import Paragraph from './Paragraph';

function About(props) {
    return (
        <>
            <Wrapper>
                {/* <Intro> */}
                <Paragraph>
                    Farm Hook Market is founded on a very simple principle:{' '}
                    <strong>Fruits and vegetables from local farmers is good for the planet.</strong>
                </Paragraph>
                <Paragraph>
                    We sell the finest selection of produce from regional farms. Our sellers are proud of their products, and your
                    vegetable basket is guaranteed to satisfy our customers.
                </Paragraph>
                <Paragraph>
                    <div>At Farm Hook Market, we want to create a proximity between the customer and the farmers. Customers will have advantages by signing up and create an account with us. They will have access to fresh fruits, herbs and vegetables each week (the products are harvested the day of the delivery). These products come from known local farmers and grown organically. Some products are exclusive to Farm Hook Market. The basket price is slightly lower than the same basket that is sold at the grocery store. Signed-up customers have access to recipes and special farm events. Additionally, a donation corresponding to ten percent of the amount of each basket subscription is given to a local food bank.
                    Three vegetable basket subscriptions are offered:
                    1	the standard basket for a family of 4-5 people, 59$/week for 24 weeks
                    2	the basket for 3-4 people of 3-4 people, 29,50$/week for 24 weeks
                    3	and the basket for 1-2 people of 1-2 people, 30,50$/week for 12 weeks

                    The period covered goes from the beginning of June until mid-November. You may pay in 1, 2 or 3 installments in monthly equal payments. Baskets are delivered in one of our three drop off locations. There is a possibility of deferred delivery in case of vacation or missed basket.
                    It is also possible for any customer with or without an account to buy single products -extra vegetables for the weekly chosen basket or no basket at all. You will not find that offer anywhere else!
                    And farmers will benefit from the signed-up customers by gaining financial security, by being able to plan the harvests for the season, and most importantly by the close relationship created with the customers.
                    We are proud to serve our community!

                    Farm Hook Market
                    Email : info@farmhookmarket.com
            </div>
                </Paragraph>
                {/* </Intro> */}
            </Wrapper>
        </>
    );
}

const Wrapper = styled.div`
   padding-bottom: 24px;
  width: 100%;
  height: 100vh;
  background-image: url("/bee.jpg");
  background-size: cover;
`;

const Paragraph = styled.p`
    width: 100%;
height: 300px;
    font-size: 21px;
    margin-bottom: 32px;
`;

const Intro = styled.div`
 width: 100%;
height: 600px;
  padding-bottom: 24px;
`;

export default About;
