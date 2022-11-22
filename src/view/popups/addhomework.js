import React, { Component } from "react";
import Checkedd from "../components/checkbox";
import Times from "./times";
import studentService from "../../services/studentService.js"
//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
class Addhomework extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.edit = this.edit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.setWrapperRef = this.setWrapperRef;
        this.state = {
            edit: this.props.app.state.popupSwitch==="updateHomework"? true: false,
            addMeta:false,
            title: this.props.app.state.currentComponent? this.props.app.state.currentComponent.getJson().title:"",
            description:  this.props.app.state.currentComponent? this.props.app.state.currentComponent.getJson().description:"",
            hwlink:  this.props.app.state.currentComponent? this.props.app.state.currentComponent.getJson().hwlink:"",
            update: false,
        }

    };

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
        this.setState({title:homework?.getJson()?.title, description:homework?.getJson()?.description,hwlink:homework?.getJson()?.hwlink, })

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
        this.setState({title:homework?.getJson()?.title, description:homework?.getJson()?.description,hwlink:homework?.getJson()?.hwlink, })

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
                <div ref={this.wrapperRef}  className="diapicboxa" style={{ zIndex: "1010", height:"50vh" }}>
                    
                <div style={ ///EXIT BUTTON
                                styles.buttons.closeicon
                            } onClick={this.props.handleClose}>x</div>
                     
                    <div className="form-group">
                        <label htmlFor="lastName"><b>Assignment Title:</b></label>
                        <input type="text" className="form-control" id="homework" style={{width:"95%"}} value={this.state.title} onChange={this.handleChange} name={"title"} placeholder="title the practice assignment..."/>
                    </div>
                        <div className="form-group">
                            <label>Notes:</label>
                                <textarea style={{width:"95%"}} type="text" className="form-control" value={this.state.description}  rows="3" id="hwdescription" onChange={this.handleChange} name={"description"} placeholder="describe the practice assignment..."></textarea>
                        </div>
                       
                        <div className="form-group">
                        <label htmlFor="lastName"><b>Meta:</b></label>
                        <input type="text" className="form-control" id="homework" style={{width:"95%"}} value={this.state.hwlink}  onChange={this.handleChange} name={"hwlink"} placeholder="Add a link for this practice assignment..."/>
                    </div> 

                   
                        <div style={{ marginTop: "20px", flexDirection:"row", display:'flex', alignContent:"center", justifyContent:"center"  }}>
                        <button  className="btn  btn-block"  
                        onClick={dispatch.bind(this, {popupSwitch:"", operation:"run"})}
                        style={{ background: styles.colors.color1, height: "3vh", color: "white", width: "20vw", display:"flex", flexDirection:"column", borderRadius: "16px", justifyContent:"center", alignItems:"center"}}>{homework?.getJson().collection!==""?(<>Save</>):(<>+ Homework</>)}</button>
                    
                    {homework?.getJson().collection!=="" &&(<button  className="btn  btn-block"  
                        onClick={dispatch.bind(this, {popupSwitch:"", operation:"cleanPrepareRun", object:homework, operate:"del"})}
                        style={{ background: "#F56060", height: "30px", color: "#F0F2EF", width: "200px", display:"flex", flexDirection:"column", justifyContent:"center", borderRadius: "16px",  alignItems:"center"}}>Delete</button>)}
                    </div>
                    

                </div>
                
            </div>

            </div>)
    }
};
export default Addhomework;
//                        onClick={this.props.app.dispatch.bind(this, {objkey:"homeworks", obj:this.props.app.state.showhomework? {...this.props.app.homework}: undefined, myswitch:this.props.app.state.showhomework?"update": "add"})} 
