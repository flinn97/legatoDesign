import React, { Component } from "react";
import Slider from './slider.js';


class Metro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bpm: 100,
            playing: false,
            count: 0,
            tooSmall: false,
            marginTop: "200px",
            margint: "",
            screensize: "",
            maxHeight:"700px",
            splashscreen:true,

        }
        this.click1 = new Audio("https://daveceddia.com/freebies/react-metronome/click1.wav");
        this.click2 = new Audio("https://daveceddia.com/freebies/react-metronome/click1.wav");
        this.handleBPM = this.handleBPM.bind(this);
        this.updateInterval = this.updateInterval.bind(this);
        this.startStop = this.startStop.bind(this);
        this.playClick = this.playClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.Splashscreen = this.Splashscreen.bind(this);

        
    }
    Splashscreen(){
        this.setState({splashscreen:false})
    }
    updateWindowDimensions() {
        this.setState({screensize: window.innerWidth})
        if(parseInt(window.innerWidth) <= 800)
        this.setState({ 
            tooSmall: true,
            marginTop: "20px",
        margint: "00px", 
        maxHeight:"400px",
        margint: "50px",
    });
     }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions)
    } 
    componentDidMount() {
        window.addEventListener("resize", this.updateWindowDimensions());
    }


    updateInterval() {
        const bmpSpeed = 60 * 1000 / this.state.bpm;
        this.timer = setInterval(this.playClick, bmpSpeed);
    }

    handleBPM(event) {
        const bpm = event.target.value;
        if (this.state.playing) {
            clearInterval(this.timer);
            this.updateInterval();
            this.setState({
                count: 0,
                bpm
            });
        } else {
            this.setState({
                bpm
            });
        };
    }
    handleChange = (event) => {
        const { name, value } = event.target


        this.setState({
            [name]: value,
        })

        
        


    }

    playClick() {
        if (this.state.count === 0) this.click2.play();
        else this.click1.play();
        this.setState({
            count: this.state.count + 1
        });
    }

    startStop() {
        if (this.state.playing) {
            clearInterval(this.timer);
            this.setState({
                playing: false
            });
        } else {
            this.updateInterval();
            this.setState({
                count: 0,
                playing: true
            }, this.playClick)
        }
    }

    render() {
        let app=this.props.app;
        let state= app.state;
        let styles=state.styles;
        let dispatch=app.dispatch;
        let factory=state.factory;
        
        return (
                

            <div style={styles.smallcard}>
                <div>
                <div style={{
                        display:"flex", 
                        flexDirection:"column",
                        padding: styles.margins.margin4,
                        paddingBottom:"",
                        fontSize: styles.fonts.fontsizeTitle,
                        fontFamily: styles.fonts.appFont,
                        fontWeight: styles.fonts.fontweightMain,
                        justifycontent:"center",
                        width: "100%", 
                        
                        marginLeft:styles.mystudents.studentMargin,
                        color: this.props.app.state.styles.colors.color6,
                        letterSpacing: styles.fonts.appSpacing2,  
                       
                       
                     }}>Metronome 
                     </div>
                     <div style={{justifycontent:"center",
                                    textAlign: "center",
                                  justifycontent:"center",
                                     alignItems:"center",
                                     width: "100%",
                                     fontWeight: styles.fonts.fontweightMain,
                                    }}>           
                        <div style={{
                            marginTop:window.innerHeight<800? "0px": this.props.app.state.styles.margins.margin4,
                            
                            justifycontent:"center",
                            width:"100%",
                            textAlign: "center",
                            background: "",
                            

                        }}><Slider app={this.props.app} bpm={this.state.bpm} handleChange={this.handleBPM} handleChanges={this.handleChange} tooSmall={this.state.screensize}/>
                        <div style= {{
                                display: "flex",
                                justifycontent:"center",
                                flexDirection:"column",
                                marginTop: this.props.app.state.styles.margins.margin4,
                                
                                textAlign: "center",
                                alignItems:"center",
                                width: "100%",    
                        }}>
                        <button style={
                                styles.buttons.buttonRound
                            } onClick={this.startStop} >
                {this.state.playing ? "Stop" : "Start"}
            </button></div></div>
            </div></div>
            </div>

        );
    }
}
export default Metro;
