import React, { Component } from 'react';
import authService from "./services/auth.service";
import Dashboard from "./view/dashboard.js"
import StudentProfile from "./view/dashboard.js"
import Login from './view/signin.js';
import Addstudent from './view/popups/addStudent.js';
import studentService from './services/studentService';
import Del from './view/popups/del';
import Times from './view/popups/times';
import EditUser from './view/popups/editUser';
import Register from './view/register';
import PicUpload from './view/popups/picUpload';
import StudentSync from './view/popups/syncStudents';
import AddBadge from './view/popups/addBadge';
import EditProgress from './view/popups/editProgress.js';
import Badges from './view/popups/allBadges.js';
import ShowBadge from './view/popups/showBadge.js'
import StudentAdded from './view/popups/studentAdded';


//nav bar helps to navigate from page to page with authorizations to login or sign up etc. 
class Dispatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    };

    /**
     * update front and backend with everything.
     * @param {*} obj 
     */

    render() {
        let app = this.props.app;
        let state = this.props.app.state;
        let dispatch = this.props.app.dispatch;


        return (
            <div>
                {state.popupSwitch === "deleteStudent" && (<Del app={app} handleClose={dispatch.bind(this, { popupSwitch: "", secondaryPopup: "", currentstudent: {} },)} />)}
                {state.popupSwitch === "editUser" && (<EditUser app={app} handleClose={dispatch.bind(this, { popupSwitch: "" },)} />)}
                {state.studentAddedPopup && (<StudentAdded app={app} handleClose={dispatch.bind(this, { studentAddedPopup: false, addedStudent:undefined },)} />)}
                {state.popupSwitch === "addStudent" && (<Addstudent app={app} handleClose={() => {
                    dispatch({ popupSwitch: "" });
                    state.componentList.getOperationsFactory().clearUpdater();
                }
                } />)}
                {state.popupSwitch === "syncStudent" && (<StudentSync app={app} handleClose={dispatch.bind(this, { popupSwitch: "" })} />)}
                {state.popupSwitch === "addTime" && (<Times app={app} handleClose={dispatch.bind(this, { popupSwitch: "", forTime: undefined, time: false })} />)}
                {state.popupSwitch === "addPic" && (<PicUpload app={app} handleClose={dispatch.bind(this, { popupSwitch: "" })} />)}
                {state.popupSwitch === "addBadge" && (<AddBadge app={app} handleClose={dispatch.bind(this, { popupSwitch: "", currentComponent: undefined })} />)}
                {state.popupSwitch === "editStudent" ? (<EditProgress handleClose={dispatch.bind(this, { popupSwitch: "" })} app={app} />) : (<></>)}
                {state.popupSwitch === "seeAllBadges" && (<Badges handleClose={dispatch.bind(this, { popupSwitch: "" })} app={app} />)}
                {state.popupSwitch === "showBadge" && <ShowBadge handleClose={dispatch.bind(this, { popupSwitch: "" })} app={app} />}
                {state.currentuser ? (<div>
                    {state.role === "student" ? (<StudentProfile app={app} />
                    ) : (
                        <Dashboard app={app} />
                    )}
                </div>) : (<>{state.login ? (<Login app={app} />) : (<Register app={app} />)}</>)}
            </div>
        );
    }
}
export default Dispatch;
/**
 * <div onClick={()=>{
                    
                    let goal= factory.getComponent({component:"goals", opps:app.operationsFactory});
                    goal.oppsFactory.prepare({addgoals: [goal]});
                    goal.oppsFactory.run();
                    
                    
                }}>new goal</div>
                 <a href="www.google.com">google</a>
                <div onClick={prepare.bind(this, {addhomework:2})} >prepare</div>
                <div onClick={prepare.bind(this, {update:[[componentUpdate?.add[0], {link:"my link"}]]})} >prepare</div>
                <div onClick={prepareRun.bind(this, {addhomework:1, addgoals:1, addnotes:1})} >prepareRun</div>
                <div onClick={cleanPrepare.bind(this, {addhomework:1, addgoals:1, addnotes:1})} >cleanPrepare</div>
                <div onClick={
                    cleanPrepareRun.bind(this, {addhomework:1, addgoals:1, addnotes:1})
                    } >cleanPrepareRun</div>
                <div onClick={run} >run</div>
                <div onClick={run.bind(this, {addhomework:1, addgoals:1, addnotes:1}, false)} >runOptions</div>
                <div onClick={run.bind(this, {addhomework:1, addgoals:1, addnotes:1}, true)} >runclean</div> 
                <div onClick={this.props.app.register.bind(this, [{update:[[this.props.app.state.currentuser?.components[1], {new:"json"}]]}])}>component</div> 
                <div>{this.props.app.state.currentuser?.components.map((account, index) =>
                    <div onClick={account.oppsFactory.prepare.bind(this, {del:[account]}, true)}>{account.getJson().type} type. {account.getJson().link}</div>
                    )} </div>
                    <Login handleChange={this.props.app.handleChange}  app={this.props.app} />
 */