import React, { Component } from "react";
import styleService from "../services/styleService";
 
class TimerComponent extends Component {
    constructor(props) {
        super(props);


        this.setWrapperRef = this.setWrapperRef;
        this.state = {
            mCount: 0,
            sCount: 0,
            timer: false,
            m2: "0",
            s2: "0",
        }

    };
 

  render () {
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    const OPTIONS = { prefix: 'seconds elapsed!', delay: 100}
    

    return (
    <div style= {styles.smallcardGreen}> 
      <div style={{
                        
                        display:"flex", 
                        flexDirection:"column",
                        padding: styles.margins.margin4,
                        fontSize: styles.fonts.fontsizeTitle,
                        fontFamily: styles.fonts.appFont,
                        fontWeight: styles.fonts.fontweightMain,
                        justifycontent:"center",
                        width: "100%", 
                        paddingBottom:"0px",
                        marginLeft:styles.mystudents.studentMargin,
                        color: this.props.app.state.styles.colors.color6,
                        letterSpacing: styles.fonts.appSpacing2,  
                       
                       
                     }}> Timer
    </div>
        
        <div style={{
                    justifyContent: "center",
                    textAlign: "center",
                    alignContent: "center",
                    marginTop: this.props.app.state.ipad? "-7px": "",
                    border: styles.borders.borderthin,
                    // marginTop: state.styles.margins.margin4,
                    // marginBottom: -state.styles.margins.margin4,
                    color: styles.colors.colorBackground,
                    fontSize: window.innerHeight<725? "4vh":"6vh",
                    fontWeight: styles.fonts.fontweightMed,
                    background: styles.colors.color1,                  
                    outline: "none",
                    float:"left",
                    letterSpacing: "2px",
                    
        }}> 
            {this.state.m2}{this.state.mCount}:
            
            {this.state.s2}{this.state.sCount}
        
        </div>
        <div style ={{
            justifyContent: "space-around",
            textAlign: "center",
            alignContent: "center",
            marginTop: "1vh", 
            fontSize: this.props.app.state.styles.fonts.fontsize1,
            fontWeight: this.props.app.state.styles.fonts.fontweightMed,
            color: this.props.app.state.styles.colors.color6 +"aa",
            justifyContent: "center",
            alignContent: "center",
            letterSpacing: styles.fonts.appSpacing,

        }}>Minutes</div>


        <div style={{
            display: "flex",
            justifycontent:"center",
            textAlign: "center",
            alignContent: "center",
            
            width: "100%",
            
            alignItems: "center",
            flexDirection:"column",
            marginTop: this.props.app.state.styles.margins.margin4,
            marginTop:"2vh",
            width: "100%",    
        }}>
<div style= {{
    display: "flex",
    justifycontent:"center",
    flexDirection:"row",
    marginBottom: "12px"
}}>
        <button style={
            {...styles.buttons.buttonRound,
                color: styles.colors.color1, marginRight:"2px"
            }
        } 
                    
                    onClick={ async ()=>{
                        
                        await this.setState({timer:true});

                        while(this.state.timer){
                           
                            if(this.state.timer){
                                let sCount = this.state.sCount+1;
                                let mCount = this.state.mCount;
                                let s2 = "0";
                                let m2 = "0";
                                
                                if(sCount===60){
                                    sCount=1
                                    mCount++;
                                }

                                if(sCount>=10){
                                    s2=""
                                } else {
                                    s2="0"
                                }

                                if(mCount>=10){
                                    m2=""
                                } else {
                                    m2="0"
                                }


                                this.setState({
                                    mCount:mCount,
                                    sCount:sCount,
                                    s2: s2,
                                    m2: m2
                                })
                            }
                            const delay = ms => new Promise(res => setTimeout(res, ms));
                            await delay(1000);
                           
                        }
                        


                    }}>Start
                    </button>

                    <button 
                        style={{...styles.buttons.buttonRound,
                            color: styles.colors.color1, marginLeft:"2px"}}
                    onClick={()=>{
                        this.setState({timer:false});
                    }}>Stop
                    </button>
                    </div>

                    <button 
                        style={{...styles.buttons.buttonRound,
                            color: styles.colors.color1,}}
                    onClick={()=>{
                        this.setState({timer:false, sCount:0, mCount:0});
                    }}>Reset
                    </button>
                    </div>   
      
      </div>
    )
  }
}
 
export default TimerComponent