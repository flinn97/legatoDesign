import React, { Component } from "react";
import studentService from "../../services/studentService";
import authService from "../../services/auth.service";
import starpointService from "../../services/starpointService";
import reportService from "../../services/reportService";
//allows me to create a dialog box to pop up for adding students with names and emails.
export default class Times extends Component {
    constructor(props) {
        super(props);
        //this.more = this.more.bind(this);
        //this.handleChange = this.handleChange.bind(this);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handletime=this.handletime.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.state = {
            time: this.props.app.state.currentComponent?.getJson()?.time,
            dayfortimepopup: this.props.app.state.forTime,
            timeadded: ""

        }
    };
    componentDidMount() {

        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {

                if(this.props.app.state.secondaryPopup==="addhwtime"){this.props.handleClose(false)}

        }
    }
    async handletime(){
        let time=this.props.app.state.currentComponent.getJson().time[this.state.dayfortimepopup];
        await this.props.app.state.currentComponent.addTime(this.state.dayfortimepopup, this.state.timeadded);
        
        if(this.props.app.state.currentComponent.getJson().type==='student'){
            let report = await reportService.createCurrentReport(this.props.app.state.componentList, this.props.app.state.currentComponent.getJson()._id);
            await  report.update(this.props.app.state.currentComponent);
        }
        
        if(!this.props.app.state.currentComponent.getJson().check){
            
            if(parseInt(this.state.timeadded)===0){
                
                this.props.app.dispatch({spid: this.props.app.state.currentComponent.getJson()._id,  subStarpoints:this.props.app.state.currentComponent.getJson().type, spRun:!this.props.app.state.currentComponent.getJson().check });
            }
            else{
                if(time==='0'){
                    this.props.app.dispatch({spid: this.props.app.state.currentComponent.getJson()._id, addStarpoints:this.props.app.state.currentComponent.getJson().type, spRun:!this.props.app.state.currentComponent.getJson().check });

                }
            }
        }
        
        this.props.handleClose();

    }
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value,
        })
    }

    render() {
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let component= state.currentComponent;
        let opps = component?.getOperationsFactory();
        let dispatch= app.dispatch;
        let mykey = state.popupSwitch;
        let key = opps?.getSplice(mykey);
        return (
            <div style={{ zIndex: "1100" }}>
                <div className="popup-box" style={{ zIndex: "1010", width:"100%", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                    <div className="card-container5ab121 centerized" style={{ zIndex: "1010", flexDirection: "column", width:window.innerWidth<600? "90vw": "30vw", height:"34vh"}} ref={this.wrapperRef}>
                    
                    <div  style={{ ///TITLE
                    display: "flex", 
                    flexDirection: "column", 
                    marginBottom: ".2vh",
                   
                    width:"100%"}}>
                        <div style={{display: "flex", 
                    flexDirection: "column", justifyContent:"space-evenly", marginLeft: "1vw" }}>
                        <div 
                        style={{ 
                            
                            
                            left:"0",
                            top:".5vh",
                            fontSize: "2.2vh",
                            fontWeight: styles.fonts.fontweightMed,
                            justifyContent: "flex-start",
                            position:"absolute",
                            height:"2vh",

                            marginLeft: "1vw"}} >Log Time</div>
                            <div style={ ///EXIT BUTTON
                                {...styles.buttons.closeicon,
                                width:"20%",
                                marginLeft: "100%"}
                            } onClick={this.props.handleClose}>x</div>

                            <div style={{
                                width:"80%",
                                display:"flex",
                                flexDirection:"column",
                                marginLeft:".49w",
                                justifyContent: "flex-start",
                                marginTop:"6vh"
                            }}>
                        
                    </div>
                            <div>
                            {state.forTime?(<></>):(
                                <div>
                                        <div>For which day are you submitting?</div>
                                    <div className="form-group" >
                                        <select style={{ width: "25%", marginBottom: "10px", alignContent: "center" }} htmlFor="dayfortimepopup" onChange={this.handleChange} name="dayfortimepopup" id="dayfortimepopup">
                                            <option value=""></option>
                                            <option value={"mon"}>Monday</option>
                                            <option value={"tues"}>Tuesday</option>
                                            <option value={"wed"}>Wednesday</option>
                                            <option value={"thur"}>Thursday</option>
                                            <option value={"fri"}>Friday</option>
                                            <option value={"sat"}>Saturday</option>
                                            <option value={"sun"}>Sunday</option>
                                        </select>
                                    </div>
                                    </div>)}
                                     <div>How much time would you like to submit today?</div>
                                    <div className="form-group" 
                                    style={{ display: "flex", flexDirection: "row", marginBottom: "17px", alignContent: "center", width:"100%", verticalAlign:"center"
                                    }}  >
                                        <input type="text" className="form-control" id="minedit" style={{ width: "60px" }} onChange={this.handleChange} name="timeadded"/>
                                        <div style={{marginLeft:"6px", alignContent:"center", verticalAlign:"center"}}>Minutes</div>
                                    </div>
                                    <div>
                                        <button className="btn " style={{ 
                        ...styles.buttons.buttonLog,
                        width: "40%",
                        height: "50%",
                        fontSize:"2vh",
                        marginTop: styles.margins.margin4,
                     }}  onClick={this.handletime}>Submit Time</button></div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                       
                        
                    </div>
                </div>
        )
    }
}

