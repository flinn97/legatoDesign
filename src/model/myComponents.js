import BaseClass from "../npm/baseClass";
import authService from "../services/auth.service";
import moment from 'moment';
class componentBase extends BaseClass{
    constructor(opps){
        super(opps);

    }
    json;
    startobj={
        date: "",
        _id: "",
        description: "",
        title: "",
        owner: "",
        user: "",
        type: "",
        
        collection:"",
    }

    userInfo={
        about: "",
        picURL:"",
        email: "",
        firstName:"",
        lastName:"",
        password:"",
        phone: "",
        role: "",
        date: "",
        pics: "",
        
        collection:""
    }

    checksandtime={
        checked: {mon: false,tues: false,wed: false,thur: false,fri: false,sat: false,sun: false,},
        time:{mon: '0',tues:'0',wed: '0',thur: '0',fri: '0',sat: '0',sun: '0'},
    }
    
    
    

}
class Starpoints extends componentBase{
    json={
        ...this.startobj,
        type:"starpoints",
        starpoints: "0",
        starpointGoal: "500",
        level: "1",
        goal: "50",
        student: "25",
        mainGoal: "100",
        homework: "10"
    }

    async calcSP(type){
        
        let updateSP = parseInt(this.json[type])
        let updateStarpoints = parseInt(this.json.starpoints) + parseInt(updateSP);
        this.json.starpoints= updateStarpoints;
        let bool = false;
        if(updateStarpoints>=parseInt(this.json.starpointGoal)){
            bool = true;

            this.json.level = updateStarpoints/500===1? parseInt(this.json.level)+1:(Math.ceil(updateStarpoints/500)).toString();
            this.json.starpointGoal= (parseInt(this.json.starpointGoal)+500).toString();
        }
        await this.operationsFactory.prepareRun({update:[this]});
        return bool;
    }
    async calcDownSP(type){
        let updateSP = parseInt(this.json[type])
        let updateStarpoints = parseInt(this.json.starpoints) - parseInt(updateSP);
        this.json.starpoints= updateStarpoints;
        if(updateStarpoints<parseInt(this.json.starpointGoal-500)){
            this.json.level =(Math.ceil(updateStarpoints/500)).toString();
            this.json.starpointGoal= (parseInt(this.json.starpointGoal)-500).toString();
        }
        await this.operationsFactory.prepareRun({update:[this]});
    }
}
class Homework extends componentBase{
    constructor(opps){
        super(opps);
        this.checked=this.checked.bind(this);
        this.addTime=this.addTime.bind(this);
        this.addTime=this.addTime.bind(this);

    }
    json= {
        time:true,
        hwlink: "",
        check:true,
        ...this.checksandtime,
        ...this.startobj,
        type:"homework",
        meta:""
    }
    /**
     * Send to functions to send a notification to student
     * @param {*} rest 
     */
     async notify(rest){
        
        if(rest==="add"){
            let message = "Your teacher added the assignment" + this.json.title;         
            await authService.getNotifyInfo(this.json.owner, message)
        }
        
    }
    async checked( day){
        this.json.checked[day]= !this.json.checked[day];
        await this.operationsFactory.prepareRun({update:[this]});
    }
    async addTime(day, amount){
        this.json.time[day] = amount;
        await  this.operationsFactory.prepareRun({update:[this]});
    }
    
    
}

class UserThings extends componentBase{
    constructor(opps){
        super(opps);
        this.getPicSrc=this.getPicSrc.bind(this);
        this.getDaysFromNow=this.getDaysFromNow.bind(this);
    }
    json= {
        ...this.userInfo, 
        role:"teacher",
        type: "user",
        signUpDate: moment().format('L'),
        paidCustomer: false,

    }
    getDaysFromNow(){
        
        if(this.json.paidCustomer){
            return false;
        }
        else{
            let now = new Date(moment().format('L'));
            let then = new Date(this.json.signUpDate);
            var Difference_In_Time = now.getTime() - then.getTime();
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            let needsToPay = true;
            if(Difference_In_Days<30){
                needsToPay = false;
            }
        
            return needsToPay;
        }
        
        
    }
    async getPicSrc(){
        let pic = await authService.downloadPics(this.json.pics);
        this.json.picURL=pic;
        
    }
}
class Goals extends componentBase{
    constructor(opps){
        super(opps);
        this.checked=this.checked.bind(this);
        this.notify=this.notify.bind(this);

    }
    json={
        mainID: "",
        complete: false,
        dateCompleted: "",
        ...this.startobj,
        type:"goal",

    }
    /**
     * Send to functions to send a notification to student
     * @param {*} rest 
     */
     async notify(rest){
        
        if(rest==="add"){
            let message = "Your teacher added the assignment" +this.json.title;         
            await authService.getNotifyInfo(this.json.owner, message)
        }
        if(rest==="update"){
            if(this.json.complete){
                let message = "You just accomplished the goal: " +this.json.title;         
                await authService.getNotifyInfo(this.json.owner, message)
            }
        }
        
    }
    async checked(sp){
        this.json.complete=!this.json.complete;
        await this.operationsFactory.prepareRun({update:[this, sp]});
        }
}

class Notes extends componentBase{
    json={
        ...this.startobj,
        type:"notes",
        dateOfPost: moment().format('lll'),
    }
}
class Student extends componentBase{
    constructor(opps){
        super(opps);
        this.getPicSrc=this.getPicSrc.bind(this);
        this.clearChecks= this.clearChecks.bind(this);
        this.clearTime= this.clearTime.bind(this);
        this.checked= this.checked.bind(this);
        this.addTime= this.addTime.bind(this);
        this.updateComponent=this.updateComponent.bind(this);
        this.sync=this.sync.bind(this);
        this.syncItUp=this.syncItUp.bind(this);

    }
    json={
        ...this.userInfo,
        type: "student",
        _id:"",
        username:"",
        teacher: "",
        role: "student",
        pastFirstTime: false,
        parent: "",
        address:"",
        days: {},
        syncedStudents:{

        },
        firstTime: true,

        daystreak: "0",
        weekstreak: "0",

        wmin: "1000",
        timeTotal: "0",
        timeTotalforGoal: "0",
        time: true,
        totalTime: "0",

        timeBool:{mon: false,tues: false,wed: false,thur: false,fri: false,sat: false,sun: false,},
        check: true,
        trackTime: true,
        starpoints: true, 
        totalDays: "100",
        totalDaysPracticed:"0",
        daysPracticed: "0",
        ...this.checksandtime,
        }
        async changeSchedule(s){
            this.json.days=s
        }
   
        async sync(students){
            await this.syncItUp(students);
            for(const key in students){
                if(students[key].getJson()._id !== this.json._id){
                    await students[key].syncItUp(students);

                }
            }
            this.operationsFactory.cleanPrepareRun({update:students})
        }
        async syncItUp(students){
            this.json.syncedStudents={}
            for(const key in students){
                this.json.syncedStudents[students[key].getJson().firstName] = students[key].getJson()._id;
            }
        }
        async getPicSrc(){
            let pic = await authService.downloadPics(this.json.pics);
            this.json.picURL=pic;
            
        }
        async clearTime(){
            //
            this.json.time= {...this.checksandtime.time};
            this.json.timeTotal=0;
            this.json.timeBool= {...this.checksandtime.checked};
            this.json.daystreak= 0;
            await this.operationsFactory.cleanPrepareRun({update:this});
        }
        async clearChecks(){
            //
            this.json.checked = {...this.checksandtime.checked};
            this.json.daystreak= 0;
            await this.operationsFactory.cleanPrepareRun({update:this});
        }
        async checked(day){
            //
            this.json.checked[day]= !this.json.checked[day];
            if(!this.json.timeBool[day] ){
                this.updateComponent(this.json.checked[day]);
            }
            await this.operationsFactory.cleanPrepareRun({update:this});   
        }
        async updateComponent(bool){
            let i = bool? 1: -1;
            this.json.daystreak = parseInt(this.json.daystreak) +i;
            this.json.daysPracticed= parseInt(this.json.daysPracticed) +i;
            this.json.totalDaysPracticed= parseInt(this.json.totalDaysPracticed) +i;
        }
        async addTime(day, time){
            //
            //
            if((!this.json.timeBool[day] ||parseInt(time)===0)&&!this.json.check ){
                let bool = !(parseInt(time)===0);
                await this.updateComponent(bool);
            }
            this.json.timeBool[day] = await (parseInt(time)===0)?false: true;
            this.json.timeTotal = await parseInt(this.json.timeTotal) +(time- parseInt(this.json.time[day]));
            this.json.totalTime= await parseInt(this.json.totalTime) +(time- parseInt(this.json.time[day]));
            this.json.time[day]=  time;           
                
            await this.operationsFactory.cleanPrepareRun({update:this});
        }

       
        
}
class ChatRoom extends componentBase{
    json={
        _id: "",
        owner: "",
        people: {},
        name:"",
        type:"chatroom",
        collection: ""

    }
    async createChatroom(students){
        let arr = this.operationsFactory.isArray(students);
        let name="";
        let people={}
        for(const key in arr){
            let json = students[key].getJson();
            name += json.firstName;
            people[json.firstName]= json._id;
        }
        await this.cleanJsonPrepare({addchatroom:{name:name, people:people }})
    }
    async addToChatroom(students){
        let arr = this.operationsFactory.isArray(students);
        for(const key in arr){
            let json = arr[key].getJson();
            this.json.people[json.firstName]= json._id;
        }
        await this.cleanPrepareRun({update:this})
    }
    
    
}
class Post extends componentBase{
    json={
        _id: "",
        chatroom: "",
        owner: "",
        owners: {},
        student:false,
        content:"",
        type:"post",
        dateOfPost: moment().format('lll'),
        collection: "",
        read:false

    }
     /**
     * Send to functions to send a notification to student
     * @param {*} rest 
     */
      async notify(rest){
        
        if(rest==="add"){
            let message = this.json.content;         
            await authService.getNotifyInfo(this.json.owner, message)
        }
        
    }
}
class Badge extends componentBase{
    
    json={
        ...this.startobj,
        type:"badge",
        picURL: "",
        

    }
    /**
     * Send to functions to send a notification to student
     * @param {*} rest 
     */
    async notify(rest){
        
        if(rest==="add"){
            let message = "Your teacher justawarded you a new badge.";         
            await authService.getNotifyInfo(this.json.owner, message)
        }
        
    }

}


export {Student, Notes, Goals, UserThings, Homework, Starpoints, Post, ChatRoom, Badge}