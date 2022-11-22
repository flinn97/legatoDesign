import React, { Component } from 'react';
import moment from 'moment';

class Chat extends Component {
    constructor(props) {
        //create state
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.state = {
            message: ""
        };
    }
    handleChange = async (event) => {
        let app = this.props.app;
        let state = app.state;

        const { name, value } = event.target
        await this.setState({
            message: value,
        })
        state.currentComponent?.getOperationsFactory().handleChange(event);


    }

    componentDidMount() {
        var element = document.getElementById("scroll");
        element.scrollTop = element.scrollHeight;
        
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let bigcard = this.props.app.state.styles.bigcard;
        let resizecard = this.props.app.state.styles.resizecard;
        let componentList = state.componentList;

        let chatroom = componentList.getComponent("chatroom", state.currentstudent?.getJson()?._id, "owner")
        let list = componentList.getList("post", chatroom?.getJson()?._id, "chatroom")
        let list2 = []
        for (const key in list) {
            if (!list[key]?.getJson()?.read) {
                list[key]?.setJson({ ...list[key]?.getJson(), read: true })
                list2.push(list[key])
            }
        }

        let dispatch = app.dispatch
        dispatch({ operate: "update", operation: "prepareRun", object: list2 })
        let key = "add"
    }
    render() {

        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let bigcard = this.props.app.state.styles.bigcard;
        let resizecard = this.props.app.state.styles.resizecard;
        let componentList = state.componentList;

        let chatroom = componentList.getComponent("chatroom", state.currentstudent?.getJson()?._id, "owner")
        let list = componentList.getList("post", chatroom?.getJson()?._id, "chatroom")


        let dispatch = app.dispatch
        let key = "add"
        return (
            <div
                style={state.myswitch === "dash" ? (bigcard) : (resizecard)} >
                <div style={{
                    color: styles.colors.color6,
                    letterSpacing: styles.fonts.appSpacing,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",

                    fontWeight: styles.fonts.fontweightMain,
                    padding: styles.margins.margin4,

                    background: styles.colors.colorLink
                    //+ "88"
                    ,
                    borderRadius: "23px 23px 0px 0px"
                }}>
                    <div style={{

                        marginLeft: styles.mystudents.studentMargin,
                        color: styles.colors.color6,
                        letterSpacing: styles.fonts.appSpacing,
                        fontWeight: styles.fonts.fontweightMed,

                    }}>Messages</div>

                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    padding: this.props.app.state.styles.margins.margin4
                }}>
                    <div style={{ height: state.iphone? "25vh":"18vh" }}>
                        <div className="scroller" id="scroll">
                            {list.map((post, index) =>
                                <div key={index} style={{ display: "flex", flexDirection: 'row', width: "100%", justifyContent: (state.currentuser?.getJson()?.role === "teacher" && !post.getJson().student) ? "flex-end" : "flex-start", marginTop:"10px" }}>
                                    <div style={{maxWidth:"60%"}}>
                                    {state.currentuser?.getJson()?.role === "teacher" && !post?.getJson()?.student?(
                                    <div style={{background:this.props.app.state.styles.colors.colorLink, borderRadius:"17px", padding:"7px", maxWidth:"", color:styles.colors.color6}}>{post.getJson().content}</div>):(<div style={{background:"#D1D1D1", borderRadius:"7px", padding:"7px", color:"black"}}>{post.getJson().content}</div>)}
                                    
                                    </div>
                                </div>
                            )}
                        </div></div>
                        
                    <div className="form-group" style={{ position: "relative", paddingLeft: "20px", paddingRight: "20px", marginBottom: "8px", marginTop:window.innerHeight<900 &&"-5px" }}>
                        <input style={{ borderRadius: "20px", height: "35px", paddingRight:"65px" }}
                            onClick={dispatch.bind(this, { operate: 'addpost', object: { chatroom: chatroom?.getJson()?._id, owner: state.currentstudent?.getJson()?._id, student: state.currentuser?.getJson()?.role === "teacher" ? false : true } })}
                            type="text"
                            value={this.state.message}
                            className="form-control"
                            id="content"
                            onChange={this.handleChange}
                            name={key + "content"}
                            
                        />
                        <div style={{
                            position: "absolute", top: "0px", right: "0px", marginTop: "4px", marginRight: "25px", background: "#639EFE", borderRadius: "16px", width: "60px",
                            display: 'flex', alignItems: "center", justifyContent: "center", height: "27px", color: styles.colors.color6
                        }} onClick={async () => {
                            if(this.state.message!=="" && this.state.message!==" "){
                                await dispatch({ operation: "run" })
                                await this.setState({message:""})
                            }
                            const delay = ms => new Promise(res => setTimeout(res, ms));
                            await delay(100);
                            var element = document.getElementById("scroll");

                            if (element) {
                                element.scrollTop = element.scrollHeight;
                            }
                        }}>send</div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Chat;