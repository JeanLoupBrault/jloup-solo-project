import React, { useState, useEffect } from 'react';
import styled from "styled-components";

function UpdatePriceForm() {
    const [_id, setProductId] = useState("");
    // const [price, setProductPrice] = useState("");
    const [displayPrice, setDisplayPrice] = useState([]);

    useEffect(() => {
        fetch("/updatePrice", {

            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((json) => {
                console.log("json", json);
                setDisplayPrice(json)
            })

            .catch((err) => {
                console.log("message", err.message);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/product/updatePrice", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                _id,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log("json: :", json);
                setDisplayPrice(json)
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
                <Button>Submit</Button>
            </form>
            <WrapperDisplayVacation>Display price of product
                    <div>
                    {displayPrice.map(item => {
                        return (
                            <>
                                <div>
                                    {item._id}{item.name}{item.price}
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

export default UpdatePriceForm;