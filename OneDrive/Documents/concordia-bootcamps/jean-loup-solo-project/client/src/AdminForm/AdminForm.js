import React, { useState } from 'react';
import styled from "styled-components";

function AdminVacationForm() {
  const [name, setName] = useState("");
  // const [displayVac, setDisplayVac] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/vacation/:name", {

      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("json", json);
        console.log("json.name", json[1].name);

      })

      .catch((err) => {
        console.log("message", err.message);
      });
  };


  return (
    <Wrapper>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Wrapper>
          <label>Name:</label>
          <Input value={name} type="text" id="name" placeholder="First and last name" required onChange={(e) => setName(e.target.value)} />
        </Wrapper>
        <br></br>
        <Button>Submit</Button>
      </form>
      <WrapperDisplayVacation>Display vacation by name</WrapperDisplayVacation>
    </Wrapper>
  )
}


const Input = styled.input`
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  `

const Button = styled.button`
    width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
    background-color: #45a049;
  }
  `
const Wrapper = styled.div`
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
  `

const WrapperDisplayVacation = styled.div`
    border-radius: 5px;
    width: 100%;
    height: 300px;
    background-color: #ffffff;
    padding: 20px;
  `

export default AdminVacationForm;