import React, { Component } from 'react';


class AddNinja extends Component {
    state = {
        name: null,
        age: null,
        belt: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDFefault();
        console.log('Ninja state', this.state);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmtlFor="name">Name:</label>
                    <input type="text" id="name" onChange={this.handleChange} />
                    <label htmtlFor="name">Age:</label>
                    <input type="text" id="age" onChange={this.handleChange} />
                    <label htmtlFor="name">Belt:</label>
                    <input type="text" id="belt" onChange={this.handleChange} />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default AddNinja;