import React, { Component } from "react";
import AuthService from "../services/auth.service";
import Student from "./mystudents";
import Opps from "../npm/compontsList";
import OppsFactory from "../npm/operationsFactory";
import loading from "../assets/loading.gif";
import styleService from "../services/styleService";
import logoLegato from "../assets/logo.png";


export default class Login extends Component {
   
    //state creation and binding.
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            
            done:false,
            email:"",
            password:"",
            loading:false,
            messageSwitch: false,
            currentMessage:"",
            message:{
                wrongPassword:"Email or password was incorrect please try again.",
                email:"Please fill out the required fields.",
                

            },
            attempt: 0,
            tooManyLoginAttempts:false
        };
    }


    //handles all changes with state.
    handleChange = (event) => {
        
        const { name, value } = event.target

        this.setState({
            [name]: value,
        })
    }
    componentDidMount(){
        window.addEventListener('keydown', (e)=>{
            
            if(e.key==="Enter"){
                
                // e.preventDefault();
                this.handleLogin(e);
                
            }
        })
    }

    //submites for login using the controller to connect with backend. Sends to the teacher profile if teacher or the student if back end spits out student.
    async handleLogin(e,) {
        
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
        if(this.state.email===""){
            this.setState({
                messageSwitch:true,
                currentMessage:this.state.message.email,
                loading:false,
            })
            return
        }
        await this.setState({
            loading:true
        })
        debugger
        e.preventDefault();
        let email = this.state.email
        let password = this.state.password
        let student = false;
        let teacher = false;
        let app = this.props.app;
       let dispatch= app.dispatch;
       let state = app.state;
       let styles = state.styles;
       let comp = this.props.app.state.componentList;
        if(this.state.student){
            let getEmail = await AuthService.getStudentsTeacher(email+"@legato.com");
            email = email+"@legato.com";
            teacher = getEmail.email;
            password = this.state.email;
            student = this.state.email;
            this.props.app.dispatch({firstTime:true})
        }
        else{
            let s = await AuthService.getStudentsTeacher(email);
            if(s?.student){
                student= s._id;
                teacher= s.email;
            }
        }
        let user = await AuthService.login(email, password, this.props.app.state.componentList, student, teacher);
        
        if(user){
            if(!student){
                window.location.reload();

            }
            else{
            await AuthService.getAllTheDataForTheUser(email, this.props.app.state.componentList, student, teacher, this.props.app.dispatch);

            }

        }
        else{
            this.setState({
                messageSwitch:true,
                loading:false,
                currentMessage:this.state.message.wrongPassword
            })
        }
    }


    render() {
        let app = this.props.app;
       let dispatch= app.dispatch;
       let state = app.state;
       let styles = state.styles;
       let comp = this.props.app.state.componentList;
        //login page for the screen. 
        return (
            <div style={{width:"100%", height:"100%"}}>
                <div style={{width:"100%", height:"50px", fontFamily: styles.fonts.appFont}} >
                    <div onClick={()=>{
                    this.props.app.dispatch({operate: "adduser", operation:"cleanPrepare", login:false});
                }} style={{width:"fit-content", height: "fit-content", marginLeft:"1vw", marginTop:"1vh", textDecoration:"underline", color:styles.colors.color1, fontSize:"2.3vh", pointer:"cursor", userSelect:"none"}}>
                    Register Here
                    </div>
                </div>
            <div className="col-md-12" style={{background:"linear-gradient(#FFFFFF, #C9F5E1, #FFFFFF)"}}> 
            
                <div> 
                <div  className="card card-container" style={{background:"white"}}>
                <img src={logoLegato} style={{alignSelf:"center", marginBottom:"1vh",width:state.iphone?"40vw":"9vw",}}/>
                    <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card"/>
                    {this.state.forgot?(<>
                    
                        <div style={{fontFamily:styles.fonts.appFont}} className="form-group">
                                    <label htmlFor="Email">{this.state.student?(<>Code</>):(<>Please enter your email</>)}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        maxLength="30"
                                    />
                                </div></>):(
                    <>
                                <div className="form-group">
                                    <label htmlFor="Email">{this.state.student?(<>Code</>):(<>Email</>)}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        maxLength="30"
                                    />
                                </div>
                            {!this.state.student&&(
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
                                </div>)}
                                </>)}
                                {this.state.forgot?(<>
                                    <div className="form-group" style={{marginTop:"37px"}}>
                                    <button className="btn  btn-block" style={{ ...styles.buttons.buttonLog, marginBottom:"1vh" }} onClick={AuthService.sendForgotPasswordChange.bind(this,this.state.email)} >
                                        <span>Submit</span>
                                    </button>
                                </div></>):(
                                <div className="form-group" style={{marginTop:"37px"}}>
                                    <button className="btn  btn-block" style={{ ...styles.buttons.buttonLog, height: "3.2vh", color: "#F0F2EF", width: state.iphone?"35vw": "11vw", marginBottom:"2vh" }} onClick={this.handleLogin} >
                                        <span>{this.state.loading?(<><img src={loading} style={{alignSelf:"center", marginBottom:"1vh",width:"20px",}}/>Loading...</>):(<>Login</>)}</span>
                                    </button>
                                    {this.state.messageSwitch&&(<div style={{color:"red"}}>{this.state.currentMessage}</div>)}
                                </div>
                                )}
                               {!this.state.student? (<div style={{color:"blue", cursor:"pointer", textDecoration:"underline", marginBottom:"1vh"}} onClick={()=>{this.setState({student:true})}}>Have a Code?</div>):(<div style={{color:"blue", cursor:"pointer", textDecoration:"underline"}} 
                               onClick={()=>{this.setState({student:false})}}>Back</div>)}
                                <div style={{color:"blue", cursor:"pointer", textDecoration:"underline"}} onClick={()=>{this.setState({forgot:true})}}> {this.state.forgot? "" : "Forgot Password" }</div>
                   
                    
                </div>
            </div></div>
            </div>
        );
    }
}