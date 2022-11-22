import React, { Component } from 'react';

class Stats extends Component {
    constructor(props) {
        //create state
        super(props);
        this.state = {
            
        };
    }
    

    render() {
        let app=this.props.app;
        let state= app.state;
        let styles=state.styles;
        let dispatch=app.dispatch;
        let factory=state.factory;
        let comp = this.props.app.state.componentList;
       

        return (
            <div style={ 
                this.props.app.state.styles.smallcard}>
            <div style={{
                display:"flex", 
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems: "center",
                
                fontWeight: styles.fonts.fontweightMed,
                padding: styles.margins.margin4,

                background: styles.colors.colorLink 
                //+ "88"
                ,
                borderRadius: "23px 23px 0px 0px",
                fontSize: styles.fonts.fontsizeTitle,
                fontFamily: styles.fonts.appFont,
                fontWeight: styles.fonts.fontweightMed
            }}>
                <div
                    style={{
                        marginLeft:styles.mystudents.studentMargin,
                        color: styles.colors.color6,
                        letterSpacing: styles.fonts.appSpacing,       
                        alignItems: "center",  
                    }}
                    >Stats</div></div>
            <div style={{display:"flex", flexDirection:"column"}}>
            </div>
            </div>

               
        );
    }
}

export default Stats;