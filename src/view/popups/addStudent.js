import React, { Component } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import { isEmail } from "validator";
import Dropdown from "./dropdown.js"
import Down from "./downarrow.png"
import authService from "../../services/auth.service.js";
import "../../App.css"
import './pages.css';
import './components.css';
import './index.css';
import './view.css';
import clock from "./clock.png"
import calendarService from "../../services/calendarService.js";
import Wolf from '../../assets/place1.png';
import dear from '../../assets/place2.png';
import sheep from '../../assets/place3.png';
import cat from '../../assets/place4.png';
import bird from '../../assets/place5.png';
import turkey from '../../assets/place6.png';
import bug from '../../assets/place7.png';
import loading from '../../assets/loading.gif';
import SelectTime from "../selectTime.js";
// import factory from "../../npm/factory.js";
//this component details my dialog help component

class Addstudent extends Component {
    //using the functions sent from the profile page allows me to send back student information typed in to profile and then to the backend. 
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.selectDay = this.selectDay.bind(this);
        this.selectDays = this.selectDays.bind(this);
        this.selectTime = this.selectTime.bind(this);
        this.closedrop = this.closedrop.bind(this);
        this.changeTime = this.changeTime.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.addstudent=this.addstudent.bind(this);
        this.getSchedule = this.getSchedule.bind(this);
        this.editDays = this.editDays.bind(this);
        this.changeObjTime = this.changeObjTime.bind(this);
        this.setWrapperRef = this.setWrapperRef;
        this.state = {
            loading: false,
            times: [],
            days: [],
            pics: [Wolf, dear, sheep, cat, bird, turkey, bug],
            sched: {},
            objArr: [],
            showtime: false,
            showtimes: "",
            daily: "100",
            currentDay: "",
            hwtype: "",
            showHomework: false,
            currentHomework: undefined,
            currentgoal: undefined,
            showGoals: false,
            tempID: 1,
            HWtempID: 1,
            tempGoal: "",
            tempDescription: "",
            tempday: "",
            tempcheckboxes: "",
            tempHW: "",
            edited: false,
            edit: "",
            editedd: "",
            val: false,
            yesnoCheckboxes: true,
            yesnoTime: true,
            timeframePractice: true,
            starPoints: true,
            manualsetup: false,
            syncCheckbox: true,
            dayorweekTime: "",
            timeSync: true,
            daysbool: true,
            timebool: true,
            smonths: "",
            emonths: "",
            temonths: "",
            tsmonths: "",
            Supporting_Goal: "",
            Homework_Practiced: "",
            timeframePracticebiao: true,
            min: "100",
            weeklytimebiao: "60",
            dailytimebiao: true,
            dmin: "20",
            weekStreak: true,
            dayStreak: true,
            done: 0,
            hwsynccheck: true,
            hwdmin: "",
            HWweeklytimebiao: "",
            hwtimesync: true,
            hwlink: "",
            struggles: true,
            hwQuestions: true,
            yesnoday: true,
            yesnoweek: true,
            marginTop: "",
            marginLeft: "55px",
            selectDay: false,
            selectTime: false,
            day: "",
            first: "",
            last: "",
            time: "12:00 pm",
            toosmall: false,

        }
    }
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value,
        })
    }
    componentDidMount() {
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
    selectTime(day) {

        this.setState({
            [day + "selectTime"]: !this.state[day + "selectTime"],
            currentDay: day

        })
    }
    getSchedule(time) {
        let hour = time.ampm === "pm" ? time.hour === "12" ? "12" : (parseInt(time.hour) + 12).toString() : time.hour === "12" ? "00" : time.hour;
        let min = time.min;
        let ampm = time.ampm;
        let aschedule = hour + min + ' ' + ampm;
        return aschedule;
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
        let styles = this.props.app.state.styles;
        let comp = this.props.app.state.componentList;
        let operate = comp.getOperationsFactory();
        let student = operate.getUpdater().getJson().add[0];
        return (
            <div className="popup-box" style={{
                zIndex: "10000",
            }}>
                <div className="box_add" style={{ ...styles.popup1, height: app.state.ipad ? "60vh" : window.innerHeight < 800 ? "60vh" : "50vh", width: styles.sizeSpecStud.width2 }} ref={this.wrapperRef}>
                    <div style={ ///EXIT BUTTON
                        styles.buttons.closeicon
                    } onClick={this.props.handleClose}>x</div>
                    <div>
                        <div className="form-group">
                            <label htmlFor="firstName"><b>Student First Name:</b>*</label>
                            <input
                                type="text"
                                className="form-control"
                                id="first"
                                onChange={operate.handleChange}
                                name="addfirstName"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName"><b>Student Last Name:</b>*</label>
                            <input
                                type="text"
                                className="form-control"
                                id="last"
                                onChange={operate.handleChange}
                                name="addlastName"
                            />
                        </div>
                        {this.state.objArr?.map((obj, index) =>
                            <div style={{ width: "100%", marginTop: "17px" }}>{!this.state[index + "edit"] ? (
                                <div style={{ display: "flex", flexDirection: "row", padding: "2%", background: this.props.app.state.styles.colors.colorLink, width: "100%", borderRadius: "14px" }}>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        {Object.keys(obj).includes("Monday") && (<div style={{
                                            ...styles.daytag, background: styles.colors.color6, color: this.props.app.state.styles.colors.colorLink, display: "flex", flexDirection: "row", marginTop: "4px", 
                                            cursor: "default",
                                            width: "36px",
                                        }}>Mon </div>)}
                                        {Object.keys(obj).includes("Tuesday") && (<div style={{
                                            ...styles.daytag, background: styles.colors.color6, color: this.props.app.state.styles.colors.colorLink, display: "flex", flexDirection: "row", marginTop: "4px", 
                                            cursor: "default",
                                            width: "36px",
                                        }} >Tues </div>)}
                                        {Object.keys(obj).includes("Wednesday") && (<div style={{
                                            ...styles.daytag, background: styles.colors.color6, color: this.props.app.state.styles.colors.colorLink, display: "flex", flexDirection: "row", marginTop: "4px",
                                            cursor: "default",
                                            width: "36px",
                                        }} >Wed </div>)}
                                        {Object.keys(obj).includes("Thursday") && (<div style={{
                                            ...styles.daytag, background: styles.colors.color6, color: this.props.app.state.styles.colors.colorLink, display: "flex", flexDirection: "row", marginTop: "4px",
                                            cursor: "default",
                                            width: "36px",
                                        }} >Thur </div>)}
                                        {Object.keys(obj).includes("Friday") && (<div style={{
                                            ...styles.daytag, background: styles.colors.color6, color: this.props.app.state.styles.colors.colorLink, display: "flex", flexDirection: "row", marginTop: "4px",
                                            cursor: "default",
                                            width: "36px",
                                        }} >Fri </div>)}
                                        {Object.keys(obj).includes("Saturday") && (<div style={{
                                            ...styles.daytag, background: styles.colors.color6, color: this.props.app.state.styles.colors.colorLink, display: "flex", flexDirection: "row", marginTop: "4px",
                                            cursor: "default",
                                            width: "36px",
                                        }} >Sat </div>)}
                                        {Object.keys(obj).includes("Sunday") && (<div style={{
                                            ...styles.daytag, background: styles.colors.color6, color: this.props.app.state.styles.colors.colorLink, display: "flex", flexDirection: "row", marginTop: "4px", 
                                            cursor: "default",
                                            width: "36px",
                                        }} >Sun </div>)}
                                        <div style={{ flexDirection: "row", display: 'flex', }}>
                                            <div className="form-control" id="time" style={{
                                                width: "110px",
                                                height: "30px",
                                                flexDirection: "row",
                                                display: "flex",
                                                marginLeft: styles.margins.margin4,
                                                marginRight: styles.margins.margin4,
                                            }}>
                                                <div style={{ width: "90px", alignSelf: "center" }}>{obj[Object.keys(obj)[0]]?.includes("pm") ? (<>{calendarService.getTime(obj[Object.keys(obj)[0]])}</>) : (<>{obj[Object.keys(obj)[0]]}</>)}</div>
                                                <img src={clock} alt="clock" style={{ width: "15px", height: "15px", }} />
                                            </div>
                                            <div style={{
                                                width: "80px",
                                                height: "30px", marginLeft: "20px", background: styles.colors.color6, borderRadius: "7px", display: "flex", justifyContent: "center", alignItems: "center"
                                            }}
                                                onClick={() => {

                                                    let arr = [];
                                                    let time;
                                                    for (const key in obj) {
                                                        arr.push(key);
                                                        time = obj[key]
                                                    }
                                                    this.setState({ [index + "edit"]: true, [index + "days"]: arr, [index + "showtime"]: time, index: index })
                                                }}> edit time</div>
                                            <div style={{
                                                color: styles.colors.colorWarning,
                                                fontSize: styles.fonts.fontsize5,
                                                width: "52px",
                                                marginLeft: "20px",
                                                fontWeight: styles.fonts.fontweightMed,
                                            }} onClick={() => {
                                                let arr = [...this.state.objArr];
                                                arr = arr.filter(function (value, ind, arr) {
                                                    return ind !== index;
                                                });
                                                this.setState({ objArr: arr })
                                            }}> delete</div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ marginTop: "15px", height: "105px" }} className="form-group forfiles" >
                                    <div style={{

                                        display: "flex",
                                        flexDirection: "column",
                                        //justifyContent:"space-between",
                                        background: styles.colors.colorShadow + "54",
                                        borderRadius: "23px",
                                        boxShadow: "2px 3px 6px" + styles.colors.colorOffwhite,
                                    }}>
                                        <div style={{
                                            flexDirection: "row",
                                            display: 'flex',
                                            padding: "2%",
                                            height: "5vh",
                                            width: (window.innerWidth>1300&&window.innerWidth<1400)?"25vw":"16vw",

                                            alignContent: "center",
                                            backgroundColor: styles.colors.colorOffwhite,
                                            color: styles.colors.colorOffBlack,
                                            marginTop: styles.margins.margin4,
                                        }}>
                                            <div onClick={this.editDays.bind(this, obj, "Monday", index)} style={this.state[index + "days"].includes("Monday") ? {
                                                ...styles.daytag,
                                                color: styles.colors.colorBackground,
                                                backgroundColor: styles.colors.color1,
                                            } : { marginLeft:"5px"}}>Mon </div>
                                            <div onClick={this.editDays.bind(this, obj, "Tuesday", index)} style={this.state[index + "days"].includes("Tuesday") ? {
                                                ...styles.daytag,
                                                color: styles.colors.colorBackground,
                                                backgroundColor: styles.colors.color1,
                                            } : { marginLeft:"5px"}}>Tues </div>
                                            <div onClick={this.editDays.bind(this, obj, "Wednesday", index)} style={this.state[index + "days"].includes("Wednesday") ? {
                                                ...styles.daytag,
                                                color: styles.colors.colorBackground,
                                                backgroundColor: styles.colors.color1,
                                            } : { marginLeft:"5px"}}>Wed </div>
                                            <div onClick={this.editDays.bind(this, obj, "Thursday", index)} style={this.state[index + "days"].includes("Thursday") ? {
                                                ...styles.daytag,
                                                color: styles.colors.colorBackground,
                                                backgroundColor: styles.colors.color1,
                                            } : { marginLeft:"5px"}}>Thur </div>
                                            <div onClick={this.editDays.bind(this, obj, "Friday", index)} style={this.state[index + "days"].includes("Friday") ? {
                                                ...styles.daytag,
                                                color: styles.colors.colorBackground,
                                                backgroundColor: styles.colors.color1,
                                            } : { marginLeft:"5px"}}>Fri </div>
                                            <div onClick={this.editDays.bind(this, obj, "Saturday", index)} style={this.state[index + "days"].includes("Saturday") ? {
                                                ...styles.daytag,
                                                color: styles.colors.colorBackground,
                                                backgroundColor: styles.colors.color1,
                                            } : { marginLeft:"5px"}}>Sat </div>
                                            <div onClick={this.editDays.bind(this, obj, "Sunday", index)} style={this.state[index + "days"].includes("Sunday") ? {
                                                ...styles.daytag,
                                                color: styles.colors.colorBackground,
                                                backgroundColor: styles.colors.color1,
                                            } : {marginLeft:"5px"}}>Sun </div>
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
                                            {/* <div onClick={()=>{this.setState({[index+'showtime']:this.state[index+'showtime']!==undefined?false:!this.state[index+'showtime'], index:index})}} className="form-control" id="time" 
                                        style={{ width: "110px", height: "30px", marginLeft:"13px", se;marginRight:"25px", flexDirection: "row", display: "flex" }}>
                                            <div style={{ width: "90px", alignSelf: "center" }}>
                                                {this.state[index+"time"]? (<>{this.state[index+"showtimes"]}</>):(<>{obj[Object.keys(obj)[0]]?.includes("pm")?(<>{calendarService.getTime(obj[Object.keys(obj)[0]])}</>):(<>{obj[Object.keys(obj)[0]]}</>)}</>)}
                                                </div>
                                            <img src={clock} alt="clock" style={{ width: "15px", height: "15px", }} />
                                        </div> */}
                                            <div style={{
                                                ...styles.buttons.buttonLog, fontSize: "15px",
                                                // marginTop: styles.margins.margin5,

                                                background: styles.colors.color6, width: "100px", height: "27px",
                                                color: styles.colors.colorOffBlack + "dd"
                                            }} onClick={() => {

                                                let ar = [...this.state.objArr];
                                                let arr = [...this.state[index + 'days']];
                                                let newobj = {};
                                                for (const key in arr) {
                                                    newobj[arr[key]] = this.state[index + 'time'];
                                                }
                                                ar[index] = newobj
                                                if (Object.keys(newobj).length > 0) {
                                                    this.setState({ [index + "edit"]: false, objArr: ar })
                                                }
                                            }}> Save</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div>

                        )}
                        <div style={{ marginTop: "15px", height: "105px" }} className="form-group forfiles" >
                        
                            <div style={{

                                display: "flex",
                                flexDirection: "column",
                                //justifyContent:"space-between",
                                background: styles.colors.colorShadow + "54",
                                borderRadius: "23px",
                                boxShadow: "2px 3px 6px" + styles.colors.colorOffwhite,
                            }}>


                                <div style={{
                                        
                                        
                                        padding: "2%",
                                        
                                        width: (window.innerWidth>1300&&window.innerWidth<1400)?"25vw":app.state.iphone?"80vw" :"16vw",
                                        alignItems: "center",
                                        alignSelf: "center",
                                        alignContent: "center",
                                        backgroundColor: styles.colors.colorOffwhite,
                                        color: styles.colors.colorOffBlack,
                                        marginBottom: "1vh"
                                    }}>
                                    <div style={{
                                        flexDirection: "row",
                                        display: 'flex',
                                        padding: "2%",
                                        height: "fit-content",
                                        width: (window.innerWidth>1300&&window.innerWidth<1400)?"25vw" :app.state.iphone?"80vw":"16vw",
                                        marginBottom: "1vh",
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
                                            }}>Mon </div>
                                        <div onClick={this.selectDays.bind(this, "Tuesday")}
                                            style={{
                                                ...styles.daytag,
                                                color: this.state.days.includes("Tuesday") && "white",
                                                backgroundColor: this.state.days.includes("Tuesday")  ? styles.colors.color1 : "white",
                                            }}>Tues </div>
                                        <div onClick={this.selectDays.bind(this, "Wednesday")}
                                            style={{
                                                ...styles.daytag,
                                                color: this.state.days.includes("Wednesday") && "white",
                                                backgroundColor: this.state.days.includes("Wednesday")  ? styles.colors.color1 : "white",
                                            }}>Wed </div>
                                        <div onClick={this.selectDays.bind(this, "Thursday")}
                                            style={{
                                                ...styles.daytag,
                                                color: this.state.days.includes("Thursday") && "white",
                                                backgroundColor: this.state.days.includes("Thursday") ? styles.colors.color1 : "white",
                                            }}>Thur </div>
                                        <div onClick={this.selectDays.bind(this, "Friday")}
                                            style={{
                                                ...styles.daytag,
                                                color: this.state.days.includes("Friday") && "white",
                                                backgroundColor: this.state.days.includes("Friday")  ? styles.colors.color1 : "white",
                                            }}>Fri </div>
                                        <div onClick={this.selectDays.bind(this, "Saturday")}
                                            style={{
                                                ...styles.daytag,
                                                color: this.state.days.includes("Saturday") && "white",
                                                backgroundColor: this.state.days.includes("Saturday") ? styles.colors.color1 : "white",
                                            }}>Sat </div>
                                        <div onClick={this.selectDays.bind(this, "Sunday")}
                                            style={{
                                                ...styles.daytag,
                                                color: this.state.days.includes("Sunday") && "white",
                                                backgroundColor: this.state.days.includes("Sunday") ? styles.colors.color1 : "white",
                                            }}>Sun </div>
                                    </div>
                                    <div style={{ flexDirection: "row", display: 'flex', marginBottom: "1vh", margintop: "1vh" }}>
                                        <div style={{ marginLeft: "10px", marginRight: '10px' }}><SelectTime handleChange={this.changeTime} /></div>
                                        {/* <div onClick={()=>{this.setState({showtime:!this.state.showtime})}} className="form-control" id="time" 
                                        style={{ width: "110px", height: "30px", marginLeft:"13px", marginRight:"25px", flexDirection: "row", display: "flex" }}>
                                            <div style={{ width: "90px", alignSelf: "center" }}>{this.state.showtimes}</div>
                                            <img src={clock} alt="clock" style={{ width: "15px", height: "15px", }} />
                                        </div> */}
                                        <div style={{
                                            ...styles.buttons.buttonLog, fontSize: "1.3333vh",
                                            marginTop: styles.margins.margin5,

                                            background: styles.colors.color2, height: "27px",
                                            color: styles.colors.colorOffBlack,
                                            fontWeight:styles.fonts.fontweightMed,
                                            width:app.state.iphone?"15vw":"9vw",
                                        }} onClick={() => {

                                            let arr = [...this.state.days];
                                            let obj = { ...this.state.sched };
                                            for (const key in arr) {
                                                obj[arr[key]] = this.state.time;
                                            }
                                            let ar = [...this.state.objArr];
                                            ar.push(obj);
                                            if (Object.keys(obj).length > 0) {
                                                this.setState({ objArr: ar, sched: obj, days: [], time: "", sched: {} })
                                            }
                                        }}> Save</div>
                                    </div>

                                </div>

                            </div>
                        </div>


                        <div >
                            <button className="btn " style={{ background: "#6C86F4", color: "#F0F2EF", position: "absolute", bottom: "0", left: "0", marginLeft: "20px", marginBottom: "20px" }} onClick=
                                {async () => {
                                    app.dispatch({ addedStudent: student })
                                    await this.setState({ loading: true });
                                    let picURL = this.state.pics[Math.floor(Math.random() * (7 - 1))]
                                    await student.setJson({ ...student.getJson(), picURL: picURL });
                                    let arr = this.state.objArr;
                                    let obj = {}

                                    for (const key in arr) {
                                        for (const day in arr[key]) {
                                            obj[day] = arr[key][day]
                                        }
                                    }
                                    await student.changeSchedule(obj);
                                    await operate.run();

                                    await operate.cleanJsonPrepareRun({
                                        addstarpoints: { owner: student.getJson()._id },
                                        addchatroom: { name: student.getJson().firstName, owner: student.getJson()._id, people: { [student.getJson()._id]: student.getJson().lastName } }
                                    });

                                    await authService.register(student.getJson()._id + "@legato.com", student.getJson()._id);
                                    await authService.registerStudent({ email: app.state.email }, student.getJson()._id);
                                    app.dispatch({ studentAdded: true, studentAddedPopup: true });
                                    // await operate.JsonPrepareRun({addchatroom:{name:student.getJson().firstName, people:{[student.getJson()._id]:student.getJson().lastName}}});

                                    this.props.handleClose();
                                }}>{this.state.loading ? (<><img src={loading} style={{ width: "20px", height: "20px" }} />Adding...</>) : (<>Add Student</>)}</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
};

export default Addstudent;
