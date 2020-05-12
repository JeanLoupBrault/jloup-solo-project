import React, { useState } from 'react';
import styled from "styled-components";

function VacationForm() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [vacation, setVacation] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("/vacation", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                vacation,
                id,
                name,
                comment,
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
            <form onSubmit={(e) => handleSubmit(e)}>
                {/* <Wrapper>
                    <label>Id:</label>
                    <Input value={id} type="text" id="id" placeholder="Your member id number" required onChange={(e) => setId(e.target.value)} />
                </Wrapper>
                <br></br> */}
                <Wrapper>
                    <label>Name:</label>
                    <Input value={name} type="text" id="name" placeholder="First and last name" required onChange={(e) => setName(e.target.value)} />
                </Wrapper>
                <br></br>
                <Wrapper>
                    <label>Vacation/missed basket period:</label>
                    <Input value={vacation} type="text" id="vacation" placeholder="Indicate your new order pick-up date (re: vacation)" required onChange={(e) => setVacation(e.target.value)} />
                </Wrapper>
                <br></br>
                <Wrapper>
                    <label>Description/comment:</label>
                    <Input value={comment} type="text" id="comment" placeholder="Comment please" required onChange={(e) => setComment(e.target.value)} />
                </Wrapper>
                <br></br>
                <Button>Submit</Button>
            </form>
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

export default VacationForm;