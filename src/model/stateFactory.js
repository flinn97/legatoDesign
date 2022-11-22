import moment from 'moment';

class Misc {
    json;
    setJson(json){
        this.json={...this.json, ...json}
    }
    getJson(json){
        return this.json
    }
}

class GetSwitch extends Misc{
    json= {
        student:{myswitch:"viewstudent" },
        dashboard:{myswitch:"dash" },
        metro:{myswitch:"metro" },
        calendar:{myswitch:"calendar" },
        chat:{myswitch:"chat" },
        teacher:{myswitch:"teacherpage"}
    }
}


class ToState extends Misc{
    json={
        addhwtime: false, 
            updatecircle: true, 
            goals:false, 
            showgoal:false, 
            goals:undefined, 
            mainGoals:undefined, 
            level: "", 
            spgoal: "",
            spamount: "",
            checked: false,
            email: "",
            showhomework: true,
            currentuser: undefined,   
            myswitch: "dash",
            appointments:{},
            today: moment().format('dddd').toString(),
            currentstudent: undefined,
            operation: "cleanJsonPrepare",
            object: undefined,
            operate: undefined,
            updateCircle: false,
            addStarpoints: undefined,
            subStarpoints: undefined,
            spRun: false,
            currentChatroom: undefined,
            login:true,getOtherStudents:false,
            
    }
}
class StateFactory {

    factory ={
        switch:  new GetSwitch(),
        toState: new ToState (),

    }

    getStateObject(component){
        let comp = this.factory[component];
        comp = Object.assign(Object.create(Object.getPrototypeOf(comp)), comp);
        return comp
    }
}
export default StateFactory;