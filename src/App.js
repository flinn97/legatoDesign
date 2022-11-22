import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
//uploade above stuff from npm.
import "./App.css";
import Dispatch from './dispatch';
import styleService from './services/styleService';
import authService from './services/auth.service';
import Factory from './model/stateFactory.js';
import ComponentListInterface from './npm/componentListInterface';
import StudentRegister from './view/studentRegister';
import "./view/components/checkbox.css";
import moment from 'moment';
//nav bar helps to navigate from page to page with authorizations to login or sign up etc. 
class App extends Component {
    constructor(props) {
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.dispatch=this.dispatch.bind(this);
        // this.operate=this.operate.bind(this);
        this.factory= new Factory();
        this.state = {
            styles: styleService.getstyles(),
            factory: this.factory,
            componentListInterface:new ComponentListInterface(this.dispatch),
            componentList:undefined,
            backend: undefined,
            backendUpdate:undefined,
            toOpp:undefined,
            ipad:false,
            studentsToChatWith: [],
            switch:this.factory.getStateObject("switch").getJson(),
            ...this.factory.getStateObject("toState").getJson(),
            
        };
    }


    onSyncDispatch(obj){

        this.dispatch(obj);
    }
    async componentDidMount(){
        
        if(window.innerWidth<1300){
            this.setState({styles: styleService.resize1(), ipad:true});

        }
        if(window.innerWidth<600){
            this.setState({styles: styleService.resize2(), ipade:false, iphone:true});
            var root = document.getElementById("root");
            root.style.overflow="auto";
            root.style.position="auto";
        }
        
        let myUser = await authService.getCurrentUser();
        if(myUser){
            myUser = JSON.parse(myUser);
            
            await this.setState({
                email: myUser.student? myUser.teacher: myUser.email
            })
        }
       let list;
        if(this.state.componentList===undefined && this.state.componentListInterface!==undefined){
            
            list = await this.state.componentListInterface.createComponentList();
            await this.setState({
                componentList:list,
            })
        }
        if(myUser){
            if(myUser.student){

                await authService.getAllTheDataForTheUser( myUser.email, list, myUser.student, myUser.teacher, this.dispatch );
                
            }
            else{
                await authService.getAllTheDataForTheUser(myUser.email, list, undefined, undefined, this.dispatch);
            }
            
            let student= myUser.student
            
            myUser= await list.getComponent(myUser.student? 'student':'user');
            
            this.setState({currentuser:myUser, myswitch: student? "studentDash":"dash", currentstudent:myUser, checkURL:true, });
            
        }
        
    }

    async componentDidUpdate(){
        
        if(this.state.firstTime){
            
            let list = this.state.componentList.getList("student");
            for(const key in list){
                if (!list[key].getJson().firstTime){
                    this.setState({firstTime:false})
                }
            }
        }
        if(this.state.getChatroom){
            await this.setState({getChatroom:false})
            authService.getGeneralChatroom( this.state.currentuser?.getJson().collection, this.state.componentList)
        }
        if(this.state.checkURL){
            //
            
            await this.setState({checkURL:false})
            const ref = window.location.href;
            let splitref= ref.split("/");
            if(splitref.includes("legato")){
                
                if(splitref[4]==="calendar"){
                    this.setState({ myswitch: "calendar"});

                }
                let studentID= splitref[4];
                let stud = this.state.componentList.getComponent("student", studentID, "_id");
                if(stud){
                    this.setState({currentstudent:stud, myswitch: "viewstudent"});

                }

            }
        }
        
        if(this.state.getOtherStudents){
            await this.setState({getOtherStudents:false});
            
            await authService.getOtherStudents(this.state.currentstudent?.getJson().syncedStudents, this.state.email, this.state.componentList, this.state.currentstudent.getJson()._id);
            await this.setState({getOtherStudents:false});
        }
        // if(window.innerWidth<1000){
        //     this.setState({
        //         styles: styleService.resize1()
        //     })
            
        // }
        if(this.state.backend!==undefined){
            ////
            await this.setState({backend: undefined, updateCircle:true});
            authService.dispatch(this.state.backendUpdate, this.state.email);  
            
            for(const key in this.state.backendUpdate){
                for(const key1 in this.state.backendUpdate[key]){
                    if(this.state.backendUpdate[key][key1].notify){
                        this.state.backendUpdate[key][key1].notify(key);
                    }
                }
                
            }
        }
        if(this.state.addStarpoints!==undefined ||this.state.subStarpoints!==undefined){
            
            if(this.state.spRun){
                this.setState({spRun: false})
                ////
                let starpoints = await this.state.componentList.getList("starpoints", this.state.spid);
                ////
                let levelUp = this.state.addStarpoints!==undefined? await starpoints[0].calcSP(this.state.addStarpoints) : await starpoints[0].calcDownSP(this.state.subStarpoints);
            }
        }
        if(this.state.operate!==undefined ||this.state.operation==="run"){
            let operation = this.state.operation;
            let operate= this.state.operate;
            let object = this.state.object;
            await this.setState({operate:undefined, operation:"cleanJsonPrepare", object:undefined, currentComponent:undefined});
            let operationsFactory =this.state.componentList.getOperationsFactory();
            let splice = operate!==undefined? await operationsFactory.getSplice(operate) : "";
            
            let obj = await operationsFactory.operationsFactoryListener({operate:operate, operation:operation, object:object});
            
            let currentComponent=operate!==undefined? obj[splice][0]: undefined;
            await this.setState({currentComponent: currentComponent});
        }
    }

    async dispatch(obj){
        if(this.state.keepChat){
            obj.myswitch='chat'
        }
        await this.setState(obj)
    }
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value,
        })
    }
    
    render() {
        let app=this.state
        return (
            <div> 
                
                {this.state.firstTime?(<StudentRegister app={{ dispatch:this.dispatch, handleChange:this.handleChange, state:app}}/>):(
            <Dispatch app={{ dispatch:this.dispatch, handleChange:this.handleChange, state:app}}/>
            )}
            </div>
        );
    }
}
export default App;
/**
 * 
        if(arr.length){
            let obj = {currentuser:this.state.currentuser};
            let backEndSwitch= false;
            for(let i=0; i<arr.length; i++){
                switch(Object.keys(arr[i])[0]){
                    case "add":
                        arr[i].add = {...this.state.factory[arr[i].add?.type], ...this.state.componentUpdate, _id: (Math.floor(Date.now()+performance.now())).toString(), collection:this.state.email };
                        obj.currentuser.components.push(arr[i]);
                        backEndSwitch=true;
                        break;
                    case "del":
                        obj.currentuser.components.splice(i, 1);
                        backEndSwitch=true;
                        break;
                    case "update":
                        arr[i]= {...arr[i], ...this.state.componentUpdate};
                        backEndSwitch=true;
                        break;
                    case "noarray":
                        obj = {...arr[i].noarray}
                        break;
                }
                let todispatch = {...obj, componentUpdate: {}};
                this.setState(todispatch);
            }
            if(backEndSwitch){
                authService.changeData(arr, this.state.email);
            }
        }
        else{
            this.setState(arr); 
        }
        let toBackend={};
        let operationObject = Object.keys(obj)[0];
        if(operationObject ==="operations"){
            let userComponents= this.state.user.components;
            for(let i = 0; i<obj.operations; i++ ){
                let newObj = await obj.operations[i];
                userComponents=newObj.components;
                toBackend[newObj.backendOpp]=newObj.toBackend;
            }
            obj={currentuser: {components:userComponents}};
            // authService.changeData(toBackend);
        }
 */        // if(this.state.run){
        //     ////
        //     await this.setState({run:false});
        //     await this.state.currentComponent.getOperationsFactory().run();
        // }
        // if(this.state.operation==="del"){
        //     ////
        //     await this.setState({operation: undefined});
        //     this.state.currentComponent.getOperationsFactory().cleanPrepareRun({del:[this.state.currentComponent]})
        // }
    // async operate(){
    //     ////
    //     let operate= this.state.operate;
    //     await this.setState({operate:undefined})
    //     let operationsFactory =this.state.componentList.getOperationsFactory();
    //     let owner = this.state.currentstudent? this.state.currentstudent?.getJson()?._id : this.state.email;
    //     let splice = await operationsFactory.getSplice(operate);
    //     if(splice==="add"){
    //         await operationsFactory.jsonPrepare({[operate]: [{owner: owner, ...this.state.json }]});
    //         let currentComponent= operationsFactory.getUpdater().getJson()[splice][0];
    //         await this.setState({currentComponent: currentComponent});
    //     }
    //     else{
    //         await operationsFactory.cleanPrepare({[operate]: [this.state.currentComponent]});
    //     }
    // }
