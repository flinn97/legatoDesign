import React, { Component } from "react";

//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();

        this.monday = this.monday.bind(this);
        this.tuesday = this.tuesday.bind(this);
        this.wednesday = this.wednesday.bind(this);      
        this.thursday = this.thursday.bind(this);      
        this.friday = this.friday.bind(this);   
        this.saturday = this.saturday.bind(this);   
        this.sunday = this.sunday.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef;
        this.changeTime = this.changeTime.bind(this);

       
        
        



        this.state = {
            hr: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",],
            mins: [],
            
            clock: this.props.clock,
            
                hour: "01",
                min: "00",
                zone: "am",
            

          

        }

    }
    componentDidMount() {
        let ar =[]
        for (let i = 0; i < 60; i++) {
            if (i < 10) {
                let n = "0" + (i.toString())
                
                ar.push(n)
            }
            else {
                ar.push(i.toString())
            }

        }
        
        this.setState({
            mins: ar
        })
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.props.closedrop();
        }
    }

    async changeTime(time, type) {
        
        
        await this.setState({
            
                [type]: time
            
        })

        let returntime = "";
        let showtime = "";
        if (this.state.zone === "am") {
            returntime += this.state.hour + ":" + this.state.min;
            showtime = returntime + " am";
        }
        else {
            var miliatry = parseInt(this.state.hour) + 12;
            returntime += miliatry.toString() + ":" + this.state.min;
            showtime += this.state.hour + ":" + this.state.min + " pm";
        }
        
        this.props.changeTime(returntime, showtime)
        
    }

    monday() {
        this.props.selectDay("Monday")
    }
    tuesday() {
        this.props.selectDay("Tuesday")
    }
    wednesday() {
        this.props.selectDay("Wednesday")
    }
    thursday() {
        this.props.selectDay("Thursday")
    }
    friday() {
        this.props.selectDay("Friday")
    }
    saturday() {
        this.props.selectDay("Saturday")
    }
    sunday() {
        this.props.selectDay("Sunday")
    }


    render() {
       
        return (
            <div ref={this.wrapperRef} className="dropDown">
                {this.state.clock ? (<div style={{ display: "flex", flexDirection: "row", height: "160px",}}>
                    <div style={{height:"150px", }}>
                        <div className="homeworkScroll ">
                            {this.state.hr.map((hr, index) => <div key={index}>
                                {this.state.hour === hr ? (
                                    <div  onClick={this.changeTime.bind(this, hr, "hour")} className="dropDowndivs centerized" style={{ width: "30px", height: "30px", display: "flex", justifyContent: "center", color:"#F0F2EF", background:"#696eb5", flexDirection: "row" }}>
                                        <p style={{ alignSelf: "center", marginTop: "14px" }}>{hr}</p>
                                    </div>

                                ) : (
                                        <div  onClick={this.changeTime.bind(this, hr, "hour")} className="dropDowndivs centerized" style={{ width: "30px", height: "30px", display: "flex", justifyContent: "center", flexDirection: "row" }}>
                                            <p style={{ alignSelf: "center", marginTop: "14px" }}>{hr}</p>
                                        </div>

                                )}
                                
                                </div>

                            )}</div>
                    </div>
                    <div style={{ height: "150px", }}>
                        <div className="homeworkScroll ">
                            {this.state.mins.map((min, index) =>
                                <div key={index}>
                            {
                                this.state.min === min ? (
                                            <div  className="dropDowndivs centerized" onClick={this.changeTime.bind(this, min, "min")} style={{ width: "30px", height: "30px", color: "#F0F2EF", background: "#696eb5", display: "flex", justifyContent: "center", flexDirection: "row" }} >
                                                <p style={{ alignSelf: "center", marginTop: "14px" }}>{min}</p>
                                            </div>

                                ) : (
                                                <div  className="dropDowndivs centerized" onClick={this.changeTime.bind(this, min, "min")} style={{ width: "30px", height: "30px", display: "flex", justifyContent: "center", flexDirection: "row" }} >
                                                    <p style={{ alignSelf: "center", marginTop: "14px" }}>{min}</p>
                                                </div>

                                )
                            }</div>
                                

                            )}</div>
                    </div>
                    <div >
                        <div style={{ height: "150px", }}>
                        {this.state.zone === "am" ? (
                            
                                <div className="dropDowndivs centerized" onClick={this.changeTime.bind(this, "am", "zone")} style={{ width: "30px", height: "30px", display: "flex", justifyContent: "center", color: "#F0F2EF", background: "#696eb5", flexDirection: "row" }}><p style={{ alignSelf: "center", marginTop: "14px" }}>am</p></div>

                            ) : (
                                    <div className="dropDowndivs centerized" onClick={this.changeTime.bind(this, "am", "zone")} style={{ width: "30px", height: "30px", display: "flex", justifyContent: "center", flexDirection: "row" }}><p style={{ alignSelf: "center", marginTop: "14px" }}>am</p></div>

                                )}
                            {this.state.zone === "pm" ? (

                                <div className="dropDowndivs centerized" onClick={this.changeTime.bind(this, "pm", "zone")} style={{ width: "30px", height: "30px", display: "flex", color: "#F0F2EF", background: "#696eb5", justifyContent: "center", flexDirection: "row" }}><p style={{ alignSelf: "center", marginTop: "14px" }}>pm</p></div>

                            ) : (
                                    <div className="dropDowndivs centerized" onClick={this.changeTime.bind(this, "pm", "zone")} style={{ width: "30px", height: "30px", display: "flex", justifyContent: "center", flexDirection: "row" }}><p style={{ alignSelf: "center", marginTop: "14px" }}>pm</p></div>

                                )}
                        </div>

                    </div>


                </div>) : (
                        <div style={{ position: "relative" }}>
                            <div onClick={this.monday} className="dropDowndivs">
                                Monday
                    </div>
                            <div onClick={this.tuesday} className="dropDowndivs">
                                Tuesday
                    </div>
                            <div onClick={this.wednesday} className="dropDowndivs">
                                Wednesday
                    </div>
                            <div onClick={this.thursday} className="dropDowndivs">
                                Thursday
                    </div>
                            <div onClick={this.friday} className="dropDowndivs">
                                Friday
                    </div>
                            <div onClick={this.saturday} className="dropDowndivs">
                                Saturday
                    </div>
                            <div onClick={this.sunday} className="dropDowndivs">
                                Sunday
                    </div>

                        </div>

                )}
                
                
            </div>

        )
    }
};

export default Dropdown;