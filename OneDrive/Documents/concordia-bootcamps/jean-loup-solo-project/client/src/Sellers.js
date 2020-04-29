import React from 'react';
import styled from 'styled-components';

// import ListingGridSeller from './ListingGridSeller';
// import Paragraph from './Paragraph';

// import { sellers } from '../data';

function Sellers(props) {
    return (
        <>
            <Intro>
                <Paragraph>
                    Farm Hook Market sells the finest fruits and vegetables in the region. Here is a list of our proud sellers.
                </Paragraph>
                <Paragraph>
                    <strong>Browse sellers:</strong>
                </Paragraph>
            </Intro>
            {/* <ListingGridSeller sellerList={Object.values(sellers)} /> */}
        </>
    );
}

const Paragraph = styled.p`
    font-size: 21px;
    margin-bottom: 32px;
`;

const Intro = styled.div`
    padding-bottom: 24px;
`;

export default Sellers;
