import React, { Component } from "react";
import authService from "../services/auth.service";
import AuthService from "../services/auth.service";
import AdminEdit from "./adminedit.js";
//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
class Admin extends Component {
    constructor(props) {
        super(props);
        this.more = this.more.bind(this);
        this.less = this.less.bind(this);
        this.deleted = this.deleted.bind(this);

        this.state = {
            currentUser: undefined,
            accounts: [],
            Teachers: [],
            students: [],
            more: false,
            current: undefined,
            account: false,
        }

    };

    async componentDidMount() {
        let auth = AuthService.getCurrentUser();
        if (auth.role !== "admin") {
            this.props.app.history.push("/");
            window.location.reload();
        }
        else {
            await this.setState({
                currentUser: auth,
            })
            AuthService.getAllaccounts(this.state.currentUser.email, "Samantha0320!").then(response => {
                console.log(response.data);
                this.setState({
                    accounts: response.data
                })
            });
            AuthService.getAllstudents(this.state.currentUser.email, "Samantha0320!").then(response => {
                this.setState({
                    students: response.data
                })
            });
            AuthService.getAllusers(this.state.currentUser.email, "Samantha0320!").then(response => {
                this.setState({
                    Teachers: response.data
                })
            });
           
        }
        console.log(this.state);
    }

    less() {
        this.setState({
            more: false,
            current: undefined,
            account: false,

        })
    }
    more(clicked, account) {
        if (account) {
            this.setState({
                account: true,
                more: true,
                current: clicked
            })
        }
        else {
            this.setState({
                more: true,
                current: clicked
            })
        }
        
    }
    deleted(id) {
        AuthService.admindelete(id);
        window.location.reload();
    }


    render() {
        return (

            <div className="fill1 centerized" style={{ zIndex: "1010" }}>
                {this.state.more && (<AdminEdit current={this.state.current} account={this.state.account} handleClose={this.less}/> )}

                {this.state.currentUser ? (<div className="fill1 centerized" >
                    {this.state.currentUser.role === "admin" ? (
                        <div className="fill1 centerized" >


                            <div className="fill1 checkboxstuff centerized z2">

                                {this.state.accounts.length !== 0 ? (

                                    <div className="card-container2ab " style={{ height: "700px" }}>
                                        <div className="homeworkScroll" >
                                {
                                    this.state.accounts.map((account, index) => 
                                        <div className="checkboxstuff7 fill2" key={index}>
                                            < div className="checkboxstuff fill2"> <p onClick={this.more.bind(this, account, true)} className="huv rowss">{account.email}</p> <p style={{ marginLeft: "50px" }} onClick={this.deleted.bind(this, account._id)} className="huv rowss">delete</p></div>
                                        </div>

                                    
                                    )}



                                        </div>


                                        </div>


                                ) : (<div>
                                        I got here
                                    </div>)}



                                {this.state.Teachers.length !== 0 ? (

                                    <div className="card-container2ab" style={{ height: "700px" }}>
                                        <div className="homeworkScroll" >
                                        {
                                            this.state.Teachers.map((teacher, index) =>
                                                <div className="checkboxstuff7 fill2" key={index}>
                                                    < div className="checkboxstuff fill2"> <p onClick={this.more.bind(this, teacher, true)} className="huv rowss">{teacher.email}</p> <p style={{marginLeft: "50px"}} onClick={this.deleted.bind(this, teacher._id )} className="huv rowss">delete</p></div>

                                                </div>


                                            )}

                                                    </div>


                                    </div>



                                ) : (<div>
                                        I got here
                                    </div>)}



                                {this.state.students.length !== 0 ? (

                                    <div className="card-container2ab " style={{ height: "700px" }}>
                                        <div className="homeworkScroll" >
                                        {
                                            this.state.students.map((student, index) =>
                                                <div className="checkboxstuff7 fill2" key={index}>
                                                    < div className="checkboxstuff fill2" > <p onClick={this.more.bind(this, student, true)} className="huv rowss">{student.firstName} {student.email}</p> <p style={{ marginLeft: "50px" }} onClick={this.deleted.bind(this, student._id)} className="huv rowss">delete</p></div>

                                                </div>


                                            )}

                                            </div>

                                    </div>



                                ) : (<div className="card-container2ab">
                                    I got here
                                </div>)}


                            </div>



                        </div>
                    ) : (<div></div>)}


                </div>) : (<div></div>)}
           


                
            </div>

        )
    }
};

export default Admin;