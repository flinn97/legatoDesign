import React, { Component } from "react";
import Checkedd from "../components/checkbox";
import Times from "./times";
import studentService from "../../services/studentService.js"
import ParentFormComponent from "../../npm/parentFormComponent";
import UploadComponent from "../../npm/componentForms/uploadComponent";
import sync from "../../assets/sync.png";
//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
class Addhomework extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.edit = this.edit.bind(this);
        this.populate = this.populate.bind(this);

        this.handleChange=this.handleChange.bind(this);
        this.setWrapperRef = this.setWrapperRef;
        this.state = {
            edit: this.props.app.state.popupSwitch==="updateHomework"? true: false,
            addMeta:false,
            title: this.props.app.state.currentComponent? this.props.app.state.currentComponent?.getJson().title:"",
            description:  this.props.app.state.currentComponent? this.props.app.state.currentComponent?.getJson().description:"",
            hwlink:  this.props.app.state.currentComponent? this.props.app.state.currentComponent?.getJson().hwlink:"",
            update: false,
            database:false,
            addMeta: false,
            attachments:this.props.app.state.currentComponent? this.props.app.state.currentComponent?.getJson().media:{},
            homeworkCount: 1,studentList:false,
            groups: [],
            students:[this.props.app.state.currentstudent?.getJson()._id]
        }

    };
    populate(hw){
        let app = this.props.app;
        let state = app.state;
        let homework= state.currentComponent;
        homework.setJson({...hw.getJson(), collection:homework.getJson().collection, _id: homework.getJson()._id, owner: homework.getJson().owner});
        this.setState({
            title:hw.getJson().title,
            description: hw.getJson().description,
            hwlink: hw.getJson().hwlink,
            attachments:hw.getJson().media,
            database:false
        })
    }   

    handleChange = async (event) => {
        
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let homework= state.currentComponent;
        let opps = homework?.getOperationsFactory();
        let dispatch= app.dispatch;
        let mykey = state.popupSwitch;
        let key = opps?.getSplice(mykey);
        const { name, value } = event.target
        await this.setState({
            [name]: value,
        })
        homework.setJson({...homework.getJson(), [name]:value});
    }

    componentDidMount() {
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let homework= state.currentComponent;
        let opps = homework?.getOperationsFactory();
        let dispatch= app.dispatch;
        let mykey = state.popupSwitch;
        let key = opps?.getSplice(mykey);
        this.setState({title:homework?.getJson()?.title, description:homework?.getJson()?.description,hwlink:homework?.getJson()?.hwlink, attachments:homework?.getJson()?.media})

        document.addEventListener('mousedown', this.handleClickOutside);
    }
    async componentDidUpdate(){
        if(this.props.app.state.currentComponent!==undefined&&!this.state.update){
            await this.setState({update:true});
            let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let homework= state.currentComponent;
        let opps = homework?.getOperationsFactory();
        let dispatch= app.dispatch;
        let mykey = state.popupSwitch;
        let key = opps?.getSplice(mykey);
        this.setState({title:homework?.getJson()?.title, description:homework?.getJson()?.description,hwlink:homework?.getJson()?.hwlink, attachments:homework?.getJson()?.media})

        }
        
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
    edit(){
        this.setState({ edit:!this.state.edit})
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
                <div ref={this.wrapperRef}  className="diapicboxa " style={{ zIndex: "1010", height:state.iphone?"70vh":"65vh", marginTop:state.iphone && "70px",
                width: state.iphone?"95vw": !this.state.addMeta? window.innerWidth<1620? "90vw":"60vw":"40vw", paddingBottom: state.iphone && "70px"
                }}>
                    
                <div style={ ///EXIT BUTTON
                                styles.buttons.closeicon
                            } onClick={this.props.handleClose}>x</div>
                <div className="scroller" style={{width:"100%", height:"100%", display:'flex', justifyContent:state.iphone &&"center"}}>
                            {this.state.addMeta?(<div style={{display:"flex", justifyContent:"center", width:"100%"}}>
                                <div style={{cursor:"pointer"}} onClick={()=>{this.setState({addMeta: false})}}>back</div>
                                <UploadComponent dispatch={(list)=>{this.setState({attachments:list})}} obj ={homework} name ="media"/>
                                
                            </div>):(
                            <div style={{width:window.innerWidth<1620?"90vw":"60vw", display:"flex", justifyContent:state.iphone &&"center"}}>
                            {this.state.database?(<div style={{width:"100%"}}>
                                <div style={{cursor:"pointer"}} onClick={()=>{this.setState({database:false})}}>back</div>
<div className="scroller" style={{display:'flex', flexDirection:'row', flexWrap:'wrap', width:"100%", justifyContent:"center", height:"55vh"}}>
                                {state.componentList.getList("homework").reverse().map((hw, index)=>
                    <div style={{  display:'flex', flexDirection:"column", position:"relative", cursor:"pointer", width:window.innerWidth<1620?"250px":"300px", height:"100px", margin:"10px", borderRadius:"12px", border:"1px solid grey"}}>
                    <div className="scroller"  style={{display:"flex", flexDirection:"column", padding:"10px", paddingTop:"2px", position:"relative"}}>
                        <b onClick={this.populate.bind(this, hw)} style={{fontSize:"16px"}}>{hw.getJson().title}</b>
                        <b onClick={this.populate.bind(this, hw)} style={{color:"#6C86F4", fontSize:"12px"}}>{hw.getJson().hwlink}</b>
                        <b onClick={this.populate.bind(this, hw)} style={{marginTop:"10px", fontSize:"12px"}}>{hw.getJson().description}</b>
                        <b onClick={this.populate.bind(this, hw)} style={{color:"#6C86F4", fontSize:"12px"}}>{Object.keys(hw.getJson().media).length} Attachments</b>
                        <div style={{position:'absolute', top:5, right:10, cursor:"pointer", fontSize:"12px"}} onClick={()=>{
                            
                            state.componentList.getOperationsFactory().prepareSingleRun({del:hw})
                            }}>Delete</div>
                    </div></div>
                    )}</div>
                            </div>):(
                     <div style={{display:'flex', flexDirection:state.iphone?"column":"row", width:window.innerWidth<1620 ?"90vw":"60vw", alignItems:state.iphone &&"center"}}>
                        <div style={{width:window.innerWidth<1620 ?"70vw":"40vw",  }}>
                            <div style={{width:'100%', display:"flex", justifyContent:"center"}}><b style={{fontSize:"20px"}}>{homework?.getJson()?.type==="archive"?<>Archived Assignment</>: <>New Assignment</>}</b></div>
                    <div className="form-group">
                        <label htmlFor="lastName"><b>Assignment Title:</b></label>
                        <input type="text" className="form-control" id="homework" style={{width:"95%"}} value={this.state.title} onChange={this.handleChange} name={"title"} placeholder="title the practice assignment..."/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName"><b>Source:</b></label>
                        <input type="text" className="form-control" id="homework" style={{width:"95%"}} value={this.state.hwlink}  onChange={this.handleChange} name={"hwlink"} placeholder="Source Description -Ex: Claddical Piano Solos Book, pg 246"/>
                    </div> 
                        <div className="form-group">
                            <label>Notes:</label>
                                <textarea style={{width:"95%"}} type="text" className="form-control" value={this.state.description}  rows="3" id="hwdescription" onChange={this.handleChange} name={"description"} placeholder="describe the practice assignment..."></textarea>
                        </div>
                       
                        
                                <div style={{display:"flex", flexDirection:state.iphone?"column":"row", justifyContent:"space-between",  alignItems:state.iphone &&"center"}}>
                                    <div>{this.state.attachments &&(<>{Object.keys(this.state.attachments).length>0?( <div style={{backgroundColor: "#57BA8E", color:"white", width:"200px", borderRadius:"7px", 
                                justifyContent:"space-around", alignItems:"center", display:"flex", height:"40px", marginTop:"20px", cursor:"pointer"
                            }} onClick={()=>{this.setState({addMeta:true})}}>
                                {Object.keys(this.state.attachments).length} attachments <div style={{color:"white"}}> <u>Edit</u></div></div>):(
                                <div style={{backgroundColor: "#B9B9B9", color:"white", width:"120px", borderRadius:"7px", 
                                justifyContent:"center", alignItems:"center", display:"flex", height:"40px", marginTop:"20px", cursor:"pointer"
                            }} onClick={()=>{this.setState({addMeta:true})}}>
                                + Add Media</div>)}</>)}
                                </div>
                                <div style={{marginTop:"20px",  }}>
                                    {this.state.studentList?(
                                    <div className="scroller" style={{display:"flex", zIndex:"1000",  position:"relative", width:state.iphone? "250px":"350px", flexDirection:"column",  height:"210px", boxShadow:"3px 3px 10px 1px #797979", borderRadius:"12px", marginRight:"40px", padding:"10px"}}>
                                     <div style={ ///EXIT BUTTON
                                {color:"gray", opacity:".5", position:"absolute", right:10, top:5, cursor:"pointer"}
                            } onClick={()=>{this.setState({studentList:false})}}>x</div>





                            {/* ASSIGN TO GROUP */}
                            {this.state.assignToGroup ?(<>
                                <div onClick={()=>{this.setState({assignToGroup:false})}} style={{ cursor:"pointer",  }}>back</div>
                                    {state.componentList.getList('group').map((group, index)=>
                                    <div style={{borderBottom:"1px solid grey", padding:"7px"}}>
                                        <div style={{display:'flex', flexDirection:'row', justifyContent:"space-between"}}>
                                        <div>{group.getJson().title}</div>
                                        {this.state[group.getJson().title]?(<div style={{cursor:"pointer", }} onClick={()=>{
                                    let list= [];
                                    let sList = [...this.state.students]
                                    let groupList = state.componentList.getList('group');
                                    let titleList = [];
                                    for (const key in groupList){
                                        titleList.push(groupList[key].getJson().title);
                                    }
                                    
                                    for(const key in sList){
                                        if(!titleList.includes(state.componentList.getComponent("student", sList[key]).getJson().group) || state.currentstudent.getJson()._id===sList[key]){
                                            list.push(sList[key]);
                                        }
                                    }
                                    let i = this.state.homeworkCount-(sList.length-list.length);
                                   
                                    this.setState({students:list, homeworkCount:i, [group.getJson().title]: false});
                                }}>Remove</div>):(
                                        <div style={{color:"#6C86F4", cursor:"pointer", }} onClick={()=>{
                                    let list= [...this.state.students];
                                    let groupList = state.componentList.getList('group');
                                    let sList = state.componentList.getList("student");
                                    let titleList = [];
                                    for (const key in groupList){
                                        titleList.push(groupList[key].getJson().title);
                                    }
                                    
                                    let i = this.state.homeworkCount;
                                    for(const key in sList){
                                        let g = sList[key].getJson().group
                                        if(g){
                                        if(titleList.includes(sList[key].getJson().group)){
                                            if(!this.state.students.includes(sList[key].getJson()._id))
                                            {
                                                list.push(sList[key].getJson()._id);
                                            i++;
                                            }
                                            
                                        }
                                    }
                                    }

                                    this.setState({students:list, homeworkCount:i, [group.getJson().title]: true});
                                }}>Add <img src={sync} style={{width:"20px", height:"20px", marginBottom:"6px"}}/></div>)}

                                        </div>
                                    </div>
                                    )}
                            
                            </>):(
                            <>
                            
                            <div onClick={()=>{this.setState({assignToGroup:true})}} style={{color:"#6C86F4", cursor:"pointer",  }}>Assign to Group</div>
                                    {state.componentList.getList("student").map((s, index)=>
                                <div style={{borderBottom:"1px solid grey", padding:"7px"}} key = {index}>{this.state.students.includes(s.getJson()._id)?(
                                <div style={{display:'flex', flexDirection:'row', justifyContent:"space-between"}}>
                                <div ><img src={s.getJson().picURL} style={{width:"50px", height:"50px", borderRadius:"50%", marginRight:"20px" }} />{s.getJson().firstName} {s.getJson().lastName}</div>
                                <div style={{cursor:"pointer", marginTop:"13px"}} onClick={()=>{
                                    let list= [];
                                    for(let i = 0; i<this.state.students.length; i++){
                                        if(this.state.students[i]!==s.getJson()._id){
                                            list.push(this.state.students[i])
                                        }
                                    }
                                    let i = this.state.homeworkCount -1;
                                    this.setState({students:list, homeworkCount:i});
                                }}>{s.getJson()._id!==state.currentstudent.getJson()._id && (<>Remove</>)}</div>
                                </div>):(<div style={{display:'flex', flexDirection:'row', justifyContent:"space-between"}} > 
                                <div ><img src={s.getJson().picURL} style={{width:"50px", height:"50px", borderRadius:"50%", marginRight:"20px" }} />{s.getJson().firstName} {s.getJson().lastName}</div>
                                <div style={{color:"#6C86F4", cursor:"pointer", marginTop:"13px"}} onClick={()=>{
                                    let list= [...this.state.students];
                                    list.push(s.getJson()._id)
                                    let i = this.state.homeworkCount +1;
                                    this.setState({students:list, homeworkCount:i});
                                }}>Add <img src={sync} style={{width:"20px", height:"20px", marginBottom:"6px"}}/></div>
                                </div>)}</div>
                                )}</>)}
                                </div>):(<div onClick={()=>{this.setState({studentList:true})}} style={{display:"flex", cursor:"pointer",  alignItems:'center', justifyContent:"center", flexDirection:'row', width:"250px",  height:"70px", boxShadow:"3px 3px 10px 1px #797979", borderRadius:"12px", marginRight:!state.iphone&&"40px" }}>
                                    <img src={state.currentstudent?.getJson().picURL} style={{borderRadius:"50%", width:"50px", height:"50px", marginRight:"10px"}} />
                                    <div>
                                        <div>Assign to:</div>
                                        <div style={{color:"#6C86F4"}}>
                                            {state.currentstudent?.getJson().firstName} {state.currentstudent?.getJson().lastName}
                                        </div>
                                        <div>{(this.state.students.length>1) && (<div style={{fontSize:"12px", color:"#6C86F4"}}>+ {this.state.students.length-1} more</div>)}</div>
                                    </div>
                                    
                                </div>)}
                                
                                </div> </div>
                                {homework?.getJson().type!=='archive'&&
                                <div style={{position:"absolute", bottom:15, display:"flex", flexDirection:"row"}}>
                        <div style={{  flexDirection:"row", display:'flex', alignContent:"center", justifyContent:"center",   }}>
                        <button  className="btn  btn-block"  
                        onClick={()=>{
                            
                            for(let i = 0; i<this.state.students.length; i++){
                                if(this.state.students[i]!==state.currentstudent?.getJson()._id){
                                    state.componentList.getOperationsFactory().jsonPrepare({addhomework: {...homework?.getJson(), owner:this.state.students[i]}});

                                }
                            }
                           

                            dispatch( {popupSwitch:"", operation:"run"});
                        }}
                        
                        style={{ background: styles.colors.color1, height: "40px", color: "white", width: window.innerWidth<600? "135px":"180px", display:"flex", flexDirection:"column", borderRadius: "16px", justifyContent:"center", alignItems:"center"}}>{homework?.getJson().collection!==""?(<>Save</>):(<>Create Assignment</>)}</button>
                    </div>
                    {homework?.getJson().collection!=="" &&(<button  className="btn  btn-block"  
                        onClick={()=>{
                            homework.setJson({...homework.getJson(), owner:""})
                            dispatch({popupSwitch:"", operation:"cleanPrepareRun", object:homework, operate:"update"})}}
                        style={{ background: "#F56060", height: "40px", color: "#F0F2EF", width:window.innerWidth<600? "135px": "180px", marginLeft:"20px", display:"flex", flexDirection:"column", justifyContent:"center", borderRadius: "16px",  alignItems:"center"}}>Unassign</button>)}
                   </div>}
                    </div>{homework?.getJson().type!=='archive'&&
                    <div style={{paddingTop:"40px", paddingRight:'20px', borderLeft:!state.iphone&&"1px solid grey", height:"61vh",  display:"flex", flexDirection:"column", alignItems:"center", width:window.innerWidth<1620? "50vw":"20vw"}}>
                        <div style={{width:"100%", cursor:"pointer",backgroundColor:"#6C86F4", borderRadius:"7px", width:"200px", height:"40px", color:"white", display:'flex', justifyContent:"center", alignItems:"center"}} onClick={()=>{this.setState({database:true})}}><b>Assignment Library</b></div>

                        <h4 style={{marginTop: "40px", }}>Recent Assignments</h4>
                        <div className="scroller">
                        {state.componentList.getList("homework").reverse().slice(0,10).map((hw, index)=>
                        <div style={{paddingLeft:"10px", display:'flex', flexDirection:"column", position:"relative", cursor:"pointer", width:"300px", height:"100px", marginTop:"20px", borderRadius:"12px", border:"1px solid grey"}}>
                    <div className="scroller" onClick={this.populate.bind(this, hw)} style={{display:"flex", flexDirection:"column"}}>
                        <b style={{fontSize:"16px"}}>{hw.getJson().title}</b>
                        <b style={{color:"#6C86F4", fontSize:"12px"}}>{hw.getJson().hwlink}</b>
                        <b style={{marginTop:"10px", fontSize:"12px"}}>{hw.getJson().description}</b>
                        {Object.keys(hw.getJson().media) && (<b style={{color:"#6C86F4", fontSize:"12px"}}>{Object.keys(hw.getJson().media).length} Attachments</b>)}
                    </div></div>
                    )}</div></div>}
                    </div>
                    )}</div>)}
                </div>
                
            </div>
            </div>
            </div>)
    }
};
export default Addhomework;
//                        onClick={this.props.app.dispatch.bind(this, {objkey:"homeworks", obj:this.props.app.state.showhomework? {...this.props.app.homework}: undefined, myswitch:this.props.app.state.showhomework?"update": "add"})} 

/*
<iframe width="560" height="315" src="https://www.youtube.com/embed/Jvf-kkzaXwc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
*/