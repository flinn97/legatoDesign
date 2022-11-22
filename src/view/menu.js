import React, { Component } from 'react';
import dash from "../assets/Dashboard.svg";
import cal from "../assets/Calendar.svg";
import chat from "../assets/ChatSVG.svg";

class Menu extends Component {
    constructor(props) {
        //create state
        super(props);
        this.state = {
            
        };
    }
    

    render() {
        let app = this.props.app;
        let state = app.state;
        let styles =state.styles;
        let dispatch = app.dispatch;
        let list = state.componentList;

       
        return (
            <div 
                    style={{
                        display:"flex", 
                        flexDirection:"column", 
                        textAlign: "center",
                        color: styles.colors.color1,
                        fontWeight: styles.fonts.fontweightMed,
                        fontFamily: styles.fonts.appTitle,
                        fontSize: styles.fonts.fontsize1,
                        fontWeight: styles.fonts.fontweightMain,
                        width: "88%",
                        flex: .59,
                        font: styles.fonts.fontSide,
                        marginBottom:"10vh"

                        }}>
                {state.currentuser.getJson().type==="student"?(<div 
                    style={{
                        padding: this.props.app.state.styles.margins.margin5,
                        cursor:"pointer",
                        border: "0px solid #000000", 
                        borderRadius: "9px",
                        margin: "0 auto",
                        height: this.props.app.state.styles.margins.margin3,
                        marginTop: this.props.app.state.styles.margins.margin4,
                        width: state.ipad? "50px": window.innerWidth<1425? "12.75vw":"10.5vw",
                        paddingLeft:"10px",
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"",
                        background: this.props.app.state.myswitch==="studentDash" ? styles.colors.colorBackground:"",
                        
                        color: this.props.app.state.myswitch==="studentDash" ? styles.colors.colorOffBlack:styles.colors.colorOffBlack+"DE",
                        fontWeight: this.props.app.state.myswitch==="studentDash" ? styles.fonts?.fontweightMed:styles?.fonts?.fontweightMain,
                    }}
                onClick={async ()=>{
                    //
                    window.history.pushState({state: "StudentDashboard"}, "page 1", "dashboard")
                    await this.props.app.dispatch({keepChat:false})
                    this.props.app.dispatch({myswitch:"studentDash"})
                }
                }><div style={{ display:"flex",
                flexDirection:"row",
                width:"53%",
                
                }}><img style={{marginLeft: state.ipad?"6.5px": ""}}  src = {dash}/>{!state.ipad &&(<p style={{fontFamily:styles.font?.appFont,marginLeft:"20px",}}>Dashboard</p>)}</div></div>
                ):(<div 
                    style={{
                        padding: this.props.app.state.styles.margins.margin5,
                        cursor:"pointer",
                        border: "0px solid #000000", 
                        borderRadius: "9px",
                        margin: "0 auto",
                        height: this.props.app.state.styles.margins.margin3,
                        marginTop: this.props.app.state.styles.margins.margin4,
                        width: state.ipad? "50px": window.innerWidth<1425? "12.75vw":"10.5vw",
                        paddingLeft:"10px",
                        
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"",
                        background: this.props.app.state.myswitch==="dash" ? styles.colors.colorBackground:"",
                        
                        color: this.props.app.state.myswitch==="dash" ? styles.colors.colorOffBlack:styles.colors.colorOffBlack+"DE",
                        fontWeight: this.props.app.state.myswitch==="dash" ? styles.fonts.fontweightMed:styles.fonts.fontweightMain,
                    }} 
                onClick={async()=>{
                    //
                    window.history.pushState({state: "dash"}, "page 2", "dashboard")
                    await this.props.app.dispatch({ keepChat:false})
                    this.props.app.dispatch({...this.props.app.state.switch.dashboard})}}>
                        <div style={{ display:"flex",
                        flexDirection:"row",
                        width:"53%",
                        }}><img style={{marginLeft: state.ipad?"6.5px": ""}}  src = {dash}/>{!state.ipad &&(<p style={{marginLeft:"20px",}}>Dashboard</p>)}</div></div>)}

                {state.currentuser.getJson().role==="student"?(<div style={{cursor:"pointer",}} 
                onClick={async()=>{
                    await this.props.app.dispatch({ keepChat:false})
                    this.props.app.dispatch({...this.props.app.state.switch.teacher})}}></div>):(
                <a
                //  href="http://localhost:8081/legato/calendar"
                    style={{
                        textDecoration:"none",
                        padding: this.props.app.state.styles.margins.margin5,
                        cursor:"pointer",
                        border: "0px solid #000000", 
                        borderRadius: "9px",
                        margin:"0 auto",
                        height: this.props.app.state.styles.margins.margin3,
                        marginTop: this.props.app.state.styles.margins.margin4,
                        width: state.ipad? "50px": window.innerWidth<1425? "12.75vw":"10.5vw",
                        paddingLeft:"10px",
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"",
                        background: this.props.app.state.myswitch==="calendar" ? styles.colors.colorBackground:"",

                        color: this.props.app.state.myswitch==="calendar" ? styles.colors.colorOffBlack:styles.colors.colorOffBlack+"DE",
                        fontWeight: this.props.app.state.myswitch==="calendar" ? styles.fonts.fontweightMed:styles.fonts.fontweightMain,
                    }} 
                onClick={async()=>{
                   await this.props.app.dispatch({ keepChat:false})
                    this.props.app.dispatch({...this.props.app.state.switch.calendar})}}><div style={{ display:"flex",
                    flexDirection:"row",
                    width:"53%",
                    }}><img style={{marginLeft: state.ipad?"6.5px": ""}} src = {cal}/>{!state.ipad &&(<p style={{marginLeft:"20px",}}>Calendar</p>)}</div></a>)}
                <div 
                    style={{
                        padding: this.props.app.state.styles.margins.margin5,
                        cursor:"pointer",
                        border: "0px solid #000000", 
                        borderRadius: "9px",
                        margin:"0 auto",
                        height: this.props.app.state.styles.margins.margin3,
                        marginTop: this.props.app.state.styles.margins.margin4,
                        width: state.ipad? "50px": window.innerWidth<1425? "12.75vw":"10.5vw",
                        paddingLeft:"10px",
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"",
                        background: this.props.app.state.myswitch==="chat" ? styles.colors.colorBackground:"",
                        color: styles.colors.color3,
                        
                        color: this.props.app.state.myswitch==="chat" ? styles.colors.colorOffBlack:styles.colors.colorOffBlack+"DE",
                        fontWeight: this.props.app.state.myswitch==="chat" ? styles.fonts.fontweightMed:styles.fonts.fontweightMain,
                    }} 
                onClick={this.props.app.dispatch.bind(this,{...this.props.app.state.switch.chat, keepChat:true})}><div style={{ display:"flex",
                flexDirection:"row",
                width:"53%",
                }}><img style={{marginLeft: state.ipad?"6.5px": ""}} src = {chat}/>{!state.ipad &&(<p style={{marginLeft:"20px",}}>Messages</p>)}</div></div>

            </div>

               
        );
    }
}

export default Menu;