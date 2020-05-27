import React, { useState, useEffect } from 'react';
import styled from "styled-components";

function UpdateQtyForm() {
    const [_id, setProductId] = useState("");
    const [newQty, setProductNewQty] = useState("");
    const [displayQty, setDisplayQty] = useState([]);

    useEffect(() => {
        fetch("/updateQty", {

            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((json) => {
                console.log("json", json);
                setDisplayQty(json)
            })

            .catch((err) => {
                console.log("message", err.message);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/productId/updateQty", {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                _id,
                newQty,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log("json: :", json);
                // setDisplayQty(json)
            })
            .catch((err) => {
                console.log("message", err.message);
            });
    }

    return (
        <Wrapper>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Wrapper>
                    <label>Product Id:</label>
                    <Input value={_id} type="text" id="productId" placeholder="Product Id" required onChange={(e) => setProductId(e.target.value)} />
                </Wrapper>
                <br></br>
                {/* <Button>Submit</Button> */}
                <Wrapper>
                    <label>Product New Quantity:</label>
                    <Input value={newQty} type="text" id="productNewQty" placeholder="Product New Quantity (ex: 280)" required onChange={(e) => setProductNewQty(e.target.value)} />
                </Wrapper>
                <br></br>
                <Button>Update Quantity</Button>
            </form>
            <WrapperDisplayVacation><strong>Display quantity of product</strong>
                <div>
                    {displayQty.map(item => {
                        return (
                            <>
                                <div>
                                    {item._id}{item.name}{item.numInStock}
                                </div>
                            </>
                        )
                    })}
                </div>
            </WrapperDisplayVacation>
        </Wrapper>
    )
};



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

export default UpdateQtyForm;