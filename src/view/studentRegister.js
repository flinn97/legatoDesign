import React, { Component } from "react";
import AuthService from "../services/auth.service";
import validator from 'validator';
import loading from "../assets/loading.gif";

//import ReCAPTCHA from "react-google-recaptcha";
import studentService from "../services/studentService";

export default class StudentRegister extends Component {
    componentDidMount() {
        // let auth = AuthService.getCurrentUser();
        // if (auth) {
        //     if (auth.role === "teacher") {
        //         this.props.app.history.push("/profile");
        //     }
        //     if (auth.role === "student") {
        //         this.props.app.history.push("/student_routes");
        //     }
        // }
    }
    //state creation and binding.
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            enabled:false,

            loading:false,
            messageSwitch: false,
            currentMessage:"",
            message:{
                email:"Please fill out the required fields.",
                password:"Password must include at least 1 symbol 1 number 1 upper and lower case letters and be at least 8 characters long",
                notAnEmail:"Please enter a valid email"

            },
            attempt: 0,
            tooManyLoginAttempts:false
           
        };
    }
    componentDidMount(){
        window.addEventListener('keyup', (e)=>{
            if(e.key==="Enter"){
                e.preventDefault();
                this.handleLogin(e);
                
            }
        })
    }
    onChange(value) {
        
      }
    //handles all changes with state.
    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({
            [name]: value,
        })
    }
    //submites for login using the controller to connect with backend. Sends to the teacher profile if teacher or the student if back end spits out student.
    async handleLogin(e) {
        if(this.state.attempt>=10){
            this.setState({
                tooManyLoginAttempts:true,
            })
            return;
        }
        else{
            this.setState({
                attempt: this.state.attempt+1
            })
        }
        await this.setState({
            loading:true
        })
        if(validator.isStrongPassword(this.state.password, {
            minLength: 6, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
          })) {
            
          } else {
            if(this.state.email.length>0){
                this.setState({
                    currentMessage:this.state.message.password,
                    loading:false,
                    messageSwitch:true
                })
                return
            }
            
          }
          if(this.state.email===""){
            this.setState({
                currentMessage:this.state.message.email,
                loading:false,
                messageSwitch:true
            })
            return
          }
          if(!validator.isEmail(this.state.email)){
            this.setState({
                currentMessage:this.state.message.notAnEmail,
                loading:false,
                messageSwitch:true
            })
            return
          }
        
        await studentService.changeStudentsEmail(this.state.email, this.state.password, this.props.app.state.currentuser, this.props.app.dispatch);
    
    }

    render() {
        //login page for the screen. 
        return (
            <div style={{width:"100%", height:"100%"}}>
                {/* <div style={{width:"100%", height:"50px"}} onClick={this.props.app.dispatch.bind(this,{login:true})}>
                    login
                </div> */}
            <div className="col-md-12">
                <div className="card card-container">
                    <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card"/>
                        Welcome to Legato Student! Please enter a new email and password to continue.
                                <div className="form-group">
                                    <label htmlFor="Email">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        maxLength="30"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        maxLength="20"

                                    />
                                </div>
                                <div className="form-group" style={{marginTop:"37px"}}>
                                    <button className="btn  btn-block" style={{ background: "#696eb5", height: "35px", color: "#F0F2EF", width: "85spx" }} onClick={this.handleLogin} >
                                        <span>{this.state.loading?(<><img src={loading} style={{width:"20px", height:"20px"}}/>Loading...</>):(<>Continue</>)}</span>
                                    </button>
                                    {this.state.messageSwitch&&(<div style={{color:"red"}}>{this.state.currentMessage}</div>)}
                                </div>
                                {/* <ReCAPTCHA
        sitekey="6LeiGochAAAAAMq6jjzeQhFrO7NILcrx44bt0Now"
        onChange={this.onChange}
      /> */}

                   
                    
                </div>
            </div>
            </div>
        );
    }
}