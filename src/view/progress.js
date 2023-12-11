import React, { Component } from 'react';
import Progress_circle from './components/progresscircle.js';
import Progressbar from './components/moreProgress.js';
import starpointService from '../services/starpointService.js';
import progress from '../assets/starpoints.png';
import badges from '../assets/bages.png';
import ParentFormComponent from '../npm/parentFormComponent.js';

class Progress extends Component {
    constructor(props) {
        //create state
        super(props);
        this.state = {
            teacher:this.props.app.state.iphone? "20vw":"4vw" ,
            student: this.props.app.state.iphone? "20vw": "3.5vw"
        };
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
            <div style={
                styles.tallcard
                }>
            <div
                style={{
                        display:"flex", 
                        flexDirection:"row",
                        justifyContent:"flex-end",
                        alignItems: "right",
                        width:"100%",
                        fontWeight: styles.fonts.fontweightMed,
                        padding: styles.margins.margin4,

                        background: ""
                        //+ "88"
                        ,
                        borderRadius: "23px 23px 0px 0px",
                        fontSize: styles.fonts.fontsizeTitle,
                        fontFamily: styles.fonts.appFont,
                        fontWeight: styles.fonts.fontweightMain,
                        marginBottom: styles.margins.margin4,

                        
                 }}><div onClick={dispatch.bind(this, {popupSwitch:"seeAllBadges"})}
                 style={
                    styles.buttons.buttonExpand
                }
                 >See all progress</div>
                 </div>
                 
            <div style={{display:"flex", flexDirection:"column", height:"100%",  display:"flex", alignItems:"center"}}>
               {/* <Progress_circle dispatch={dispatch} maingoals={mainList} goals={goalList} update={state.updateCircle} /> */}
               <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
               
                <div style={{marginLeft:"10px", marginRight:"10px"}}> 
                {state.currentuser?.getJson().type ==="student"?(<div>{starpoints.getJson().starpoints}</div>):(
                <ParentFormComponent  app = {app} cleanPrepareRun={true} obj ={starpoints} name ="starpoints" inputStyle={{width:"70px", textAlign: "center"}}/> )}
                </div>
               
                <div style={{marginTop:"7px"}}>Star Points</div>
                {/* <img style={{...styles.starPostion}} src={progress} alt="starpoints" /> <div 
                style={{
                    color: styles.colors.color6, 
                    position:state.iphone? "auto":"absolute", 
                    display:"flex", 
                    marginTop:state.iphone?"-60px":"30px",
                    flexDirection:"column", 
                    justifyContent:"center", 
                    alignItems:"center", 
                    
                    marginRight:"3px"}}><div style={{fontSize: window.innerWidth<1300?"12px": "auto"}}>{starpoints?.getJson()?.level}</div><div style={{fontSize: window.innerWidth<1300?"12px": "12px",}}>level</div>
                    </div> */}
                    </div>
                    <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", display:"flex", alignItems:"center", marginTop:"4.5vh", height:"100%"}}>
                        <div>
               {/* <Progressbar dispatch={dispatch} text="points"  day={false} showAmount={starpoints?.getJson()?.starpoints}
               amount={(parseInt(starpoints?.getJson()?.starpoints)-(500*(parseInt(starpoints?.getJson()?.level)-1)).toString())} 
               goal={(parseInt(starpoints?.getJson()?.starpointGoal)-(500*(parseInt(starpoints?.getJson()?.level)-1)).toString())}/> */}
               <div style={{width:"100%",marginTop:"10px"}}><p style={{marginLeft:"0px"}}>Badge Collection</p></div>
               </div>
               <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width:'100%', marginTop:"-2vh"}}>
                <div className="scroller" style={{display:"flex",  flexDirection:"row", flexWrap:"wrap", justifyContent:"center", alignItems:"center", width: state.currentuser.getJson().role==="teacher"?"100%":(window.innerHeight>700 && window.innerHeight<800)? "70%":"80%"}}>
                {badgeList.slice(state.currentuser.getJson().role==="teacher"? badgeList.length-3: badgeList.length-9,badgeList.length).reverse()?.map((badge, index)=>
               <img onClick={async()=>{
                if(state.currentuser.getJson().role==="teacher"){
                    await this.props.app.dispatch({currentComponent:badge});
                    this.props.app.dispatch({popupSwitch:"addBadge", operate:"updatebadge", operation:"cleanPrepare", object: badge})
                }
                else{
                    this.props.app.dispatch({popupSwitch:"showBadge", currentComponent:badge})
                }
                }} src={badge.getJson().picURL} style={{width: state.currentuser.getJson().role==="teacher"? this.state.teacher: (window.innerHeight>700 && window.innerHeight<800)? "3vw": this.state.student}}/>)}
               </div>
               </div>
               {/* <Progressbar dispatch={dispatch} text="Days Practiced:" day={true} amount={studentJson.daysPracticed} goal={studentJson.totalDays} />
               <Progressbar dispatch={dispatch} text="Time Practiced:" time={true} amount={studentJson.timeTotal} goal={studentJson.wmin} /> */}
               
               
               {state.currentuser.getJson().role!=="student"? (<div 
                    style={{
                        ...styles.buttons.buttonRound,
                        borderRadius:"7px",
                        width:"80%",
                        borderRadius: "16px", 
                        color: styles.colors.colorBackground,
                        background: styles.colors.colorLink,
                        marginBottom: "5%"
                    }} 
                onClick={this.props.app.dispatch.bind(this,{popupSwitch:"addBadge", operate:"addbadge", operation:"cleanJsonPrepare", object:{owner:currentstudent.getJson()._id}})}>
                    + Award badge</div>):(<div style={{opacity:"0"}}>hi</div>)}
            </div></div>
            </div>

               
        );
    }
}

export default Progress;