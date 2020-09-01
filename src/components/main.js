import React, { Component } from 'react';
import Search from './search'
import Recommend from './recommend'
import ResultList from './resultList'
import SeedList from './seedList'

class Main extends Component {
    state = { 
        resultList : [],
        seedList : []
    }

    handleSearch = (searchText) => {
        console.log("Get search results: input is ", searchText)
        const resultList = [
            {'conceptId' : 1, 'conceptName' : 'mock concept 1', 'inSeed' : false},
            {'conceptId' : 2, 'conceptName' : 'mock concept 2', 'inSeed' : false},
            {'conceptId' : 3, 'conceptName' : 'mock concept 3', 'inSeed' : false},
            {'conceptId' : 4, 'conceptName' : 'mock concept 4', 'inSeed' : false},
        ]
        // make sure the seed concepts flag is correct
        const seedList = [...this.state.seedList] 
        resultList.forEach(result => {
            seedList.forEach(seed => {
                if(result.conceptId === seed.conceptId){
                    result.inSeed = true
                }
            })
        })
        this.setState({resultList : resultList})
    }

    handleGetRecommend = () =>{
        console.log("Get recommend results: input is", this.state.seedList)
        const resultList = [
            {'conceptId' : 5, 'conceptName' : 'mock concept 5', 'inSeed' : false},
            {'conceptId' : 6, 'conceptName' : 'mock concept 6', 'inSeed' : false},
            {'conceptId' : 7, 'conceptName' : 'mock concept 7', 'inSeed' : false},
            {'conceptId' : 8, 'conceptName' : 'mock concept 8', 'inSeed' : false},
        ]
        // make sure the seed concepts flag is correct
        const seedList = [...this.state.seedList] 
        resultList.forEach(result => {
            seedList.forEach(seed => {
                if(result.conceptId === seed.conceptId){
                    result.inSeed = true
                }
            })
        })
        this.setState({resultList : resultList})
    }

    handleToggleSeedInResults = (result) => {
        console.log("Toggle seed in results: input is", result)
        // alternating result list
        const resultList = [...this.state.resultList]
        const indexInResults = resultList.indexOf(result)
        resultList[indexInResults] = {...result}
        resultList[indexInResults].inSeed = !resultList[indexInResults].inSeed

        // alternating seed list
        let seedList = [...this.state.seedList]
        let equalflag = 0;
        seedList.forEach(seed => {
            if(seed.conceptId === result.conceptId){
                equalflag = 1
            }
        })
        if(equalflag === 0 && result.inSeed === false){
            // not exist and inseed is false before click, then add to seeds
            result.inSeed = true
            seedList.push(result)
        }
        if(equalflag === 1 && result.inSeed === true){
            // exist and inseed is true before click, then remove from seeds
            seedList = seedList.filter(seed => seed.conceptId !== result.conceptId)
        }
        this.setState({resultList: resultList, seedList: seedList})
    }


    handleRemoveSeedInSeeds = (seed) => {
        console.log("Remove seed in seeds: input is", seed)
       // alternating seed list
       const seedList = [...this.state.seedList]
       const indexInSeeds = seedList.indexOf(seed)
       seedList.splice(indexInSeeds, 1);
       this.setState({seedList: seedList})
       // alternating result list
       let resultList = [...this.state.resultList]
       let equalflag = 0;
       resultList.forEach(result => {
            if(result.conceptId === seed.conceptId){
                result.inSeed = false
            }
        })
        
        this.setState({resultList: resultList, seedList: seedList})
    }

    handleClickPageNavigationInResults = (pageNumber) => {
        console.log("Click page number in results: input is", pageNumber)
    }

    handleClickPageNavigationInSeeds = (pageNumber) => {
        console.log("Click page number in seeds: input is", pageNumber)
    }

    handleToggleInSeed
    render() { 
        return ( 
            <React.Fragment>
                <Search onSearch={this.handleSearch}/>
                <ResultList resultList={this.state.resultList} onToggleSeedInResults={this.handleToggleSeedInResults}/>
                <Recommend onRecommend={this.handleGetRecommend}/>
                <SeedList seedList={this.state.seedList} onRemoveSeedInSeeds={this.handleRemoveSeedInSeeds}/>
            </React.Fragment>
         );
    }
}
 
export default Main;