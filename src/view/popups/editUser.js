import React, { Component } from 'react';
import clock from "./clock.png";
import Dropdown from './dropdown';
import Down from './downarrow.png'
export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.state = {

        }
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
    
    render() {
        let app = this.props.app;
        let state = app.state;
        let dispatch = app.dispatch;
        let component = state.currentuser;
        let compJson = component?.getJson();
        let opps = component?.getOperationsFactory();
        let styles=state.styles;
        let factory=state.factory;
        
        return (
            <div className="popup-boxa to-front" style={{
                display:"flex", 
                flexDirection:"column", 
                
             }} >

                <div ref={this.wrapperRef} style={{...styles.popup1, height:(state.ipad||state.iphone)? styles.popup1.height:window.innerHeight<800?"40vh":styles.popup1.height}} >
                    <div style={{    }}>
    
                    <div  ///HEADER DIV
                    style={{   
                        display:"flex", 
                        flexDirection:"row", 
                        alignItems: "space-between",
                        justifyContent: "flex-end",
                        marginTop: "-"+styles.margins.margin4,                
                            }}>
                                                   
                            <div style={{ ///POPUP TITLE
                                display:"flex", 
                                flexDirection:"row", 
                                lineHeight: "3vw",
                                height: "3vh",
                                width: "90vw",
                                
                                fontSize: styles.fonts.fontsize1,
                                fontWeight: styles.fonts.fontweightMed,
                                textAlign: "center",
                                color: styles.colors.colorOffBlack,
                                fontSize: styles.fonts.fontsize1, 
                                
                            }}>Edit User</div>

                        <div style={ ///EXIT BUTTON
                                styles.buttons.closeicon
                            } onClick={this.props.handleClose}>x</div>

                    </div>
                            
                            
                            <div ///BODY DIV
                            className = "fill2"
                            style={{ 
                                height: "99%",
                                marginTop: styles.margins.margin4,
                                marginBottom: styles.margins.margin4
                                }}>
                    <div className="form-group" style={{width: "89%"}}>
                            <label htmlFor="firstName" 
                            >
                                
                                <div
                                style={{
                                    
                                    fontWeight: styles.fonts.fontweightMed,
                                }}>First Name:</div></label>


                            <input type="text" className="form-control" id="first" placeholder={compJson?.firstName} onChange={opps?.handleChange} name="updatefirstName"/>
                        </div>

                        <div className="form-group" style={{width: "89%"}}>
                            <label htmlFor="lastName"><div
                                style={{
                                    
                                    fontWeight: styles.fonts.fontweightMed,
                                }}>Last Name:</div></label>
                            <input type="text" className="form-control" id="last" placeholder={compJson?.lastName} onChange={opps?.handleChange} name="updatelastName"/>
                        </div>

                        <div className="form-group" style={{width: "89%"}}>
                            <label htmlFor="p"><div
                                style={{
                                    
                                    fontWeight: styles.fonts.fontweightMed,
                                }}>Phone:</div></label>
                            <input type="text"className="form-control"id="p"  placeholder={compJson?.phone} onChange={opps?.handleChange} name="updatephone"/>
                        </div>
                        <div>

                           
                                <div className="form-group" style={{width: "89%"}}>
                           
                           
                            {/* <div style = {{...styles.buttons.buttonRound,
                                marginTop: "20px",
                                color: styles.colors.colorBackground,
                                background: styles.colors.color1,
                                textAlign: "center",
                                width: "30%",
                                

                            }} 
                            onClick={dispatch.bind(this, {operate: "update", operation:"cleanPrepare", object:component, popupSwitch:"addPic"})}>Change Picture</div>   */}
                        </div>
                        
                        <div style={
                            {...styles.buttons.buttonRound,
                                marginTop: styles.margins.margin4,
                                color: styles.colors.colorBackground,
                                background: styles.colors.colorLink,
                                textAlign: "center",
                                width: (!state.iphone &&!state.ipad)? "150px":"20vw",
                            }
                        } onClick={dispatch.bind(this,{operation: "run", popupSwitch:""})}>
                                <span><div style={{ 
                                    marginBottom: "auto", 
                                    marginTop: "auto" }}>Save User</div></span></div> 

                               
                </div>
                </div>
               </div>
            </div>
            </div>
            

        )

    }
}
