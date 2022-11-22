import React, { Component } from 'react';
import ProfilePic from './profilepic';
import Menu from './menu.js';
import Logout from './logout.js';
import logo from '../assets/logo.png';
import menu from '../assets/menu.png';
class Sidemenu extends Component {
    constructor(props) {
        //create state
        super(props);
        this.state = {
            menu:false,
        };
    }
    
    

    render() {
        let app = this.props.app;
        let state = app.state;
        let styles =state.styles;
        let dispatch = app.dispatch;
        let list = state.componentList;



        let students = list.getList("student");
        let opps = list.getOperationsFactory();
        
        return (
            <div style = {{
                 
                    display:"flex", 
                    flexDirection:"column", 
                    alignItems:"center",
                    textAlign: "center",
                    flex: .19,
                    border: styles.borders.borderthin,
                    width:styles.side.sideWidth, 
                    height:"100%", 
                    background:styles.colors.color6,
                    fontFamily: styles.fonts.appFont,
                    
                    color: styles.colors.appWhite,
                   
                    boxShadow:styles.borders.dropShadow,
                    
                    
                    
                    
                }}>
                <div style={{
                    
                    fontFamily: styles.fonts.appTitle,
                    fontSize: styles.fonts.fontsizeAppName,
                    fontWeight:styles.fonts.fontweightMed,
                    width:styles.side.sideWidth, 
                    
                    color: styles.colors.color4,
                    marginTop:"7vh",
                    marginBottom:"13vh",

                    border: styles.borders.borderthin,


                    
                    }}><img src = {logo} /></div>
                    
                    <Menu app={this.props.app}/>
                    
                    {state.ipad ?(
                    <div><img src = {menu} style={{width:"20px", height:"20px"}} onClick={()=>{this.setState({menu:!this.state.menu})}}/>
                    {this.state.menu &&( <div style={{position:"absolute",background:"white", padding:"10px", borderRadius:"7px", boxShadow:"2px 3px 6px #D1D1D1" }}><ProfilePic app={this.props.app}/></div>)}
                        </div>):(
                    <ProfilePic app={this.props.app}/>
                    )}
                    <Logout app={this.props.app}/>
                </div>
               
        );
    }
}

export default Sidemenu;