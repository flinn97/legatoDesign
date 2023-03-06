import React, { Component } from "react";
import auth from "../services/auth";

//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
class ContextMenu extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef;
        this.state = {
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
                this.props.handleClose();
            
        }
    }
            
        
    

    render() {

        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let dispatch=app.dispatch;
        return (<div>
            
                                <div style={{ zIndex: "1010", background:"white", fontFamily:styles.fonts.fontNormal, color:styles.colors.linkVisitedColor,
  fontSize: styles.fonts.fontSubheader1, }}>
                <div ref={this.wrapperRef} style={{marginTop: "1vh", zIndex: "1011", padding:"1vh", outline:"thick double "+styles.colors.Red1, height:"fit-content", fontFamily:styles.fonts.fontNormal, width:"fit-content", display:"flex", flexDirection:"column" }}>
                <div style={{cursor:"pointer", fontFamily:styles.fonts.fontNormal,}} onClick={()=>{
                    debugger
                    this.props.user.block({userID: this.props.content.getJson().owner, contentID: this.props.content.getJson()._id});
                    dispatch({popupSwitch:"blocked"})

                }}>{Object.keys(this.props.user.getJson().blocked).includes(this.props.content.getJson().owner)?(<>Unblock</>): (<>Block</>)}</div>
                <div style={{cursor:"pointer", fontFamily:styles.fonts.fontNormal,}} onClick={()=>{
                    debugger
                    this.props.user.hide({contentID: this.props.content.getJson()._id, content: this.props.content.getJson()[this.props.name]});
                    dispatch({popupSwitch:"hide"})

                }}>{Object.keys(this.props.user.getJson().hidden).includes(this.props.content.getJson()._id)?(<>Unhide</>): (<>Hide</>)}</div>
                <div style={{cursor:"pointer", fontFamily:styles.fonts.fontNormal, color:styles.colors.Red2}} onClick={()=>{
                    
                    this.props.reportUser.report();
                    dispatch({popupSwitch:"report"})

                }}>{this.props.reportUser.getJson().flagged? (<>Reported</>):(<>Report</>)}</div>
                <div style={{cursor:"pointer", fontFamily:styles.fonts.fontNormal, color:styles.colors.darkFontColor, marginTop:".5vh"}} onClick={()=>{
                    this.props.handleClose();

                }}>Cancel</div>

                    </div>
                    

                </div>
                
        

            </div>)
    }
};
export default ContextMenu;