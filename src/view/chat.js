import React, { Component } from 'react';
import moment from 'moment';


class Chat extends Component {
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
       let bigcardChat= this.props.app.state.styles.bigcardChat;
       let resizecard= this.props.app.state.styles.resizecard;
       let componentList = state.componentList;
        
       let list = componentList.getList("post", true, "student")
        
       let dispatch= app.dispatch
       let key ="add"

        return (
            <div
            style= {state.myswitch==="dash" ? ( {...bigcardChat, } ):( resizecard )} >
            <div style= {{color: styles.colors.color6,
                letterSpacing: styles.fonts.appSpacing,    
                display:"flex", 
                flexDirection:"row",
                justifyContent:"space-between",
                
                
                fontWeight: styles.fonts.fontweightMain,
                padding: styles.margins.margin4,

                background: styles.colors.colorLink 
                //+ "88"
                ,
                borderRadius: "23px 23px 0px 0px"
            }}>
                <div style={{
                
                marginLeft:styles.mystudents.studentMargin,
                color: styles.colors.color6,
                letterSpacing: styles.fonts.appSpacing, 
                fontWeight: styles.fonts.fontweightMed,
                        
            }}>Messages</div>
            
            </div>
            <div style={{
                    display:"flex", 
                    flexDirection:"column",
                    padding: this.props.app.state.styles.margins.margin4
                }}>
                 <div style={{height:state.iphone?"42vh": "24.5vh"}}>
                        <div className="scroller" style={{height:"95%"}}>
                {list?.reverse().map((post, index)=>
                <div key ={index} style={{
                    display:"flex", 
                    flexDirection:'row', 
                    width:"100%", 
                    justifyContent:"space-between", 
                    borderBottom:"1px solid #e4e7ed", 
                    marginTop:"6px",
                    marginBottom:"1px"}} onClick={()=>{
                        let app=this.props.app;
                        let state= app.state;
                        let componentList = state.componentList;
                        let chatroom  = componentList.getComponent("chatroom", post.getJson().chatroom, "_id");
                        let list = this.props.app.state.componentList.getList("post", chatroom.getJson()._id, "chatroom");
                        let list2=[]
                        for(const key in list){
                           if(!list[key].getJson().read){
                               list[key].setJson({...list[key].getJson(), read:true})
                               list2.push(list[key])
                           }
                        }
                        if(list2.length>0){
                            dispatch({operate:"update", operation:"prepareRun", object: list2})
                        }
                        dispatch({currentChatroom: chatroom, myswitch:"chat" })
                }}>
                    <div style={{display:"flex", flexDirection:'row', marginBottom:"8px",
                                verticalAlign: "center", 
                                alignContent: "center"
                                }}>
                    <div >
                        <img src={componentList.getComponent("student", post?.getJson().owner, "_id")?.getJson()?.picURL} style={{
                            width:"2.5vw", 
                            height:"2.5vw", 
                            borderRadius:"50%",
                            verticalAlign: "center", 
                                alignContent: "center",
                            marginRight: styles.margins.margin4,
                            }}/>
                    
                        </div>
                        <div style={{display:"flex", flexDirection:'column',}}>
                            <div style={{color: post?.getJson()?.read? "gray": "black"}}>
                        {(componentList.getComponent("student", post?.getJson()?.owner, "_id"))?.getJson()?.firstName} {(componentList.getComponent("student", post?.getJson()?.owner, "_id"))?.getJson()?.lastName}
                    </div>
                    <div style={{color: post.getJson().read? "gray": "black", fontSize:"12px"}}>{post.getJson().content.length<80?(<>{post.getJson().content}</>):(<>{post.getJson().content.slice(0,80)}...</>)}</div>
                    </div>
                    </div>
                    <div style={{
                        display:"flex", 
                        flexDirection:'column', 
                        alignItems:"center",
                        marginBottom:"1px" }} > 
                    <div>{post?.getJson().dateOfPost.split("  ")[1]===moment().format('lll').split(" ")[1]?(<>
                    {post?.getJson()?.dateOfPost.split(" ")[3]+ post?.getJson()?.dateOfPost.split(" ")[4]}</>):
                    (<>{post?.getJson()?.dateOfPost.split(" ")[0]+" "+ post?.getJson()?.dateOfPost.split(" ")[1].slice(0, post?.getJson()?.dateOfPost.split(" ")[1].length-1)}</>)}
                    </div> {!post?.getJson()?.read&&(<div style={{  
                        width:"12px", 
                        height:"12px", 
                        borderRadius:"50%", 
                        backgroundColor:"#639EFE", 
                        marginTop:"9px",
                        marginBottom:"1px"}}></div>)}</div>
                    </div>
                )}
                </div></div>
            </div>
            </div>
               
        );
    }
}

export default Chat;