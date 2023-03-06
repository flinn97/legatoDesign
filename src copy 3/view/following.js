import { Component } from 'react';
import "../App.css";
import auth from '../services/auth';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
export default class Follower extends Component {
  constructor(props){
    super(props);

  }
  async componentDidMount(){
    debugger
    let url = window.location.href;
    let splitUrl = url.split('/');
    let id = splitUrl[splitUrl.length-1]
    let user = await auth.getPicOwner(this.props.app.state.componentList, id);
        this.props.app.dispatch({currentFollowing: user, myswitch: "following"})
  }

  render(){
    let app = this.props.app
    let pic = this.props.app.state.componentList?.getComponents();
    let state = app.state;
    let styles =state.styles;
    let switchcase = app.state.switchcase;
    let dispatch= app.dispatch;
    let spawnerHandle = state.currentFollowing?.getJson().spawnerHandle;
    let bio = state.currentFollowing?.getJson().bio;
    

    let picsource = state.currentFollowing?.getJson().picURL;
    // let bio = app.state.user.getJson().bio;
    // let website = app.state.user.getJson().website;
    // let social = app.state.user.getJson().socialHandle;
    
  return (
    <>{state.currentFollowing&&(
    <div style={{
      display: "flex",
      flexDirection: "column", height:"99vh", padding:"1vmin"}}> 
      {/* INFORMATION */}
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-around",
        marginBottom:"4vmin"}}>
{/* PICTURE and NAME */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems:"center", justifyContent:"center",
        marginLeft:"2vw",
        marginRight:"2vw",
        
        
        fontFamily: styles.fonts.fontLight,
        fontSize: styles.fonts.fontSubheader1,
      }}
      > 
      <div style={{
            userSelect: "text",  
            fontFamily: styles.fonts.fontBold, fontSize: "2.5vmin",  marginBottom:"1vh"   
            }}>{spawnerHandle}</div>
      <img  style={{
        width:"9vmax", height:"9vmax", borderRadius:"50%",
      }} src={picsource} />
      </div>

{/* BIO */}
      <div style={{display: "flex",
        flexDirection: "column", width: styles.mySpawn.bioW,
        alignItems:"flex-start", justifyContent:"center", 
        fontFamily:styles.fonts.fontLight,}}>
      <div style={{fontFamily:styles.fonts.fontLight, fontSize: "2.1vmin", marginBottom:"1vh",}}>{bio}</div>
      <div style={{fontFamily:styles.fonts.fontBold, display: "flex",  fontSize: "1.9vmin",
        flexDirection: "row",}}>Social: 
        <a style={{fontFamily:styles.fonts.fontLight, marginLeft:"1vmin", fontSize: "1.9vmin"}} href={state.currentFollowing.getJson().socialHandle.includes("http") ? state.currentFollowing.getJson().socialHandle:"https://"+ state.currentFollowing.getJson().socialHandle} target="_blank"> {state.currentFollowing.getJson().socialHandle}</a>
      </div>
      <div style={{fontFamily:styles.fonts.fontBold, display: "flex",  fontSize: "1.9vmin",
        flexDirection: "row",}}>Website: 
        <a style={{fontFamily:styles.fonts.fontLight, marginLeft:"1vmin",  fontSize: "1.9vmin"}} href={state.currentFollowing.getJson().website.includes("http") ? state.currentFollowing.getJson().website:"https://"+ state.currentFollowing.getJson().website} target="_blank"> {state.currentFollowing.getJson().website}</a>
      </div>
      </div>

      </div>  <hr style={{}}></hr>

{/* FEED */}
     <div style={{display: "flex", width:"100%",
        flexDirection: "row", flexWrap:"wrap", justifyContent:"space-between", marginTop:"1.1vmin", 
        alignItems:"flex-end", marginBottom:"2vmin", height:"fit-content",}}> 
        

      {pic?.map((picture, index)=>
      <div style={{display: "flex", 
      flexDirection: "column", justifyContent:"center", flexWrap:"wrap", width:styles.mySpawn.width1,
      alignItems:"center",  marginBottom:"1vh", padding:"1vmin", height:"fit-content", }}>
        
        {(picture.getJson().type!=="comment" &&picture.getJson().type!=="follow" )&&(<>
        {(picture.getJson().owner===app.state.currentFollowing.getJson()._id && !picture.getJson().type.includes("keep") && !picture.getJson().type.includes("user")) &&(
          <Link to ={"../"+picture.getJson().type+"/"+picture.getJson()._id}><div key={index} 
          
          style={{display: "flex", flexDirection: "column", flexWrap:"wrap", fontFamily:styles.fonts.fontBold, cursor:"pointer", fontSize: "1.9vmin",
          marginBottom:"1vh", padding:"1vmin",  borderRadius:"1.5vmin", justifyContent:"center", height:"fit-content", 
          maxHeight:"fit-content", minWidth: styles.mySpawn.imgW,  minHeight:"fit-content", background:"linear-gradient(to bottom, "+styles.colors.Grey2+", #FFFFFF" }}> {picture.getJson().name}
         
          <img 
          style= {{objectFit: "cover", cursor:"pointer",
                      maxWidth: styles.mySpawn.imgW, borderRadius:".3vmin",
                      
                      maxHeight: styles.mySpawn.imgW, 
                      marginBottom: styles.margins.marginSmallH, }} src={picture.getJson().picURL} onClick={dispatch.bind(this, {myswitch: "feed", pic: picture, picChange:true  })}/>
                      
          
                      <div style={{background:""}}>

                        <div style={{fontFamily:styles.fonts.fontBold, cursor:"pointer", fontSize: "1.9vmin"}} onClick={dispatch.bind(this, {myswitch: "feed", pic: picture, picChange:true  })}></div>
                      
                      <div style={{fontFamily:styles.fonts.fontNormal, fontSize: "1.9vmin", letterSpacing:"-.02em",}}>{picture.getJson().description}</div> 
          
          </div> 
        </div></Link>
)}
      </>  )}
  </div>
      )}</div>
    </div>)}</>
  )}
}
//           {/* <Gallery state = {this.props.state} handlechange = {this.props.handlechange} /> */}