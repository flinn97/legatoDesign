import React, { Component } from "react";
import "./progress_circle.css";
//not much here but functionality will be added for the goals.
export default class Progress_circle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stylel: "rotate(180deg)",
            styler: "rotate(180deg)",
            completedGoals: 0,
            incompletGoals: 0,
            totalGoals: 0,
            percent: "",
        };
    }
    componentDidUpdate(props, state){
        if (this.props.update){
            this.componentDidMount();
            this.props.dispatch({updateCircle:false})
        }
    }
    async componentDidMount() {
        let goalList = this.props.goals;
        let mainList = this.props.maingoals;

        let amount = goalList.length+ mainList.length;
        let complete=0;
        
        for(let i=0; i<goalList?.length; i++){
            if(goalList[i].getJson().complete){
                complete++;
            }
        }
        for(let i=0; i<mainList?.length; i++){
            if(mainList[i].getJson().complete){
                complete++;
            }
        }
        let percentage = (complete / amount) * 100;
        let calculate = (complete / amount) *360;
        let overcalc =0;
        if (calculate > 180) {
            overcalc = calculate - 180;
            calculate = 180;

        } 
        const stylel = "rotate(" + calculate.toString() + "deg)";
        const styler = "rotate(" + overcalc.toString() + "deg)";
        let percent = percentage.toString();
        await this.setState({
            percent: (goalList.length===0 && mainList.length===0) ? "0":percent,
            stylel: goalList.length===0 && mainList.length===0 ?"rotate(" + "0" + "deg)":stylel,
            styler: goalList.length===0 && mainList.length===0 ?"rotate(" + "0" + "deg)":styler,

        })
    }



    render() {
        return (
            
            <div style={{}}>
                {/* {this.props.app.profile ? (
                    <div>
                        {this.props.app.userProfile?(
                        
                        <div  >
                            {this.state.percent==="0"?(<div>
                                <div className="circlesI">
                            <div className="inner">
                                <img
                                    src={this.props.app.pic}
                                    alt="profile-img"
                                    className="profile-img-carda  cropped1 "

                                />
                            </div>
                           
                                

                            
                           
                        
                            <div className="circleI">
                            <div className="bar left">
                                <div className="progress" style={{ transform: this.state.stylel }}></div>
                            </div>
                            <div className="bar right">
                                <div className="progress" style={{ transform: this.state.styler }}></div>
                            </div>
                        </div>
                        
                        
                    </div>




                            </div>):(<div>

                                <div className="circles5">
                            <div className="inner">
                                <img
                                    src={this.props.app.pic}
                                    alt="profile-img"
                                    className="profile-img-carda  cropped1 "

                                />
                            </div>
                           
                                

                            
                           
                        
                            <div className="circle5">
                            <div className="bar left">
                                <div className="progress" style={{ transform: this.state.stylel }}></div>
                            </div>
                            <div className="bar right">
                                <div className="progress" style={{ transform: this.state.styler }}></div>
                            </div>
                        </div>
                        
                        
                    </div>
                            </div>)}
                            
                        


                        </div>):(<div>

                            {this.state.percent==="0"?(<div className="circlesIa">
                            <div className="inner">
                                <img
                                    src={this.props.app.pic}
                                    alt="profile-img"
                                    className="profile-img-carda  cropped1 "

                                />
                            </div>
                           
                                

                            
                           
                        
                            <div className="circleIa">
                            <div className="bar left">
                                <div className="progress" style={{ transform: this.state.stylel }}></div>
                            </div>
                            <div className="bar right">
                                <div className="progress" style={{ transform: this.state.styler }}></div>
                            </div>
                        </div>
                        
                        
                    </div>):(<div className="circles4">
                            <div className="inner">
                                <img
                                    src={this.props.app.pic}
                                    alt="profile-img"
                                    className="profile-img-carda  cropped1 "

                                />
                            </div>
                           
                                

                            
                           
                        
                            <div className="circle4">
                            <div className="bar left">
                                <div className="progress" style={{ transform: this.state.stylel }}></div>
                            </div>
                            <div className="bar right">
                                <div className="progress" style={{ transform: this.state.styler }}></div>
                            </div>
                        </div>
                        
                        
                    </div>)}
                            
                        <div className="number2" style={{marginTop:"25px"}}>{this.state.percent}% Towards Goal</div>
                            
                        </div>)}
                        
                    </div>

                ) : ( */}
                <div>
                    {this.state.percent==="0"?(

                        <div className="circlesI3 ">
                            <div className="inner "></div><div className=" innera"></div>
                    <div className="number">{Math.floor(parseInt(this.state.percent)).toString()}%</div>
                            <div className="circleI3">
                                <div className="bar left">
                                    <div className="progress" style={{ transform: this.state.stylel }}></div>
                                </div>
                                <div className="bar right">
                                    <div className="progress" style={{ transform: this.state.styler }}></div>
                                </div>
                            </div>
                        </div>
                    ):(

                        <div className="circles3 ">
                            <div className="inner "></div><div className=" innera"></div>
                    <div className="number">{Math.floor(parseInt(this.state.percent)).toString()}%</div>
                            <div className="circle3">
                                <div className="bar left">
                                    <div className="progress" style={{ transform: this.state.stylel }}></div>
                                </div>
                                <div className="bar right">
                                    <div className="progress" style={{ transform: this.state.styler }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                        

                    </div>
                     {/* )} */}
            
                
            </div>
        );

    }
}
/*
 
 */