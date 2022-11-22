import React, { Component } from 'react';
import Checkedd from './components/checkbox';
import Addhomework from './popups/addhomework';
import Times from './popups/times';
import studentService from '../services/studentService';
import fire from '../assets/fire.png';
class Homework extends Component {
    constructor(props) {
        //create state
        super(props);
        this.state = {
            homeworks: undefined
        };
    }


    render() {
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let dispatch = app.dispatch;
        let factory = state.factory;
        let comp = this.props.app.state.componentList;
        let id = state.currentstudent.getJson()._id
        let bool = state.popupSwitch === "addhomework" || state.popupSwitch === "updateHomework";

        return (
            <div style={
                {
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column"
                }
            }>
                <div style={
                    {...styles.biggercard, width:state.ipad? styles.biggercard.width:"50vw", marginLeft:"0px"}

                } >

                    {bool && (<Addhomework app={app} handleClose={()=>{
                        dispatch({ popupSwitch: "" });
                        state.componentList.clearUpdater();
                        }} />)}
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",

                        fontWeight: styles.fonts.fontweightMed,
                        padding: styles.margins.margin4,

                        background: styles.colors.colorLink
                        //+ "88"
                        ,
                        borderRadius: "23px 23px 0px 0px",
                        fontSize: styles.fonts.fontsizeTitle,
                        fontFamily: styles.fonts.appFont,
                        fontWeight: styles.fonts.fontweightMed,



                    }}>
                        <div
                            style={{
                                marginLeft: styles.mystudents.studentMargin,
                                color: this.props.app.state.styles.colors.color6,
                                letterSpacing: styles.fonts.appSpacing,

                            }}
                        >Practice</div>
                        {this.props.app.state.currentuser.getJson().role === "student" ? (<></>) : (<div
                            onClick={() => { dispatch({ popupSwitch: "addhomework", operate: 'addhomework',operation:"cleanJsonPrepare", object: { owner: id } }) }}
                            style={

                                {...styles.buttons.buttonAdd,
                                    marginRight: ".83vw",
                                    width:state.iphone? "3.8vw":"6.5vw",
                                    fontSize:".79vw"
                            }
                            }
                        >+ Add Assignment</div>)}

                    </div>
                    <div style={{ ...styles.alignMain, marginTop:" 30px" }}>
                        {!state.iphone&&(
                        <div style={{height: state.ipad? "28vh":window.innerHeight<800?"30vh":"33vh"}}>
                            <div className="scroller">
                            {comp.getList("homework", id).map((homework, index) =>
                                <div style={{
                                    cursor: app.state.currentuser.getJson().role==="teacher"?"pointer": "auto",
                                    display: "flex",
                                    marginBottom:"10px",
                                    marginLeft:"20px",
                                    justifyContent: "space-between",
                                    flexDirection: "column",
                                    
                                }}>
                                    <div style={{
                                        font: styles.fonts.fontEdit,
                                        fontFamily: styles.fonts.appTitle,
                                        fontSize: styles.fonts.fontsize1,
                                        fontWeight: styles.fonts.fontweightMain,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        cursor: app.state.currentuser.getJson().role==="teacher"?"pointer": "auto",
                                        flexDirection: "row",
                                    }}key={index}>
                                     <div style={{marginLeft: styles.margins.margin4, flexDirection:'row', display:"flex", cursor: state.currentuser.getJson().currentuser==="teacher"? "pointer":"auto",
                                        }}
                                            onClick={()=>{
                                                if(state.currentuser.getJson().role==="teacher"){
                                                    dispatch({ popupSwitch: "updateHomework", operate: "update", operation: "cleanPrepare", object: homework }, false)
                                                }
                                                }}>
                                                <div style={{
                                                    fontSize: styles.fonts.fontsize1,
                                                    fontStyle: "oblique 20deg", cursor: app.state.currentuser.getJson().role==="teacher"?"pointer": "auto",
                                                }}
                                                >{homework.getJson().title.length>45?(<>{homework.getJson().title.slice(0,45)}...</>):(<>{homework.getJson().title}</>)}</div>
                                        
                                        
                                            <div style={{
                                                marginLeft: styles.margins.margin3, 
                                                fontSize: styles.fonts.fontsize3,
                                                fontWeight: styles.fonts.fontweightMed,
                                                letterSpacing: styles.fonts.appSpacing2,
                                                color:styles.colors.colorLink, 
                                                display:"flex", cursor: app.state.currentuser.getJson().role==="teacher"?"pointer": "auto",
                                                flexDirection:"column", 
                                                justifyContent:"flex-end"
                                                }}>
                                                    {homework.getJson().title.length>20?(<>{homework.getJson().hwlink.slice(0,20)}...</>):(<>{homework.getJson().hwlink}</>)}</div>
                                        </div>
                                        {/* <div style={{
                                            cursor: "pointer",
                                            marginRight: styles.margins.margin1,
                                            color: styles.colors.colorWarning,
                                            fontWeight: styles.fonts.fontweightMed,
                                            fontSize: styles.fonts.fontsize5,
                                        }}
                                            onClick={dispatch.bind(this, { object: homework, operate: "del", operation: "prepareRun" })}
                                        >delete</div> */}
                                    </div>
                                    <div style={{
                                            marginLeft: styles.margins.margin4,

                                            width:"95%",
                                            color: styles.colors.color3+"a9",
                                            fontWeight: styles.fonts.fontweightMain,
                                        }}>{homework.getJson().description!==""&&(<>Notes: {homework.getJson().description}</>)}
                                        </div>
                                    </div>)}
                        </div></div>)}

                        <div style={{
                            alignContent:"center",  
                           alignItems:"center", textAlign:"center",
                            fontSize: styles.fonts.fontsize1,
                            fontFamily: styles.fonts.appFont,
                            fontWeight: styles.fonts.fontweightMed,
                            marginRight: (state.ipad&&comp.getList("homework", id).length===0)? "0px":"3vw",
                            marginLeft: (state.ipad&&comp.getList("homework", id).length>0)? "-3vw": "auto",
                            display: "flex",
                            flexDirection:"column",
                            
                            justifyContent:state.iphone?"center":"",
                            ...styles.iphoneHelp

                        }}>
                            {/* <div style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",

                            }}>


                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    padding: styles.margins.margin4,

                                }}>
                                    <button  className="btn  btn-block"  onClick={dispatch.bind(this, {popupSwitch:"addTime", currentComponent:state.currentstudent})} 

                style={
                    styles.buttons.buttonLog
                }>+ Time</button>
            {state.currentuser.role==="student"?(<></>):(<div>
            <button  className="btn  btn-block"  onClick={state.currentstudent?.clearChecks} style={styles.buttons.buttonClear}>Clear Checks</button>
           
            <button  className="btn  btn-block" onClick={state.currentstudent?.clearTime} style={styles.buttons.buttonClear}>Clear Time</button></div>)} 
                                </div>
                            </div> */}

                            {(state.currentstudent.getJson().check || state.currentstudent.getJson().trackTime)&&(<>
                            <div style={{disply:"flex",flexDirection:"column", marginBottom:"15px", fontSize:"19px", alignContent:"center",  
                                        justifyContent:"center", alignItems:"center", textAlign:"center",}}>Current Practice Progress
                            {state.currentstudent.getJson().trackTime&&(<div style={{
                                            cursor:"pointer", 
                                            borderRadius: "2vw", color: "white",
                                        alignItems:"center",  
                                        justifyContent:"center", 
                                        fontSize:"13px", 
                                        marginLeft: state.iphone? "22%":"30%",
                                        background:styles.colors.color1, 
                                        textAlign:"center", 
                                        padding:"2px",
                                        width:"120px" }} onClick={dispatch.bind(this,{popupSwitch: "addTime", currentComponent: state.currentstudent,})}>Log Time</div>)}
                            </div>
                            <Checkedd big={true} size={styles.checkbox.size1} app={app} component={state.currentstudent}
                                checked={state.currentstudent.getJson().checked} time={state.currentstudent.getJson().time} />
                                <div style={{width:window.innerWidth<1400&&window.innerWidth>1300? "20vw":styles.sizeSpecStud.width,  height:"fit-content", marginBottom:styles.margins.margin4, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:'center',  marginTop: (state.iphone ||state.ipad)?"0vh":"5vh"}}>
                                    <div style={{display:"flex", flexDirection:"row", alignItems:"center", height:"fit-content"}}><img style={{marginRight:"10px"}} src={fire} alt= "fire"/><div>
                                    <div style={{fontSize:"2vh", fontFamily:styles.fonts.appTitle}}>{state.currentstudent.getJson().totalDaysPracticed} Day Streak</div>
                                    </div>
                                    </div></div></>)}
                        </div>
                        {state.iphone&&(
                        <div style={{height:"42vh", marginTop:"20px", justifyContent:"center", alignItems:"center", display:"flex", flexDirection:"column" }}>
                            <div>Practice Assignments</div>
                            <div className="scroller">
                            {comp.getList("homework", id).map((homework, index) =>
                                <div style={{
                                    display: "flex",
                                    marginBottom:"20px",
                                    marginLeft:"20px",
                                    justifyContent: "space-between",
                                    flexDirection: "column",
                                    
                                }}>
                                    <div style={{
                                        font: styles.fonts.fontEdit,
                                        fontFamily: styles.fonts.appTitle,
                                        fontSize: styles.fonts.fontsize1,
                                        fontWeight: styles.fonts.fontweightMain,
                                        display: "flex",
                                        justifyContent: "space-between",
                                
                                        flexDirection: "row",
                                    }}key={index}>
                                     <div style={{marginLeft: styles.margins.margin4, flexDirection:'row', display:"flex", cursor: state.currentuser.getJson().currentuser==="teacher"? "pointer":"auto",
                                        }}
                                            onClick={()=>{
                                                if(state.currentuser.getJson().role==="teacher"){
                                                    dispatch({ popupSwitch: "updateHomework", operate: "update", operation: "cleanPrepare", object: homework }, false)
                                                }
                                                }}>
                                                <div style={{
                                                    fontSize: styles.fonts.fontsize1,
                                                    fontStyle: "oblique 20deg"
                                                }}
                                                >{homework.getJson().title.length>45?(<>{homework.getJson().title.slice(0,45)}...</>):(<>{homework.getJson().title}</>)}</div>
                                        
                                        
                                            <div style={{
                                                marginLeft: styles.margins.margin3, 
                                                fontSize: styles.fonts.fontsize3,
                                                fontWeight: styles.fonts.fontweightMed,
                                                letterSpacing: styles.fonts.appSpacing2,
                                                color:styles.colors.colorLink, 
                                                display:"flex", 
                                                flexDirection:"column", 
                                                justifyContent:"flex-end"
                                                }}>
                                                    {homework.getJson().title.length>20?(<>{homework.getJson().hwlink.slice(0,20)}...</>):(<>{homework.getJson().hwlink}</>)}</div>
                                        </div>
                                        {/* <div style={{
                                            cursor: "pointer",
                                            marginRight: styles.margins.margin1,
                                            color: styles.colors.colorWarning,
                                            fontWeight: styles.fonts.fontweightMed,
                                            fontSize: styles.fonts.fontsize5,
                                        }}
                                            onClick={dispatch.bind(this, { object: homework, operate: "del", operation: "prepareRun" })}
                                        >delete</div> */}
                                    </div>
                                    <div style={{
                                            marginLeft: styles.margins.margin4,

                                            width:"95%",
                                            color: styles.colors.color3+"a9",
                                            fontWeight: styles.fonts.fontweightMain,
                                        }}>{homework.getJson().description!==""&&(<>Notes: {homework.getJson().description}</>)}
                                        </div>
                                    </div>)}
                        </div></div>)}
                    </div>

                    {/* <button style={
                    styles.buttons.buttonLog
                } onClick={()=>{
                    let json = state.currentstudent.getJson()
                    json.weekstreak= parseInt(json.weekstreak)+1;
                    dispatch({object: state.currentstudent, operate:"update", operation:"prepareRun"})}}>award streak</button> */}
                    {/* <button style={
                    styles.buttons.buttonLog
                } onClick={()=>{
                    //
                    let json = state.currentstudent.getJson();
                    json.badges.newBadge= "newbadge"
                    dispatch({object: state.currentstudent, operate:"update", operation:"prepareRun"})}}>award badge</button> */}
                </div>
            </div>

        );
    }
}

export default Homework;