import React, { Component } from "react";


//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
class StudentAdded extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef;
        this.state = {
           
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
        let student= state.addedStudent
        let opps = student?.getOperationsFactory();
        let dispatch= app.dispatch;
        return (
            <div className="popup-box" style={{ zIndex: "1010" }}>
                <div ref={this.wrapperRef}  className="diapicboxa" style={{ zIndex: "1010", width:state.iphone?"95vw": "30vw", height: "30vh", }}>
                <div style={ ///EXIT BUTTON
                                {...styles.buttons.closeicon, cursor: "pointer",}
                            } onClick={this.props.handleClose}>x</div>

                    <div style={{ width:"100%", height:"100%", marginTop:"20px"}}>
                    <div className="scroller" style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center"}}>
                    {student?.getJson().firstName} has been added as a new student. Have them log in with this code {student?.getJson()._id}
                    </div>
                    </div>
                </div>
            </div>

        )
    }
};

export default StudentAdded;