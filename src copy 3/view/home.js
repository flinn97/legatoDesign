import React, { Component } from 'react';
import "../App.css"
// import Gallery from './pictures';
import left from '../pics/leftarrow.png'
import right from '../pics/rightarrow.png'
import Beholder from "../pics/beholder.webp";
import picservice from '../services/picservice';
import Feed from './feed';
import Keep from './keep';
import Upload from './upload';
import Spawns from './mySpawns';
import Follower from './following';
import auth from '../services/auth';
import EditUser from './editUser';
import UploadComponent from '../componentListNPM/uploadComponent';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { Follow } from '../models/myComponents';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setWrapperRef = this.setWrapperRef;
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
}
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
}
handleClickOutside(event) {
  
    if (this.wrapperRef && !this.wrapperRef?.current?.contains(event.target)) {
      
      this.props.app.dispatch({ myswitch: "", currentComponent:undefined });
        
    }
}
  


  render(){
    let app=this.props.app;
    let state = app.state;
    let styles =state.styles;
    
  return (
    
        <div style={{
          display:"flex",
          flexDirection:"column",
          overflowY: "scroll",
          overflowX: "",
          width: "100vw",
          borderRadius: styles.borders.radius1,
          
          justifyContent: "left", 
          
          marginLeft: styles.menu.marginLeft,
          
          userSelect: "none",
         marginBottom:"1vmin",
          paddingBottom: "3vmin"
          }}>
            {state.popupSwitch==="editUser"&&(<EditUser app={app}/>)}

        
       <div style={{
        width: styles.menu.remainderW, 
        borderRadius: styles.borders.radius1,
        //minHeight: "88vh",
        height: "fit-content",
        
        background: styles.colors.Grey1,  marginBottom:"1vmin",
        boxShadow: styles.shadows.homeShadow,}} >
      
        <div style={{
          display: "flex", 
          padding: styles.menu.innerPad,
          alignItems: "center", alignSelf: "center", justifyContent: "center"
        }}>
          
          <Routes>
      
      <Route path="/" element={<Spawns app={app} />} />
      <Route path="/keep" element={<Keep app={app} switchcase="keep" />} />
      <Route path="/monsters" element={<Feed app={app} switchcase="monsters" />} />
      <Route path="/monsters/:id" element={<Feed app={app} switchcase="monsters" id={true}/>} />

      <Route path="/heroes" element={<Feed app={app} switchcase="heroes" />} />
      <Route path="/heroes/:id" element={<Feed app={app} switchcase="heroes" id={true}/>} />

      <Route path="/maps" element={<Feed app={app} switchcase="maps" />} />
      <Route path="/maps/:id" element={<Feed app={app} switchcase="maps"  id={true}/>} />

      <Route path="/worlds" element={<Feed app={app} switchcase="worlds" />} />
      <Route path="/worlds/:id" element={<Feed app={app} switchcase="worlds" id={true}/>} />

      <Route path="/statblocks" element={<Feed app={app} switchcase="statblocks" />} />
      <Route path="/statblocks/:id" element={<Feed app={app} switchcase="statblocks" id={true}/>} />


      <Route path="/follow" element={<Keep app={app}  switchcase="follow" />} />

      <Route path="/follow/following/:id" element={<Follower app={app}  switchcase="follow" />} />

                  <Route path="/follow" element={<Keep app={app}  switchcase="follow" />} />

    
</Routes>
{state.myswitch==="upload"&&(
        <div ref={this.wrapperRef}  style={{ position:"absolute", background: "", width:"80vw", 
        height:"fit-content", top:140, zIndex:"200000", borderRadius:"2vmin",  overflow:"hidden"}}>
       <Switchcase app={app} />
       </div>)}

       </div>
       </div>
    </div>
  )}
}

function Switchcase(props) {
  
  let app=props.app;
   let view={
    
     upload: (app.state.newSpawn&&app.state.currentComponent!==undefined) && <UploadComponent app={app}  wrapperClass="scroller"/>,
   }
   let myswitch=  app.state.myswitch;
  if(view[myswitch]){
    return view[myswitch];

  }
  else{
    return <></>
  }
 }
//           {/* <Gallery state = {this.props.state} handlechange = {this.props.handlechange} /> */}