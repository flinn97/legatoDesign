import React, { Component } from 'react';
// import Studentinfo from './studentinfo.js';
import Homework from "./homework.js";
import Progress from "./progress.js";
import Goals from './goals.js';
import Notes from './notes.js';
import Stats from './stats.js';
import "../view.css"
import Chat from './studentChat.js';
import Wolf from '../assets/place1.png';
import dear from '../assets/place2.png';
import sheep from '../assets/place3.png';
import cat from '../assets/place4.png';
import bird from '../assets/place5.png';
import turkey from '../assets/place6.png';
import bug from '../assets/place7.png';
import back from "../assets/leftArrow.png"
import link from "../assets/link.png"
/**
 * teacher
 */
class Studentview extends Component {
    constructor(props) {
        //create state
        super(props);
        this.state = {
            pics: [Wolf, dear, sheep, cat, bird, turkey, bug],
            bool:false

        };
    }
    async componentDidMount(){
        // 
        // let app=this.props.app;
        // let state= app.state;
        // let student = state.currentstudent;
        // let starPoints = state.componentList.getComponent("starpoints", student.getJson()._id);
        // let chatRoom = state.componentList.getComponent("chatroom", student.getJson()._id);
        // if(!starPoints){
        //     await state.componentList.getOperationsFactory().cleanJsonPrepareRun({
        //         addstarpoints: { owner: student.getJson()._id },
        //     });
        // }
        // if(!chatRoom){
        //     await state.componentList.getOperationsFactory().cleanJsonPrepareRun({
        //         addchatroom: { name: student.getJson().firstName, owner: student.getJson()._id, people: { [student.getJson()._id]: student.getJson().lastName } }
        //     });
        // }
        this.setState({
            bool:true
        })
        
    }
    

    render() {
        let app=this.props.app;
        let state= app.state;
        let styles=state.styles;
        let dispatch=app.dispatch;

        return (

                <div style={{display:"flex", flexDirection:"column", marginLeft:styles.sizeSpecStud.marginLeft}}>
                    {this.state.bool&&(<>
                    <div style={{display:"flex", marginBottom: state.ipad? '2vh':"0px", marginLeft:state.iphone?"1.8vw":"0px",flexDirection:"row",  borderRadius: "23px", justifycontent:"center", alignItems:"center",
                boxShadow: "2px 3px 6px #D1D1D1", width:state.iphone?"95vw":state.ipad?"65vw": window.innerWidth<1550? "55vw":"35vw", background:styles.colors.color6, padding:"7px", marginTop: state.ipad? "0vh": "0px" }}>
                    <img src ={back} alt ="backArrow" style={{marginRight:"10px", marginLeft:"5px", cursor:"pointer", marginBottom:state.ipad?"2px":"0px"}} onClick={async()=>{
                    //
                    window.history.pushState({state: "dash"}, "page 2", "dashboard")
                    await this.props.app.dispatch({ keepChat:false,})
                    this.props.app.dispatch({...state.switch.dashboard})}}/>
                    
                    <img onClick = {dispatch.bind(this,{popupSwitch:"editStudent",  operate: "update", operation:"cleanPrepare", object:state.currentstudent })} style={{width:styles.sizeSpecStud.imageSize, height:styles.sizeSpecStud.imageSize, borderRadius:"50%", marginRight:"20px"}} src = {state.currentstudent.getJson().picURL?state.currentstudent.getJson().picURL: this.state.pics[Math.floor(Math.random()*(7-1))]} alt = "" />
                    <div style={{cursor:"pointer", marginRight:"20px", marginBottom:"3px"}} onClick = {dispatch.bind(this,{popupSwitch:"editStudent",  operate: "update", operation:"cleanPrepare", object:state.currentstudent })}>
                        {state.currentstudent.getJson().firstName} {state.currentstudent.getJson().lastName}</div>
                    <div style={{cursor:"pointer", marginRight:"20px", color:this.props.app.state.styles.colors.colorLink}} onClick={dispatch.bind(this,{popupSwitch:"syncStudent"})}> <img style={{marginBottom:"3px"}} src={link} alt="link"/>Group Students</div>
                    <div style={{ display:"flex", flexDirection:state.iphone?"column":"row", }}>Code:<div style={{fontSize:state.iphone&&"11px", marginLeft:state.iphone?"0px":"5px"}}> {state.currentstudent.getJson()._id}</div></div>
                    </div>
                    
                    <div style={{...styles.alignStudent }}>
                    
                        <Homework app={app}  />
                        <Progress  app={app} />
                    </div>
                    <div style={{...styles.alignStudent, justifycontent:state.iphone?"center": "", alignItems:state.iphone?"center": "", marginBottom:state.iphone?"50vh":"auto" }}>

                        <Goals app={app} />
                        {state.currentuser.role==="student"?( <Stats  app={app}/>):(
                        <Notes app={app}/>)}
                        {state.currentuser.role==="student"?(<Chat app={app} />):(<Chat app={app} />)}
                    </div>
                    </>)}
                </div>

        );
    }
}

export default Studentview;