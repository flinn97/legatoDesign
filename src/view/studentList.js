import React, { Component } from 'react';
import Checkedd from './components/checkbox.js';
import Wolf from '../assets/place1.png';
import dear from '../assets/place2.png';
import sheep from '../assets/place3.png';
import cat from '../assets/place4.png';
import bird from '../assets/place5.png';
import turkey from '../assets/place6.png';
import bug from '../assets/place7.png';
import EditProgress from './popups/editProgress.js';

// import starpointService from '../services/starpointService.js';
class StudentList extends Component {
    constructor(props) {
        //create state
        super(props);
        this.state = {
            pics: [Wolf, dear, sheep, cat, bird, turkey, bug],
            pointerEvents:'none'
            
        };
    }
    componentDidMount(){

        // let app=this.props.app;
        // let state= app.state;
        // let styles=state.styles;
        // let dispatch=app.dispatch;
        // let factory=state.factory;
        
        // let comp = state.componentList;
        // let students = comp.getList("student");
        // 
        // for(const key in students){
        //     let stud = "student" + key
        //     document.getElementById(stud).addEventListener("mousedown", ()=>{ 
        //         
                
        //     });

        // }
    }


    render() {
        
       let app=this.props.app;
       let state= app.state;
       let styles=state.styles;
       let dispatch=app.dispatch;
       let factory=state.factory;
       
       let comp = state.componentList;
       let students = comp.getList("student");


        return (
            <div style={
                {...styles.biggercard, width:"70vw", height:"90vh"}

                }>
                <div 
                style={{
                        display:"flex", 
                        flexDirection:"row",
                        justifyContent:"space-between",
                        
                        
                        fontWeight: styles.fonts.fontweightMed,
                        padding: styles.margins.margin4,

                        background: styles.colors.colorLink 
                        //+ "88"
                        ,
                        borderRadius: "23px 23px 0px 0px",
                        
                        }}>
                    <div style={{
                        display: "flex",
                        flexDirection:"row",
                        alignItems: "flex-end",
                        height: "100%",
                        width: "100%",
                        fontSize: styles.fonts.fontsizeTitle,
                        fontFamily: styles.fonts.appFont,
                        fontWeight: styles.fonts.fontweightMed,
                        
                       
                    }}>
                        <div
                        style={{
                            marginLeft:styles.mystudents.studentMargin,
                            color: styles.colors.color6,
                            letterSpacing: styles.fonts.appSpacing,  
                            alignItems: "flex-end",
                            marginRight: "10vw"
                           
                        }}
                        >Students</div>
                    </div>
                    {!state.iphone&&(
                    <div style={{
                        display: "flex",
                        flexDirection:"row",
                        alignItems: "flex-end",
                        height: "100%",
                        width: "100%",
                        marginRight: "4.5vw",
                        fontSize: styles.fonts.fontEdit,
                        fontFamily: styles.fonts.appFont,
                        fontWeight: styles.fonts.fontweightMain,
                        // marginRight: styles.margins.margin4,
                        color: styles.colors.color6, 
                       
                        
                    }}>
                    <div>Lesson Date</div>
                    </div>)}
                    <div style={{
                        display: "flex",
                        flexDirection:"row",
                        alignItems: "flex-end",
                        height: "100%",
                        width: "100%",
                        fontSize: styles.fonts.fontEdit,
                        fontFamily: styles.fonts.appFont,
                        fontWeight: styles.fonts.fontweightMain,
                        // marginRight: styles.margins.margin4,
                        color: styles.colors.color6, 
                       
                        
                    }}>
                    <div>Weekly Progress</div>
                    </div>

                    <div
                        style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        flexDirection:"row",
                        alignItems: "flex-end",
                        height: "100%",
                        width: "100%",
                        fontSize: styles.fonts.fontEdit,
                        fontFamily: styles.fonts.appFont,
                        fontWeight: styles.fonts.fontweightMain,
                        //marginRight: "-"+styles.margins.margin4,
                        
                        
                    }}>
                    <div              
                    style={{
                        cursor:"pointer", 
                        color: styles.colors.color6,
                        marginRight:"6%",
                        
                    }} 
                    
                    onClick={()=>{
                        let id = (Math.random(Date.now())+Date.now()+performance.now()).toString()
                        dispatch({popupSwitch:"addStudent", operate:"addstudent", object:{owner: id, _id:id}})
                    }
                        }>
                           <b>+ Add Student</b></div>
                    </div>
                    
                    </div>
                <div 
                style={{
                    display:"flex", 
                    flexDirection:"column",
                    marginTop: ".6%",
                    }} className="scroller">
                        
                <div style={{
                    height:"94%",
                }}>{  students.map((student, index) => <div style={{}}>
                <div key={index} 
                style={{

                    border: styles.borders.borderPic,
                    borderRightWidth: "0",
                    borderLeftWidth: "0",
                    borderTopWidth: "0",
                    

                    width: '100%', 
                    // height: styles.mystudents.borderWidth, 
                    height: styles.mystudents.height,
                    display:"flex", 
                    flexDirection:"row",
                    alignItems:"center",
                    marginLeft: styles.mystudents.studentMargin,
                    // marginRight: styles.mystudents.studentMargin,
                    //background: index%2===0 ? styles.colors.colorTransparent+"AA":"",
                    
                    
                    
                    }}>
                    <div style={{
                            display:"flex", 
                            flexDirection:"row", 
                            width:state.iphone?"30vw": "11.5vw",
                            marginLeft: styles.margins.margin4,
                            }}
                            onClick={()=>{
                                
                                if(state.iphone){
                                    dispatch({currentstudent:student, myswitch:"viewstudent" });
                                }
                                
                            }}
                            >
                        <img src = {student.getJson().picURL?student.getJson().picURL: this.state.pics[Math.floor(Math.random()*(7-1))]} alt = "pic"
                            onClick={dispatch.bind(this, {currentstudent:student, myswitch:"viewstudent" })}
                            style={{
                                width:"40px",
                                height:"40px",
                                borderRadius:"50%", 
                                margin:"7px",
                                cursor:"pointer",}}/>
                        <div onClick={async ()=>{
                            let app=this.props.app;
                            let state= app.state;
                            //get component of type by owner id
                            let starPoints = state.componentList.getComponent("starpoints", student.getJson()._id,);
                            let chatRoom = state.componentList.getComponent("chatroom", student.getJson()._id);
                            if(!starPoints){
                                await state.componentList.getOperationsFactory().cleanJsonPrepareRun({
                                    addstarpoints: { owner: student.getJson()._id },
                                });
                            }
                            if(!chatRoom){
                                await state.componentList.getOperationsFactory().cleanJsonPrepareRun({
                                    addchatroom: { name: student.getJson().firstName, owner: student.getJson()._id, people: { [student.getJson()._id]: student.getJson().lastName } }
                                });
                            }
                            dispatch( {currentstudent:student, myswitch:"viewstudent" })}}
                    style={{
                        fontSize: styles.fonts.fontsize4, 
                        cursor:"pointer",
                        marginTop:"10px",
                        marginLeft: ".8vw",
                        
                    }}
                    // https://legato.web.app/legato/
                    // http://localhost:8081/legato/
                    // http://localhost:3000/legato/
                        ><a id={"student"+index} style={{
                            // pointerEvents:this.state.pointerEvents,
                            textDecoration:"none", 
                            color: styles.colors.colorOffBlack,
                            fontSize: styles.fonts.fontsize4, 

                            }}
                            //  href={"http://localhost:8081/legato/"+student.getJson()._id}
                            >
                                {student.getJson().firstName} {student.getJson().lastName}</a>
                        </div>

                        </div>
                        {!state.iphone &&(
                        <div ><div 
                    style={{
                        fontSize: styles.fonts.fontsize1, 
                        marginLeft: styles.mystudents.studentMargin,
                        
                    }}
                        >
                            {student.getJson().days&&(<div 
                            style={{display:"flex", 
                            flexDirection:"row", 
                            width:"12vw",
                            marginLeft: "2vw"
                            }}>
                            {/* {Object.keys(student.getJson().days).map((day, index)=> */}
                            <div style={{display:"flex", flexDirection:"row"}}>

                                {Object.keys(student.getJson().days).includes("Monday")&&(<div
                                    onClick = {dispatch.bind(this,{popupSwitch:"editStudent",  
                                    operate: "update", operation:"cleanPrepare", currentstudent:student })}
                                    style={{...styles.daytag, width:window.innerWidth<1350?"25px": styles.daytag.width}}
                                    
                                > {window.innerWidth>1400? (<>Mon</>):(<>M</>)} </div>)}
                                {Object.keys(student.getJson().days).includes("Tuesday")&&(<div onClick = {dispatch.bind(this,{popupSwitch:"editStudent",  
                                    operate: "update", operation:"cleanPrepare", currentstudent:student })}
                                    style={{...styles.daytag, width:window.innerWidth<1350?"20px": styles.daytag.width}}>   {window.innerWidth>1400? (<>Tues</>):(<>T</>)}</div>)}
                                {Object.keys(student.getJson().days).includes("Wednesday")&&(<div onClick = {dispatch.bind(this,{popupSwitch:"editStudent",  
                                    operate: "update", operation:"cleanPrepare", currentstudent:student })}
                                    style={{...styles.daytag, width:window.innerWidth<1350?"20px": styles.daytag.width}}>  {window.innerWidth>1400? (<>Wed</>):(<>W</>)} </div>)}
                                {Object.keys(student.getJson().days).includes("Thursday")&&(<div onClick = {dispatch.bind(this,{popupSwitch:"editStudent",  
                                    operate: "update", operation:"cleanPrepare", currentstudent:student })}
                                    style={{...styles.daytag, width:window.innerWidth<1350?"20px": styles.daytag.width}}>    {window.innerWidth>1400? (<>Thur</>):(<>R</>)}</div>)}
                                {Object.keys(student.getJson().days).includes("Friday")&&(<div onClick = {dispatch.bind(this,{popupSwitch:"editStudent",  
                                    operate: "update", operation:"cleanPrepare", currentstudent:student })}
                                    style={{...styles.daytag, width:window.innerWidth<1350?"20px": styles.daytag.width}}>   {window.innerWidth>1400? (<>Fri</>):(<>F</>)}</div>)}
                                {Object.keys(student.getJson().days).includes("Saturday")&&(<div onClick = {dispatch.bind(this,{popupSwitch:"editStudent",  
                                    operate: "update", operation:"cleanPrepare", currentstudent:student })}
                                    style={{...styles.daytag, width:window.innerWidth<1350?"20px": styles.daytag.width}}>  {window.innerWidth>1400? (<>Sat</>):(<>S</>)} </div>)}
                                {Object.keys(student.getJson().days).includes("Sunday")&&(<div onClick = {dispatch.bind(this,{popupSwitch:"editStudent",  
                                    operate: "update", operation:"cleanPrepare", currentstudent:student })}
                                    style={{...styles.daytag, width:window.innerWidth<1350?"20px": styles.daytag.width}}> {window.innerWidth>1400? (<>Sun</>):(<>Su</>)} </div>)}

                            </div>
                            {/* )} */}
                            </div>)}
                        </div>
                        </div>
)}

                        <div style={{
                            display:"flex", 
                            flexDirection:"row",
                            justifyContent: "center",
                            marginLeft: "6vw"
                            
                        }}><div 
                            style={{
                                color: styles.colors.color3,
                                marginLeft: !state.iphone?"40px": "20px",
                                width: "12vw",
                                
                                }}>
                                    {(student.getJson().check || student.getJson().trackTime) &&  (<Checkedd  big={false} size={styles.checkbox.size1} app={app} component={student} checked={student.getJson().checked} time={student.getJson().time}/> )}
                                    </div>

                                   
                                    </div>

                                     {/* <div onClick={dispatch.bind(this, {popupSwitch:"deleteStudent", currentstudent:student,  } )}style={{
                                    cursor:"pointer",
                                    color: styles.colors.colorLink,
                                    // marginRight:styles.mystudents.studentMargin,
                                    padding: "1px",
                                    marginLeft:"25%",
                                     
                                        }}>
                                    delete</div> */}
                    </div>
                    </div>
                    )}
                    
                    </div>
                </div>
                </div>

               
        );
    }
}

export default StudentList;
//                    {this.props.app.state.currentuser.students.length!==0?(<div>{this.props.app.state.currentuser.students.map((student, index) =><div key={index} >{student.firstName}</div>)}</div>):(<></>)}
