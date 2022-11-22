import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";
import authService from "../services/auth.service";
import AuthService from "../services/auth.service";
import Pic from "../components/diapicture";
import EditBack from "../components/editBackground";

//this component details my dialog help component
const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const required = value => {
    if (value === "") {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
class Adminedit extends Component {
    //using the functions sent from the profile page allows me to send back student information typed in to profile and then to the backend. 
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.cleargoals = this.cleargoals.bind(this);
        this.clearhw = this.clearhw.bind(this);
        this.cleararchive = this.cleararchive.bind(this);
        this.clearchecks = this.clearchecks.bind(this);
        this.changepics = this.changepics.bind(this);
        this.changeback = this.changeback.bind(this);
        this.handleSub = this.handleSub.bind(this);
        this.closepic = this.closepic.bind(this);
        this.closeback = this.closeback.bind(this);



        this.state = {
            email: "",
            password: "",           
            pic: false,
            background: false,
            last: "",
            first: "",
            checkbox:"",
        }

    };

    cleargoals() {
        authService.cleargoals(this.props.app.current._id);

    }
    clearhw() {
        authService.clearhw(this.props.app.current._id);

    }
    cleararchive() {
        authService.cleararchive(this.props.app.current._id);

    }
    clearchecks() {
        authService.clearChecks(this.props.app.current._id);

    }
    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({
            [name]: value,
        })
    }
    changepics() {
        this.setState({
            pic: true,

        })
    }
    changeback() {
        this.setState({
            background: true,

        })
    }
    closepic() {
        this.setState({
            pic: false,

        })
    }
    closeback() {
        this.setState({
            background: false,

        })
    }

    handleSub(account, teacher, student) {
        if (account) {
            authService.changeAccountInfo(this.props.app.current._id, this.state.email, this.state.password,);
        }
        else if (teacher) {

            authService.changeuserinfoA(this.props.app.current._id, this.state.first, this.state.last, this.state.email, this.state.password,);

        } 

        else if (student) {
            authService.changeStudentinfoA(this.props.app.current._id, this.state.first, this.state.last, this.state.email, this.state.checkbox, this.state.password);
        }

    }

    render() {
        return (

            <div className="popup-box " style={{ zIndex: "2000" }}>
                {this.state.pic && (<Pic handleClose={this.closepic} realusr={this.props.app.current} />)}

                {this.state.background && (<EditBack handleBackClose={this.closeback} realusr={this.props.app.current} />)}
                <div className="box z2">
                    <span className="close-icon-2 " onClick={this.props.app.handleClose}>x</span>
                    


                    {this.props.app.account ? (<div>
                        <Form
                            onSubmit={this.handleSub.bind(this, true, false, false)}
                            ref={c => {
                                this.form = c;
                            }}
                        >
                            <div className="form-group">
                                <label htmlFor="email">Change Email?</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    validations={[email]}
                                    onChange={this.handleChange}
                                    name="email"
                                    placeholder={this.props.app.current.email}

                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstName">Change Password?</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="password"
                                    validations={[]}

                                    onChange={this.handleChange}
                                    name="password"
                                    placeholder={this.props.app.current.password}

                                />
                            </div>
                            <div style={{ marginTop: "35px" }}>
                                <button className="btn btn-primary" value="submit" >Change Account Info</button>
                            </div>
                        </Form>


                    </div>) : (<div></div>)}

                    {!this.props.app.account ? (<div>


                        {this.props.app.current.role === "teacher" ? (<div>
                            <Form
                                onSubmit={this.handleSub.bind(this, false, true, false)}
                                ref={c => {
                                    this.form = c;
                                }}
                            >
                                <div className="form-group">
                                    <label htmlFor="firstName">Change Email?</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        validations={[email]}
                                        onChange={this.handleChange}
                                        name="email"
                                        placeholder={this.props.app.current.email}

                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="firstName">Change Password?</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="password"
                                        validations={[]}
                                        placeholder={this.props.app.current.password}

                                        onChange={this.handleChange}
                                        name="password"
                                    />
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="first"
                                            validations={[required]}
                                            placeholder={this.props.app.current.firstname}

                                            onChange={this.handleChange}
                                            name="first"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="last"
                                            validations={[required]}
                                            placeholder={this.props.app.current.lastname}

                                            onChange={this.handleChange}
                                            name="last"
                                        />
                                    </div>
                                    <h5 onClick={this.changepics} className="huv rowss">Pics?</h5>
                                    <h5 onClick={this.changeback} className="huv rowss">Background?</h5>
                                    
                                        
                                    

                                </div>
                                <div style={{ marginTop: "35px" }}>
                                    <button className="btn btn-primary" value="submit" >Change User info</button>
                                </div>
                            </Form>

                        </div>) : (<div></div>)}


                        {this.props.app.current.role === "student" ? (<div>
                            <Form
                                onSubmit={this.handleSub.bind(this, false, false, true)}
                                ref={c => {
                                    this.form = c;
                                }}
                            >
                                <div className="form-group">
                                    <label htmlFor="firstName">Change Email?</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        validations={[email]}
                                        onChange={this.handleChange}
                                        name="email"
                                        placeholder={this.props.app.current.email}

                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="firstName">Change Password?</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="password"
                                        validations={[]}
                                        placeholder={this.props.app.current.password}
                                        onChange={this.handleChange}
                                        name="password"
                                    />
                                    <div className="form-group">
                                        <label htmlFor="firstName">Student First Name*</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="first"
                                            validations={[required]}
                                            placeholder={this.props.app.current.firstName}

                                            onChange={this.handleChange}
                                            name="first"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Student Last Name*</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="last"
                                            validations={[required]}
                                            placeholder={this.props.app.current.lastName}

                                            onChange={this.handleChange}
                                            name="last"
                                        />
                                    </div>
                                    <h5>Checkboxes?</h5>
                                    <select htmlFor="checkbox" onChange={this.handleChange} name="checkbox" id="checkbox">
                                        <option value="">{this.props.app.current.checkboxes}</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="0">0</option>
                                    </select>
                                    <h5 onClick={this.clearhw} className="huv rowss">Clear Homework</h5>
                                    <h5 onClick={this.cleargoals} className="huv rowss">Clear Goals</h5>
                                    <h5 onClick={this.cleararchive} className="huv rowss">Clear Archive</h5>
                                    <h5 onClick={this.clearchecks} className="huv rowss">Clear checks</h5>


                                    <h5 onClick={this.changepics} className="huv rowss">Pics?</h5>
                                    <h5 onClick={this.changeback} className="huv rowss">Background?</h5>

                                    

                                </div>
                                <div style={{ marginTop: "35px" }}>
                                    <button className="btn btn-primary" value="submit" >Change Student Info</button>
                                </div>
                            </Form>


                        </div>) : (<div></div>)}


                    </div>): (<div></div>)}
                            
                    

                   
                </div>
            </div>

        )
    }
};

export default Adminedit;