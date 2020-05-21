import * as React from 'react';
import { render } from 'react-dom';
import { Calendar } from './calendar';
import styled from 'styled-components';

import './styles.css';



function App() {
  return (
    <Container>
      <h1>Simple Calendar</h1>
      <Calendar />
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
align-items: center;
`;

const rootElement = document.getElementById('root');
render(<App />, rootElement);
