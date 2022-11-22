import React, { Component } from "react";
import studentService from "../../services/studentService";
import authService from "../../services/auth.service";
import loading from "../../assets/loading.gif";
import wolf from "../../assets/place1.png"
//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
class PicUpload extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);

        this.setWrapperRef = this.setWrapperRef;
        this.state = {
            loading:false,
            pic: ""
        }
    };
    changeHandler = async (event) => {
        let opps = this.props.app.state.currentComponent?.getOperationsFactory();
        let path = "images/" + event.target.files[0].name;
        this.setState({
            selectedFile:event.target.files[0],
            path: path,
            pic: URL.createObjectURL(event.target.files[0])
        }) 
        await opps.componentDispatch(this.props.app.state.currentComponent.getJson().collection?{ updatepics: path}:{ addpics: path});
        
	};
    async handleSubmission()  {
        await this.setState({loading:true});
        await authService.uploadPics(this.state.selectedFile, this.state.path);
        await this.props.app.state.currentComponent.getPicSrc();
        await this.props.app.state.currentComponent?.getOperationsFactory().run();
        
        this.props.app.dispatch({updatePics:true});
        this.props.handleClose();

	};
    async componentDidMount() {
        this.setState({
            pic: this.props.app.state.currentuser.getJson().picURL
        })
        
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.props.handleClose();
        }
    }

    render() {
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let goal= state.currentComponent;
        let opps = goal?.getOperationsFactory();
        let dispatch= app.dispatch;
        let key = goal?.getJson().collection !==""? "update": "add"
        return (
            <div className="popup-box" style={{ zIndex: "1010" }}>
                <div ref={this.wrapperRef}  className="diapicboxa" style={{ zIndex: "1010" }}>
                <div style={ ///EXIT BUTTON
                                styles.buttons.closeicon
                            } onClick={this.props.handleClose}>x</div>
                   
                   <div class="mb-3">
                    <img src = {this.state.pic? this.state.pic: wolf} style={{width:"100px", height:"100px", borderRadius:"50%"}} />
                   <label for="formFile" class="form-label">Default file input example</label>
                   <input class="form-control" type="file" id="formFile" onChange={this.changeHandler}/>
                 </div>
                    <div>
                    {state.popupSwitch==="archive"?(<></>):(
                    <button className="btn  btn-block" style={{ background: "#696eb5", height: "35px", color: "#F0F2EF" }} 
                    onClick={this.handleSubmission}>{this.state.loading?(<><img src={loading} style={{width:"20px", height:"20px"}}/>Uploading</>):(<>Add Pic</>)}
                    </button>
                    )}
                    </div>





                </div>
            </div>

        )
    }
};

export default PicUpload;