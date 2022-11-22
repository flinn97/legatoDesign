import React, { Component } from 'react';
import authService from '../services/auth.service';

class Logout extends Component {
    constructor(props) {
        //create state
        super(props);
        this.logout=this.logout.bind(this)
    }
    async logout(){
        await authService.logout();
        window.location.reload();
    }

    render() {
       

        return (
            <div style={{ 

                        display:"flex", 
                        flexDirection:"column", 
                        justifyContent:"left",
                        textAlign: "flex-end",
                        marginTop: "12px",
                        font: this.props.app.state.styles.fonts.fontEdit,
                        fontWeight: this.props.app.state.styles.fonts.fontweightMed,
                        fontFamily: this.props.app.state.styles.fonts.appTitle,
                        fontSize: this.props.app.state.styles.fonts.fontsize5,
                        fontWeight: this.props.app.state.styles.fonts.fontweightMain,

                         }}>
                {/* <div>Settings</div> */}
                <div style={{

                        cursor:"pointer",
                        color: this.props.app.state.styles.colors.colorWarning

                    }} onClick={this.logout}>Logout</div>
            </div> 

               
        );
    }
}

export default Logout;