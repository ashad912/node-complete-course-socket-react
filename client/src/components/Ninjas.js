import React, { Component } from 'react'
import  { Link } from 'react-router-dom'


class Ninjas extends Component{

    //es5
    /*
    getInitialState: function(){
        return({
            ninjas: []
        })
    }
    */
    state = {
        ninjas: [],
        fetched: false,
        error: false
    } 

    handleSubmit = (e) => { //we need to create query string for server!
        e.preventDefault()
        const lng = this.refs.lng.value; //ref is set as input param 'ref'
        const lat = this.refs.lat.value;

        //native method, expected promise
        fetch('/api/ninjas?lng='+ lng + '&lat=' + lat).then((data)=>{
            console.log(data)
            if(!data.ok){
                throw Error(data)
            }
            return data.json() //passing json ninjas data
        }).then ((json)=> {
            this.setState({
                ninjas: json,
                fetched: true,
                error: false,
            })
        }).catch(err => {
            this.setState({
                fetched: true,
                error: true
            })
        })
    }

    render() {
        console.log(this.state.ninjas)
        let ninjas = this.state.ninjas;

        ninjas = !this.state.fetched || ninjas.length ? (
             ninjas.map((ninja, index)=> { //index for key - its neccesary for react
                return(
                    <li key={index}>
                        <span className={ninja.available.toString()}></span>
                        <span className="name">{ninja.name}</span>
                        <span className="rank">{ninja.rank}</span>
                        <span className="dist">{Math.floor(ninja.dist.calculated/ 1000)} km</span>
                    </li>
                )
            })
        ) : (
            <span>There is no ninjas in the area!</span>
        )
        
        const content = !this.state.error ? (
            ninjas
        ) : (
            <span>Wrong parameters!</span>
        )

        return(
        <React.Fragment>
            <h1 class="title">Ninjago - a Ninja REST API</h1>
            <div id="homepage">
                <h1>Hire a ninja in your area!</h1>
                <div id="ninjas"></div>
            </div>
            
            <div id="ninja-container">
            <Link to="/login" className="button">Login</Link>
                <form id="search" onSubmit={this.handleSubmit}>
                    <label>Enter your latitude:</label>
                    <input type="text" ref="lat" placeholder="latitude" required />
                    <label>Enter your longitude:</label>
                    <input type="text" ref="lng" placeholder="longitude" required />
                    <input type="submit" value="Find Ninjas" />
                </form>
                <ul>{content}</ul>
            </div> 
        </React.Fragment> 
        )
    }
}

export default Ninjas