import React, { Component } from 'react';
import sync from "../../assets/sync.png";

 export default class AddToGroup extends Component {
    constructor(props) {
        super(props);
       

        this.state = {
            homeworkCount: 1,
            studentList:false,
            students:[this.props.app.state.currentstudent?.getJson()._id]
        }
    }
    
   
    componentDidMount(){
        if(this.props.setList){
            this.props.setList(this.state.students);
        }
    }
   

 
   
    render() {
        
        let app = this.props.app;
        let state = app.state;
        let homework= state.currentComponent;
        let opps = homework?.getOperationsFactory();
        let mykey = state.popupSwitch;
        return (
 <div style={{  }}>
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
                                    this.props.setList(list);
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
                                    this.props.setList(list);
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
                                    this.props.setList(list);
                                }}>{s.getJson()._id!==state.currentstudent.getJson()._id && (<>Remove</>)}</div>
                                </div>):(<div style={{display:'flex', flexDirection:'row', justifyContent:"space-between"}} > 
                                <div ><img src={s.getJson().picURL} style={{width:"50px", height:"50px", borderRadius:"50%", marginRight:"20px" }} />{s.getJson().firstName} {s.getJson().lastName}</div>
                                <div style={{color:"#6C86F4", cursor:"pointer", marginTop:"13px"}} onClick={()=>{
                                    let list= [...this.state.students];
                                    list.push(s.getJson()._id)
                                    let i = this.state.homeworkCount +1;
                                    this.setState({students:list, homeworkCount:i});
                                    this.props.setList(list);
                                }}>Add <img src={sync} style={{width:"20px", height:"20px", marginBottom:"6px"}}/></div>
                                </div>)}</div>
                                )}</>)}
                                </div>):(<div onClick={()=>{this.setState({studentList:true})}} style={{display:"flex", cursor:"pointer",  alignItems:'center', justifyContent:"center", flexDirection:'row', width:"250px",  height:"70px", boxShadow:"3px 3px 10px 1px #797979", borderRadius:"12px", marginRight:!state.iphone&&"40px" }}>
                                    <img src={state.currentstudent.getJson().picURL} style={{borderRadius:"50%", width:"50px", height:"50px", marginRight:"10px"}} />
                                    <div>
                                        <div>Assign to:</div>
                                        <div style={{color:"#6C86F4"}}>
                                            {state.currentstudent.getJson().firstName} {state.currentstudent.getJson().lastName}
                                        </div>
                                        <div>{(this.state.students?.length>1) && (<div style={{fontSize:"12px", color:"#6C86F4"}}>+ {this.state.students.length-1} more</div>)}</div>
                                    </div>
                                    
                                </div>)}
                                
                                </div> 
        )
                            }
                        }