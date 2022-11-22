import React, { Component } from "react";

class Slider extends Component {

     constructor(props) {
         //create state
         super(props);
         this.state = {
            
         };
     }

    render() {
        let app = this.props.app;
        let bpm = this.props.bpm.toString();
        let state = app.state;
        let styles= state.styles;
        let colors= styles.colors;
        
        return (
            <div>
                
                <div  >
                    <div  style={{
                            display: "flex", 
                            flexDirection: "column",
                            justifyContent: "center",
                            textAlign: "center",
                            textAlign: "center",
                            justifycontent:"center",
                            alignItems:"center",
                            border: styles.borders.borderthin,
                            
                                outline: "none",
                                     
                            }}>
                        <div

                            style={{ 
                                width: "60.5%",
                                height: "20%",
                                
                                border: styles.borders.borderthin,
                                marginBottom: -this.props.app.state.styles.margins.margin4,

                                color: colors.colorBackground,
                                fontSize: this.props.app.state.ipad?"40px":window.innerHeight<725? "40px":"54px",
                                fontWeight: styles.fonts.fontweightMed,
                                justifyContent: "center",
                                textAlign: "center",
                                alignContent: "center",
                                background: styles.colors.colorLink,
                                display: "inline-block",
                                outline: "none",
                                float:"left",
                                
                                }}
                        >{bpm}</div><div style={{ 
                            marginTop: this.props.app.state.ipad?"0px":"1vh", 
                            fontSize: this.props.app.state.styles.fonts.fontsize1,
                            fontWeight: this.props.app.state.styles.fonts.fontweightMed,
                            color: this.props.app.state.styles.colors.color6 +"aa",
                            justifyContent: "center",
                            alignContent: "center",
                            letterSpacing: styles.fonts.appSpacing,
                            }}>BPM</div>
                    </div>
                    
                    </div>
                <div style=
                {{
                    //color: this.props.app.state.styles.colors.color5,
                    justifyContent: "center",
                    //textAlign: "center",
                    //alignContent: "center",
                }}>
                <input type="range" 
                min="60" max="240" step= "2"
               
                
                value={this.props.app.bpm} onChange={this.props.handleChange} style={{
                    WebkitAppearance: "none",
                    width:"79%", 
                    height: "5px",
                    appearance: "none",
                    background:  'white',
                    borderRadius: "5px",
                    cursor: "pointer",
    
    }}/>
                    </div>
            </div>
        );
    }
}


export default Slider;