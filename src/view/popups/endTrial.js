import React, { Component } from "react";
import authService from "../../services/auth.service";
//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
class EndTrial extends Component {
    constructor(props) {
        super(props);


        this.state = {
            marginTop: "200px"
            
        }

    }


    render() {
       let app = this.props.app
        return (
            <div className="popup-box to-front">
                <div className="boxdel" ref={this.wrapperRef} style={{marginTop: this.state.marginTop, width:"50vw", height:"40vh"}}>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <h1 style={{marginTop:"10px"}}>Free Trial Ended</h1>
                        <p style={{ margin: "40px" }}>Your 30 day free trial has ended. We hope you loved Legato! If you want to continue using Legato click on "continue using Legato." The price to continue using this app from this point is $1 per student per month. If you have more than 25 students we will not charge over $25 per month. Thank you for trying Legato <a href="https://www.teachlegato.com/about">let us know</a> how we can improve.  </p>
                        <div className="form-group forfiles1" style={{ marginTop: "20px", justifyContent:"space-between", width:"350px" }}>
                            <div >
                                <button style={{ width: "200px", backgroundColor: "#7A9B76", color: "#F0F2EF" }} className="btn  " value="submit" 
                                onClick={async ()=>{
                                    debugger
                                    await app.state.currentuser.setJson({...app.state.currentuser.getJson(), paidCustomer:true});
                                    await app.dispatch({operate:"update", operation:"cleanPrepareRun", object:app.state.currentuser});
                                    window.open("https://buy.stripe.com/eVa6pj0U21L5cRGdQQ", "_blank");
                                    this.props.handleClose();
                                    }}>Continue Using Legato</button>

                            </div>
                            <div>
                                <button style={{ width: "100px", backgroundColor: "#6d1404", color: "#F0F2EF" }}  className="btn   " value="submit" onClick={async ()=>{
                                            await authService.logout();
                                            window.location.reload();
                                        
                                    }}>Logout</button>
                                
                            </div>
                            
                        </div>

                        
                    </div>
                </div>
            </div>

        )
    }
};

export default EndTrial;