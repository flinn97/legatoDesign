import { Component } from 'react';
import auth from '../services/auth';
import "../App.css";
import SpawnPic from '../pics/spawnPic.png';
import Keep from '../pics/keep.png';

import { BrowserRouter, Route, Link, Routes } from "react-router-dom";



export default class Nav extends Component {
  constructor(props){
    super(props);
    this.changePic=this.changePic.bind(this);
  }
  changePic(type){
    let app = this.props.app;
    debugger
    let comp = app.state.componentList.getComponent(type);
    app.dispatch({switchcase: type, myswitch:"feed", picChange:true, pic: comp, index: 0})
  }

  render(){
    let app = this.props.app;
    let state = app.state;
    let styles =state.styles;
    let pic = this.props.app.state.componentList?.getComponents();
    
    let switchcase = app.state.switchcase;
    let dispatch= app.dispatch;
    let handle = app.state.user.getJson().spawnerHandle;
    let bio = app.state.user.getJson().bio;
    let website = app.state.user.getJson().website;
    let social = app.state.user.getJson().socialHandle;
  return (
        <div style={{
          
                      display:"flex",
                     userSelect: "none",
                     flexDirection:"column",
                     fontSize: "2.3vmin",
                     background: styles.colors.White1,
                     boxShadow: styles.shadows.sideShadow,
                     
                     
                     width: styles.menu.menuW,
                     
                     zIndex:"0",
                     minHeight: styles.logoTop.stripRemainder,
                     fontFamily: styles.fonts.fontNormal,
                     fontWeight: styles.fonts.fontweightMenu,
                     }}> 

<div style={{ display:"flex",
                     
                     flexDirection:"column", alignItems:"center", fontFamily:styles.fonts.fontNormal, fontSize:"1.2vmin",
         alignSelf:"center", marginTop:styles.margins.marginMediumH, marginBottom: "-1.5vmax", }} >
           <img src={state.user.getJson().picURL} style={{width:"9vmin", height:"9vmin", borderRadius:"50%", objectFit:"cover",}} />{handle} </div>

{/* MENU ITEMS WHOLE */}
    <div style={{ display: "flex",
                  flexDirection: "column",
                  marginLeft: styles.menu.marginLeft,
                  marginRight: styles.menu.marginLeft,
                  marginTop: styles.menu.marginTop,  
                  alignContent: "space", 
                  width: styles.menu.menuInnerW, 
                  
                               
                  }}> 



{/* KEEP */}
    {app.state.login && (<Link to="/keep"
        style={{ 
            cursor:"pointer", 
            display: "flex", 
            flexDirection: "row", 
            alignItems: "center",
            marginBottom: styles.menu.marginBottom,
            fontFamily: "inherit",
                  }}>
              <div  class="flip-card" style={{cursor:"pointer", display: "flex", flexDirection: "row", alignItems: "center", justifyContent:"space-around"}}>
              
              <div style={{
                                    marginRight:"1.25vmax",
                                      height: styles.menu.menuCardh,
                                               
                                      }} >
                              <div style={{
                                     marginRight:styles.menu.menuCardmargin,
                                      height: styles.menu.menuCardh,                                      
                                              
                                      }} class="flip-card-inner">
                                <div style={{
                                    
                                      height: styles.menu.menuCardh,                                  
                                               
                                      }} class="flip-card-front">
                                  <img style={{
                                    
                                      height: styles.menu.menuCardh,                                      
                                      objectFit: "contain",          
                                      }} src={Keep}/>
                                </div>
                                <div style={{}} class="flip-card-back">
                                <img style={{                                     
                                      height: styles.menu.menuCardh,
                                      objectFit: "contain",          
                                      }} src={Keep}/>
                                </div>
                              </div>
                            </div>

                <div 
                 
            
            style={{
                  marginLeft: state.switchcase==="keep"||state.switchcase==="follow" ? styles.menu.marginLeft:"",
                  fontFamily: styles.fonts.fontNormal,
                   color:styles.colors.Black1,
                  fontSize:"2vmin",
                  letterSpacing: ".01rem",
                  
                
                }}>
      My Keep </div>
      </div>
      </Link>)}

{/* SPAWNS */}
    {app.state.login && (<Link to="/" 
        style={{ 
            cursor:"pointer", 
            display: "flex", 
            flexDirection: "row", 
            alignItems: "center",
            height: styles.logoTop.stripRemainder,
            marginBottom: styles.menu.marginBottom,
            
                  }}>


              <div class="flip-card" style={{cursor:"pointer", display: "flex", flexDirection: "row", alignItems: "center", justifyContent:"space-around"}}>
              
                    <div style={{
                                   marginRight:"1.25vmax",
                                    height: styles.menu.menuCardh,
                                      objectFit: "contain",          
                                      }} >
                              <div style={{
                                     marginRight:styles.menu.menuCardmargin,
                                      height: styles.menu.menuCardh,    
                                                                        
                                      objectFit: "contain",         
                                      
                                      }} class="flip-card-inner">
                                <div style={{
                                    
                                      height: styles.menu.menuCardh,                                  
                                      objectFit: "contain",          
                                      }} class="flip-card-front">
                                  <img style={{
                                      
                                      height: styles.menu.menuCardh,                                      
                                      objectFit: "contain",          
                                      }} src={SpawnPic}/>
                                </div>
                                <div style={{}} class="flip-card-back">
                                <img style={{                                     
                                      height: styles.menu.menuCardh,
                                      
                                      objectFit: "contain",          
                                      }} src={SpawnPic}/>
                                </div>
                              </div>
                            </div>

                <div style={{
                  marginLeft: state.switchcase==="spawn" ? styles.menu.marginLeft:"",
                  fontFamily: styles.fonts.fontNormal, color:styles.colors.Black1,
                    letterSpacing: styles.menu.menuSpacing, fontSize:"2vmin",
                }}>
              My Spawn
              </div></div>
              </Link>)}

    {!app.state.login && (<div onClick={app.dispatch.bind(this, {loginPage:true})} 
      style={{cursor:"pointer", 
              marginBottom: styles.menu.marginBottom, fontSize:"2vmin",
              }}>Login</div>)}

        
{/* WITHOUT SYMBOL               */}
<div style={{
      marginLeft: "2.24vw",
      
}}>
    <Link to="/monsters"  style={{cursor:"pointer", display: "flex", flexDirection: "row", alignItems: "center",

            marginBottom: styles.menu.marginBottom,
            height: styles.menu.menuListh,
   }}>
      <div style={{
                  marginLeft:  state.switchcase==="monsters" ? styles.menu.marginLeft:"",
                  fontFamily: styles.fonts.fontNormal, color:styles.colors.Black1,
                    letterSpacing: styles.menu.menuSpacing,fontSize:"2vmin",
                }}>
              Monsters
              </div></Link>

    <Link to="/heroes"  style={{cursor:"pointer", display: "flex", flexDirection: "row", alignItems: "center",
      marginBottom: styles.menu.marginBottom,
      height: styles.menu.menuListh,
   }}>
      <div style={{
                  marginLeft: state.switchcase==="heroes" ? styles.menu.marginLeft:"",
                  fontFamily: styles.fonts.fontNormal, color:styles.colors.Black1,
                    letterSpacing: styles.menu.menuSpacing, fontSize:"2vmin",
                }}>
              Heroes
              </div></Link> 

    <Link to="/maps" style={{cursor:"pointer", display: "flex", flexDirection: "row", alignItems: "center",
      
      marginBottom: styles.menu.marginBottom,
      height: styles.menu.menuListh,
   }}>
      <div style={{
                  marginLeft: state.switchcase==="maps" ? styles.menu.marginLeft:"",
                  fontFamily: styles.fonts.fontNormal,color:styles.colors.Black1,
                    letterSpacing: styles.menu.menuSpacing, fontSize:"2vmin",
                }}>
              Maps
              </div></Link>

    <Link to="/worlds" style={{cursor:"pointer", display: "flex", flexDirection: "row", alignItems: "center",
      
      marginBottom: styles.menu.marginBottom,
      height: styles.menu.menuListh,
   }}>
      <div style={{
                  marginLeft: state.switchcase==="worlds" ? styles.menu.marginLeft:"",
                  fontFamily: styles.fonts.fontNormal,color:styles.colors.Black1,
                    letterSpacing: styles.menu.menuSpacing, fontSize:"2vmin",
                }}>
              Worlds
              </div></Link>

    <Link to="/statblocks" style={{cursor:"pointer", display: "flex", flexDirection: "row", alignItems: "center",
      
      marginBottom: "-1vmin",
      height: styles.menu.menuListh,
  }}>
      <div style={{
                  marginLeft: state.switchcase==="statblocks" ? styles.menu.marginLeft:"",
                  fontFamily: styles.fonts.fontNormal,color:styles.colors.Black1,
                    letterSpacing: styles.menu.menuSpacing, fontSize:"2vmin",
                }}>
              Statblocks
              </div></Link>
      </div>


{/* LOGOUT FUNCTION */}
        <div style={{
          marginTop: "33.1vh",
          marginBottom: "3.1vmax",
          height: styles.menu.menuListh,
        }}>
          {/* /LOG OUT PERMANENT */}
          <div onClick={auth.logout} style={{
                      
                      cursor:"pointer",
                      color: styles.colors.Red2,
                      marginTop: "",
                      alignContent: "center",
                      fontFamily: styles.fonts.fontNormal,
                      marginLeft: styles.menu.marginLeft, fontSize:"2vmin",

              }}>
              Logout</div> </div>


              </div>
    </div>
  )}
}
//           {/* <Gallery state = {this.props.state} handlechange = {this.props.handlechange} /> */}