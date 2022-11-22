import React, { Component } from 'react';

class Newnote extends Component {
    constructor(props) {
        //create state
        super(props);
        this.handleChange=this.handleChange.bind();
        this.state = {
            rows: "1",
            note: this.props.app.state.currentComponent?.getJson()?.description,
            update:false
        };
    }

    async componentDidUpdate(){
        if(this.props.app.state.currentComponent!==undefined&&!this.state.update&&this.props.edit===true){
            await this.setState({update:true,
            note: this.props.app.state.currentComponent?.getJson()?.description
        })
        }
    }
    
    handleChange = async (event) => {

        const { name, value } = event.target
        await this.setState({
            [name]: value,
        })

    }
    
    render() {
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let note= state.currentComponent;
        let opps = note?.getOperationsFactory();
        let dispatch= app.dispatch;
        let currentstudent = state.currentstudent;
        let key = note?.getJson().collection !==""? "update": "add"
        return (
            <div style={{
                background: styles.colors.color6, display:"flex", flexDirection:"column", justifyContent:"center",   }}>
            <div style={{
                background: styles.colors.color6, display:"flex", flexDirection:"column", justifyContent:"center", width:"100%" }}>
                <div style={{
                    fontSize:styles.fonts.fontsize5, marginLeft:"7px", color: styles.colors.color3+"9a", fontWeight: styles.fonts.fontWeightMed, fontStyle:"oblique",
            }}>New Note</div>
            <div onClick={()=>{
                if(this.state.rows!=="5"){
                    
                    if(!note){
                        dispatch( {popupSwitch:"notes", operate:"addnotes", object:{owner: currentstudent.getJson()._id}});
                    }
                    this.setState({rows:"5"})
                }
                

            }}>
                <textarea value={this.state.note} 
                type="text" className="form-control" rows={this.state.rows} id="description" onChange={this.handleChange} 
                placeholder="Start Typing..."
                
                // placeholder={note?.getJson().description? note?.getJson().description: "Start Typing..."} 
                name={"note"} >
                    
                </textarea>
                
                </div>
                <button  className="btn  btn-block"  onClick={async ()=>{
                    
                    if(this.state.note!==""){
                        await note.setJson({...note.getJson(), description:this.state.note});
                    dispatch({operation:"run", popupSwitch:""});
                    this.setState({rows:"1", note:""});
                    this.props.setUpdate();
                    }
                    
                }} 
                style={{
                    ...styles.buttons.buttonLog,
                    height: "21%",
                    width: "50px",
                    alignItems: "center",
                    textAlign: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: styles.margins.margin4,
                }}>Save</button>

            </div>   
            </div>
        );
    }
}

export default Newnote;