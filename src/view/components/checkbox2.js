import React, { Component } from 'react';
import "./checkbox.css"
import authService from '../../services/auth.service';
import studentService from '../../services/studentService';
import starpointService from '../../services/starpointService';
class Checkedd2 extends Component {
    constructor(props) {
        super(props);
        this.markcheckbox = this.markcheckbox.bind(this);
        this.state = {
            checked:this.props.goal?.getJson().complete,
        }
    }
    /**
     * 
     * @param {*} e 
     * @param {*} day 
     * check the box send to backend.
     */
    async markcheckbox() {
        //
        await this.setState({checked: !this.state.checked})
        let id = this.props.app.state.currentstudent.getJson()._id
        
        let sp = this.props.app.state.componentList.getComponent("starpoints", id);
        
        let type = this.props.goal.getJson().mainID? "goal":"mainGoal";
                if(this.state.checked){
            sp.calcSP(type);
        }
        else{
            sp.calcDownSP(type);
        }
        
        this.props.goal.checked(starpointService.calcstarpoints, this.props.app.state.currentstudent);
    }

    render() {
        
        return (

            <div style={{display:"flex", flexDirection:"row", }}>
                <input type="checkbox"  checked={this.state.checked }/>
                <label onClick={this.markcheckbox} className="change-label2" style={{cursor:"pointer"}}>

                <div className="tickFix1"></div>
                        </label>  
  
           </div>
            )
}
}

export default Checkedd2;