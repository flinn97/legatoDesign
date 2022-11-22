import React, { Component } from "react";
import studentService from "../../services/studentService";
import link from "../../assets/link.png";
import sync from "../../assets/sync.png";
//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
class StudentSync extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef;
        this.state = {
            studentList: [],
            syncLooks: undefined
        }
    };
    async componentDidMount() {

        let app = this.props.app;
        let state = app.state;
        let student = state.currentstudent;
        let componentList = state.componentList;
        let studentIDs = student.getJson().syncedStudents

        let arr = [];
        let list = Object.keys(studentIDs).length > 0 ? [] : [student];
        for (const key in studentIDs) {
            if (studentIDs[key] === student.getJson()._id) {
                arr.unshift(studentIDs[key]);
                list.unshift(student);
            }
            else {
                arr.push(studentIDs[key]);
                let syncstudent = componentList.getComponent("student", studentIDs[key], "_id");
                list.push(syncstudent);
            }

        }


        this.setState({ studentList: list, studentIDs: arr, syncLooks: list[1] })

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
        let state = app.state;
        let styles = state.styles;
        let student = state.currentstudent;
        let opps = student?.getOperationsFactory();
        let dispatch = app.dispatch;
        let componentList = state.componentList;


        return (
            <div className="popup-box" style={{ zIndex: "1010", display: "flex", 
            flexDirection: "row" }}>
                
                <div ref={this.wrapperRef} className="diapicboxa" 
                style={{ zIndex: "1010", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center",
                 width: state.iphone? "95vw":"30vw", 
                 height: state.iphone? "65vh":window.innerHeight<900&&!state.ipad?"60vh": "52vh", 
                 justifyContent: "flex-start" }}>
                    <div style={ ///EXIT BUTTON
                                styles.buttons.closeicon
                            } onClick={this.props.handleClose}>x</div>
                    <div>Link Students </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{
                            display: "flex", flexDirection: "row", alignItems: "center", borderRadius: "10px", width:state.iphone?"40vw": "11vw", padding: "10px",
                            boxShadow: "2px 3px 6px #D1D1D1",
                        }}><img style={{ width: "50px", height: "50px", borderRadius: "50%" }} src={state.currentstudent.getJson().picURL} alt="stud" />
                            {state.currentstudent.getJson().firstName} {state.currentstudent.getJson().lastName}</div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "10px" }}><img style={{}} src={link} alt="link" /></div>
                        <div style={{
                            display: "flex", flexDirection: "row", alignItems: "center", borderRadius: "10px", width: state.iphone?"40vw": "11vw", padding: "10px",
                            boxShadow: "2px 3px 6px #D1D1D1",
                        }}>
                            {this.state.syncLooks ? (
                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <img style={{ width: "50px", height: "50px", borderRadius: "50%" }} src={this.state.syncLooks.getJson().picURL} alt="stud" />
                                    <div>{this.state.syncLooks.getJson().firstName} {this.state.syncLooks.getJson().lastName}</div>
                                </div>
                            ) : (<></>)}

                        </div>
                        <div>{this.state.studentList.length>2?(<div> +{this.state.studentList.length-2} more</div>):(<></>)}</div>
                    </div>

                    <div class="scroller" style={{
                        display: "flex", flexDirection: "column", width:state.iphone?"65vw": "16vw", height: state.iphone?"40vh":"30vh", borderRadius: "10px", padding: "20px",
                        boxShadow: "2px 3px 6px #D1D1D1",
                    }}>
                        {componentList.getList('student').map((s, index) =>
                            <div>
                                {student.getJson()._id !== s.getJson()._id && (
                                    <div key={index} > <div style={{ display: "flex", flexDirection: "row", borderBottom: "1px solid gray", marginTop: "10px", paddingBottom: "10px", justifyContent: "space-between" }}>
                                        <img src={s.getJson().picURL} alt="stud" style={{ width: "25px", height: "25px", borderRadius: "50%" }} />
                                        {s.getJson().firstName} {s.getJson().lastName}
                                        <div>{this.state.studentIDs?.includes(s.getJson()._id) ? (<div style= {{cursor:"pointer", height:"2vh"}} onClick={() => {
                                            
                                            let arr = [...this.state.studentIDs];
                                            let list = [...this.state.studentList];
                                            let i = 0
                                            for (i; i < arr.length; i++) {
                                                if (arr[i] === s.getJson()._id) {
                                                    arr.splice(i, 1);
                                                    list.splice(i, 1);
                                                    break;
                                                }
                                            }
                                            let myvar = undefined;
                                            if(s.getJson()._id ===this.state.syncLooks.getJson()._id){
                                                myvar=undefined
                                            }
                                            if(arr.length!==0){
                                                myvar=list[1]
                                            }
                                            this.setState({ studentList: list, studentIDs: arr, syncLooks: myvar});
                                        }}>Unlink</div>) :
                                            (<div style= {{cursor:"pointer", height:"2vh"}} onClick={() => {
                                                
                                                let arr = [...this.state.studentIDs];
                                                arr.push(s.getJson()._id)
                                                let list = [...this.state.studentList];
                                                list.push(s);
                                                let synclooks = list.length === 2 ? s : this.state.syncLooks
                                                this.setState({ studentList: list, studentIDs: arr, syncLooks:  synclooks});
                                            }}>link <img src={sync} alt="sync"/></div>)}</div>
                                    </div>
                                    </div>)}
                            </div>
                        )}
                    </div>
                    <div style={{ alignSelf: "flex-start", marginTop:"10px", position:"absolute", bottom:"0", left:"0", marginBottom:"20px", marginLeft:"20px" }}>
                        {state.popupSwitch === "archive" ? (<></>) : (
                            <div style={{ borderRadius:"30px", background: this.props.app.state.styles.colors.colorLink, width:"120px", display:'flex', alignItems:'center', justifyContent:'center', height: "35px", color: "#F0F2EF", alignSelf: "flex-start" }}
                                onClick={async () => {
                                    //
                                    await student.sync(this.state.studentList);
                                    dispatch({ popupSwitch: "" });
                                }}>Link students
                            </div>
                        )}
                    </div>





                </div>
            </div>

        )
    }
};

export default StudentSync;