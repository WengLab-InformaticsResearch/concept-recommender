import React, { Component } from 'react';
import {Dropdown, Container} from 'react-bootstrap'

class Recommend extends Component {

    state = {value : 'kg'}

    handleSubmit = (event) =>{
        event.preventDefault()
        this.props.onRecommend(this.state.value)
    }

    render() {
        return (

                <Dropdown className='mb-5'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Generate Recommendation by
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1" onClick={this.handleSubmit}>knowledge graph</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" onClick={this.handleSubmit}>co-occurrence in EHR</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" onClick={this.handleSubmit}>Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            
                // <div className="form-inline" >
                //     <div className="form-check">
                //         <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                //         <label className="form-check-label" for="exampleRadios1">
                //             Embedding based on  based 
                //         </label>
                //     </div>
                //     <div className="form-check">
                //         <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                //         <label className="form-check-label" for="exampleRadios2">
                //             Embedding based on 
                //         </label>
                //     </div>
                //     <label className="btn btn-outline-success my-2 my-sm-0" onClick={this.handleSubmit}>Recommend</label>
                // </div>

        );
    }
}

export default Recommend;