import React, { Component } from 'react';

class Search extends Component {
    state = {value: ''}

    handleChange = (event) =>{
        this.setState({value: event.target.value})
    }

    handleSubmit = (event) =>{
        event.preventDefault()
        this.props.onSearch(this.state.value)
    }

    render() {
        return (
            <div>
                <div className="form-inline" >
                    <input className="form-control mr-sm-2" placeholder="Type your concept" aria-label="Search" onChange={this.handleChange}/>
                    <label className="btn btn-outline-success my-2 my-sm-0" onClick={this.handleSubmit}>Search</label>
                </div>
            </div>
        );
    }
}

export default Search;