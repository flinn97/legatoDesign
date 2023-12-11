import React, { Component } from 'react';
import "./checkbox.css"

class Checkedd3 extends Component {
    constructor(props) {
        super(props);
        this.markcheckbox = this.markcheckbox.bind(this);
        this.state = {
            checked:this.props.homework?.getJson().done,
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
        
        // let sp = this.props.app.state.componentList.getComponent("starpoints", id);
        
        // let type = this.props.goal.getJson().mainID? "goal":"mainGoal";
        //         if(this.state.checked){
        //     sp.calcSP(type);
        // }
        // else{
        //     sp.calcDownSP(type);
        // }
        
        await this.props.homework.checked(this.state.checked);

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

export default Checkedd3;