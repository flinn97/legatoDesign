import React, { Component } from "react";
import Checkedd from "../components/checkbox";
import Times from "./times";
import studentService from "../../services/studentService.js"
import ParentFormComponent from "../../npm/parentFormComponent";
import UploadComponent from "../../npm/componentForms/uploadComponent";
import Attach from "../../assets/attach.png"
//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
class ShowHomework extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.setWrapperRef = this.setWrapperRef;
        this.state = {
            edit: this.props.app.state.popupSwitch==="updateHomework"? true: false,
            addMeta:false,
            title:"",
            description: "",
            hwlink: "",
            update: false,
            database:false,
            addMeta: false,
            homeworkCount: 1,
            videos: [],
            video: "",
            index: 0
            
        }

    };
    

  

    componentDidMount() {
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let homework= state.currentComponent;
        let opps = homework?.getOperationsFactory();
        let dispatch= app.dispatch;
        let mykey = state.popupSwitch;
        let key = opps?.getSplice(mykey);
        let media = homework?.getJson().media
        let list = [];
        
        for(const key in media){
            if(key.includes("youtube")){
                list.push(media[key])
            }
        }
        
        
        


        this.setState({title:homework?.getJson()?.title, description:homework?.getJson()?.description,hwlink:homework?.getJson()?.hwlink, videos:list, video:list[0]})

        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            if(!this.props.app.state.popupSwitch!=="addhwtime"){
                this.props.handleClose();
            }
        }
    }

    render() {
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let homework= state.currentComponent;
        let opps = homework?.getOperationsFactory();
        let dispatch= app.dispatch;
        let mykey = state.popupSwitch;
        let key = opps?.getSplice(mykey);
        return (<div>

           

                                <div className="popup-box" style={{ zIndex: "1010" }}>
                <div ref={this.wrapperRef}  className="diapicboxa " style={{ zIndex: "1010", height:state.iphone?"70vh":"80vh", width: state.iphone?"95vw":"40vw",marginTop:state.iphone && "70px", }}>
                    <div className="scroller" style={{display:"flex", alignItems:"center", flexDirection:"column",  width:"100%"}}>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", height:"350px", marginBottom:"0"}}>
                <div onClick={()=>{
                    let i = this.state.index;
                    if (i===0){
                        i = this.state.videos.length-1;
                    }
                    else{
                        i--;
                    }
                    let video = this.state.videos[i];
                    this.setState({video:video, index:i})

                }} 
                style={{background:"#00000099", clipPath:"polygon(100% 0, 0 50%, 100% 100%)", width:"20px", height:"40px", marginRight:"10px", cursor:"pointer" }} ></div>
                    <iframe width="560" height="315"  style={{borderRadius:"12px", width:state.iphone?"70vw":"30vw", }}  src={this.state.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  
                    <div onClick={()=>{
                    let i = this.state.index;
                    if (i===this.state.videos.length-1){
                        i = 0;
                    }
                    else{
                        i++;
                    }
                    let video = this.state.videos[i];
                    this.setState({video:video, index:i})

                }} style={{background:"#00000099", clipPath:"polygon(50% 0, 50% 100%, 100% 50%)", width:"40px", height:"40px",marginLeft:"-10px", cursor:"pointer" }} ></div>
                </div>
                <div style={{color:"grey", fontSize:"12px",}}>Attachments</div>
                <div className="scroller" style={{display:'flex', flexDirection:"row", flexWrap: "wrap", borderBottom:"1px solid grey", width:"100%", height:"80px"}}>
                {homework&&(<>
                {Object.keys(homework?.getJson().media).map((h, index)=>
                <div  key={index}>
                    <a style={{display:"flex", flexDirection:"column", alignItems:"center", textDecoration:"none", margin:"10px"}} href={homework?.getJson().media[h]} target="_blank">
                    <img src = {Attach} style={{width:"30px", height:"auto"}}/>
                   <div>{h.slice(0, 10)}</div></a>
                </div>
                )}</>)}</div>
                <div style={ ///EXIT BUTTON
                                styles.buttons.closeicon
                            } onClick={this.props.handleClose}>x</div>
                           
                     <div style={{display:'flex', flexDirection:"row", width:"80%", marginTop:"14px"}}>
                        <div style={{width:"40vw"}}>
                    <div className="form-group">
                        <b style={{fontSize:"20px"}}>{this.state.title}</b>
                        
                        </div>
                        <div className="form-group">
                        <b style={{color:"#6C86F4"}}>{this.state.hwlink}</b>
                        
                                            </div>
                        <div className="form-group">
                            
                            {this.state.description}
                                                    </div>
                       
                         

                               
                    </div>
                  
                </div>
                
            </div>
            </div></div>
            </div>)
    }
};
export default ShowHomework;
//                        onClick={this.props.app.dispatch.bind(this, {objkey:"homeworks", obj:this.props.app.state.showhomework? {...this.props.app.homework}: undefined, myswitch:this.props.app.state.showhomework?"update": "add"})} 

/*
<iframe width="560" height="315" src="https://www.youtube.com/embed/Jvf-kkzaXwc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
*/