import React, { Component } from "react";
import styleService from "../services/styleService";
 
class SelectTime extends Component {
    constructor(props) {
        super(props);
        this.handleChange=this.handleChange.bind(this)

        this.setWrapperRef = this.setWrapperRef;
        this.state = {
            hour: this.props.hour? this.props.hour: "12",
            min: this.props.min? this.props.min:"00",
            ampm: this.props.ampm? this.props.ampm: 'am'
        }

    };
    async handleChange(e){
        let {name ,value} = e.target;
        await this.setState({
            [name]:value
            
        })
        this.props.handleChange(this.state);
        
    }
 

  render () {
    
    

    return (
    <div style={{display:"flex", flexDirection:"row", }}> 
    <input 
    
     type="text"
     style={{width:"40px", height:"40px", padding:"0px", paddingLeft:"5px",marginRight:"5px", fontFamily:"'Roboto', sans-serif"}}
     value={this.state.hour}
     className="form-control"
     id="content"
     onChange={this.handleChange}
     name="hour"
    />
    <div style={{fontSize:"30px", marginTop:"-5px"}}>:</div>
    <input  type="text"
     style={{width:"40px", height:"40px", padding:"0px", paddingLeft:"5px",marginLeft:"5px",  marginRight:"5px", fontFamily:"'Roboto', sans-serif"}}
     value={this.state.min}
     className="form-control"
     id="content"
     onChange={this.handleChange}
     name="min"/>
     <div style={{display:'flex', cursor:'pointer', flexDirection:"column",  border:"1px solid gray", borderRadius:"5px", width:"30px", alignItems:"center", fontFamily:"'Roboto', sans-serif", height:"39px"}}>
      <div style={{background:this.state.ampm==='am'?"#6C86F4":"white", color: this.state.ampm==='am'?"white":"black", fontSize:"12px", borderBottom:"1px solid gray", fontFamily:"'Roboto', sans-serif", width:"100%", borderRadius:"5px 5px 0px 0px", display:'flex', alignItems:'center', justifyContent:'center'}} 
      onClick={async ()=>{await this.setState({ampm:'am'});
      this.props.handleChange(this.state);}}>am</div>
      <div style={{background:this.state.ampm==='pm'?"#6C86F4":"white",color: this.state.ampm==='pm'?"white":"black", display:'flex', alignItems:'center', fontSize:"12px", fontFamily:"'Roboto', sans-serif", width:"100%", borderRadius:"0px 0px 5px 5px", justifyContent:'center'}} 
      onClick={async()=>{await this.setState({ampm:'pm'});
      this.props.handleChange(this.state);}}>pm</div>
     </div>
      
      
      </div>
    )
  }
}
 
export default SelectTime