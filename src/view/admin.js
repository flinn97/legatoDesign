import React, { Component } from 'react';
import authService from '../services/auth.service.js';
import "../view.css"
class Admin extends Component {
    constructor(props) {
        //create state
        super(props);
        this.onclick=this.onclick.bind(this)

        this.state = {
            firstname:"",
            lastname: "",
            email: "",
            password: "",
            users: []
        };
    }
    async componentDidMount(){
        let users= await authService.getAllusers()
        this.setState({users:users})
    }
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value,
        })
    }
    async onclick(){

        let user = await authService.register(this.state.firstname, this.state.lastname, this.state.email, this.state.password)
        console.log(user)
        let ar = this.state.users
        ar.push(user)
        this.setState({
            users: ar
        })
    }
    render() {
               return (
<div style={{width:"70vw", height:"90vh", border:"1px solid black", marginTop:"40px"}}>
    <div style={{width:"200px",}}>
                    <div className="form-group">
                                    
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstname"
                                        placeholder="First Name"
                                        value={this.state.firstname}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                    <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastname"
                                        placeholder="Last Name"
                                        value={this.state.lasttname}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="password"
                                        placeholder="New Password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div style={{width:"120", color:"white", background:"green", cursor:"pointer"}} onClick={this.onclick}>add user</div>
                                </div>
                                {this.state.users?(<div>{this.state.users.map((user, index) =><div key={index} >{user.firstname}</div>)}</div>):(<></>)}
                                </div>
                     

        );
    }
}

export default Admin;