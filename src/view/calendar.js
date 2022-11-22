import React, { Component } from "react";
import moment from "moment";

class Calendar extends Component {
    constructor(props) {
        super(props);
      

        this.state = {
        

    };
}
getDay(day){

}
componentDidMount(){
    
    if(this.props.app.state.currentuser.getJson().role==="teacher"){
    let day = moment().format('dddd');
    // let currentHour= moment().format('h a');
    let splitHour = moment().calendar().split(" ");
    let currentHour= splitHour[2][0] + " " + (splitHour[3].toLowerCase());
    let tempStud = undefined
    if(currentHour.includes("pm")){
        currentHour = parseInt(currentHour.split(" "))+12
    }
    else{
        currentHour = parseInt(currentHour.split(" "))
    }
    let days = this.props.app.state.appointments[day];
    let nextAppoinments=[];
    for(let i = 0; i<days.length; i++){
        let hour="";
        for(let j = 0; j<days[i].scheduling.length; j++){
            if(days[i].scheduling[j]===":"){
                if(days[i].scheduling.includes("pm")){
                    hour= (parseInt(hour)+12).toString();
                }
                days[i].hour=hour;
                if(parseInt(hour)>currentHour){
                    
                    // if(splitHour[2][splitHour[2].length-1]>0 &&)
                    if(tempStud===undefined){
                        tempStud= days[i];
                    }
                    else if(parseInt(hour)<parseInt(tempStud.hour)){
                        tempStud=days[i];
                    }
                    
                }
                break;
            }
            else{
                hour+=days[i].scheduling[j]
            }
        }
    }
    if(tempStud){
        tempStud.nextAppointment=true;
    }
    
    this.props.app.dispatch({appointments: {...this.props.app.state.appointments, [day]: days}})
    
}
}
    
    
   
    render() {
        let app=this.props.app;
        let state= app.state;
        let styles=state.styles;
        let dispatch=app.dispatch;

        return (
            <div 
            style={{...styles.biggestcard,  }}>
            
                    <div style={{display:"flex", flexDirection:"row", padding:"50px 0px 50px 0px", width:"100%", height:"100%", alignItems:"center" }}>
                <div className="scroller" style={{
                    display:"flex", height:"100%",
                    flexDirection:"column", 
                    alignItems:"center",
                    width: state.ipad?"13vw": "12vw",
                    
                    // marginRight:this.props.app.state.styles.margins.margin4,
                    // padding: this.props.app.state.styles.margins.margin4,
                    fontSize: this.props.app.state.styles.fonts.fontsize1,
                    //background: index%2===0 ? this.props.app.state.styles.colors.colorTransparent+"AA":"" 
            }}><div style={{
                display:"flex", 
                flexDirection:"column", 
                alignItems:"center"
                }}><div>{moment().format('dddd')==="Monday"?(<h3>Today</h3>):(<h3>Monday</h3>)}</div>
            {/* <div>{moment().format('dddd')==="Monday"?(<>{moment().format('MMMM Do')}</>):(<>{()=>{
                
                let m = moment().format('dddd');
                let date = moment().format('D');
                
            }}</>)}
            </div>  */}
            
            </div><div style={{width:"100%"}}>{this.props.app.state.appointments?.Monday?.map((student, index) =><div style={{width:"100%", display:"flex", justifyContent:"center"}} key={index} >
                 <div style={{
                    display:"flex", 
                    flexDirection:"row",
                    borderRadius: "10px", 
                    
                    padding:"10px",
                    boxShadow: styles.borders.dropShadow, 
                    background: student.nextAppointment? this.props.app.state.styles.colors.colorLink:  this.props.app.state.styles.colors.color6,
                    alignItems:"center",
                    width: "96%", 
                    marginLeft: "4px",
                    marginBottom: "4px",}}><img src={student.picURL} 
                        style={{
                            width:"30px", 
                            height:"30px",
                            marginRight: this.props.app.state.styles.margins.margin4,
                            borderRadius:"50%"}} alt ="pic"/><div style={{fontSize:state.ipad?"12px":"auto"}}><div>{student.firstName.length>20?(<>{student.firstName.slice(0,20)}</>):(<>{student.firstName}</>)} {student.lastName}</div>{student.scheduling}</div></div>
                 </div>)}</div></div>
                <div className="scroller" style={{
                    display:"flex", height:"100%",
                    borderLeft:"1px solid gray",
                    flexDirection:"column",
                    alignItems:"center",
                    width: state.ipad?"13vw": "12vw",
                    
                    // marginRight:this.props.app.state.styles.margins.margin4,
                    // padding: this.props.app.state.styles.margins.margin4,
                    fontSize: this.props.app.state.styles.fonts.fontsize1,
                    //background: index%2===0 ? this.props.app.state.styles.colors.colorTransparent+"AA":""             
                    }}><div style={{
                        display:"flex", 
                        flexDirection:"column", 
                        alignItems:"center"}}><div>{moment().format('dddd')==="Tuesday"?(<h3>Today</h3>):(<h3>Tuesday</h3>)}</div>
                    {/* <div>{moment().format('MMMM Do')}</div> */}
                     </div>


                     <div style={{width:"100%", }}>{this.props.app.state.appointments?.Tuesday?.map((student, index) =><div style={{width:"100%", display:"flex", justifyContent:"center"}} key={index} >
                 <div style={{
                    display:"flex",
                     flexDirection:"row",
                     borderRadius: "11px", 
                     
                     padding:"10px",
                     boxShadow: styles.borders.dropShadow,
                     background: student.nextAppointment? this.props.app.state.styles.colors.colorLink:  this.props.app.state.styles.colors.color6, 
                     color:student.nextAppointment? this.props.app.state.styles.colors.color6: "black", 
                     alignItems:"center",
                     marginLeft: "4px",
                     marginBottom: "4px",
                     width: "96%" }}><img src={student.picURL} 
                     style={{
                        width:"30px", 
                        height:"30px", 
                        borderRadius:"50%",
                        marginRight: this.props.app.state.styles.margins.margin4,}} alt ="pic"/><div style={{fontSize:state.ipad?"12px":"auto"}}><div>{student.firstName.length>17?(<>{student.firstName.slice(0,17)}...</>):(<>{student.firstName}</>)} {student.lastName.length>17?(<>{student.lastName.slice(0,17)}...</>):(<>{student.lastName}</>)}</div>{student.scheduling}</div></div>
                 </div>)}</div></div>
                <div className="scroller" style={{
                    display:"flex", height:"100%",
                    alignItems:"center",
                    borderLeft:"1px solid gray",
                    flexDirection:"column", 
                    width: state.ipad?"13vw": "12vw",
                    // marginRight:this.props.app.state.styles.margins.margin4, 
                    // padding: this.props.app.state.styles.margins.margin4,
                    fontSize: this.props.app.state.styles.fonts.fontsize1,
                    //background: index%2===0 ? this.props.app.state.styles.colors.colorTransparent+"AA":""  
            }}><div style={{
                display:"flex", 
                flexDirection:"column", 
                alignItems:"center"}}><div>{moment().format('dddd')==="Wednesday"?(<h3>Today</h3>):(<h3>Wednesday</h3>)} </div>
            {/* <div>{moment().format('MMMM Do')}</div> */}
             </div>


             <div style={{width:"100%", }}>{this.props.app.state.appointments?.Wednesday?.map((student, index) =><div style={{width:"100%", display:"flex", justifyContent:"center"}} key={index} >
                 <div style={{
                    display:"flex",
                    flexDirection:"row",
                    borderRadius: "11px", 
                   
                    padding:"10px",
                    boxShadow: styles.borders.dropShadow,
                    background: student.nextAppointment? this.props.app.state.styles.colors.colorLink: this.props.app.state.styles.colors.color6, 
                    color:student.nextAppointment? this.props.app.state.styles.colors.color6: "black", 
                    alignItems:"center",
                    marginLeft: "4px",
                     marginBottom: "4px",
                    width: "96%"}}><img src={student.picURL} 
                        style={{
                            width:"30px", 
                        height:"30px", 
                        borderRadius:"50%",
                        marginRight: this.props.app.state.styles.margins.margin4,
                            }} alt ="pic"/><div style={{fontSize:state.ipad?"12px":"auto"}}><div>{student.firstName.length>17?(<>{student.firstName.slice(0,17)}...</>):(<>{student.firstName}</>)} {student.lastName.length>17?(<>{student.lastName.slice(0,17)}...</>):(<>{student.lastName}</>)}</div>{student.scheduling}</div></div>
                 </div>)}</div>
             </div>
                <div className="scroller" style={{
                    display:"flex", height:"100%",
                    alignItems:"center",
                    borderLeft:"1px solid gray",
                    flexDirection:"column", 
                    width: state.ipad?"13vw": "12vw",
                    // marginRight:this.props.app.state.styles.margins.margin4, 
                    // padding: this.props.app.state.styles.margins.margin4,
                    fontSize: this.props.app.state.styles.fonts.fontsize1,
                    //background: index%2===0 ? this.props.app.state.styles.colors.colorTransparent+"AA":"" 
            }}><div style={{display:"flex", flexDirection:"column", alignItems:"center"}}><div>{moment().format('dddd')==="Thursday"?(<h3>Today</h3>):(<h3>Thursday</h3>)}</div>
            {/* <div>{moment().format('MMMM Do')}</div> */}
            
             </div> <div style={{width:"100%"}}>{this.props.app.state.appointments?.Thursday?.map((student, index) =><div style={{width:"100%", display:"flex", justifyContent:"center"}} key={index} >
                 <div style={{
                    display:"flex", 
                    flexDirection:"row",
                    borderRadius: "10px", 
                    
                    padding:"10px",
                    marginLeft: "4px",
                     marginBottom: "4px",
                     boxShadow: styles.borders.dropShadow, 
                background: student.nextAppointment? this.props.app.state.styles.colors.colorLink: this.props.app.state.styles.colors.color6, 
                alignItems:"center",
                width: "96%",
                color:student.nextAppointment? this.props.app.state.styles.colors.color6: "black"}}><img src={student.picURL} style={{width:"30px", height:"30px", borderRadius:"50%"}} alt ="pic"/><div style={{fontSize:state.ipad?"12px":"auto"}}><div>{student.firstName.length>17?(<>{student.firstName.slice(0,17)}...</>):(<>{student.firstName}</>)} {student.lastName.length>17?(<>{student.lastName.slice(0,17)}...</>):(<>{student.lastName}</>)}</div>{student.scheduling}</div></div>
                 </div>)}</div></div>
                <div className="scroller" style={{
                    display:"flex", height:"100%",
                    borderLeft:"1px solid gray",
                    flexDirection:"column", 
                    alignItems:"center",
                    width: state.ipad?"13vw": "12vw",
                    // marginRight:this.props.app.state.styles.margins.margin4, 
                    // padding: this.props.app.state.styles.margins.margin4,
                    fontSize: this.props.app.state.styles.fonts.fontsize1,
                    //background: index%2===0 ? this.props.app.state.styles.colors.colorTransparent+"AA":""  
            }}><div style={{display:"flex", flexDirection:"column", alignItems:"center"}}><div>{moment().format('dddd')==="Friday"?(<h3>Today</h3>):(<h3>Friday</h3>)} </div>
            {/* <div>{moment().format('MMMM Do')}</div> */}
             </div><div style={{width:"100%", }}>
                {this.props.app.state.appointments?.Friday?.map((student, index) =>
                <div style={{width:"100%", display:"flex", justifyContent:"center"}} key={index} >
                 <div style={{display:"flex", flexDirection:"row",borderRadius: "10px", padding:"10px",boxShadow: styles.borders.dropShadow, background: student.nextAppointment? this.props.app.state.styles.colors.colorLink: this.props.app.state.styles.colors.color6, alignItems:"center",width: "96%", color:student.nextAppointment? this.props.app.state.styles.colors.color6: "black" }}>
                    <img src={student.picURL} style={{width:"30px", height:"30px", borderRadius:"50%"}} alt ="pic"/>
                 <div style={{fontSize:state.ipad?"12px":"auto"}}>
                    <div>{student.firstName.length>17?(<>{student.firstName.slice(0,17)}...</>):(<>{student.firstName}</>)} {student.lastName.length>17?(<>{student.lastName.slice(0,17)}...</>):(<>{student.lastName}</>)}</div>{student.scheduling}</div></div>
                 </div>)}</div></div>
                <div className="scroller" style={{
                    display:"flex", 
                    height:"100%",
                    marginLeft: "4px",
                     marginBottom: "4px",
                    borderLeft:"1px solid gray",
                    flexDirection:"column", 
                    alignItems:"center",
                    width: state.ipad?"13vw": "12vw",
                    
                    // marginRight:this.props.app.state.styles.margins.margin4, 
                    // padding: this.props.app.state.styles.margins.margin4,
                    fontSize: this.props.app.state.styles.fonts.fontsize1,
                   // background: index%2===0 ? this.props.app.state.styles.colors.colorTransparent+"AA":""  
            }}><div style={{display:"flex", flexDirection:"column", alignItems:"center"}}><div>{moment().format('dddd')==="Saturday"?(<h3>Today</h3>):(<h3>Saturday</h3>)} </div>
            {/* <div>{moment().format('MMMM Do')}</div>  */}
            </div><div style={{width:"100%",}}>{this.props.app.state.appointments?.Saturday?.map((student, index) =><div style={{width:"100%", display:"flex", justifyContent:"center"}} key={index} >
                 <div style={{display:"flex", flexDirection:"row",borderRadius: "10px", padding:"10px",
                boxShadow: styles.borders.dropShadow, marginLeft: "4px",
                marginBottom: "4px", background: student.nextAppointment? this.props.app.state.styles.colors.colorLink: this.props.app.state.styles.colors.color6, alignItems:"center",
                width: "96%", color:student.nextAppointment? this.props.app.state.styles.colors.color6: "black"}}><img src={student.picURL} 
                style={{width:"30px", height:"30px", borderRadius:"50%"}} alt ="pic"/><div style={{fontSize:state.ipad?"12px":"auto"}}><div >{student.firstName.length>17?(<>{student.firstName.slice(0,17)}...</>):(<>{student.firstName}</>)} {student.lastName.length>17?(<>{student.lastName.slice(0,17)}...</>):(<>{student.lastName}</>)}</div >{student.scheduling}</div></div>
                 </div>)}</div></div>
                <div className="scroller" style={{
                    display:"flex", 
                    height:"100%",
                    alignItems:"center",
                    width:state.ipad?"13vw": "12vw",
                    borderLeft:"1px solid gray",
                    flexDirection:"column", 
                    
                    // marginRight:this.props.app.state.styles.margins.margin4, 
                    // padding: this.props.app.state.styles.margins.margin4,
                    fontSize: this.props.app.state.styles.fonts.fontsize1,
                    //background: index%2===0 ? this.props.app.state.styles.colors.colorTransparent+"AA":""  
            }}><div style={{display:"flex", flexDirection:"column", alignItems:"center"}}><div>{moment().format('dddd')==="Sunday"?(<h3>Today</h3>):(<h3>Sunday</h3>)} </div>
            {/* <div>{moment().format('MMMM Do')}</div> */}
             </div><div style={{width:"100%", }}>{this.props.app.state.appointments?.Sunday?.map((student, index) =><div style={{width:"100%", display:"flex", justifyContent:"center"}} key={index} >
                 <div style={{display:"flex", flexDirection:"row",borderRadius: "10px", padding:"10px",
                boxShadow: styles.borders.dropShadow, alignItems:"center", marginLeft: "4px",
                marginBottom: "4px",
                width: "96%", background: student.nextAppointment? this.props.app.state.styles.colors.colorLink: this.props.app.state.styles.colors.color6, color:student.nextAppointment? this.props.app.state.styles.colors.color6: "black"}}><img src={student.picURL} style={{width:"30px", height:"30px", borderRadius:"50%"}} alt ="pic"/><div style={{fontSize:state.ipad?"12px":"auto"}}><div >{student.firstName.length>17?(<>{student.firstName.slice(0,17)}...</>):(<>{student.firstName}</>)} {student.lastName.length>17?(<>{student.lastName.slice(0,17)}...</>):(<>{student.lastName}</>)}</div>{student.scheduling}</div></div>
                 </div>)}</div></div>
                </div>
                </div>
        );
    }
}

export default Calendar;