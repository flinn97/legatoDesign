import React, { Component } from 'react';
import Sidemenu from "./sidemenu.js";
import Dash from "./dash.js";
import "../view.css";
import Chat from "./chat.js";
import Studentview from "./studentDash.js";//"./studentdash.js" ;
import Metro from "./metro.js";//"../pages/metro.js" ;
import Calendar from "./calendar.js";//"../pages/calendar.js" ;
import Teacher from './teacher.js';
import ChatRoom from './chatRoom.js';
import StudentDashboard from './studentDashboard.js';
import logo from '../assets/logo.png';
import chat from "../assets/ChatSVG.svg";
import wolf from "../assets/place1.png";
import ProfilePic from './profilepic.js';
import StudentList from './studentList.js';

export default class Dashboard extends Component {
    constructor(props) {
        //create state
        super(props);
        this.state = {
            
        };
    }

    componentDidMount(){
        if(this.props.app.state.currentuser){
            
            if(!this.props.app.state.currentuser?.getJson().paidCustomer && !this.props.app.state.currentuser?.getJson().trialCustomer){
                this.props.app.dispatch({popupSwitch:"trialOver"})
            }
        }
        
    }

    render() {
       let styles=this.props.app.state.styles;
        let app = this.props.app;
        let state= app.state;
        return (
            <div className={state.iphone? "scroller": ""} style={{
                    ...styles.alignMain,
                    backgroundColor: styles.colors.colorBackground,
                    width: "100%", 
                    height:"100%",
                    
                    fontFamily: styles.fonts.appFont,

                    marginTop: state.ipad? "0px": styles.borders.allmarginsH,
                                fontWeight: styles.fonts.fontweightMed,
                                
                                justifycontent: "center",

                                alignItems: state.ipad? "none":"center",
                    
                    
                    }}>
                        {!state.iphone?(
                <div style= {{
                    border: styles.borders.borderthin,
                    width: this.props.app.state.ipad?"7vw": "21vw",
                    height:"100vh",
                    border: "0px solid black" 
                }}
                >
                    
                <Sidemenu  app={this.props.app}/>
                </div>
                ):(<div style={{width:"100vw", height:"7vh", background:styles.colors.color6,
                fontFamily: styles.fonts.appFont,
                position:"fixed",
                color: styles.colors.appWhite,
               zIndex:"10000",
               display:'flex', flexDirection:"row", justifycontent:"space-between",
                boxShadow:styles.borders.dropShadow,}}><img onClick={async()=>{
                    //
                    if(state.currentuser.getJson().role==="teacher"){
                        window.history.pushState({state: "dash"}, "page 2", "dashboard")
                        await this.props.app.dispatch({ keepChat:false})
                        this.props.app.dispatch({...this.props.app.state.switch.dashboard})
                    }
                    else{
                        window.history.pushState({state: "StudentDashboard"}, "page 1", "dashboard")
                    await this.props.app.dispatch({keepChat:false})
                    this.props.app.dispatch({myswitch:"studentDash"})
                    }
                   }} src = {logo} style={{width:"30vw", maxHeight:"7vh"}}/>
                <div style = {{display:'flex', flexDirection:"row", width:"25vw", position:"absolute", right:"0", marginRight:"10px", marginTop:"4px"}}>
                    <img style={{width:"11vw", height:"11vw", maxHeight:"7vh", marginRight:"5px"}} src = {chat} onClick={app.dispatch.bind(this,{myswitch:"chat", keepChat:true})}/>
                    <div><img src = {state.currentuser.getJson().picURL?state.currentuser.getJson().picURL:wolf} style={{width:"12vw", maxHeight:"7vh",height:"12vw", borderRadius:"50%"}} onClick={()=>{this.setState({menu:!this.state.menu})}}/>
                    
                        </div>{this.state.menu &&( <div style={{position:"absolute", width:"60vw", right:"0", marginTop:"50px", background:"white", padding:"10px", borderRadius:"7px", boxShadow:"2px 3px 6px #D1D1D1" }}>
                        <p style={{position:"absolute", right:"0", marginRight:"20px" }} onClick={()=>{this.setState({menu:false})}}>x</p>
                        <div ><ProfilePic app={this.props.app} closeBox={this.setState.bind(this,{menu:false})}/></div>

                    </div>)}</div>
                    </div>)}
                <div  style={{marginTop:state.ipad ?"4vh":"0px", paddingTop:state.iphone?"7vh": "0px", ...styles.dashWidth, ...styles.iPhoneAlign}}>
                <Switchcase  app={this.props.app}/>
                </div>

            </div>
        );
    }
}

function Switchcase (props) {
    
    let app = props?.app
    let mypage={
        viewstudent: app.state.myswitch==="viewstudent" && (<Studentview  app={app}/>),
        studentDash: app.state.myswitch==="studentDash" && (<StudentDashboard  app={app}/>),
        metro: app.state.myswitch==="metro" && (<Metro  app={app}/>),
        calendar: app.state.myswitch==="calendar" && (<Calendar  app={app}/>),
        chat: app.state.myswitch==="chat" && (<ChatRoom  app={app}/>),
        teacherpage: app.state.myswitch==="teacherpage" && (<Teacher  app={app}/>),
        dash: app.state.myswitch==="dash" && (<Dash app={app}/>),
        studentList: app.state.myswitch==="studentList" && (<StudentList app={app}/>)

    }
    return mypage[app.state.myswitch]? mypage[app.state.myswitch]: <div></div>;

    // if( props.state.viewstudent ){
    //     return <Studentview handleChange={props.handleChange} dispatch={props.dispatch}app={props.state}/>
    // }
    // else if(props.state.metro){
    //     return <Metro handleChange={props.handleChange} dispatch={props.dispatch}app={props.state}/>
    // }
    // else if(props.state.calendar){
    //     return <Calendar handleChange={props.handleChange} dispatch={props.dispatch}app={props.state}/>
    // } 
    // else if(props.state.chat){
    //     return <Chat handleChange={props.handleChange} dispatch={props.dispatch}app={props.state}/>
    // }
    // else if(props.state.teacherpage){
    //     return <Teacher handleChange={props.handleChange} dispatch={props.dispatch}app={props.state}/>
    // }
    // else{
    //     return <Dash handleChange={props.handleChange} dispatch={props.dispatch}app={props.state}/>

    // }
   
}
