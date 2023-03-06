import { Component } from 'react';
import "../App.css"
import Following from './follow';
import Notes from './notes';
import TrashCan from '../pics/trash-can.png';
import Keeps from '../pics/keep.png';
import EditQuill from '../pics/EditQuill.png';
import ViewMedia from '../componentListNPM/viewMediaComponent';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import auth from '../services/auth';

export default class Keep extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this)

    this.addnote = this.addnote.bind(this)
    this.state = {

    }
  }
  async componentDidMount(){
    let app = this.props.app;
    
    if(this.props.switchcase==="keep"){
      this.props.app.dispatch({switchcase: "keep", myswitch:"keep", });

    }else{
      this.props.app.dispatch({switchcase: "follow" });

    }
    

    let keep = [
      ...app.state.componentList?.getList("keepmonsters", app.state.user.getJson()._id), 
      ...app.state.componentList?.getList("keepheroes", app.state.user.getJson()._id),
    ...app.state.componentList?.getList("keepmaps", app.state.user.getJson()._id), 
    ...app.state.componentList?.getList("keepstatblocks", app.state.user.getJson()._id), 
    ...app.state.componentList?.getList("keepworlds", app.state.user.getJson()._id)];
    
    for(const key in keep){
      let ogOwner = keep[key].getJson().ogOwner;
      let owner = app.state.componentList?.getComponent("user", ogOwner, "_id");
      if(owner){
        keep[key].setJson({...keep[key].getJson(), displayHandle: owner.getJson().spawnerHandle});

      }
      else{
       let user= await auth.getPicOwner(app.state.componentList, ogOwner);
       keep[key].setJson({...keep[key].getJson(), displayHandle: user.getJson().spawnerHandle});

      }
      console.log( keep[key].getJson().displayHandle)
    }
    
  }
  componentDidUpdate(props, state){
    debugger
      if(this.props.switchcase!==props.switchcase){
        if(this.props.switchcase==="keep"){
          this.props.app.dispatch({switchcase: "keep", myswitch:"keep", });
        }
        else{
          this.props.app.dispatch({switchcase: "follow" });
        }
      }
}

  addnote(obj) {
    this.setState({ [obj.getJson()._id + "note"]: true })
    this.props.app.dispatch({ operation: "cleanPrepare", operate: "update", object: obj })
  }
  handleClose(key) {

    this.setState({ [key]: false })
  }
  render() {
    let app = this.props.app
    let pic = app.state.componentList?.getComponents();
    let switchcase = app.state.switchcase;
    let dispatch = app.dispatch;
    let state = app.state;
    let styles =state.styles;
    
    return (
      <div style={{ display: "flex", flexDirection: "row", display:"flex", flexDirection: "column", alignItems: "center", alignSelf: "center", justifyContent: "center", width:"fit-content" }} >
                    


        <div style={{ display: "flex", flexDirection: "column", width: "99%",}}>
          <div style={{ display: "flex", 
                        flexDirection: "row",
                        justifyContent: "space-between",
                        minWidth:"82vw",
                        alignItems: "center",
                        background: styles.colors.Grey1,
                       
                        
          }}>
            
            <Link to="/keep"  style={{ 
                          display: "flex", 
                          flexDirection: "row", 
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          
                          background: state.switchcase==="keep" ? styles.colors.Grey2:styles.colors.Grey1,
                          paddingTop: ".9vh",
                          paddingBottom: ".9vh",
                          borderRadius: "1.5vw",
                          marginBottom: styles.margins.marginSmallH,
                          color: state.switchcase==="keep" ? styles.colors.darkFontColor:styles.colors.Grey3+"99",
                          border: state.switchcase==="keep" ? "1px solid black":"1px solid #22222233",
                          borderWidth: state.switchcase==="keep" ? "1 px":".2px 0 .2px 0",
                          fontSize: styles.fonts.fontHeader5, 
                          fontFamily: styles.fonts.fontTitle,
                          cursor: "pointer"
          }}
                    >

                         
                                <img style={{ 
                    width: styles.mySpawn.keepcardW,
                    height: "auto",                  
                    objectFit: "contain",
                    filter: state.switchcase==="keep" ? "saturate(1)":styles.mySpawn.satFilter,
                    marginRight: styles.mySpawn.keepcardMargin, 
                    
                    }} src={Keeps} />
                                
              
                    
                    View Keep</Link>
                        <Link to="/follow" style=
          {{ 
            display: "flex", 
            flexDirection: "row", 
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
           
            background: state.switchcase==="follow" ? styles.colors.Grey2:styles.colors.Grey1,
            paddingTop: ".9vh",
            paddingBottom: ".9vh",
            borderRadius: "1.5vw",
            
            marginBottom: styles.margins.marginSmallH,
            fontSize: styles.fonts.fontHeader5, 
            fontFamily: styles.fonts.fontTitle,
            cursor: "pointer",
            border: state.switchcase==="follow" ? "1px solid black":"1px solid #22222233",
            borderWidth: state.switchcase==="follow" ? "1 px":".2px 0 .2px 0",
            color: state.switchcase==="follow" ? styles.colors.darkFontColor:styles.colors.Grey3+"99",
            
            
          }}>
            <img style={{ 
                    width: styles.mySpawn.keepcardW,
                    height: "auto",                  
                    objectFit: "contain", 
                    filter: state.switchcase==="follow" ? "saturate(1)":styles.mySpawn.satFilter,
                    marginRight: styles.mySpawn.keepcardMargin, 
                    
                    }} src={Keeps} />
            View Spawners</Link>

          </div>

<hr style={{marginBottom: styles.margins.marginMediumH,}}></hr>

{/* //CASE// */}
          {switchcase === "follow" ? (<Following app={app} />) : (<div style= {{display: "flex", flexDirection: "row",alignItems:"flex-end", marginBottom:"2vh", flexWrap: "wrap", height:"fit-content", width:"fit-content", alignContent:"center", justifyContent:"center" }} >
            {pic?.map((picture, index) =>
              <div style={{display: "flex", flexDirection: "column", flexWrap: "nowrap", height:"fit-content", alignItems:"flex-end" }}>



{/* MONSTERS */}
                {picture.getJson().type === "keepmonsters" && (
                   <div style={{ display: "flex", flexDirection: "column", marginBottom: "2vh", marginRight:"1vw", padding:"2%", borderRadius:"1.5vh", background:styles.colors.White1}}>
                    {/* NAME */}
                    <Link to = {"../monsters/"+ app.state.componentList.getComponent("monsters", picture.getJson().ogref, "_id").getJson()._id} style={{ width:"15.49vw", fontFamily:styles.fonts.fontBold, textTransform:"capitalize", fontSize: styles.fonts.fontHeader1, 
                    marginLeft: ".2vw", cursor:"pointer", textDecoration:"underline #D8D9DA 2px", marginBottom:styles.margins.marginSmallH}}
                   
                      >{picture.getJson().name}</Link>
                                                     <div key={index} style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    
                    marginLeft: styles.mySpawn.itemMarginLeft,
                    marginRight: styles.mySpawn.itemMarginLeft,  }}>

<Link to = {"../monsters/"+ app.state.componentList.getComponent("monsters", picture.getJson().ogref, "_id").getJson()._id} style={{ 
                   cursor:"pointer"}}
                   
                      >
                        <ViewMedia 
                      scale = {0.4} media= {Object.keys(picture.getJson().picURLs).length!==0? Object.values(picture.getJson().picURLs) : [picture.getJson().picURL]}/>
</Link>

                    {/* <img style={{ objectFit: "cover",
                      maxWidth: styles.mySpawn.imgW, 
                      minWidth: styles.mySpawn.imgW,
                      maxHeight: styles.mySpawn.imgW, 
                      marginBottom: styles.margins.marginSmallH,
                       }} src={picture.getJson().picURL} /> */}

                       
                       <hr></hr>
                    <div style={{display: "flex", flexDirection: "column", maxHeight: "fit-content", maxWidth: styles.mySpawn.imgW, userSelect:"text" }}>

                    <div style={{fontFamily:styles.fonts.fontNormal, maxWidth: styles.mySpawn.imgW, fontSize: "1.7vmin",}}>{picture.getJson().note}</div>

                    <div style={{display: "flex", flexDirection: "row", maxWidth: styles.mySpawn.imgW,  marginTop:".61vh", alignContent:"flex-start", justifyContent:"space-between"  }}>  

                    <div style={{...styles.buttons.buttonComment, display: "flex", flexDirection: "row",
                    padding: ".5vh",
                    verticalAlign: "center",
                    height: "3vh",
                    
                    borderRadius: "1vw",
                      position:"relative", 
                     }} onClick={this.addnote.bind(this, picture)}>
                    {/* <img style={{ 
                        width: styles.myFeed.editW, 
                        objectFit: "scale-down",
                        verticalAlign: "center",
                        position:"absolute",                        
                      }} 
                        className="picture" id="pic" src={EditQuill} />  */}
                      <div style={{
                        
                        marginBottom: "-.9vh",
                        fontFamily:styles.fonts.fontNormal,  fontSize: "1.7vmin",
                        color: styles.colors.linkVisitedColor, fontWeight:"700",
                        }}> Add Note </div>
                      </div>
                        <div style={{cursor:"pointer",}}
                          onClick={app.dispatch.bind(this, {popupSwitch:"keepDel", objForDelete:picture})}
                        ><img style={{ height: styles.fonts.fontHeader1, 
                          width: "fit-content", padding: "2px",marginRight:"-.5vw", 
                                }} src={TrashCan}/></div>
                      </div></div>
                    {this.state[picture.getJson()._id + "note"] && (<Notes updaterKey="update" app={app} obj={picture} handleClose={this.handleClose.bind(this, picture.getJson()._id + "note")} />)}
                  </div></div>
                )}

{/* STATBLOCKS */}
                {picture.getJson().type === "keepstatblocks" && (
                    <div style={{ display: "flex", flexDirection: "column", marginBottom: "2vh", marginRight:"1vw", padding:"2%", border: ".1rem solid rgba(15,15,15,.15)",
                    borderStyle: "none groove none groove", borderRadius:"1.5vh", background:styles.colors.White1}}>
                    {/* NAME */}
                    <Link to = {"../statblocks/"+ app.state.componentList.getComponent("statblocks", picture.getJson().ogref, "_id").getJson()._id} style={{fontFamily:styles.fonts.fontBold, textTransform:"capitalize", fontSize: styles.fonts.fontHeader1, marginLeft: ".2vw", cursor:"pointer", textDecoration:"underline #D8D9DA 2px", marginBottom:styles.margins.marginSmallH}}
                     >{picture.getJson().name}</Link>
                                    <div key={index} style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    
                    marginLeft: styles.mySpawn.itemMarginLeft,
                    marginRight: styles.mySpawn.itemMarginLeft,  }}>
                      <Link to = {"../statblocks/"+ app.state.componentList.getComponent("statblocks", picture.getJson().ogref, "_id").getJson()._id} style={{ 
                   cursor:"pointer"}}
                   
                     ><ViewMedia  
                     // onClick={dispatch.bind(this, {myswitch: "feed", pic: picture, picChange:true  })} 
                     
                     scale = {0.4} media= {Object.keys(picture.getJson().picURLs).length!==0? Object.values(picture.getJson().picURLs) : [picture.getJson().picURL]}/></Link>


                    {/* <img style={{ objectFit: "cover",
                      maxWidth: styles.mySpawn.imgW, 
                      minWidth: styles.mySpawn.imgW,
                      maxHeight: styles.mySpawn.imgW, 
                      marginBottom: styles.margins.marginSmallH,
                       }} src={picture.getJson().picURL} /> */}

                       <hr></hr>
                    <div style={{display: "flex", flexDirection: "column", maxHeight: "fit-content", maxWidth: styles.mySpawn.imgW, userSelect:"text" }}>

                    <div style={{fontFamily:styles.fonts.fontNormal, maxWidth: styles.mySpawn.imgW, fontSize: "1.7vmin",}}>{picture.getJson().note}</div>

                    <div style={{display: "flex", flexDirection: "row", maxWidth: styles.mySpawn.imgW,  marginTop:".61vh", alignContent:"flex-start", justifyContent:"space-between"  }}>  

                    <div style={{...styles.buttons.buttonComment, display: "flex", flexDirection: "row",
                    padding: ".5vh",
                    verticalAlign: "center",
                    height: "3vh",
                    
                    borderRadius: "1vw",
                      position:"relative", 
                     }} onClick={this.addnote.bind(this, picture)}>
                    {/* <img style={{ 
                        width: styles.myFeed.editW, 
                        objectFit: "scale-down",
                        verticalAlign: "center",
                        position:"absolute",                        
                      }} 
                        className="picture" id="pic" src={EditQuill} />  */}
                      <div style={{
                        
                        marginBottom: "-.9vh",
                        fontFamily:styles.fonts.fontNormal, fontSize: "1.7vmin",
                        color: styles.colors.linkVisitedColor, fontWeight:"700",
                        }}> Add Note </div>
                      </div>
                        <div style={{cursor:"pointer"}}
                          onClick={app.dispatch.bind(this, {popupSwitch:"keepDel", objForDelete:picture})}
                        ><img style={{ height: styles.fonts.fontHeader1, 
                          width: "fit-content", padding: "2px",marginRight:"-.5vw", 
                                }} src={TrashCan}/></div>
                      </div></div>
                    {this.state[picture.getJson()._id + "note"] && (<Notes  updaterKey="update" app={app} obj={picture} handleClose={this.handleClose.bind(this, picture.getJson()._id + "note")} />)}
                  </div></div>
                )}

{/* Heroes */}
                {picture.getJson().type === "keepheroes" && (
                  <div style={{ display: "flex", flexDirection: "column", marginBottom: "2vh", marginRight:"1vw", padding:"2%", border: ".1rem solid rgba(15,15,15,.15)",
                  borderStyle: "none groove none groove", borderRadius:"1.5vh", background:styles.colors.White1}}>
                    {/* NAME */}
                    <Link to = {"../heroes/"+ app.state.componentList.getComponent("heroes", picture.getJson().ogref, "_id").getJson()._id}  style={{fontFamily:styles.fonts.fontBold, textTransform:"capitalize", fontSize: styles.fonts.fontHeader1, marginLeft: ".2vw", cursor:"pointer", textDecoration:"underline #D8D9DA 2px", marginBottom:styles.margins.marginSmallH}}
                     >{picture.getJson().name}</Link>
                                    <div key={index} style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    
                    marginLeft: styles.mySpawn.itemMarginLeft,
                    marginRight: styles.mySpawn.itemMarginLeft,  }}>
                      <Link to = {"../heroes/"+ app.state.componentList.getComponent("heroes", picture.getJson().ogref, "_id").getJson()._id} style={{ 
                   cursor:"pointer"}}
                   
                     ><ViewMedia  
                     // onClick={dispatch.bind(this, {myswitch: "feed", pic: picture, picChange:true  })} 
                     scale = {0.4} media= {Object.keys(picture.getJson().picURLs).length!==0? Object.values(picture.getJson().picURLs) : [picture.getJson().picURL]}/></Link>


                    {/* <img style={{ objectFit: "cover",
                      maxWidth: styles.mySpawn.imgW, 
                      minWidth: styles.mySpawn.imgW,
                      maxHeight: styles.mySpawn.imgW, 
                      marginBottom: styles.margins.marginSmallH,
                       }} src={picture.getJson().picURL} /> */}


                       <hr></hr>
                    <div style={{display: "flex", flexDirection: "column", maxHeight: "fit-content", maxWidth: styles.mySpawn.imgW, userSelect:"text",  }}>

                    <div style={{fontFamily:styles.fonts.fontNormal, maxWidth: styles.mySpawn.imgW, fontSize: "1.7vmin",}}>{picture.getJson().note}</div>

                    <div style={{display: "flex", flexDirection: "row", maxWidth: styles.mySpawn.imgW,  marginTop:".61vh", alignContent:"flex-start", justifyContent:"space-between"  }}>  

                    <div style={{...styles.buttons.buttonComment, display: "flex", flexDirection: "row",
                    padding: ".5vh",
                    verticalAlign: "center",
                    height: "3vh",
                    
                    borderRadius: "1vw",
                      position:"relative", 
                     }} onClick={this.addnote.bind(this, picture)}>
                    {/* <img style={{ 
                        width: styles.myFeed.editW, 
                        objectFit: "scale-down",
                        verticalAlign: "center",
                        position:"absolute",                        
                      }} 
                        className="picture" id="pic" src={EditQuill} />  */}
                      <div style={{
                        
                        marginBottom: "-.9vh",
                        fontFamily:styles.fonts.fontNormal, fontSize: "1.7vmin",
                        color: styles.colors.linkVisitedColor, fontWeight:"700",
                        }}> Add Note </div>
                      </div>
                        <div style={{cursor:"pointer"}}
                          onClick={app.dispatch.bind(this, {popupSwitch:"keepDel", objForDelete:picture})}
                        ><img style={{ height: styles.fonts.fontHeader1, 
                          width: "fit-content", padding: "2px", marginRight:"-.5vw", 
                                }} src={TrashCan}/></div>
                      </div></div>
                    {this.state[picture.getJson()._id + "note"] && (<Notes updaterKey="update" app={app} obj={picture} handleClose={this.handleClose.bind(this, picture.getJson()._id + "note")} />)}
                  </div></div>
                )}

{/* MAPS */}
                {picture.getJson().type === "keepmaps" && (
                 <div style={{ display: "flex", flexDirection: "column",marginBottom: "2vh", marginRight:"1vw", padding:"2%", border: ".1rem solid rgba(15,15,15,.15)",
                 borderStyle: "none groove none groove", borderRadius:"1.5vh", background:styles.colors.White1}}>
                    {/* NAME */}
                    <Link to = {"../maps/"+ app.state.componentList.getComponent("maps", picture?.getJson().ogref, "_id")?.getJson()?._id}style={{fontFamily:styles.fonts.fontBold, textTransform:"capitalize", fontSize: styles.fonts.fontHeader1, marginLeft: ".2vw", cursor:"pointer", textDecoration:"underline #D8D9DA 2px", marginBottom:styles.margins.marginSmallH}}
                     >{picture.getJson().name}</Link>
                  <div key={index} style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    
                    marginLeft: styles.mySpawn.itemMarginLeft,
                    marginRight: styles.mySpawn.itemMarginLeft,  }} >
                      <Link to = {"../maps/"+ app.state.componentList.getComponent("maps", picture?.getJson().ogref, "_id")?.getJson()?._id} style={{ 
                   cursor:"pointer"}}
                   
                     ><ViewMedia 
                     // onClick={dispatch.bind(this, {myswitch: "feed", pic: picture, picChange:true  })}
                      scale = {0.4} media= {Object.keys(picture.getJson().picURLs).length!==0? Object.values(picture.getJson().picURLs) : [picture.getJson().picURL]}/></Link>


                    {/* <img style={{ objectFit: "cover",
                      maxWidth: styles.mySpawn.imgW, 
                      minWidth: styles.mySpawn.imgW,
                      maxHeight: styles.mySpawn.imgW, 
                      marginBottom: styles.margins.marginSmallH,
                       }} src={picture.getJson().picURL} /> */}
                       <hr></hr>
                    <div style={{display: "flex", flexDirection: "column", maxHeight: "fit-content", maxWidth: styles.mySpawn.imgW, userSelect:"text" }}>

                    <div style={{fontFamily:styles.fonts.fontNormal, maxWidth: styles.mySpawn.imgW, fontSize: "1.7vmin",}}>{picture.getJson().note}</div>

                    <div style={{display: "flex", flexDirection: "row", maxWidth: styles.mySpawn.imgW,  marginTop:".61vh", alignContent:"flex-start", justifyContent:"space-between"  }}>  

                    <div style={{...styles.buttons.buttonComment, display: "flex", flexDirection: "row",
                    padding: ".5vh",
                    verticalAlign: "center",
                    height: "3vh",
                    
                    borderRadius: "1vw",
                      position:"relative", 
                     }} onClick={this.addnote.bind(this, picture)}>
                    {/* <img style={{ 
                        width: styles.myFeed.editW, 
                        objectFit: "scale-down",
                        verticalAlign: "center",
                        position:"absolute",                        
                      }} 
                        className="picture" id="pic" src={EditQuill} />  */}
                      <div style={{
                        
                        marginBottom: "-.9vh",
                        fontFamily:styles.fonts.fontNormal, fontSize: "1.7vmin",
                        color: styles.colors.linkVisitedColor, fontWeight:"700",
                        }}> Add Note </div>
                      </div>
                        <div style={{cursor:"pointer"}}
                          onClick={app.dispatch.bind(this, {popupSwitch:"keepDel", objForDelete:picture})}
                        ><img style={{ height: styles.fonts.fontHeader1, 
                          width: "fit-content", padding: "2px", marginRight:"-.5vw", 
                                }} src={TrashCan}/></div>
                      </div></div>
                    {this.state[picture.getJson()._id + "note"] && (<Notes updaterKey="update" app={app} obj={picture} handleClose={this.handleClose.bind(this, picture.getJson()._id + "note")} />)}
                  </div></div>
                )}

{/* Worlds */}
                {picture.getJson().type === "keepworlds" && (
                  <div style={{ display: "flex", flexDirection: "column", marginBottom: "2vh",marginRight:"1vw", padding:"2%", border: ".1rem solid rgba(15,15,15,.15)",
                  borderStyle: "none groove none groove", borderRadius:"1.5vh", background:styles.colors.White1}}>
                    {/* NAME */}
                    <Link to = {"../worlds/"+ app.state.componentList.getComponent("worlds", picture.getJson().ogref, "_id").getJson()._id} style={{fontFamily:styles.fonts.fontBold, textTransform:"capitalize", fontSize: styles.fonts.fontHeader1, marginLeft:".2vw" , cursor:"pointer", textDecoration:"underline #D8D9DA 2px", marginBottom:styles.margins.marginSmallH}}
                    >{picture.getJson().name}</Link>
                                   <div key={index} style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    
                    marginLeft: styles.mySpawn.itemMarginLeft,
                    marginRight: styles.mySpawn.itemMarginLeft,  }} >
                      <Link to = {"../worlds/"+ app.state.componentList.getComponent("worlds", picture.getJson().ogref, "_id").getJson()._id} style={{ 
                   cursor:"pointer"}}
                   
                    ><ViewMedia 
                    // onClick={dispatch.bind(this, {myswitch: "feed", pic: picture, picChange:true  })}
                     scale = {0.4} media= {Object.keys(picture.getJson().picURLs).length!==0? Object.values(picture.getJson().picURLs) : [picture.getJson().picURL]}/></Link>


                    {/* <img style={{ objectFit: "cover",
                      maxWidth: styles.mySpawn.imgW, 
                      minWidth: styles.mySpawn.imgW,
                      maxHeight: styles.mySpawn.imgW, 
                      marginBottom: styles.margins.marginSmallH,
                       }} src={picture.getJson().picURL} /> */}
                       <hr></hr>
                    <div style={{display: "flex", flexDirection: "column", maxHeight: "fit-content", maxWidth: styles.mySpawn.imgW, userSelect:"text" }}>

                    <div style={{fontFamily:styles.fonts.fontNormal, maxWidth: styles.mySpawn.imgW, fontSize: "1.7vmin",}}>{picture.getJson().note}</div>

                    <div style={{display: "flex", flexDirection: "row", maxWidth: styles.mySpawn.imgW,  marginTop:".61vh", alignContent:"flex-start", justifyContent:"space-between"  }}>  

                    <div style={{...styles.buttons.buttonComment, display: "flex", flexDirection: "row",
                    padding: ".5vh",
                    verticalAlign: "center",
                    height: "3vh",
                    fontSize: "1.7vmin",
                    borderRadius: "1vw",
                      position:"relative", 
                     }} onClick={this.addnote.bind(this, picture)}>
                    {/* <img style={{ 
                        width: styles.myFeed.editW, 
                        objectFit: "scale-down",
                        verticalAlign: "center",
                        position:"absolute",
                        
                        
                        
                      }} 
                        className="picture" id="pic" src={EditQuill} />  */}
                      <div style={{
                       
                        marginBottom: "-.9vh",
                        fontFamily:styles.fonts.fontNormal, fontSize: "1.7vmin",
                        color: styles.colors.linkVisitedColor, fontWeight:"700",
                        }}> Add Note </div>
                      </div>
                        <div style={{cursor:"pointer"}}
                          onClick={app.dispatch.bind(this, {popupSwitch:"keepDel", objForDelete:picture})}
                        ><img style={{ height: styles.fonts.fontHeader1, 
                          width: "fit-content", padding: "2px", marginRight:"-.5vw", 
                                }} src={TrashCan}/></div>
                      </div></div>
                    {this.state[picture.getJson()._id + "note"] && (<Notes updaterKey="update" app={app} obj={picture} handleClose={this.handleClose.bind(this, picture.getJson()._id + "note")} />)}
                  </div></div>
                )}


              </div>
            )}</div>)}
        </div>
      </div>
    )
  }
}
//           {/* <Gallery state = {this.props.state} handlechange = {this.props.handlechange} /> */}