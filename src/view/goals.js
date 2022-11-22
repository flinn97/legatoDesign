import React, { Component } from 'react';
import leaf from "./leaf.png"
import Checkedd2 from './components/checkbox2';
import authService from '../services/auth.service';
import studentService from '../services/studentService';
import Addgoal from './popups/addGoal.js';
import Archive from './archive';
import starpointService from '../services/starpointService';
import Progress_circle from './components/progresscircle';
class Goals extends Component {
    constructor(props) {
        //create state
        super(props);
        this.state = {
        };
    }



    render() {
        let app=this.props.app;
        let state= app.state;
        let styles=state.styles;
        let dispatch=app.dispatch;
        let factory=state.factory;
        let comp = this.props.app.state.componentList;
        let id =state.currentstudent.getJson()._id;
        let mainList = comp?.getList("mainGoal", state.currentstudent.getJson()._id);
        let goalList = comp?.getList("goal", state.currentstudent.getJson()._id)
        
        return (
            <div 
                style={ 
                {...styles.bigcard, marginLeft:state.iphone?"1.8vw":"0px",  marginBottom:state.iphone?"2vw":"0px", } }>
                {state.popupSwitch=="mainGoal" && (<Addgoal main = {true} app={app}  
                handleClose={async ()=>{
                    
                    await comp.getOperationsFactory().clearUpdater();
                    dispatch({popupSwitch: "", showgoal:false, }); 
                    }} />
                    )}
                {state.popupSwitch=="goal" && (<Addgoal main={false} app={app}  handleClose={dispatch.bind(this, {popupSwitch: "", showgoal:false, })} />)}
                <div 
                style={{
                    display:"flex", 
                    flexDirection:"row",
                    justifyContent:"space-between",
                    alignItems: "center",
                    
                    fontWeight: styles.fonts.fontweightMed,
                    padding: styles.margins.margin4,

                    background: styles.colors.colorLink 
                    //+ "88"
                    ,
                    borderRadius: "23px 23px 0px 0px",
                    fontSize: styles.fonts.fontsizeTitle,
                    fontFamily: styles.fonts.appFont,
                    fontWeight: styles.fonts.fontweightMed

                    }}><div onClick={dispatch.bind(this, {popupSwitch:""})}>
                        <div
                    style={{
                        marginLeft:styles.mystudents.studentMargin,
                        color: this.props.app.state.styles.colors.color6,
                        letterSpacing: styles.fonts.appSpacing,       
                        alignItems: "center",  
                    }}
                    >Goals</div></div>

                    {/* <div style={{
                        fontSize: styles.fonts.fontsize1,
                        fontFamily: styles.fonts.appFont,
                        fontWeight: styles.fonts.fontweightMed,
                        display:"flex", 
                        alignItems: "center",
                        flexDirection:"row",
                        justifyContent: "space-between",
                    }}
                    onClick={dispatch.bind(this, {popupSwitch:"archive"})}>completed goals</div> */}
                    {state.role==="student"?(<></>):(
                        <>
                    {state.currentuser.getJson().role!=="student" && (<div  
                    onClick={async ()=>{
                        
                        await comp.getOperationsFactory().cleanJsonPrepare({addgoal:{_id: (Math.random(Date.now())+Date.now()+performance.now()).toString(), type:"mainGoal", owner: state.currentstudent.getJson()._id,}})
                        let goal = await comp.getOperationsFactory().getUpdater("add")[0];
                        await dispatch({currentGoal:goal,});
                        dispatch( {popupSwitch:"mainGoal", goalSwitch:"add", currentComponent: goal});
                    }} 
                    style={
                        {...styles.buttons.buttonAdd,
                            marginRight: ".83vw",
                            width:state.iphone? "3.1vw":"5.5vw",
                            fontSize:".89vw"
                        }
                    }>+ Add Goal</div>)}
                    </>)}</div>
                {this.props.app.state.popupSwitch==="archive"?(<Archive app={app} />):(
                    <div style={{width:"fit-content", ...styles.alignMain, justifyContent:"space-between" }}>
                        <div style={{height:"20vh"}}>
                            {state.iphone&&(
                        <div style={{marginLeft:"6vw", height:"25vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <Progress_circle dispatch={dispatch} maingoals={mainList} goals={goalList} update={state.updateCircle} />  </div>
                        )}
                <div 
                className="scroller"
                style={{ 
                        display: "flex", 
                        flexDirection: "column",
                        justifyContent: "space-even",
                        width: window.innerWidth<1400&&!state.iphone? "70%":"85%",
                        height:state.iphone? "19vh":window.innerHeight<800?"21vh":"24.6vh",
                        height: "120%",
                        marginBottom: ".08vh",
                        marginTop: state.iphone? "0.1vh":".3vh",
                        marginLeft:".3vw"
                    }}>

                    {comp.getList("mainGoal", id).map((main, index) =>
                        <div key={index} >
                            
                            <div>
                                <div 
                                style={{ 
                                        display: 'flex', 
                                        flexDirection: "row", 
                                        justifyContent: "space-between",
                                     }}>
                                    <div 
                                    style={{ 
                                            display: 'flex', 
                                            flexDirection: "row", 
                                            alignItems: "center",
                                            
                                            width: state.iphone?"82vw":"21vw" 
                                        }}>
                                        <Checkedd2 myswitch="updatemain" size= {styles.checkbox.size1} goal={main} app={app} main={true}/>
                                        <div 
                                        style={{ 
                                            height: "fit-content",
                                            width: "fit-content",
                                            
                                            font: styles.fonts.fontEdit,
                                            fontFamily: styles.fonts.appTitle,
                                            fontSize: styles.fonts.fontsize1,
                                            fontWeight: styles.fonts.fontweightMain,                    
                                        }} className="huv rowss" ><span style={{textDecoration:main.getJson().complete? "line-through black": "none", color:main.getJson().complete? "#57BA8E": "black"}} 
                                        onClick={async ()=>{
                                            if(state.currentuser.getJson().role==="teacher"){
                                                
                                            await dispatch({ operate: "update", operation:"cleanPrepare", object:main, });
                                            dispatch( {popupSwitch:"mainGoal", currentGoal:main})
                                        }
                                        }}
                                        >{main.getJson().title} </span></div>
                                        
                                       {!this.state[main.getJson()._id+'showGoals']?( <div style={{width:"30px", height:"20px", display:'flex', justifyContent:"center", alignItems:"center"}} onClick={()=>{this.setState({[main.getJson()._id+'showGoals']:true})}} ><div 
                                       
                                       style={{background:"#00000099", clipPath:"polygon(50% 0, 50% 100%, 100% 50%)", width:"13px", height:"10px", }}>

                                       </div></div>
                                        ):(<div style={{width:"25px", height:"30px", display:'flex', justifyContent:"center", alignItems:"center"}} onClick={()=>{this.setState({[main.getJson()._id+'showGoals']:false})}}><div  style={{
                                            background:"#00000099", 
                                            clipPath:" polygon(50% 100%, 0 50%, 100% 50%)", 
                                            width:"9px", 
                                            height:"13px",
                                            marginLeft:"5px",
                                            marginBottom:"5px"
                                           }}></div> </div>)}
                                    </div>
                                    {/* {state.currentuser.role==="student"?(<></>):( <div>
                                        <div style={{
                                            cursor:"pointer",
                                            marginRight:styles.margins.margin1,
                                            color: styles.colors.colorWarning,
                                            fontWeight: styles.fonts.fontweightMed,
                                            fontSize: styles.fonts.fontsize5,
                                            fontFamily: styles.fonts.appTitle,
                                        }}
                                        
                                        onClick={dispatch.bind(this, {operate: "del", operation:"prepareRun", object:main})} 
                                        >delete</div>
                                    </div>)} */}
                                                                            {/* <div onClick={this.AddUpdateDeleteArchiveGoal.bind(this, main, true, "splice")}>archive</div> */}

                                </div>
                            </div>
                            
                            
                                    {this.state[main.getJson()._id+'showGoals']&&(<>
                            {comp.getList("goal", main.getJson()._id, "mainID").map((goal, index) =>
                           
                                <div key={index} style={{ marginLeft: "30px" }} >
                                    <div style={{ display: "flex", flexDirection: "row", alignItems:"center" }}>
                                            <Checkedd2   size= {styles.checkbox.size1} goal={goal} maingoal={main}app={app} main={false}/>
                                        <span style={{textDecoration:main.getJson().complete? "line-through": "none", color:main.getJson().complete? "#57BA8E": "black"}} 
                                    //     onClick={()=>{
                                    //         if(state.currentuser.getJson().role==="teacher"){
                                    //             dispatch({popupSwitch:"goal", operate: "update",operation:"cleanPrepare", object:main});
                                    //         }
                                    // }}
                                    >{goal.getJson().title}</span>
                                    </div>
                                    {state.currentuser.role==="student"?(<></>):(
                                    <div style={{ width: "25%", flexDirection: "row", justifyContent: "flex-end", display: "flex", }}>
                                        {/* <div onClick={dispatch.bind(this, {operate: "del", operation:"prepareRun", object:goal})}>delete</div> */}
                                    </div>)}
                                    </div>
                                
                        )}</>)}

                            {/* {state.currentuser.role==="student"?(<></>):(
                            <div className="btn  btn-block" 
                                    style={{ 
                                        margin: "0 auto", 
                                        marginTop: "10px", 
                                        display: 'flex', 
                                        flexDirection: 'row', 
                                        justifyContent: 'center',
                                        verticalAlign: "baseline" 
                                        }} value="submit" onClick={dispatch.bind(this, {popupSwitch:"goal", operate: "addgoal", object:{mainID:main.getJson()._id,  owner: state.currentstudent.getJson()._id,}})} >
                                <span className="checkboxstuff1" 
                                    // what is this?
                                    style={{ width: "190px" }}>
                                        
                                        <img src={leaf} 
                                    // leaf img properties
                                    style={{ 
                                        width: "20px", 
                                        height: "20px",
                                        
                                }} />
                                <div> + Supporting Goal</div><div className="rowss huv"> </div>
                                </span>
                                </div>
                                )} */}
                        </div>)}
                </div>
                </div>
                {!state.iphone&&(
                <div style={comp.getList("mainGoal", id).length===0?{display:"flex",marginTop:"6vh", marginLeft:"20vw" }:
                    {marginRight:"4vw", marginLeft: window.innerWidth<1400 && window.innerWidth>1300&&"-25px",  alignSelf:"flex-end",  
                height:"25vh", display:"flex", justifyContent:"center", alignItems:"center",  }}>
                    <Progress_circle dispatch={dispatch} maingoals={mainList} goals={goalList} update={state.updateCircle} />  </div>
                )}</div>
                )}
            </div>
        );
    }
}

export default Goals;