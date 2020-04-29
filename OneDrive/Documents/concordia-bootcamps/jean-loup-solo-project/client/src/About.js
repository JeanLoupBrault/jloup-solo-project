import React from 'react';
import styled from 'styled-components';

// import Paragraph from './Paragraph';

function About(props) {
    return (
        <>
            <Intro>
                <Paragraph>
                    Farm Hook Market is founded on a very simple principle:{' '}
                    <strong>Fruits and vegetables from local farmers is good for the planet.</strong>
                </Paragraph>
                <Paragraph>
                    We sell the finest selection of produce from regional farms. Our sellers are proud of their products, and your
                    vegetable basket is guaranteed to satisfy our customers.
            </Paragraph>
            </Intro>
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

export default About;
