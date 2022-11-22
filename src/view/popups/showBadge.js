import React, { Component } from "react";
import studentService from "../../services/studentService";
import badge1 from "../../assets/badges/Artboard_1.svg";
import badge2 from "../../assets/badges/Artboard_2.svg";
import badge3 from "../../assets/badges/Artboard_3.svg";
import badge4 from "../../assets/badges/Artboard_4.svg";
import badge5 from "../../assets/badges/Artboard_5.svg";
import badge6 from "../../assets/badges/Artboard_6.svg";
import badge7 from "../../assets/badges/Artboard_7.svg";
import badge9 from "../../assets/badges/Artboard_9.svg";
import badge10 from "../../assets/badges/Artboard_10.svg";

//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
class ShowBadge extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef;
        this.state = {
            badges:[badge1,badge2, badge3,badge4,badge5,badge6,badge7,badge9,badge10],
            currentBadge:  badge1, 
            key:"add"
        }
    };
    async componentDidMount() {
        
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
        let badge= state.currentComponent
        let opps = badge?.getOperationsFactory();
        let dispatch= app.dispatch;
        let key = this.state.key;
        return (
            <div className="popup-box" style={{ zIndex: "1010" }}>
                <div ref={this.wrapperRef}  className="diapicboxa" style={{ zIndex: "1010", width:state.iphone?"95vw": "20vw", height: "50vh", }}>
                <div style={ ///EXIT BUTTON
                                {...styles.buttons.closeicon, cursor: "pointer",}
                            } onClick={this.props.handleClose}>x</div>

                    <div style={{ width:"100%", height:"100%", marginTop:"20px"}}>
                    <div className="scroller" style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <img src={badge?.getJson().picURL} style={{width:state.iphone?"25vw":"10vw", alignItems:"center",}}/>
                    <div style={{marginTop:"10px"}}><h3>{badge?.getJson().title}</h3></div>
                    <div style={{marginTop:"10px"}}>{badge?.getJson().description}</div>
                    </div>
                    </div>
                </div>
            </div>

        )
    }
};

export default ShowBadge;