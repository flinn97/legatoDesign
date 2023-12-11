import React, { Component } from "react";
import studentService from "../../services/studentService";
import badge1 from "../../assets/badges/badge1.png";
import badge2 from "../../assets/badges/badge2.png";
import badge3 from "../../assets/badges/badge3.png";
import badge4 from "../../assets/badges/badge4.png";
import badge5 from "../../assets/badges/badge5.png";
import badge6 from "../../assets/badges/badge6.png";

import Progress_circle from '../components/progresscircle.js';
import Progressbar from '../components/moreProgress.js';
import starpointService from '../../services/starpointService.js';
import progress from '../../assets/starpoints.png';
import ParentFormComponent from "../../npm/parentFormComponent.js";

//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
class Badges extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef;
        this.state = {
            badges:[badge1, badge2, badge3,badge4,badge5,badge6],
            currentBadge:  badge1, 
            key:"add",
            manageSP:false,
            student:false
        }
    };
    async componentDidMount() {

        // let app = this.props.app;
        // let state = app.state;
        // let styles = state.styles;
        // let badge= state.currentComponent
        // let opps = badge?.getOperationsFactory();
        // 
        // let updater = opps?.getUpdater();
        // if(state.operate.includes("update")){
        //     this.setState({
        //         key:"update"
        //     })
        // }
        // else{
        //     let dispatch= app.dispatch;
        //     let key ="add"
        //     
        //     badge?.setJson({ ...badge.getJson(), picURL:this.state.currentBadge});
        // }
       
        

       document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.props.handleClose();
        }
    }

    render() {
        let app = this.props.app;
        let dispatch= app.dispatch;
        let state = app.state;
        let styles=state.styles;
       let currentstudent = this.props.app.state.currentstudent;
       let studentJson = currentstudent?.getJson();
       let comp = state.componentList; 
       let mainList = comp?.getList("mainGoal", studentJson._id);
       let goalList = comp?.getList("goal", studentJson._id);
      let badgeList = comp?.getList("badge", studentJson._id);
        let starpoints = comp?.getComponent("starpoints", studentJson._id, "owner")
        return (
            <div className="popup-box" style={{ zIndex: "1010" }}>
                <div ref={this.wrapperRef}  className="diapicboxa" style={{ zIndex: "1010", height:window.innerHeight<900?"70vh":"54vh" }}>
                <div style={ ///EXIT BUTTON
                                styles.buttons.closeicon
                            } onClick={this.props.handleClose}>x</div>
                    
         {!this.state.manageSP?(
                 
            <div style={{display:"flex", flexDirection:"column", justifyContent:"center", display:"flex", alignItems:"center"}}>
                {state.currentuser?.getJson().type!=="student" &&<div onClick = {()=>{this.setState({manageSP:true})}}style={{...styles.buttons.buttonExpand,
                width:"100%", }}>Manage Star Points</div>}
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
               
               <div style={{marginLeft:"10px", marginRight:"10px"}}> 
               {state.currentuser?.getJson().type ==="student"?(<div>{starpoints.getJson().starpoints}</div>):(
               <ParentFormComponent  app = {app} cleanPrepareRun={true} obj ={starpoints} name ="starpoints" inputStyle={{width:"70px", textAlign: "center"}}/>)} </div>
              
               <div style={{marginTop:"7px"}}>Star Points</div>
              
            </div>
               <div style={{width:"100%",marginTop:"20px"}}><p style={{marginLeft:"40px"}}>Stats</p></div>
               <div>Days Practiced: {state.currentstudent.getJson().totalDaysPracticed}</div>
               <div>Total Time: {state.currentstudent.getJson().timeTotal}</div>
               <div style={{width:"100%",marginTop:"20px"}}><p style={{marginLeft:"40px"}}>Badge Collection</p></div>
               
               <div className="scroller" style={{
                display:"flex", 
                flexDirection:"row", height:"20vh", flexWrap:"wrap"}}>{badgeList.map((badge, index)=>
               <img onClick={async()=>{
                if(state.currentuser.getJson().role==="teacher"){
                    await this.props.app.dispatch({currentComponent:badge});
                    this.props.app.dispatch({popupSwitch:"addBadge", operate:"updatebadge", operation:"cleanPrepare", object: badge})
                }
                }}
               src={badge.getJson().picURL} style={{width:state.iphone?"20vw": "3.7vw"}}/>)}
               </div>

               

            </div>):(

<div style={{display:"flex", flexDirection:"column", justifyContent:"center", display:"flex", alignItems:"center"}}>
                <div onClick = {()=>{this.setState({manageSP:!this.state.manageSP})}}style={{...styles.buttons.buttonExpand,
                width:"100%", }}>Manage Star Points</div>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
               
               <div style={{marginLeft:"10px", marginRight:"10px"}}> 
               <ParentFormComponent  app = {app} cleanPrepareRun={true} obj ={starpoints} name ="starpoints" inputStyle={{width:"70px", textAlign: "center"}}/> </div>
              
               <div style={{marginTop:"7px"}}>Star Points</div>
              
            </div>
            <ParentFormComponent name = "mainGoal" obj={starpoints} label="Main Goal Points"/>
            <ParentFormComponent name = "goal" obj={starpoints} label="Goal Points"/>
            

            <ParentFormComponent name = "student" obj={starpoints} label="Practice Points"/>

            <div 
                    style={{
                        ...styles.buttons.buttonRound,
                        borderRadius:"7px",
                        width:"50%",
                        
                        borderRadius: "16px", 
                        color: styles.colors.colorBackground,
                        background: styles.colors.colorLink,
                        marginTop: "5%"
                    }} 
                onClick={async()=>{
                    await starpoints.getOperationsFactory().cleanPrepareRun({update:starpoints});
                    this.setState({manageSP:false})
                }}>
                    save</div>

                    <div 
                    style={{
                        ...styles.buttons.buttonRound,
                        borderRadius:"7px",
                        width:"50%",
                        
                        borderRadius: "16px", 
                        color: styles.colors.colorBackground,
                        background: styles.colors.colorLink,
                        marginTop: "10px"
                    }} 
                onClick={async()=>{
                    
                    let list = comp.getList("starpoints");
                    let mainGoalVal = starpoints.getJson().mainGoal;
                    let goalVal = starpoints.getJson().goal;
                    let practiceVal = starpoints.getJson().student;
                    for(let obj of list){
                        await obj.setJson({...obj.getJson(), mainGoal: mainGoalVal, goal:goalVal, student:practiceVal})
                        await starpoints.getOperationsFactory().prepareRun({update:obj});


                    }
                    this.setState({student:true})
                }}>
                    {this.state.student?<>saved</>:<>Save for all students</>}</div>
            </div>
            )}
            </div>



            </div>

        )
    }
};

export default Badges;