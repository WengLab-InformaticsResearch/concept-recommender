import React, { Component, useEffect } from 'react';
import Search from './search'
import ResultList from './resultList'
import SeedList from './seedList'
import {Card, Alert} from 'react-bootstrap'

class Main extends Component {
    state = {
        resultList: [],
        seedList: []
    }

    handleSearch = (searchText) => {
        console.log("Get search results: input is ", searchText)
        fetch('http://localhost:5000/getSearch', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                search_text: searchText,
            })
        })
            .then(res => res.json())
            .then((resultList) => {
                const seedList = [...this.state.seedList]
                resultList.forEach(result => {
                    result.inSeed = false
                    seedList.forEach(seed => {
                        if (result.conceptId === seed.conceptId) {
                            result.inSeed = true
                        }
                    })
                })
                this.setState({ resultList: resultList })
            })
            .catch(console.log)
    }

    handleGetRecommend = () => {
        console.log("Get recommend results:")
        fetch('http://localhost:5000/getRecommend', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                seed_list: this.state.seedList,
            })
        })
            .then(res => res.json())
            .then((resultList) => {
                const seedList = [...this.state.seedList]
                resultList.forEach(result => {
                    result.inSeed = false
                    seedList.forEach(seed => {
                        if (result.conceptId === seed.conceptId) {
                            result.inSeed = true
                        }
                    })
                })
                this.setState({ resultList: resultList })
            })
            .catch(console.log)
    }

    handleToggleSeedInResults = (result) => {
        console.log("Toggle seed in results: input is", result)
        // alternating result list
        const resultList = [...this.state.resultList]
        const indexInResults = resultList.indexOf(result)
        resultList[indexInResults] = { ...result }
        resultList[indexInResults].inSeed = !resultList[indexInResults].inSeed

        // alternating seed list
        let seedList = [...this.state.seedList]
        let equalflag = 0;
        seedList.forEach(seed => {
            if (seed.conceptId === result.conceptId) {
                equalflag = 1
            }
        })
        if (equalflag === 0 && result.inSeed === false) {
            // not exist and inseed is false before click, then add to seeds
            result.inSeed = true
            seedList.push(result)
        }
        if (equalflag === 1 && result.inSeed === true) {
            // exist and inseed is true before click, then remove from seeds
            seedList = seedList.filter(seed => seed.conceptId !== result.conceptId)
        }
        this.setState({ resultList: resultList, seedList: seedList })
    }


    handleRemoveSeedInSeeds = (seed) => {
        // console.log("Remove seed in seeds: input is", seed)
        // alternating seed list
        const seedList = [...this.state.seedList]
        const indexInSeeds = seedList.indexOf(seed)
        seedList.splice(indexInSeeds, 1);
        this.setState({ seedList: seedList })
        // alternating result list
        let resultList = [...this.state.resultList]
        let equalflag = 0;
        resultList.forEach(result => {
            if (result.conceptId === seed.conceptId) {
                result.inSeed = false
            }
        })

        this.setState({ resultList: resultList, seedList: seedList })
    }

    handleClickPageNavigationInResults = (pageNumber) => {
        console.log("Click page number in results: input is", pageNumber)
    }

    handleClickPageNavigationInSeeds = (pageNumber) => {
        console.log("Click page number in seeds: input is", pageNumber)
    }

    render() {
        return (
            <React.Fragment>
                <Card className="text-center">
                    <Card.Header>Step 1: Search concepts</Card.Header>
                    <Card.Body >
                        <Search onSearch={this.handleSearch} />
                    </Card.Body>
                </Card>
                <Card className="text-center">
                    <Card.Header>Step 2: Select relevant concepts</Card.Header>
                    <Card.Body>
                    
                        <ResultList resultList={this.state.resultList} onToggleSeedInResults={this.handleToggleSeedInResults} />
                    </Card.Body>
                </Card>
                <Card className="text-center">
                    <Card.Header>Step 3: Review seed concepts and generate recommendations</Card.Header>
                    <Card.Body>
                        <SeedList seedList={this.state.seedList} onRemoveSeedInSeeds={this.handleRemoveSeedInSeeds} onRecommend={this.handleGetRecommend}/>
                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
}

export default Main;