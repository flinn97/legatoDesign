import starpointService from "./starpointService";
import authService from "./auth.service";

class studentSevice { 
    
    async changeStudentsEmail(email, password, student, dispatch){
        
        let s = student.getJson();
        if(Object.keys(s.syncedStudents)[0]){
            for(const key in s.syncedStudents){
               await  authService.deleteStudent(s.syncedStudents[key]+"@legato.com");
               await authService.loginToDel(s.syncedStudents[key]+"@legato.com", s.syncedStudents[key])
               await authService.delAccount();
            }
            await authService.register(email, password, true);
            
            await authService.registerStudentWithEmail(email,{email:s.collection, _id:s._id, student:true});

        }
        else{
            await authService.deleteStudent(s._id+"@legato.com");
            await authService.loginToDel(s._id+"@legato.com", s._id);
            await authService.delAccount();
            await authService.register(email, password, true);
            await authService.registerStudentWithEmail(email,  {email:s.collection, _id:s._id, student:true});
        } 
        localStorage.removeItem('user');
        await student.setJson({...s, firstTime:false});
        await student.getOperationsFactory().cleanPrepareRun({update:[student]});    
        localStorage.setItem("user", JSON.stringify(student));
        await dispatch({currentuser:undefined, login:true, firstTime:false});
        window.location.reload();
    }


}
export default new studentSevice();
 //set up preliminary info
        // let i = state.currentuser.role==="student"?"":this.compare( state.currentuser.students,  obj.currentstudent? obj.currentstudent:  state.currentstudent)
             // let j= obj.isobject? this.compare( todispatch.currentstudent[obj.objkey],  obj.realobject[obj.objkey]): undefined;
        // let notvalidated=false;
        // if(obj.switchV){
        //     notvalidated =  !j? todispatch.currentstudent[obj.objkey][obj.objectattribute] === obj.realobject[obj.objkey][obj.objectattribute]:todispatch.currentstudent[obj.objkey][j][obj.objectattribute] === obj.realobject[obj.objkey][obj.objectattribute];
        // }

        //add update or delete miscswitch on the switch and whatever object it is with its updated contents. (goal.complete, maingoal.complete, syncchecboxes, hwsynccheckboxes, time, hwtime.)
        //pattern 2 update student solve for edge cases. also happens to be part of the verify process. could combine the line below this one with the third addupdatedelete down but I'm keeping it to show the reusability
        // todispatch.currentstudent = obj.switchV? await this.addUpdateDelete({dataobject: todispatch.currentstudent, objs: todispatch.currentstudent, updateobj:{daysPracticed:obj.day? (parseInt(todispatch.currentstudent.daysPracticed)+obj.tick).toString() : (parseInt(todispatch.currentstudent.daysPracticed)-obj.tick).toString(),daystreak: obj.day? (parseInt(todispatch.currentstudent.daystreak)+obj.tick).toString() : (parseInt(todispatch.currentstudent.daystreak)-obj.tick).toString() ,starpoints:obj.miscswitch? starpointService.calcstarpoints(parseInt(todispatch.currentstudent.starpoints), parseInt(todispatch.currentstudent.daystreak), obj.sp):todispatch.currentstudent.starpoints}, myswitch:"noarray"}): todispatch.currentstudent;
        //patter 3 update state stuff in general with edge cases.
        // todispatch = obj.switchV? await this.addUpdateDelete({dataobject: todispatch,objs: todispatch, updateobj:{level:obj.miscswitch? starpointService.getstarpointgoalandlevel(parseInt(todispatch.currentstudent.starpoints)).level: state.level,spgoal: obj.miscswitch? starpointService.getstarpointgoalandlevel(parseInt(todispatch.currentstudent.starpoints)).spgoal:state.spgoal,spamount:obj.miscswitch? starpointService.getstarpointgoalandlevel(parseInt(todispatch.currentstudent.starpoints)).spamount: state.spamount}, myswitch:"noarray"}): todispatch;
        
     //OBSOLETE todispatch.currentstudent = await this.addUpdateDelete({dataobject: todispatch.currentstudent, objs: obj.myswitch==="noarray"? todispatch.currentstudent: todispatch.currentstudent[obj.objkey], updateobj:obj.realobject, myswitch:obj.myswitch, addsplice: obj.addsplice})


        //pattern 4 update longterm memory, 
           /**
//  * 
//  * @param {*} obj 
//  * @returns an obdated copy of any object passed to it.
//  * factory. Pass in A: data object to be updated, B: The key to the data to be uploaded. C: the thing to upload with. D: Some misc stuff to do other actions.

// */
// addUpdateDelete(obj) {
//     let dataobject= obj.dataObject;
//     let mainob = obj.updateObject;
//     let returnob = {};
//     let insert = false;
//     let lastnext = ""
//     for(let k = 0; k<dataobject.length; k++){
//         mainob= insert? [dataobject[k-1]]:mainob;
//         for(let j=0; j<mainob.length; j++){
//             for(let s = 0; s<mainob[j].myswitch.myswitch.length; s++){
//                 let key = mainob[j].myswitch.objkey[s]
//                 let next = mainob[j].myswitch.next;
//                 let i=  mainob[j].myswitch.myswitch.includes("noarray")&&   mainob[j].myswitch.myswitch.includes("add")? this.compare(dataobject[k][key], mainob[j][key]): 0;
//                 switch(mainob[j].myswitch.myswitch[s]){
//                     case "add":
//                         dataobject[k][next][key].push(mainob[j][key]);
//                         break;
//                     case "del":
//                         dataobject[k][next][key].splice(i, 1);
//                         break;
//                     case "update":
//                         dataobject[k][next][key][i]= mainob[j][insert? Object.keys(mainob[j])[0]:key];
//                         break;
//                     case "noarray":
//                         dataobject[k][next][key]= mainob[j][key];
//                         break;
//                 }
//             }
//             insert = mainob[j].myswitch.insert
//         }
//           if(dataobject[k].myswitch.returnswitch){
//               returnob[dataobject[k].myswitch.returnswitch]= dataobject[k][dataobject[k].myswitch.returnswitch]
//           } 
//     }
//     return  returnob;
// }
//     /**
//      * 
//      * @param {*} compare 
//      * @param {*} compare1 
//      * @param {*} condition 
//      * @returns i for the compaired two values
//      */
//      compare(compare, compare1, ){
//         let value;
//         for(let i=0; i<compare.length; i++){
//                 if(compare[i]?.id?.toString()=== compare1?.id?.toString() ){
//                 value= i
//                 break;
//                 }  
//                 else if(compare1?.title&& (compare1?.title=== compare[i]?.title && compare1?.date?.toString()=== compare[i]?.date?.toString())){
//                     value= i
//                 break;
//                 }
//             else{
//                 value= false
//             }
//         }
//         return value
//     }
//       /**
//      * prepare for factory
//      * @param {*} state 
//      * @param {*} obj 
//      */
// async prepareForFactory(state, obj){
    
//     let switchObj= await this.getSwitch(obj, {add:3,update:6,del:3, noarray:7 });
//     let currentuser={currentuser:{...state.currentuser},myswitch: {myswitch:["update"], objkey:["students"], returnswitch:"currentuser", insert:false } };
//     let currentstudent={currentstudent:{...state.currentstudent}, myswitch: {myswitch:["update"], objkey:["students"], returnswitch:"currentstudent", insert:false,next: "currentuser" }};
//     let newswitch= {myswitch:[switchObj.myswitch], objkey:[switchObj.objkey], returnswitch:false, insert:true, next: "currentstudent" };
//     let key= switchObj.myswitch+switchObj.objkey;
//     let startobj={owner:state.currentuser.role==="student"? state.currentuser.id:state.currentstudent.id, date: obj[key]?.date? obj[key]?.date:Date.now(), description: state.description?state.description:  obj[key]?.description,title:state.title?state.title:  obj[key]?.title,}
//     let backend=["users", "students"]; 
//     let preparationFactoryObject={
//         homeworks:{toFactory: {[key]:{...obj[key], hwchecked:switchObj.myswitch === "add"?{mon:false,tues:false,wed:false,thur:false,fri:false,sat:false,sun:false} :{...obj.updatehomeworks?.hwchecked},hwcheck: state.hwcheck,hwTime: state.time,hwlink: state.hwlink,timehw:switchObj.myswitch === "add"?{mon: "0",tues: "0",wed: "0",thur: "0",fri: "0",sat: "0",sun: "0",}: {...obj.updatehomeworks?.timehw},...startobj,  }, popup: switchObj.myswitch==="update"?true:false, dataObject:currentstudent, bigDataObject:currentuser,myswitch:newswitch, switchObj: switchObj  }, tobackend:{toFirebase: backend} },
//         goals:{toFactory: 
//             {
//                 [key]: {
//                     ...obj[key], 
//                     complete:obj.updategoals?.complete===undefined? false:obj.updategoals?.complete, 
//                     completed:  obj.updategoals?.completed===undefined? false: obj.updategoals?.completed,
//                     main: switchObj?.myswitch==="update"? obj.updategoals?.main: state.maingoal?.date,
//                     ...startobj,}, 
//                 dataObject:currentstudent, bigDataObject:currentuser,myswitch:newswitch, switchObj: switchObj, },tobackend:{toFirebase: backend} },
//         mainGoals:{toFactory: {
//                 [key]:{
//                         ...obj[key],
//                         complete:obj.updatemainGoals?.complete===undefined?false:obj.updatemainGoals?.complete, 
//                         completed:  obj.updatemainGoals?.completed===undefined? false: obj.updatemainGoals?.completed,
//                         ...startobj,
//                     }, dataObject:currentstudent, bigDataObject:currentuser,myswitch:newswitch, switchObj: switchObj,},tobackend:{toFirebase: backend} },
//         notes:{toFactory: {[key]:{...startobj,}, dataObject:currentstudent.currentstudent, bigDataObject:currentuser,myswitch:newswitch, switchObj: switchObj},tobackend:{toFirebase: backend} },
//         checked:{toFactory:{[key]: {...obj.noarraychecked, daystreak: state.checked? parseInt(state.currentstudent.daystreak)+1: parseInt(currentstudent.currentstudent.daystreak)-1, daysPracticed: state.checked?parseInt(currentstudent.currentstudent.daysPracticed)+1:parseInt(currentstudent.currentstudent.daysPracticed)-1 , starpoints:starpointService.calcstarpoints(parseInt(currentstudent.currentstudent.starpoints), parseInt(currentstudent.currentstudent.daystreak),20)},myswitch:newswitch, switchObj: switchObj, dataObject:currentstudent, bigDataObject:currentuser,}, tobackend:{toFirebase:backend }},
//         time: {toFactory:{[key]:{...obj.noarraytime, timeTotal:parseInt(currentstudent.currentstudent.timeTotal)+ parseInt(state.timeadded)}, switchObj: switchObj,myswitch:newswitch,  dataObject:currentstudent, bigDataObject:currentuser}, tobackend:{toFirebase: backend}},
//         edit: {toFactory:{[key]:{...obj.noarrayedit}, switchObj: switchObj,  myswitch:newswitch, dataObject:currentstudent, bigDataObject:currentuser}, tobackend:{toFirebase: backend}},
//         editgeneric: {toFactory:{[key]:{...obj.edit}, switchObj: switchObj,  myswitch:newswitch, dataObject:currentstudent, bigDataObject:currentuser}, tobackend:{toFirebase: backend}},
//         students: {toFactory:{[key]:{...obj.delstudents}, switchObj: switchObj, myswitch:{...newswitch, next: "currentuser"},  dataObject:currentuser, }, tobackend:{toFirebase: backend}},
//     }
  
//         //     newobj[0][0].push({starpoints: starPoints, myswitch:{myswitch:"noarray", objkey:"starpoints",returnswitch:false, insert:true }});
//         //     let spstuff = starpointService.getstarpointgoalandlevel(starPoints);
//         //     newobj[1].spgoal= spstuff.spgoal;
//         //     newobj[1].level= spstuff.level;
//         // }
//     return preparationFactoryObject[switchObj.objkey]
// }
//     /**
//      * updateobj: obj.delstudents? "currentuser": "currentstudent",
//      * @param {*} state
//      * @param {*} obj
//      * @returns newobj for whatever called it
//      */
//     async objectCreationFactory(state, obj){
        
//         let newobj= [[[],[obj.dataObject,obj.bigDataObject]],{addhwtime: false, checked:false, addtime:false, editnote: false, addnote:false, addhomework: obj.popup? true:false, updatecircle: true, goals:false, showgoal:false, title:"", description:"", goals:undefined, homeworks: undefined,mainGoals:undefined, }]
//         let tobackend;
//         if (newobj[0][1][1]===undefined){
//             newobj[0][1]=[obj.dataObject]
//         }
//         let itkey = obj.switchObj.myswitch+obj.switchObj.objkey;
//         let ifcase = obj.myswitch.myswitch.includes("noarray");
//         let iterator =ifcase? obj[itkey]: {[obj.switchObj.objkey]: {...obj[itkey]}}
//         for(const key in iterator){
//             newobj[0][0].push({[key]:  iterator[key], myswitch:{...obj.myswitch, objkey:obj.myswitch.myswitch[0]==="noarray"?[key]:obj.myswitch.objkey}});
//         }
//         tobackend= ifcase? [obj[itkey]]: [...newobj[0][0]];
//         if(state.checked){
//             let starPoints= itkey==="updategoals" || itkey==="updatemainGoals"? starpointService.calcstarpoints(state.currentstudent.starpoints, state.currentstudent.daystreak, itkey==="updategoals"?50:100):starpointService.calcstarpoints(state.currentstudent.starpoints, state.currentstudent.daystreak, 20)
//             if(itkey==="updategoals" || itkey==="updatemainGoals"){
//             await newobj[0][0].push({starpoints:starPoints, myswitch:{myswitch:["noarray"], objkey:["starpoints"], returnswitch:false, insert:true, next: "currentstudent"}});
//             tobackend.push({starpoints: starPoints,});
//             }
//             newobj[1].level= state.checked? starpointService.getstarpointgoalandlevel(starPoints).level: state.level;
//             newobj[1].spamount= state.checked? starpointService.getstarpointgoalandlevel(starPoints).spamount: state.spamount;
//             newobj[1].spgoal= state.checked? starpointService.getstarpointgoalandlevel(starPoints).spgoal: state.spgoal;
//         }
//         let returnob=  await this.addUpdateDelete({dataObject: newobj[0][1], updateObject:newobj[0][0]});
        
//         let todispatch={...newobj[1]}  
//         for(const renterobj in returnob){
//             todispatch[renterobj]= returnob[renterobj]
//         }
//         return {todispatch:todispatch, tobackend: tobackend}
//     }
//     /**
//      * splites myswitch from objkey
//      * @param {*} obj 
//      * @param {*} myob 
//      * @returns 
//      */
//     getSwitch(obj, myob){
//         let myswitch = ""
//         let objkey = ""
//         for(const key in myob){
//             myswitch=Object.keys(obj)[0].includes(key)? key:"";
//             objkey= Object.keys(obj)[0].includes(key)?Object.keys(obj)[0].slice(myob[key]):"";
//             if(myswitch!==""&& objkey!==""){break}
//         }
//         return{ myswitch:myswitch, objkey:objkey}
//     }
//      /**
//      * 
//      * @param {*} state 
//      * @param {*} obj 
//      * @returns 
//      */
//       async verify(state, obj,){
//         let i = state.currentuser.role==="student"?"":this.compare( state.currentuser.students,  obj.currentstudent? obj.currentstudent:  state.currentstudent )
//         let currentstudent;
//          //pattern 1 verify
//          if(state.currentuser.role==="student"){currentstudent= obj.switchV? await authService.getCurrentUser(): state.currentuser}
//          else{
//              let user= await authService.getCurrentUser()
//              currentstudent= obj.switchV? user.students[i]: state.currentuser.students[i]
//          }
//          return currentstudent;
//     }