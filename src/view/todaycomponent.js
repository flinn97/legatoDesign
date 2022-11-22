import React, { Component } from 'react';
import calendarService from '../services/calendarService';
import moment from 'moment';


class Today extends Component {
    constructor(props) {
        //create state
        super(props);
        this.state = {
            day: "",
            daynext: "",
            daylast: "",
        };
    }
    async componentDidMount(){
        let students = [];
        let components = this.props.app.state.componentList.getComponents()
        for (const key in components) {

            let json = components[key].getJson()
            if (json.type === "student") {
                students.push(components[key]);
            }
        }
        let appointments = await calendarService.getOrganizedCalendar(students);
        this.props.app.dispatch({ appointments: appointments });

        let obj = {
            Monday: "Tuesday",
            Tuesday: "Wednesday",
            Wednesday: "Thursday",
            Thursday: "Friday",
            Friday: "Saturday",
            Saturday: "Sunday",
            Sunday: "Monday",
        }
        let day = moment().format("dddd");             
        let daynext = obj[day];      
        let daylast = moment().add(2, 'days').calendar().split(" ");
        this.setState({
            day: day,
            daynext: daynext,
            daylast: daylast[0],
        })
         
    }

    async componentDidUpdate() {
        if(this.props.app.state.studentAdded){
            //
            await this.props.app.dispatch({studentAdded:false})
            let students = [];
        let components = this.props.app.state.componentList.getComponents()
        for (const key in components) {

            let json = components[key].getJson()
            if (json.type === "student") {
                students.push(components[key]);
            }
        }
        let appointments = await calendarService.getOrganizedCalendar(students);
        this.props.app.dispatch({ appointments: appointments });

        let obj = {
            Monday: "Tuesday",
            Tuesday: "Wednesday",
            Wednesday: "Thursday",
            Thursday: "Friday",
            Friday: "Saturday",
            Saturday: "Sunday",
            Sunday: "Monday",
        }
        let day = moment().format("dddd");             
        let daynext = obj[day];      
        let daylast = moment().add(2, 'days').calendar().split(" ");
        this.setState({
            day: day,
            daynext: daynext,
            daylast: daylast[0],
        })
        }
        
    }

    render() {
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles


        return (
            <div style={styles.tallcard}>
                <div style={{
                    padding: styles.margins.margin4,
                    fontSize: "20px",
                    fontFamily: styles.fonts.appFont,
                    fontWeight: styles.fonts.fontweightMed,
                    marginLeft: styles.margins.margin3,
                    marginLeft: "1vw",
                    color: styles.colors.color8,
                    letterSpacing: styles.fonts.appSpacing,
                    marginTop: "2vh",

                }}><b>Schedule</b></div>
                <div className="scroller">
                <div style={{ 
                    display: "flex",
                    height:"98%", 
                    flexDirection: "column",
                    fontWeight: '600',
                    marginLeft: !state.iphone? "2vw": "10vw",
                    fontSize:"13px", 
                    color: styles.colors.color3 +"77",
                    
                    }}>
                
                            <div style={{fontSize:"15px", }}>{this.state.day}</div>

                            {state.appointments[this.state.day]?.map((student, index) =>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                
                                width: "100%",
                                
                            }}>
                                {/* STUDENT SCHEDULED TIME */}
                                <div style={{
                                        borderLeftStyle: "solid",
                                        height: "100%",
                                        borderColor: styles.colors.color3 +"57",
                                        marginLeft: "4px",
                                        borderWidth: "2px",
                                        textAlign: "center",
                                    }} key={index} >
                                        <div style={{
                                            marginLeft: state.styles.margins.margin4,
                                            // fontSize: state.styles.fonts.fontsize5,
                                            
                                            
                                        }}>{student.scheduling}</div>
                                    </div>

                                {/* STUDENT FIRST NAME */}
                                <div key={index} style={{
                                    marginLeft: "40px",
                                    color: styles.colors.color3,
                                    fontWeight: styles.fonts.fontweightMed,
                                }} >{student.firstName.length>12? (<>{student.firstName.slice(0,10)}...</>):(<>{student.firstName}</>)} </div>
                    
                            </div>)}
                                <div style={{fontSize:"15px", }}>{this.state.daynext}</div>

                            {state.appointments[this.state.daynext]?.map((student, index) =>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    
                                }}>
                                    {/* STUDENT SCHEDULED TIME */}
                                    <div style={{
                                        borderLeftStyle: "solid",
                                        height: "100%",
                                        borderColor: styles.colors.color3 +"57",
                                        marginLeft: "4px",
                                        borderWidth: "2px",
                                        textAlign: "center",
                                    }} key={index} >
                                        <div style={{
                                           
                                            marginLeft: state.styles.margins.margin4,
                                            // fontSize: state.styles.fonts.fontsize5,
                                            
                                        }}>{student.scheduling}</div>
                                    </div>

                                    {/* STUDENT FIRST NAME */}
                                    <div key={index} style={{
                                       marginLeft: "40px",
                                        color: styles.colors.color3,
                                        // fontWeight: styles.fonts.fontweightMed,
                                    }} >{student.firstName.length>12? (<>{student.firstName.slice(0,10)}...</>):(<>{student.firstName}</>)}  </div>

                                    
                                </div>)}

                                <div style={{fontSize:"15px", }}>{this.state.daylast}</div>
                            {state.appointments[this.state.daylast]?.map((student, index) =>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    
                                }}>
                                    {/* STUDENT SCHEDULED TIME */}
                                    <div style={{
                                        borderLeftStyle: "solid",
                                        height: "100%",
                                        borderColor: styles.colors.color3 +"57",
                                        marginLeft: "4px",
                                        borderWidth: "2px",
                                        textAlign: "center",
                                    }} key={index} >
                                        <div style={{
                                            marginLeft: state.styles.margins.margin4,
                                            fontSize: state.styles.fonts.fontsize5,
                                        }}>{student.scheduling}</div>
                                    </div>

                                    {/* STUDENT FIRST NAME */}
                                    <div key={index} style={{
                                        marginLeft: "40px",
                                        color: styles.colors.color3,
                                        fontWeight: styles.fonts.fontweightMed,
                                    }} >{student.firstName.length>12? (<>{student.firstName.slice(0,10)}...</>):(<>{student.firstName}</>)} </div>

                                    
                        </div>)}

                </div>
            </div></div>


        );
    }
}

export default Today;