import React, { Component } from 'react';

class Recommend extends Component {

    state = {value : 'kg'}

    handleSubmit = (event) =>{
        event.preventDefault()
        this.props.onRecommend(this.state.value)
    }

    render() {
        return (
                <div className="form-inline" >
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                        <label className="form-check-label" for="exampleRadios1">
                            Embedding based on knowledge graph based 
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                        <label className="form-check-label" for="exampleRadios2">
                            Embedding based on co-occurrence in EHR
                        </label>
                    </div>
                    <label className="btn btn-outline-success my-2 my-sm-0" onClick={this.handleSubmit}>Recommend</label>
                </div>

        );
    }
}

export default Recommend;