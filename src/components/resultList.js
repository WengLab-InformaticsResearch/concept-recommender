import React, { Component } from 'react';
import Result from './result'

class ResultList extends Component {
    render() {
        if (this.props.resultList.length === 0) return (<p>Current result list is empty!</p>)

        return (
            <div>
                <p>This is the result list.</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Concept ID</th>
                            <th scope="col">Concept name</th>
                            <th scope="col">Add/remove from seed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.resultList.map(result => <Result key={result.conceptId} result={result} onToggleSeedInResults={this.props.onToggleSeedInResults}/>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ResultList;