import React, { Component } from 'react';
import clock from "./clock.png";
import Dropdown from './dropdown';
import Down from './downarrow.png';
import Switch from "react-switch";
import calendarService from '../../services/calendarService';
import SelectTime from "../selectTime.js";

export default class EditProgress extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.selectTime = this.selectTime.bind(this);
        this.selectDay = this.selectDay.bind(this);
        this.selectDays = this.selectDays.bind(this);
        this.changeTime = this.changeTime.bind(this);
        this.dispatch = this.dispatch.bind(this);
        this.closedrop = this.closedrop.bind(this);
        this.getSchedule = this.getSchedule.bind(this);
        this.editDays = this.editDays.bind(this);
        this.changeObjTime = this.changeObjTime.bind(this);
        this.handleChecksChange = this.handleChecksChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleSpChange = this.handleSpChange.bind(this);

        this.state = {
            // first: this.props.app.state.currentstudent.firstName,
            // last: this.props.app.state.currentstudent.lastName,
            // username: this.props.app.state.currentstudent.username,
            // scheduling: this.props.app.state.currentstudent.scheduling,
            // starPoints: this.props.app.state.currentstudent.starPoints,
            day: this.props.app.state.currentstudent.day,
            // email: this.props.app.state.currentstudent.email,
            // phone: this.props.app.state.currentstudent.phone,
            // totalDaysPracticed: this.props.app.state.currentstudent.totalDaysPracticed,
            // totalDays: this.props.app.state.currentstudent.totalDays,
            // timeTotal: this.props.app.state.currentstudent.timeTotal,
            // totaltime: this.props.app.state.currentstudent.totaltime,
            // time: this.props.app.state.currentstudent.time,
            // checked: this.props.app.state.currentstudent.syncedCheckbox,
            // daysPracticed: this.props.app.state.currentstudent.daysPracticed,
            // wmin: this.props.app.state.currentstudent.wmin,
            day: this.props.app.state.currentstudent?.getJson()?.day,
            scheduling: "",
            time: "12:00 pm",
            showtimes: "",
            selectTime: false,
            selectDay: false,
            days: [],
            times: [],
            sched: {},
            objArr: [],
            // showtime: this.props.app.state.currentstudent.scheduling
        }
    }
    componentDidMount() {
        //
        let objArr = [];
        let schedulearr = [];
        let obj = {};
        let timeobj = {};
        let sched = this.props.app.state.currentstudent?.getJson()?.days;

        for (const key in sched) {

            let attribute = sched[key].slice(0, -3)
            timeobj[attribute] = sched[key]
            if (obj[attribute]) {
                obj[attribute].push(key);
            }
            else {
                obj[attribute] = [key]
            }
        }
        let o = {}
        for (const key in obj) {
            for (const day in obj[key]) {
                o[obj[key][day]] = timeobj[key];
            }
            objArr.push(o);
            o = {}
        }

        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let dispatch = app.dispatch;
        let component = state.currentstudent;
        let compJson = component?.getJson();
        let opps = component?.getOperationsFactory();
        if (compJson) {
            this.setState({
                trackTime: compJson.trackTime,
                starpoints: compJson.starpoints,
                check: compJson.check
            })
        }



        this.setState({ objArr: objArr, });
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
    dispatch(obj) {

        this.setState({
            [Object.keys(obj)[0]]: obj[Object.keys(obj)[0]]
        })
    }
    handleChecksChange(checked) {
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let dispatch = app.dispatch;
        let component = state.currentstudent;
        let compJson = component?.getJson();
        let opps = component?.getOperationsFactory();
        opps.componentDispatch({ updatecheck: checked })
        this.setState({ check: checked });
    }
    handleTimeChange(checked) {
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let dispatch = app.dispatch;
        let component = state.currentstudent;
        let compJson = component?.getJson();
        let opps = component?.getOperationsFactory();
        opps.componentDispatch({ updatetrackTime: checked })
        this.setState({ trackTime: checked });
    }
    handleSpChange(checked) {
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let dispatch = app.dispatch;
        let component = state.currentstudent;
        let compJson = component?.getJson();
        let opps = component?.getOperationsFactory();
        opps.componentDispatch({ updatestarpoints: checked })
        this.setState({ starpoints: checked });
    }
    handleChange = (event) => {

        let { name, value } = event.target
        if (value === "true" || value === "false") {
            value = value === "true" ? true : false
        }
        this.setState({
            [name]: value,
        })
    }
    selectDays(day) {
        let arr = [...this.state.days];
        if (!arr.includes(day)) {
            arr.push(day)
        }
        else {
            arr = arr.filter(function (value, index, arr) {
                return value !== day;
            });
        }

        this.setState({
            days: arr
        })
    }
    selectDay() {
        this.setState({
            selectDay: !this.state.selectDay,
        })

    }
    closedrop() {
        this.setState({
            selectDay: false,
            selectTime: false,
            showtime: false,

        })
    }
    getSchedule(time) {
        let hour = time.ampm === "pm" ? time.hour === "12" ? "12" : (parseInt(time.hour) + 12).toString() : time.hour === "12" ? "00" : time.hour;
        let min = time.min;
        let ampm = time.ampm;
        let aschedule = hour + min + ' ' + ampm;
        return aschedule;
    }
    changeTime(state) {

        let times = this.getSchedule(state);
        let hour = state.hour;
        let min = state.min;
        let ampm = state.ampm;
        let showtime = hour + ':' + min + ' ' + ampm;
        let sched = { ...this.state.sched };
        sched[this.state.currentDay] = times;
        this.setState({ time: times, showtimes: showtime })
    }
    selectTime(day) {

        this.setState({
            [day + "selectTime"]: !this.state[day + "selectTime"],
            currentDay: day

        })
    }
    editDays(obj, day, index) {
        let arr = this.state[index + "days"];
        if (!arr.includes(day)) {
            arr.push(day)
        }
        else {
            arr = arr.filter(function (value, index, arr) {
                return value !== day;
            });
        }

        this.setState({ [index + "days"]: arr, [index + "time"]: obj[Object.keys(obj)[0]] });

    }
    changeObjTime(state) {
        let hour = state.hour;
        let min = state.min;
        let ampm = state.ampm;
        let showtime = hour + ':' + min + ' ' + ampm;
        let times = this.getSchedule(state);
        this.setState({ [this.state.index + "time"]: times, [this.state.index + "showtimes"]: showtime })
    }
    render() {
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let dispatch = app.dispatch;
        let component = state.currentstudent;
        let compJson = component?.getJson();
        let opps = component?.getOperationsFactory();
        return (
            <div className="popup-boxa to-front" style={{ zIndex: "200000" }} >

                <div ref={this.wrapperRef} style={{ ...styles.popup1, height: "65vh", width: (window.innerWidth>1300&&window.innerWidth<1400)?"63vw": styles.sizeSpecStud.width1 }} >
                    <div style={ ///EXIT BUTTON
                        { ...styles.buttons.closeicon, justifySelf: "flex-end" }
                    } onClick={this.props.handleClose}>x</div>
                    <div className={!state.iphone ? "" : "homeworkScroll1"} style={{ display: 'flex', flexDirection: state.iphone ? "column" : "row" }}>
                        <div>
                            <div  ///HEADER DIV
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    marginTop: "-" + styles.margins.margin4,
                                }}>

                                <div style={{ ///POPUP TITLE
                                    display: "flex",
                                    flexDirection: "row",
                                    lineHeight: "3vw",
                                    height: "3vh",


                                    fontSize: styles.fonts.fontsize1,
                                    fontWeight: styles.fonts.fontweightMed,
                                    textAlign: "center",
                                    color: styles.colors.colorOffBlack,
                                    fontSize: styles.fonts.fontsize1,
                                    marginBottom: styles.margins.margin4

                                }}><img onClick={() => { if (state.currentuser.getJson().role !== "teacher") { dispatch({ popupSwitch: "addPic" }) } }} src={state.currentstudent.getJson().picURL} style={{ width: "70px", height: "70px", borderRadius: "50%" }} alt="pic" /></div>


                            </div>

                            {/* ///BODY  */}
                            <div className={state.iphone ? "" : "homeworkScroll1"} style={{ height: "43vh", marginTop: "40px" }}>
                                <div style={{ display: "flex", flexDirection: state.iphone ? "column" : "row", marginBottom: styles.margins.margin4, marginRight: styles.margins.margin4,}}>
                                    <div className="form-group"

                                        style={{ width: state.iphone ? "89%" : "10vw", marginRight: '10px' }}>
                                        {state.iphone && (<label><b>First Name:</b></label>)}
                                        <input type="text" className="form-control" id="first" placeholder={compJson?.firstName} onChange={opps?.handleChange} name="updatefirstName" />
                                    </div>


                                    <div className="form-group"
                                        style={{
                                            width: state.iphone ? "89%" : "10vw",

                                        }}> {state.iphone && (<label><b>Last Name:</b></label>)}
                                        <input type="text" className="form-control" id="last" placeholder={compJson?.lastName} onChange={opps?.handleChange} name="updatelastName" />
                                    </div>
                                </div>


                                <div className="form-group"
                                    style={{ width: "89%" }}>
                                    <label htmlFor="parent"><b>Parent:</b></label>
                                    <input type="text" className="form-control" id="parent" placeholder={compJson?.parent} onChange={opps?.handleChange} name="updateparent" />
                                </div>
                                <div className="form-group"
                                    style={{ width: "89%" }}>
                                    <label htmlFor="phone"><b>Phone:</b></label>
                                    <input type="text" className="form-control" id="phone" placeholder={compJson?.phone} onChange={opps?.handleChange} name="updatephone" />
                                </div>
                                <div className="form-group"
                                    style={{ width: "89%" }}>
                                    <label htmlFor="email"><b>Email:</b></label>
                                    <input value={compJson?.email ? compJson?.email : "Student Hasn't Updated Yet"} type="text" className="form-control" id="email" placeholder={compJson?.email} name="updateemail" />
                                </div>
                                <div className="form-group"
                                    style={{ width: "89%" }}>
                                    <label htmlFor="address"><b>Address:</b></label>
                                    <input type="text" className="form-control" id="address" placeholder={compJson?.phone} onChange={opps?.handleChange} name="updateaddress" />
                                </div>


                                {state.currentuser.getJson().role === "teacher" && (<>
                                    <label>Should this student have daily checkboxes?</label>
                                    <Switch onChange={this.handleChecksChange} checked={this.state.check} onColor={"#57BA8E"} name="updatecheck" uncheckedIcon={false} checkedIcon={false} />

                                    {/* {compJson?.check?(
                            <select  htmlFor="updatecheck" onChange={opps?.handleChange} name="updatecheck" id="updatecheck">
                            <option value={true}>Current: Yes</option>
                            <option value={false}>No</option>                                       
                        </select>
                        ):(
                            <select  htmlFor="updatecheck" onChange={opps?.handleChange} name="updatecheck" id="updatecheck">
                                        <option value={false}>Current:No</option>                                       
                                        <option value={true}>Yes</option>
                                    </select>
                        )} */}

                                    <div className="form-group" style={{}}>
                                        <label>Should this student track time?</label>
                                        <Switch onChange={this.handleTimeChange} checked={this.state.trackTime} onColor={"#57BA8E"} name="updatecheck" uncheckedIcon={false} checkedIcon={false} />

                                        {/*  {compJson?.time?(
                            <select  htmlFor="time" onChange={opps?.handleChange} name="updatetime" id="time">
                            <option value={true}>Current: Yes</option>
                            <option value={false}>No</option>                                       
                        </select>
                        ):(
                            <select  htmlFor="time" onChange={opps?.handleChange} name="updatetime" id="time">
                                        <option value={false}>Current:No</option>                                       
                                        <option value={true}>Yes</option>
                                    </select>
                        )}*/}
                                    </div>
                                    {/* <div>Clear Checks</div>
                                    <div>Clear Time</div> */}
                                    {/* <div className="form-group">
                                <label>Track Star Points?</label>
                                <Switch onChange={this.handleSpChange} checked={this.state.starpoints} onColor={"#57BA8E"} name="updatecheck" uncheckedIcon={false} checkedIcon={false} />

                                {/* {compJson?.starPoints?(
                                    <select htmlfor="starPoints" onChange={opps?.handleChange} name="updatestarPoints" id="starPoints">
                                    <option value={true}>Current: yes</option>
                                    <option value={false}>no</option>
                                    </select>):(
                                        <select htmlfor="starPoints" onChange={opps?.handleChange} name="updatestarPoints" id="starPoints">
                                        <option value={false}>Current: no</option>
                                        <option value={true}> yes</option>
                                        </select>
                                     )} 
                            </div> */}

                                    {/* <div> */}
                                    {/* <div> */}
                                    {/* <div className="form-group" >
                                <label htmlFor="totalDays">Days to practice:</label>
                                <input type="text" className="form-control" id="updatetotalDays" style={{ width: "60px" }} placeholder={compJson?.totalDays} onChange={opps?.handleChange} name="updatetotalDays"/>
                            </div>
                            <button className="btn btn-block" style={{ background: "#696eb5", height: "35px", color: "#F0F2EF", marginTop:"5px", width:"185px" }} 
                            onClick= {()=>{
                                this.setState({dayscleared:true});
                                opps?.componentDispatch({updatedaysPracticed:"0"}); }}>
                                {!this.state.dayscleared?(<span className="fill1"><p style={{ marginBottom: "10px" }}>Clear Days Practiced</p></span>):(<span className="fill1"><p style={{ marginBottom: "10px" }}>Days Cleared</p></span>)}</button>
                                <div>
                                    <div>
                                    <div className="form-group" >
                                    <label htmlFor="wmin">Practice minutes:</label>
                                    <input type="text" className="form-control" id="wmin" placeholder={compJson?.wmin} style={{ width: "60px" }} onChange={opps?.handleChange} name="updatewmin"/>
                                </div>
                                
                                <button className="btn btn-block" style={{ background: "#696eb5", height: "35px", color: "#F0F2EF", marginTop:"5px", width:"185px" }} 
                               onClick={()=>{
                                this.setState({timecleared:true});
                                opps?.componentDispatch({updatetimeTotalforGoal:"0"}); }}>{!this.state.timecleared?(<span className="fill1"><p style={{ marginBottom: "10px" }}>Clear Time Practiced</p></span>):(<span className="fill1"><p style={{ marginBottom: "10px" }}>Time Cleared</p></span>)}</button> */}
                                </>)}




                            </div>
                        </div>

                        <div style={{ marginTop: state.iphone ? "35vh" : "6vh", marginLeft: "2vw" }}>
                            <div className="homeworkScroll1" style={{ height: "45vh" }}>
                                <h3>Lesson Times</h3>
                                {/* UMM?? */}

                                {this.state.objArr?.map((obj, index) =>
                                    <div>{!this.state[index + "edit"] ? (
                                        <div style={{ marginTop: "20px", marginRight: "2.1vw", display: "flex", flexDirection: "column", padding: "2%", background: "#6C86F4", width: (window.innerWidth>1300&&window.innerWidth<1400)?"25vw" :window.innerWidth<600?"85vw":"16vw", borderRadius: "14px", marginBottom: "20px" }}>
                                            <div style={{ display: "flex", flexDirection: "row", marginBottom: "20px" }}>

                                                {Object.keys(obj).includes("Monday") && (<div
                                                    style={{
                                                        ...styles.daytag, background: "white", color: "#6C86F4", display: "flex", flexDirection: "row", marginTop: "4px",
                                                        cursor: "default",
                                                        width: "36px",
                                                    }} >Mon</div>)}
                                                {Object.keys(obj).includes("Tuesday") && (<div
                                                    style={{
                                                        ...styles.daytag, background: "white", color: "#6C86F4", display: "flex", flexDirection: "row", marginTop: "4px", 
                                                        cursor: "default",
                                                        width: "36px",
                                                    }}>Tues</div>)}
                                                {Object.keys(obj).includes("Wednesday") && (<div
                                                    style={{
                                                        ...styles.daytag, background: "white", color: "#6C86F4", display: "flex", flexDirection: "row", marginTop: "4px", 
                                                        cursor: "default",
                                                        width: "36px",
                                                    }}>Wed</div>)}
                                                {Object.keys(obj).includes("Thursday") && (<div
                                                    style={{
                                                        ...styles.daytag, background: "white", color: "#6C86F4", display: "flex", flexDirection: "row", marginTop: "4px",
                                                        cursor: "default",
                                                        width: "36px",
                                                    }}>Thur</div>)}
                                                {Object.keys(obj).includes("Friday") && (<div
                                                    style={{
                                                        ...styles.daytag, background: "white", color: "#6C86F4", display: "flex", flexDirection: "row", marginTop: "4px", 
                                                        cursor: "default",
                                                        width: "36px",
                                                    }}>Fri</div>)}
                                                {Object.keys(obj).includes("Saturday") && (<div
                                                    style={{
                                                        ...styles.daytag, background: "white", color: "#6C86F4", display: "flex", flexDirection: "row", marginTop: "4px",
                                                        cursor: "default",
                                                        width: "36px",
                                                    }}>Sat</div>)}
                                                {Object.keys(obj).includes("Sunday") && (<div
                                                    style={{
                                                        ...styles.daytag, background: "white", color: "#6C86F4", display: "flex", flexDirection: "row", marginTop: "4px", 
                                                        cursor: "default",
                                                        width: "36px",
                                                    }}>Sun</div>)}
                                            </div>
                                            <div style={{ flexDirection: "row", display: 'flex', }}>
                                                <div className="form-control" id="time" style={{
                                                    width: "110px",
                                                    height: "30px",
                                                    flexDirection: "row",
                                                    display: "flex",
                                                    marginLeft: styles.margins.margin4,
                                                    marginRight: styles.margins.margin4,
                                                }}>
                                                    <div style={{
                                                        width: "150px", alignSelf: "center"
                                                    }}>{obj[Object.keys(obj)[0]]?.includes("pm") ? (<>{calendarService.getTime(obj[Object.keys(obj)[0]])}</>) : (<>{obj[Object.keys(obj)[0]]}</>)}</div>
                                                    <img src={clock} alt="clock" style={{
                                                        width: "15px", height: "15px", 
                                                    }} />
                                                </div>


                                                <div style={{
                                                    width: "100px",
                                                    height: "30px", cursor:"pointer", marginLeft: "20px", background: "white", borderRadius: "7px", display: "flex", justifyContent: "center", alignItems: "center"
                                                }} onClick={() => {

                                                    let arr = [];
                                                    let time;
                                                    for (const key in obj) {
                                                        arr.push(key);
                                                        time = obj[key]
                                                    }
                                                    this.setState({ [index + "edit"]: true, [index + "days"]: arr, [index + "showtime"]: time, index: index })
                                                }}> Edit Time</div>


                                                <div style={{
                                                    position:"relative",
                                                        color: styles.colors.colorWarning,
                                                        display: "flex", flexDirection:"column",
                                                        alignContent: "center", justifyContent: "center",
                                                        fontSize: styles.fonts.fontsize5,
                                                        height:"1.6vh",
                                                        verticalAlign:"center",
                                                        fontSize: "1.2vh",
                                                        width: "1.8vw",
                                                         cursor:"pointer",
                                                        marginTop:"7px"}} onClick={() => {
                                                    let arr = [...this.state.objArr];
                                                    arr = arr.filter(function (value, ind, arr) {
                                                        return ind !== index;
                                                    });
                                                    this.setState({ objArr: arr })
                                                }}>
                                                    <div
                                                    style={{
                                                        position:"absolute",
                                                        color: styles.colors.colorWarning,
                                                        background: "white",
                                                       // fontSize: styles.fonts.fontsize5,
                                                        height:"30px",
                                                        verticalAlign:"center",
                                                        width: "40px",
                                                        display:"flex",
                                                        justifyContent:"center",
                                                        alignItems:"center",
                                                        marginLeft: "10px",
                                                        cursor:"pointer",
                                                        borderRadius:"7px",
                                                        
                                                        left:"-.2vw",
                                                        
                                                    }}
                                                > Delete </div></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", padding: "2%", background: '#F0F0F0',  width: (window.innerWidth>1300&&window.innerWidth<1400)?"25vw" :window.innerWidth<600?"85vw":"16vw", borderRadius: "14px", marginBottom: "20px" }}>
                                            <div style={{ display: "flex", flexDirection: "row", marginBottom: "20px" }}>
                                                <div onClick={this.editDays.bind(this, obj, "Monday", index)}
                                                    style={this.state[index + "days"].includes("Monday") ? { ...styles.daytag } : {...styles.daytagUnselect}}
                                                >Mon</div>

                                                <div onClick={this.editDays.bind(this, obj, "Tuesday", index)}
                                                    style={this.state[index + "days"].includes("Tuesday") ? { ...styles.daytag } : {...styles.daytagUnselect}}
                                                >Tues</div>

                                                <div onClick={this.editDays.bind(this, obj, "Wednesday", index)}
                                                    style={this.state[index + "days"].includes("Wednesday") ? { ...styles.daytag } : {...styles.daytagUnselect}}
                                                >Wed</div>

                                                <div onClick={this.editDays.bind(this, obj, "Thursday", index)}
                                                    style={this.state[index + "days"].includes("Thursday") ? { ...styles.daytag } : {...styles.daytagUnselect}}
                                                >Thur</div>

                                                <div onClick={this.editDays.bind(this, obj, "Friday", index)}
                                                    style={this.state[index + "days"].includes("Friday") ? { ...styles.daytag } : {...styles.daytagUnselect}}
                                                >Fri</div>

                                                <div onClick={this.editDays.bind(this, obj, "Saturday", index)}
                                                    style={this.state[index + "days"].includes("Saturday") ? { ...styles.daytag } : {...styles.daytagUnselect}}
                                                >Sat</div>

                                                <div onClick={this.editDays.bind(this, obj, "Sunday", index)}
                                                    style={this.state[index + "days"].includes("Sunday") ? { ...styles.daytag } : {...styles.daytagUnselect}}
                                                >Sun</div>

                                            </div>
                                            <div style={{ flexDirection: "row", display: 'flex', }}>
                                                <div style={{ marginLeft: "10px", marginRight: '20px' }}><SelectTime handleChange={this.changeObjTime} hour={

                                                    this.state[index + 'showtime'].length === 7 ?
                                                        (this.state[index + 'showtime'].includes("pm") && this.state[index + 'showtime'].slice(0, 2) !== "12") ?
                                                            parseInt(this.state[index + 'showtime'].slice(0, 2)) - 12 :
                                                            this.state[index + 'showtime'].slice(0, 2) :
                                                        this.state[index + 'showtime'].includes("pm") ?
                                                            parseInt(this.state[index + 'showtime'].slice(0, 1)) - 12 :
                                                            this.state[index + 'showtime'].slice(0, 1)
                                                }
                                                    min={
                                                        this.state[index + 'showtime'].length === 7 ? this.state[index + 'showtime'].slice(2, 4) : this.state[index + 'showtime'].slice(1, 3)
                                                    }
                                                    ampm={this.state[index + 'showtime'].slice(-2)}
                                                /></div>
                                                {/* <div onClick={() => { this.setState({ [index + 'showtime']: this.state[index + 'showtime'] !== undefined ? false : !this.state[index + 'showtime'], index: index }) }} className="form-control" id="time" style={{ width: "120px", height: "30px", flexDirection: "row", display: "flex" }}>
                                                <div style={{ width: "90px", alignSelf: "center" }}>
                                                    {this.state[index + "time"] ? (<>{this.state[index + "time"]}</>) : (<>{obj[Object.keys(obj)[0]]?.includes("pm")?(<>{calendarService.getTime(obj[Object.keys(obj)[0]])}</>):(<>{obj[Object.keys(obj)[0]]}</>)}</>)}
                                                </div>
                                                <img src={clock} alt="clock" style={{ width: "15px", height: "15px", }} />
                                            </div> */}
                                                <div style={{
                                                width: "100px",
                                                height: "30px", cursor:"pointer", marginLeft: "20px", background: "white", borderRadius: "7px", display: "flex", 
                                                justifyContent: "center", alignItems: "center"                                                   
                                                }}
                                                
                                                onClick={() => {
                                                    
                                                    let ar = [...this.state.objArr];
                                                    let arr = [...this.state[index + 'days']];
                                                    let newobj = {};
                                                    for (const key in arr) {
                                                        newobj[arr[key]] = this.state[index + 'time'];
                                                        if(this.state[index + 'time']===undefined){
                                                            this.setState({[index+"edit"]: false})
                                                            return;
                                                        }
                                                    }
                                                    ar[index] = newobj
                                                    if (Object.keys(obj).length > 0) {
                                                        this.setState({ [index + "edit"]: false, objArr: ar })
                                                    }
                                                }}> Save</div>
                                            </div>
                                        </div>
                                    )}
                                    </div>

                                )}

                                <div style={{ marginTop: "15px", height: "105px" }} className="form-group forfiles" >
                                    <div style={{

                                        display: "flex",
                                        flexDirection: "column",
                                        width: (window.innerWidth>1300&&window.innerWidth<1400)?"25vw" :window.innerWidth<600?"85vw":"16vw",
                                        //justifyContent:"space-between",
                                        background: styles.colors.colorShadow + "54",
                                        borderRadius: "23px",
                                        boxShadow: "2px 3px 6px" + styles.colors.colorOffwhite,
                                    }}>


                                        <div style={{}}>
                                            <div style={{
                                                
                                                flexDirection: "row",
                                                display: 'flex',
                                                padding: "2%",
                                                height: "5vh",

                                                alignContent: "center",
                                                backgroundColor: styles.colors.colorOffwhite,
                                                color: styles.colors.colorOffBlack,
                                                marginTop: styles.margins.margin4,
                                            }}>
                                                <div onClick={this.selectDays.bind(this, "Monday")}

                                                    style={{
                                                        ...styles.daytag,
                                                        color: this.state.days.includes("Monday") && "white",
                                                        backgroundColor: this.state.days.includes("Monday") ? styles.colors.color1 : "white",
                                                    }}

                                                >Mon </div>
                                                <div onClick={this.selectDays.bind(this, "Tuesday")}
                                                    style={{
                                                        ...styles.daytag,
                                                        color: this.state.days.includes("Tuesday") && "white",
                                                        backgroundColor: this.state.days.includes("Tuesday") ? styles.colors.color1 : "white",
                                                    }}
                                                >Tues </div>
                                                <div onClick={this.selectDays.bind(this, "Wednesday")}
                                                    style={{
                                                        ...styles.daytag,
                                                        color: this.state.days.includes("Wednesday") && "white",
                                                        backgroundColor: this.state.days.includes("Wednesday") ? styles.colors.color1 : "white",
                                                        
                                                    }}
                                                >Wed </div>
                                                <p onClick={this.selectDays.bind(this, "Thursday")}
                                                    style={{
                                                        ...styles.daytag,
                                                        color: this.state.days.includes("Thursday") && "white",
                                                        backgroundColor: this.state.days.includes("Thursday") ? styles.colors.color1 : "white",
                                                    }}
                                                >Thur </p>
                                                <div onClick={this.selectDays.bind(this, "Friday")}
                                                    style={{
                                                        ...styles.daytag,
                                                        color: this.state.days.includes("Friday") && "white",
                                                        backgroundColor: this.state.days.includes("Friday") ? styles.colors.color1 : "white",
                                                    }}
                                                >Fri </div>
                                                <div onClick={this.selectDays.bind(this, "Saturday")}
                                                    style={{
                                                        ...styles.daytag,
                                                        color: this.state.days.includes("Saturday") && "white",
                                                        backgroundColor: this.state.days.includes("Saturday") ? styles.colors.color1 : "white",
                                                    }}
                                                >Sat </div>
                                                <div onClick={this.selectDays.bind(this, "Sunday")}
                                                    style={{
                                                        ...styles.daytag,
                                                        color: this.state.days.includes("Sunday") && "white",
                                                        backgroundColor: this.state.days.includes("Sunday") ? styles.colors.color1 : "white",
                                                    }}
                                                >Sun </div>
                                            </div>
                                            <div style={{ flexDirection: "row", display: 'flex', alignItems: "center", }}>
                                            <div style={{ marginLeft: "10px", marginRight: '20px' }}><SelectTime handleChange={this.changeTime} /></div>
                                                {/* <div onClick={() => { this.setState({ showtime: !this.state.showtime }) }}
                                                    className="form-control" id="time"
                                                    style={{ width: "110px", height: "30px", marginLeft: "13px", marginRight: "25px", flexDirection: "row", display: "flex" }}>
                                                    <div style={{ width: "90px", alignSelf: "center" }}>{this.state.showtimes}</div>
                                                    <img src={clock} alt="clock" style={{ width: "15px", height: "15px", }} />
                                                </div> */}
                                                <div style={{
                                                    ...styles.buttons.buttonLog, fontSize: "15px",
                                                    // marginTop: styles.margins.margin5,

                                                    background: styles.colors.color6, width: "100px", height: "27px",
                                                    color: styles.colors.colorOffBlack + "dd"
                                                }}
                                                    onClick={() => {

                                                        let arr = [...this.state.days];
                                                        let obj = { ...this.state.sched };
                                                        for (const key in arr) {
                                                            
                                                            obj[arr[key]] = this.state.time;
                                                        }
                                                        let ar = [...this.state.objArr];
                                                        ar.push(obj);
                                                        if (Object.keys(obj).length > 0) {
                                                            this.setState({ objArr: ar, days: [], time: "", sched: {} })
                                                        }
                                                    }}> Save</div>
                                            </div>
                                        
                                        </div>

                                    </div>
                                </div></div>


                        </div>
                    </div>

                    <div style={{ background: styles.colors.color4, fontWeight: styles.fonts.fontweightMed, cursor:"pointer", display: "flex", flexDirection: "row", position: "absolute", bottom: "0", marginBottom: "15px", height: "30px", color: "#F0F2EF", marginTop: state.iphone ? "0px" : "20px", width: "110px", borderRadius: "30px", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={async () => {
                        let arr = this.state.objArr;
                        let obj = {}
                        for (const key in arr) {
                            for (const day in arr[key]) {
                                obj[day] = arr[key][day]
                            }
                        }

                        await component.changeSchedule(obj);
                        dispatch({ operation: "run", popupSwitch: "" })
                    }}>
                        <span className="fill1"><div style={{ marginTop: "3px", display: "flex", justifyContent: "center", alignItems: "center" }}>Save</div></span></div>
                    <button className="btn  btn-block"
                        onClick={async () => {

                            let list = await state.componentList.getOwnerList(state.currentstudent.getJson()._id);
                            dispatch({
                                popupSwitch: "", currentstudent: undefined, myswitch: "dash", operation: "cleanPrepareRun", object: list, operate: "del"
                            })
                        }}
                        style={{ background: "#F56060", position: 'absolute', bottom: "0", marginBottom: "15px", right: "0", marginRight: "15px", height: "30px", color: "#F0F2EF", width: "200px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>Delete Student</button>
                </div>
            </div>
            // </div>
            // </div>
            // </div>


        )

    }
}
///                await this.props.app.dispatch({tick:1, myswitch:"noarray", switchV:true,miscswitch:true, day:day, objkey:"checked", objectattribute:day, realobject:{checked: mychecks}, sp:20, backendearr:["starpoints", "checked", "daysPracticed", "daystreak"], currentstudent: this.props.app.currentstudent?this.props.app.currentstudent: false})
