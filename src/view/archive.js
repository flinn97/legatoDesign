import React, { Component } from 'react';
import leaf from "./leaf.png"

class Archive extends Component {
    constructor(props) {
        //create state
        super(props);
       this.state = {
        };
    }
    /**
     * add goals.
     * @param {*} main 
     * @param {*} maingoal 
     */

    render() {


        return (
         <div>
                    {this.props.app.state.currentstudent?.archive.map((main, index) =>
                        <div key={index} >
                            <div>
                                <div style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", }}>
                                    <div style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                        <h4 style={{ marginBottom: "10px" }} className="huv rowss" ><span onClick={this.props.app.dispatch.bind(this, {goals:true, showgoal:true, main: true, maingoal:main,  })}>{main.title} </span></h4>
                                    </div>
                                    <div>
                                        <div onClick={this.props.app.AddUpdateDeleteArchiveGoal.bind(this, main, true, "delarchive")} >delete</div>
                                    </div>
                                </div>
                            </div>
                            {this.props.app.state.currentstudent.goals.map((goal, index) =>
                            <>{goal.main.toString()===main._id.toString()?(
                                <div key={index} style={{ marginLeft: "30px" }} >
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <span  onClick={this.props.app.dispatch.bind(this, {goals:true, main: false, maingoal: main, goal:goal, showgoal:true})}>{goal.title}</span>
                                    </div>
                                    <div style={{ width: "25%", flexDirection: "row", justifyContent: "flex-end", display: "flex", }}>
                                    </div>
                                </div>):(<></>)}</>
                            )}
                        </div>)}
              
            </div>
        );
    }
}

export default Archive;