import React, { Component } from 'react';
import Seed from './seed'

class SeedList extends Component {
    render() {
        if (this.props.seedList.length === 0) return (<p>Current seed list is empty!</p>)

        return (
            <div>
                <p>This is the seed list.</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Concept ID</th>
                            <th scope="col">Concept name</th>
                            <th scope="col">Remove from seed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.seedList.map(seed => <Seed key={seed.conceptId} seed={seed} onRemoveSeedInSeeds={this.props.onRemoveSeedInSeeds}/>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SeedList;