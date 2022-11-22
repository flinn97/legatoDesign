import React, { Component } from "react";
import "./progress_circle.css";
//not much here but functionality will be added for the goals.
export default class Progressbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div className="centerized" style={{ width: "100%" }}>
                <div style={{ width: "200px" }}>
                    <div>
                        <div style={{ marginTop: "2.8vh" }}>
                            <div style={{ marginLeft: "5px", marginBottom: "0px", justifyContent: "center", flexDirection: "row", display: "flex", width: "200px" }} ><div><b>{this.props.showAmount} {this.props.text}</b></div><div></div></div>
                            {(100 / parseInt(this.props.goal))*parseInt(this.props.amount)===0? (<div style={{ width: "200px", height:"18px" }} class="progress-bar1"></div>):(
                                <div style={{ width: "200px", height:"18px" }} class="progress-bar ">
                                    <div style={{ width: (100 / parseInt(this.props.goal))*parseInt(this.props.amount)===0? "0": ((100 / parseInt(this.props.goal))*parseInt(this.props.amount)).toString()+"%", height:"18px" }}></div>
                                </div>)}
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}
