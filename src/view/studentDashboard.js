import React, { Component } from 'react';
import Studentinfo from './studentinfo.js';
import Homework from "./homework.js";
import Progress from "./progress.js";
import Goals from './goals.js';
import Notes from './notes.js';
import Stats from './stats.js';
import EditProgress from './popups/editProgress.js';
import "../view.css"
import Chat from './chat.js';
import TimerComponent from './timer.js';
import Metro from './metro.js';
/**
 * student. 
 */
class StudentDashboard extends Component {
    constructor(props) {
        //create state
        super(props);
        this.state = {
            bool:false
        };
    }
    async componentDidMount(){
        

        
        this.setState({bool:true});
    }

    render() {
        let app=this.props.app;
        let state= app.state;
        let styles=state.styles;
        let dispatch=app.dispatch;

        return (

                <div style={{display:"flex", flexDirection:"column", justifycontent:"center", marginLeft:state.iphone? "0px":styles.margins.margin3}}>
                    {this.state.bool&&(<>
                   {/* <div style={{display:"flex", flexDirection:"row"}}>
                     {app.state.componentList?.getList("student")?.map((student, index) =>
                        <div  onClick={dispatch.bind(this, {currentuser: student, currentstudent:student})}>{student.getJson().firstName}</div>
                        )}
                        </div>
                    {state.currentstudent.getJson()._id}
                    {state.popupSwitch==="editStudent"?(<EditProgress handleClose={dispatch.bind(this,{popupSwitch:""})} app = {app} />):(<></>)}
                    <div style={{display:"flex", flexDirection:"row"}}><h1 style={{marginTop:styles.margins.margin4}}>Student dash</h1><p onClick = {dispatch.bind(this,{popupSwitch:"editStudent",  operate: "update", operation:"cleanPrepare", object:state.currentstudent })}>edit</p></div> */}
                    <div style={{...styles.alignStudent }}>
                    
                        <Homework app={app}  />
                        <Progress  app={app} />
                    </div>
                    <div style={{...styles.alignStudent, justifycontent:state.iphone?"center": "", alignItems:state.iphone?"center": "", marginBottom:state.iphone?"50vh":"auto"}}>
                    <Goals app={app} />
                    {state.currentuser.getJson().role==="student"?(<TimerComponent app={app} />):(<Stats app={app} />)}
                    


                        {state.currentuser.getJson().role==="student"?( <Metro app={app} />):(
                        <Notes app={app}/>)}
                    </div>
                    </>)}
                </div>

        );
    }
}

export default StudentDashboard;