import React, { Component } from 'react';
import PostData from '../data/farmerBasket3.json';
// const { MongoClient } = require('mongodb');

class PostList extends Component {



    render() {
        return (
            <>
                <div>
                    <h1>Hello There</h1>
                    {PostData.map((postDetail, index) => {
                        return (
                            <div>
                                <li>{postDetail.name}</li>
                                <img src={`${postDetail.imageSrc}`} alt="" />
                            </div>
                        )
                    })}
                </div>
                <div>
                    <img src="fresh_red_apple.png" alt="" />
                </div>
            </>
        )
    }
}

export default PostList;