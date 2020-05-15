import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';
import styled from 'styled-components';

function AddTodo({ addTodo }) {
    const [value, setValue] = useState('');

    const handleOnChange = (e) => {
        setValue(e.target.value)
    }

    const handleAdd = () => {
        addTodo(value)
        setValue('')

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAdd()
        fetch("/todo", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                value
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log("json", json);
            })
            .catch((err) => {
                console.log("message", err.message);
            });
    };

    return (
        <Wrapper>
            <SelectContainer>
                <>
                    <Input type="text" onChange={handleOnChange} value={value} placeholder="Your text here" />
                    <StyledButton onClick={handleSubmit}>Add</StyledButton>
                </>
            </SelectContainer>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  font-size: 18px;
  option {
    font-size: 18px;
  }
`;
const SelectContainer = styled.div`
  width: 400px;
  background-color: white;
  height: 96px;
  margin-top: 105px;
  margin-right: 560px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 10px 20px;
`;

const StyledButton = styled.button`
  background: hsl(258deg, 100%, 50%);
  margin-left: 5px;
  font-size: 15px;
  border-radius: 5px;
  color: white;
  width: 100px;
  height: 40px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
`;

export default connect(null, { addTodo })(AddTodo);
