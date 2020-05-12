import React from 'react';
import styled from 'styled-components';

// import ListingGrid from './ListingGrid';
// import Paragraph from './Paragraph';
import DropDown from "./DropDown/DropDown";
// import { items } from '../data';

function Home(props) {
    return (
        <>
            <HomeWrapper>
                <Intro>
                    <Paragraph>
                        Farm Hook Market sells the finest fruits and vegetables in the region.
                </Paragraph>
                    <Paragraph>
                        <strong>Browse items:</strong>
                    </Paragraph>
                </Intro>
                {/* <ListingGrid itemList={Object.values(items)} /> */}
                {/* <DropDown /> */}
            </HomeWrapper>
        </>
    );
}

const HomeWrapper = styled.div`
  padding-bottom: 24px;
  width: 100%;
  height: 100vh;
  background-image: url("/child_grape.jpg");
  background-size: cover;
`;

const Paragraph = styled.p`
    font-size: 21px;
    margin-bottom: 32px;
`;

const Intro = styled.div`
    padding-bottom: 24px;
`;

export default Home;
