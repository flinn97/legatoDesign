import React, { Component } from 'react';
import authService from '../services/auth';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmission=this.handleSubmission.bind(this);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.state={
            selectedFile: undefined,
            path: undefined,
            email: "",
            password: ""
        }
    }
    componentDidMount(){
        window.addEventListener('keydown', (e)=>{
            
            if(e.key==="Enter"){
                                this.handleSubmission(e);
                
            }
        })
    }

	handleChange = async (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
        
	};


	async handleSubmission()  {
        debugger
        if(!this.state.email||!this.state.password){
            this.setState({
                message:"fill out the login information"
            })
            return
        }
        let user =  await authService.login(this.state.email, this.state.password, this.props.app.state.componentList)
        if(user){
            this.props.app.dispatch({login:true, register:false, loginPage:false, registerPage:false, user:user, email:this.state.email})
        }
        else{
            this.setState({
                message:"email or password incorrect"
            })
        }
        
        
	};
    render(){
        let app = this.props.app;
        let state = app.state;
        let dispatch = app.dispatch;
        let component = state.currentComponent;
       
        let styles =state.styles;
        let compJson = component?.getJson();
        let opps = component?.getOperationsFactory();
        let key =compJson?.collection? "update": "add";
        return(
                    <div style={{
                        
                        width: "98vw", 
                        borderRadius: styles.borders.radius1,
                        marginLeft:"1vw",
                        marginTop:"3vh",
                        minHeight: "88vh",
                        maxHeight: "50vh",
                        background: styles.colors.Grey1,
                        boxShadow: styles.shadows.homeShadow,
                        paddingTop: "2vh",
                        paddingLeft: "1vw",
                        paddingRight: "1vw",
                        alignContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        }}>
                        <div 
                        style={{display: "flex", flexDirection:"column", justifyContent:"center",
                         alignContent: "center",
                         alignItems: "center",
                         alignSelf: "center",
                        marginTop:styles.margins.marginSmallH, width:"100%"}}>
                        <div style={{fontFamily: styles.fonts.fontTitle, fontSize: styles.fonts.fontHeader5,}}>Login</div>                     
                     <div style={{marginTop:"2vh",}} >
                    
                            <label htmlFor="lastName"><div style={{fontFamily: styles.fonts.fontNormal, marginRight: styles.margins.marginSmallW, fontSize: styles.fonts.fontHeader1,}}>Email</div></label>
                            <input style ={{fontFamily: styles.fonts.fontNormal, height: "3vh", width: "18vw",
                    borderWidth: styles.mySpawn.border ,}} type="text" id="last"   onChange={this.handleChange} name="email"/>
                        </div>
                        {!this.state.forgot&&(
                        <div style={{marginTop:"2vh", marginBottom:styles.margins.marginSmallH}} >
                            <label htmlFor="lastName"><div style={{fontFamily: styles.fonts.fontNormal,marginRight: styles.margins.marginSmallW, fontSize: styles.fonts.fontHeader1,}}>Password</div></label>
                            <input  style ={{fontFamily: styles.fonts.fontNormal, height: "3vh",
                    borderWidth: styles.mySpawn.border, width: "18vw"}} type="password" id="pwd"   onChange={this.handleChange} name="password"/>
                        </div>)}
                        <div style={{display: "flex", flexDirection:"column", justifyContent:"center",
                         alignContent: "center",
                         alignItems: "center",
                         alignSelf: "center",}}>
                         {!this.state.forgot&&(<button id="submitButton" style={{...styles.buttons.buttonFollow, padding:"2px", marginTop:"2vh", fontSize: styles.fonts.fontHeader1, minWidth:"fit-content", minHeight:"fit-content"}} class= "btn" onClick={this.handleSubmission}>Login</button>)}
                         <div style={{...styles.buttons.buttonFollow, padding:"2px", background: "", color: styles.colors.Grey3, minWidth:"fit-content", minHeight:"fit-content", fontFamily: styles.fonts.fontNormal, marginTop:"2vh", cursor:"pointer", fontSize: styles.fonts.fontHeader1,}}  onClick={dispatch.bind(this, {registerPage:true, trylogin:false, operation: "cleanPrepare", operate: "adduser", object:undefined})}> 
                         Register</div>
                         <div onClick={()=>{this.setState({forgot:true})}}>Forgot</div>
                         {this.state.forgot&&(<>
                                    <div className="form-group" style={{marginTop:"37px"}}>
                                        type in email and hit submit. you'll get an email to change your password
                                    <button className="btn  btn-block" style={{ ...styles.buttons.buttonLog, marginBottom:"1vh" }} onClick={authService.sendForgotPasswordChange.bind(this,this.state.email)} >
                                        <span>Submit</span>
                                    </button>
                                    <div onClick={()=>{this.setState({forgot:false})}}>Nevermind</div>

                                </div></>)}
                     </div>
                     <div style={{color:"red"}}>{this.state.message}</div>
                     </div>
                 </div>
             )
    }
	
}