import React, { Component } from "react";
import studentService from "../../services/studentService";
//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
class addGoal extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef;
        this.state = {
        }
    };
    async componentDidMount() {
        
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let opps = state.componentList?.getOperationsFactory();
        
        let goal= state.currentComponent;
        let currentGoal = state.currentGoal;
        let dispatch= app.dispatch;
        let key =(goal?.getJson().collection !=="" && goal?.getJson().collection !==undefined) ? "update": "add"
        
        let subgoals = currentGoal? state.componentList.getList("goal", currentGoal?.getJson()._id,"mainID") : [];
        this.setState({goals: subgoals})
        
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
        let opps = state.componentList?.getOperationsFactory();
        
        let goal= state.currentComponent;
        let currentGoal = state.currentGoal;
        let dispatch= app.dispatch;
        let key = (currentGoal?.getJson()?.collection !=="" && currentGoal?.getJson()?.collection !==undefined) ? "update": "add"
        return (
            <div className="popup-box" style={{ zIndex: "1010", }}>
                <div ref={this.wrapperRef}  className="diapicboxa" style={{ zIndex: "1010", height:"55vh", width:"35vw"  }}>
                <div style={ ///EXIT BUTTON
                                styles.buttons.closeicon
                            } onClick={this.props.handleClose}>x</div>
                    <div className="form-group">
                        <label htmlFor="lastName"><div style={{fontSize:"2.1vh"}}>Add Goal</div></label>
                        <input style={{marginRight:".5vw", width:"88%"}}
                            type="text"
                            className="form-control"
                            id="goal"
                            value= {currentGoal?.getJson().title}
                            placeholder= {currentGoal?.getJson().title}
                            onChange={(e)=>{

                                opps?.getUpdater(key)[0]?.getOperationsFactory()?.handleChange(e)
                                dispatch({});
                            }
                                
                                }
                            name={key+"title"}
                        />
                    </div>
                    <div style={{          display: 'flex', 
                                        flexDirection: 'column',
                                         marginTop:".7vh",
                                         marginRight:".1vw", 
                                         alignItems: 'left',
                                         textAlign: "left",}} className="homeworkScroll1"> Add SubGoals:

                    <div className="btn  btn-block" 
                                    style={{ 
                                         
                                        
                                        display: 'flex', 
                                        flexDirection: 'row', 
                                        justifyContent: 'center',
                                        alignContent: 'left',
                                        alignItems: 'left',
                                        textAlign: "center",
                                        verticalAlign: "top",
                                        width: "100%",
                                        
                                        }} value="submit" onClick={async ()=>{
                                            
                                            let id = (Math.random(Date.now())+Date.now()+performance.now()).toString();

                                            await opps.jsonPrepare({addgoal: {_id: id, mainID:currentGoal?.getJson()._id,  owner: state.currentstudent.getJson()._id,}})
                                           let g = opps?.getUpdater("add")
                                            let goal = g[g.length-1];
                                            this.setState({goals:[...this.state.goals, goal], })
                                            }} >
                                <span className="checkboxstuff1" 
                                    // what is this?
                                    style={{ width: "9vw", background:"#C9F5E1", borderRadius:".63vw", textAlign: "center", justifyContent: 'center',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    textAlign: "center",}}>
                                        
                                <div style={{fontSize:"1.6vh"}}> + Supporting Goal</div>
                                
                                <div className="rowss huv"> </div>
                                </span>
                                </div>

                                {this.state.goals?.map((goal, index)=>
                                <div style={{marginTop:".4vh", width:"100%", marginBottom:".5vh"}}>
                                 <input
                                 style={{marginRight:".5vw", width:"88%", marginBottom:".1vh"}}
                                 type="text"
                                 className="form-control"
                                 id="goal"
                                 value={this.state.goals[index].getJson().title}
                                 placeholder= {goal.getJson().title}
                                 onChange={(e)=>{
                                    
                                    let key = (goal?.getJson().collection !=="" && goal?.getJson().collection !==undefined)? "update": "add"
                                    if(key==="update"){
                                        opps.prepare({update:goal});
                                    }
                                    goal.setJson({...goal.getJson(), title:e.target.value});
                                    this.setState({goals: this.state.goals});
                                }
                                    
                                     }
                                 name={key+"title"}
                             />
                             {/* DELETE  */}
                             <div style={{...styles.buttons.buttonClear, height:"1.6vh", width:"88%", alignItems:"end", boxShadow: "0px 0px 0px" + styles.colors.colorWarning, }}
                             
                             onClick={()=>{
                                
                                if(goal.getJson().collection!==undefined && goal.getJson().collection!==""){
                                    let goalID = goal.getJson()._id;
                                    let IDarr =[];
                                    for(const key in this.state.goals){
                                        if(this.state.goals[key].getJson()._id!==goalID){
                                            IDarr.push(this.state.goals[key]);
                                        }
                                    }
                                    opps.prepare({del:goal});
                                    this.setState({
                                        goals:IDarr
                                    })
                                    
                                }
                                else{
                                    
                                    let go = [];
                                    for(const goalz in this.state.goals){
                                        let checkGoalz = this.state.goals[goalz]
                                        if(checkGoalz.getJson()._id!==goal.getJson()._id){
                                            go.push(this.state.goals[goalz]);
                                        }
                                    }
                                
                                    // let g = opps?.getUpdater(goal.getJson().collection===""?"add":"update");
                                    let g = opps?.getUpdater("add");
                                    let IDarr =[];
                                    for(const key in g){
                                        IDarr.push(g[key].getJson()._id);
                                    }
                                    let i =0;
                                    let bool= false
                                    for(i; i<IDarr.length; ){
                                        if(IDarr[i]===goal.getJson()._id){
                                            break;
                                        }
                                        i++
                                    }
                                    
                                    if(g.length!==0){
                                        if(g.length===1){
                                            g=[]
                                        }
                                        else{
                                            g = g.splice(i,1);
                                        }
                                            

                                            opps.cleanPrepare({addgoal:g, [state.goalSwitch==="add"? 'addmaingGoal': 'updatemainGoal']:currentGoal});
                                            
                                            this.setState({goals:go});
                                        }
                                    }

                             }}>Remove</div></div>
                               )}
                               </div>
                    

                    <div style={{display:'flex', flexDirection:"row"}}>
                    {state.popupSwitch==="archive"?(<></>):(<>
                    <button className="btn  btn-block" style={{ background: "#57BA8E", height: "35px", color: "#F0F2EF", marginTop:"1vh", marginBottom:"-1vh",  borderRadius: "16px",  }} 
                    onClick={dispatch.bind(this, {operation:"run", popupSwitch:""})}> Save
                    </button>

                    {goal?.getJson().collection!=="" &&(<button  className="btn  btn-block"  
                    onClick={dispatch.bind(this, {popupSwitch:"", operation:"cleanPrepareRun", object:goal, operate:"del"})}
                    style={{ background: "#F56060", height: "35px", color: "#F0F2EF", width: "80px",  marginTop:"1vh", marginBottom:"-1vh", marginLeft:"20px", display:"flex", flexDirection:"column", justifyContent:"center",  borderRadius: "16px",  alignItems:"center"}}>Delete</button>)}
                    </>)}
                    </div>





                </div>
            </div>

        )
    }
};

export default addGoal;