import React, { Component } from 'react'

class Login extends Component {
    state = {
        email: "",
        password: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value

        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state)
        try{
            const res = await fetch('/api/ninjas/login', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                'Content-Type': 'application/json'
                }
            })
            if(res.status !== 200) {
                throw new Error(res.error)
            }
            this.props.history.push('/')
        } catch (e) {
            console.log(e)
            alert('Error logging in please try again');
        }
        //console.log(this.state)
    }

    render() {
    
        return (
        
            <div id="ninja-container">
                    <form id="search" onSubmit={this.handleSubmit}>
                        <label>Email</label>
                        <input type="text" id="email" placeholder="email" onChange={this.handleChange} required />
                        <label>Password</label>
                        <input type="password" id="password" placeholder="password" onChange={this.handleChange} required />
                        <input type="submit" value="Login" />
                    </form>
            </div> 
        )
    }
}



export default Login
