import React, { Component } from 'react';
import auth from '../services/auth';
import InputFormButtonComponent from './inputComponentWithButton';
import DragnDrop from './dragndrop.png';
import ViewMedia from './viewMediaComponent';
import ParentFormComponent from './parentFormComponent';
class UploadComponent extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            list : [],
            newPics: [],
            paths: [],
            showPics: false,
            loading:false,
            name: "",
            type: "monster",
            delList:[]


        };
    }
    createUUID(length){
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789-';
        var charactersLength = characters.length;
        for(var i =0; i<length; i++){
            result +=characters.charAt(Math.floor(Math.random()*charactersLength));
        }
        return result;
    }
    changeHandler = async (event) => {
        if(this.state.list.length<5){
        
        let list = [...this.state.newPics];
        let paths = [...this.state.paths];
        let oldList=[...this.state.list, URL.createObjectURL(event.target.files[0])];

       
                    var fileOfBlob = new File([event.target.files[0]], event.target.files[0].name, {type:event.target.files[0].type});
                    let path = "media/" +fileOfBlob.name;
                    list.push(fileOfBlob);
                    paths.push(path);
                    this.setState({newPics:list, paths:paths, list:oldList, showPics:true});
            

            // await authService.uploadPics(fileOfBlob, path);
            // let pdf = await authService.downloadPics(path);
            // let pushObj = {[fileOfBlob.name]: pdf}
            
            // let obj = this.props.obj;
            // let media = obj.getJson().media;
            // let changeMedia = {...media, ...pushObj}
            // obj.setJson({...obj.getJson(), [this.props.name]: changeMedia})
            // this.props.dispatch(changeMedia)
        }
      
	};
    async handleSubmission()  {
        let component = this.props.app.state.currentComponent
        if(this.state.newPics.length===0){
            this.setState({message:"You still need to spawn something! Upload an image."})
            return
        }
        debugger
        await this.setState({loading:true});
        let list = [...this.state.newPics];
        for(const key in list){
            await auth.uploadPics(list[key], this.state.paths[key]);

        }
       

        debugger
        component.setJson({...component.getJson(), owner:this.props.app.state.user.getJson()._id})
        await component.getPicSrc([...this.state.paths]);

        if(this.props.app.state.uploadKey==="update"){
            let li = Object.values(component.getJson().picURLs);
            let obj={}
            for(const key in li){
                if(!this.state.delList.includes(li[key])){
                    obj["media"+component.createUUID(3)]= li[key];

                }
            }
            component.setJson({...component.getJson(), picURLs:obj})
        }
        



        await component.getOperationsFactory().run();
        await this.setState({loading:false});


        this.props.app.dispatch({ myswitch: "feed", pic: component, newSpawn: false, switchcase:component.getJson().type })
        
        
        

	};
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value,
        })
    }

    componentDidMount() {
        debugger
        let name=Object.keys(this.props.app.state.currentComponent?.getJson().picURLs).length!==0? "picURLs": "picURL";
        let obj = this.props.app.state?.currentComponent;
        let uploads = obj.getJson()[name];
        if(uploads!==""){
        let items = Object.prototype.toString.call(uploads) === "[object String]"? [uploads]: Object.values(uploads);;
        let list = []
        for(const key in items){
            list.push(items[key]);
        }
        this.setState({list:list});
    }
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            if (this.props.emitClickedOutside !== undefined)
            {
                this.props.emitClickedOutside(this.state);
            }
        }
    }
    render() {

        let app = this.props.app;
        let state = app.state;
        let component = this.props.obj? this.props.obj: state.currentComponent;
                    
        let styles =state.styles;

        return (
            
            <div  ref={this.wrapperRef} style={this.props.wrapperStyle?this.props.wrapperStyle:{
                display:"flex", flexDirection:"column", alignItems:"center", alignContent:"center", alignSelf:"center", height:"84vh",
                fontFamily: styles.fonts.fontNormal, zIndex:"10000", padding: "2vh", border:"solid 2px #444444", borderRadius:"2vmin",  marginBottom:"2vh", background:"#eeeeee",
                }} className={this.props.wrapperClass}>
                   <div style={{
                    fontFamily: styles.fonts.fontNormal,
                    fontSize: styles.fonts.fontSubheader1,
                    marginBottom: styles.margins.marginMediumH,
                    cursor:"pointer",
                    color: styles.colors.Red2,
                    position:"absolute",
                    right:"1vmin",
                    top:"1vmin",
                }} onClick={() =>
                    this.props.app.dispatch({ myswitch: "", currentComponent:undefined })
                    } >Cancel</div>
                    <div style={{fontFamily:styles.fonts.fontTitle, color:styles.colors.linkVisitedColor, fontSize:"4vh", marginTop:"",  zIndex:"900"}}>
                    ~ New Spawn ~
                    </div>

                 {/* Title */}
                 <ParentFormComponent 
                 wrapperStyle={{...styles.wrapperStyle}} maxLength={120}
                placeholder={"Max 120 Characters"} 
                 inputStyle={{...styles.inputStyle, width:"40vw",  zIndex:"900"}} 
                    labelStyle={{fontFamily: styles.fonts.fontBold, fontSize:"2.1vh", marginBottom:"1vh", color:styles.colors.lightFontColor}}
                    label="Title: " name= "name" obj ={component} />

                    {/* // INPUT STYLE - inner style (text box, input etc) WRAPPER STYLE - outer style */}
                <div>
                {/* DESCRIPTION */}
                <ParentFormComponent 
                inputStyle={{...styles.inputStyle,  width:"43.6vw", height:"12vh", }}
                maxLength={400}
                placeholder={"Describe your new spawn here."} 
                wrapperStyle={{...styles.wrapperStyle, marginBottom:"3vh", }} 
                labelStyle={{fontFamily: styles.fonts.fontBold, fontSize:"2.1vh", marginBottom:"1vh"}}
                    
                    label="Description: " name= "description" obj ={component} type="textArea" /></div>
        {/* TYPE */}
        <ParentFormComponent  
        inputStyle={{...styles.inputStyle,  width:"9.6vw", }}
        wrapperStyle={{...styles.wrapperStyle, marginBottom:"3vh", }} 
        labelStyle={{fontFamily: styles.fonts.fontBold, fontSize:"2.1vh", marginBottom:"1vh"}} 
        type = "select" label="Type: " name="type" defaultValue={(component.getJson().type!==""&&component.getJson().type!==undefined)? component.getJson().type:"monsters"} 
        selectOptions={["monsters", "heroes", "maps", "worlds", "statblocks"]} textOptions ={["Monster", "Hero", "Map", "World", "Statblock"]} obj={component}/>
               

                <div style={{fontFamily: styles.fonts.fontBold, fontSize:"1.88vh", color:styles.colors.Red2}}>
              Limit: 5 Images
              </div>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", background:"#22222222", width:"28vw", borderRadius:"2vmin", marginBottom:"2vmin" }}>
                            <img style={{width:"24vw", height:"19.8vh", objectFit:"cover", marginTop:"1vmin", borderRadius:"2vmin",}}
                       
                         src = {DragnDrop}/>
                            <label><div style={{fontFamily: styles.fonts.fontNormal, fontSize: styles.fonts.fontHeader2, marginBottom:"1vh"}}></div></label>
                            <div style={{ cursor: "pointer", width:"24vw",
                        height:"20vh", marginTop:"-20vh"  }}> <input style={{ cursor: "pointer", width:"24vw",
                        height:"20vh", marginTop:"-22vh", opacity:"0"  }} type="file" name="file" onChange={this.changeHandler}  /></div>
                        
                                                </div>  

                    <ViewMedia removeMedia={(obj)=>{
                        debugger
                        let list = [...this.state.list];
                        let delList=[...this.state.delList];
                        delList.push(obj.content);
                        list.splice(obj.index, 1);

                        this.setState({list:list, delList:delList});
                       
                    }} editable={true} media={[...this.state.list]} 
                    inputStyle={{objectFit:"scale-down"}}
                    wrapperStyle={{objectFit:"scale-down"}} 
                    labelStyle={{fontFamily: styles.fonts.fontBold, fontSize:"2.1vh", marginBottom:"1vh"}}/>

                <ParentFormComponent label="Link:  "  name= "destinationURL" obj ={component} wrapperStyle={{...styles.wrapperStyle}} 
                 inputStyle={{...styles.inputStyle, width:"40vw"}}  maxLength={120} 
                    labelStyle={{fontFamily: styles.fonts.fontBold, fontSize:"2.1vh", marginBottom:"1vh", color:styles.colors.lightFontColor}} />


                    <div style={{...styles.buttons.buttonFollow, height:"3vh", marginTop:"2vh", cursor:"pointer", minHeight:"20px"}} onClick={this.handleSubmission}>Create Spawn</div>
            <div>{this.state.message}</div>
            </div>
        );
    }
}



export default UploadComponent;