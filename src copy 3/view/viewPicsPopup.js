import { list } from "firebase/storage";
import React, { Component } from "react";
import left from '../pics/left_arrow.png'
import right from '../pics/right.png'
//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
class ViewPics extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef;
        this.state = {
           obj: this.props.app.state.modObj,
           pic: Object.keys(this.props.app.state.modObj.getJson().picURLs).length>0? Object.values(this.props.app.state.modObj.getJson().picURLs)[0] : this.props.app.state.modObj.getJson().picURL,
           index: 0,

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
            
                                <div className="popup-box" style={{ display:"flex", zIndex: "1010", overflowY:"scroll", justifyContent:"center", padding:"2%", width:"101%",}}>
                <div ref={this.wrapperRef} style={{display:"flex", flexDirection:"column",
                  zIndex: "1011", height:"fit-content", width:"89.5vw", background:"black", objectFit: "scale-down", marginTop:"1v",
                borderRadius: "1vw", alignContent:"center", paddingLeft:"1vw", paddingRight:"1vw", paddingTop:"1vh",
                }}>
                    <div style={{
                                display:"flex", flexDirection:"row", justifyContent:"space-around",
                                }}>
                    <div style={{width:"100%"}}> </div>
                    <div style={{ ///EXIT BUTTON
                                ...styles.buttons.buttonX,
                                color: "white",
                                // position: "absolute",
                                justifyContent: "flex-end",
                                marginRight:".5vw",
                                fontSize: "4.2vh",
                              
                }} onClick={this.props.handleClose}> X </div></div>
                
                <div style={{display:"flex", flexDirection:"row", alignSelf:"center", maxWidth:"89.5vw", alignContent:"center", alignSelf:"center", objectFit: "scale-down", verticalAlign:"center" }}>
<img  onClick={() => {
  ///ARROW LEFT
    let list =  Object.keys(this.props.app.state.modObj.getJson().picURLs).length>0? Object.values(this.props.app.state.modObj.getJson().picURLs) : [this.props.app.state.modObj.getJson().picURL];
    let i = this.state.index;
    if (i - 1 <= 0 ) {
      i = 0
    }
    else {
      i = i - 1
    }
   

    this.setState({ pic: list[i], index: i})
  }} 
  ///ARROW LEFT
  style={{ display:"flex", flexDirection:"row", alignSelf:"center", width: styles.myFeed.arrowSizeW, height: "fit-content", marginRight: styles.myFeed.arrowMargin, 
  cursor:"pointer", alignContent:"center", filter: styles.mySpawn.satFilter, }} src={left} />
 

<img style={{ 
  
  overflowX: "hidden",
  width: "fit-content",
  maxWidth: "89vw",
  maxHeight:"100vh",
  objectFit: "scale-down", 
  borderRadius:"1vw",
  alignSelf:"center",
  alignContent:"center",
  alignItems:"center",
  
  background: "black"}} 
  className="picture" id="pic" src={this.state.pic} />


<img
///ARROW RIGHT
  onClick={() => {
    debugger
    let list =  Object.keys(this.props.app.state.modObj.getJson().picURLs).length>0? Object.values(this.props.app.state.modObj.getJson().picURLs) : [this.props.app.state.modObj.getJson().picURL];
    let i = this.state.index;
    if (i + 1 === list.length) {
      i = 0
    }
    else {
      i = i + 1
    }

    this.setState({ pic: list[i], index: i})
  }}
  style={{ width: styles.myFeed.arrowSizeW, 
    filter: styles.mySpawn.satFilter, alignContent:"center", 
  height:"fit-content", marginLeft: styles.myFeed.arrowMargin, cursor:"pointer",  display:"flex", flexDirection:"row", alignSelf:"center", }} src={right} />
  </div>

                </div>
                
            </div>

            </div>)
    }
};
export default ViewPics;