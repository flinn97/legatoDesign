import React, { Component } from 'react';
import studentService from '../services/studentService';
import Newnote from './newnote';
class Notes extends Component {
    constructor(props) {
        //create state
        super(props);
        this.setUpdate=this.setUpdate.bind(this);
        this.state = {
            
        };
    }
    setUpdate(){
        this.setState({update:undefined});
    }
    
    render() {
       let currentstudent = this.props.app.state.currentstudent;
       let currentuser = this.props.app.state.currentuser;
       let app = this.props.app;
       let dispatch= app.dispatch;
       let state = app.state;
       let styles = state.styles;
       let comp = this.props.app.state.componentList;

        return (
            <div style={ 
                state.styles.resizecard}>
            <div
                style={{
                    display:"flex", 
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems: "center",
                        
                        fontWeight: styles.fonts.fontweightMed,
                        padding: styles.margins.margin4,

                        background: styles.colors.colorLink 
                        //+ "88"
                        ,
                        borderRadius: "23px 23px 0px 0px",
                        fontSize: styles.fonts.fontsizeTitle,
                        fontFamily: styles.fonts.appFont,
                        fontWeight: styles.fonts.fontweightMed
                }}
            ><div
            style={{
                marginLeft:styles.mystudents.studentMargin,
                color: styles.colors.color6,
                letterSpacing: styles.fonts.appSpacing,   
                alignItems: "center",     
            }}
            >Teacher's Notes</div></div>
            <div style={{height:state.iphone?"32vh":"24vh"}}>
            <div className="scroller" style={{display:"flex", flexDirection:"column", padding:"20px", paddingTop:"10px",}}>
            <Newnote  app={app} />
            {/* <button  className="btn  btn-block"  onClick={dispatch.bind(this, {popupSwitch:"notes", operate:"addnotes", object:{owner: currentstudent.getJson()._id}})} 
            style={
                {...styles.buttons.buttonLog,
                    width: "80%",
                }
                    }
                    
                    >+ New Note</button> */}
            {/* {state.popupSwitch==="notes"?(<Newnote  handleclose={dispatch.bind(this, {popupSwitch:"", })} app={app} />):(<div></div>)} */}
            {comp.getList("notes", currentstudent?.getJson()?._id).reverse().map((note, index) =>
            <div style={{marginBottom:"1px"}}>
            <div style= {{
                background: styles.colors.color6,
                boxShadow: "1px 3px 16px #D1D1D1",
                padding: ".3vw",
                borderRadius:".6vw",
                
            }} key={index}>
                {this.state.update===index+"note"?(<>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <div style= {{marginLeft:".1vw",  cursor:"pointer", fontSize:".72vw", color:styles.colors.colorWarning }} onClick={()=>{
                    this.setState({update: undefined});
                    dispatch({operate:"del", operation:"cleanPrepareRun", object:state.currentComponent});
                }}>delete</div>
                <div style= {{marginLeft:".1vw",  cursor:"pointer", color:styles.colors.colorWarning }} onClick={()=>{
                    this.setState({update:undefined})
                    dispatch({currentComponent:undefined})
                }}>X</div>
                </div>
                <Newnote  setUpdate = {this.setUpdate} note = {note} myswitch="update" handleclose={dispatch.bind(this, {popupSwitch:"", })} edit={true} app={app}/>
                </>
                ):(<div>
                    <div style={{fontSize:"13px", color:'#639EFE', marginLeft:"1px", cursor:"pointer" }} onClick={()=>{
                        
                        this.setState({update:index+"note"});
                        dispatch({popupSwitch: "updatenote",operate: "update", operation:"cleanPrepare",object: note});
                    } 
                    }>{note.getJson().dateOfPost.split(" ")[0]+" "+ note.getJson().dateOfPost.split(" ")[1].slice(0,-1)} </div>
                    <div style= {{cursor:"pointer"}} onClick={()=>{
                        
                        this.setState({update:index+"note"});
                        dispatch({popupSwitch: "updatenote",operate: "update", operation:"cleanPrepare",object: note});
                    } 
                    }>{note?.getJson()?.description} 
                    </div>
                    {/* <p onClick={dispatch.bind(this,{operation:"prepareRun", operate:"del", object:note })}>delete</p> */}
                    </div>)}
            
            </div></div>)}


            </div>
            </div>
            </div>

               
        );
    }
}

export default Notes;