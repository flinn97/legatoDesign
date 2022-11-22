import React, { Component } from 'react';
import Sidemenu from "./sidemenu.js";
import Dash from "./dash.js";
import "../view.css";
import Chat from "./chat.js";
import Studentview from "./studentDash.js";//"./studentdash.js" ;
import Metro from "./metro.js";//"../pages/metro.js" ;
import Calendar from "./calendar.js";//"../pages/calendar.js" ;
import Studentlist from "./dash.js";//"..pages/profile.js" ;

 
 

export default class Dashboard extends Component {
    constructor(props) {
        //create state
        super(props);
        this.state = {
            
        };
    }
    

    render() {
       

        return (
            <div style={{display:"flex", flexDirection:"row", justifycontent:"space-between"}}>
                <div className="sidemenu">
                <Sidemenu handleChange={this.props.app.handleChange} dispatch={this.props.app.dispatch}app={this.props.app.state}/>
                </div>
                student
                <Switchcase handleChange={this.props.app.handleChange} dispatch={this.props.app.dispatch}app={this.props.app.state}/>
                

            </div>
        );
    }
}

function Switchcase (props) {
    if(props.state.viewstudent){
        return <Studentview handleChange={props.handleChange} dispatch={props.dispatch} props={props.state}/>
    }
    else if(props.state.metro){
        return <Metro handleChange={props.handleChange} dispatch={props.dispatch} props={props.state}/>
    }
    else if(props.state.calendar){
        return <Calendar handleChange={props.handleChange} dispatch={props.dispatch} props={props.state}/>
    } 
    else if(props.state.studentlist){
        return <Studentlist handleChange={props.handleChange} dispatch={props.dispatch} props={props.state}/>
    }
    else if(props.state.chat){
        return <Chat handleChange={props.handleChange} dispatch={props.dispatch} props={props.state}/>

    }
    else{
        return <Dash handleChange={props.handleChange} dispatch={props.dispatch} props={props.state}/>

    }
   
}
