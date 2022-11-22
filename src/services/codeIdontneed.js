// // /**
// //  * 
// //  * @param {*} goal 
// //  * @param {*} maingoals 
// //  * @param {*} mainGoal 
// //  * @param {*} add 
// //  * @param {*} del 
// //  * @returns new updated list of a students goals.
// //  */
// //  updateAddGoals(goal, maingoals, mainGoal, myswitch, archive ) {
    
// //     let mainG = mainGoal;
// //     let currentmains= maingoals;
// //     let myarchive=archive;
// //     let i=this.compare(maingoals, mainG)
// //     let j= this.compare(mainG.mainGoal.goals, goal? goal: {id:1}, true)
// //     switch(myswitch){
// //         case "addmain":
// //             currentmains.push(mainG);
// //             break;
// //         case "addgoal":
// //             currentmains[i].mainGoal.goals.push(goal);
// //             break;
// //         case "delmain":
// //             currentmains.splice(i, 1);
// //             break;
// //         case "delgoal":
// //             currentmains[i].mainGoal.goals.splice(j, 1);
// //             break;
// //         case "updatemain":
// //             currentmains[i]= mainG;
// //             break;
// //         case "updategoal":
// //             currentmains[i].mainGoal.goals[j]= goal
// //             break;
// //         case "archivegoal":
// //             myarchive.push(mainG);
// //             currentmains.splice(i, 1);
// //             break;
// //         case "delarchivegoal":
// //             let a=this.compare(myarchive, mainG)
// //             myarchive.splice(a, 1);
// //             break;

// //     }
// //     return myswitch==="archivegoal"||myswitch==="delarchivegoal"? {currentmains:currentmains, archive: myarchive} :currentmains;
// //     }
// //     /**
// //      * 
// //      * @param {*} homework 
// //      * @param {*} homeworks 
// //      * @param {*} myswitch 
// //      * @returns updated homework array
// //      */
// //     updateAdddelhomework(homework, homeworks, myswitch ) {
        
// //         let myhomework = homework;
// //         let myhomeworks = homeworks;
// //         let i=this.compare(myhomeworks, myhomework, true)
// //         switch(myswitch){
// //             case "addhomework":
// //                 myhomeworks.push(myhomework);
// //                 break;
// //             case "delhomework":
// //                 myhomeworks.splice(i, 1);
// //                 break;
// //             case "updatehomework":
// //                 myhomeworks[i]= homework;
// //                 break;
// //         }
// //         return myhomeworks
// //     }
// //     updateAddDelnotes(note, notes, myswitch, ){
        
// //         let mynote = note;
// //         let mynotes = notes;
// //         let i=this.compare(mynotes, mynote, true)
// //         switch(myswitch){
// //             case "addnote":
// //                 mynotes.push(mynote);
// //                 break;
// //             case "delnote":
// //                 mynotes.splice(i, 1);
// //                 break;
// //             case "updatenote":
// //                 mynotes[i]= mynote;
// //                 break;
// //         }
// //         return mynotes
// //     }
// //         /**
// //      * 
// //      * @param {*} compare 
// //      * @param {*} compare1 
// //      * @param {*} condition 
// //      * @returns i for the compaired two values
// //      */
// //          compare(compare, compare1, condition){
        
// //             let value;
// //             for(let i=0; i<compare.length; i++){
// //                 if(!condition){
// //                 if((compare1._id? compare[i]._id=== compare1._id : compare[i].mainGoal.id=== compare1.mainGoal.id ) ){
// //                         value= i
// //                         break;
// //                 }
// //                 if(compare[i].mainGoal.title===compare1.mainGoal.title){
// //                     value= i
// //                     break;
// //                 }
    
// //                 }
// //                 else if(condition){
// //                     if((compare1._id? compare[i]._id=== compare1._id : compare[i].id=== compare1.id)||compare[i].title=== compare1.title){
// //                     value= i
// //                     break;
// //                     }
     
// //                 }
// //                 else{
// //                     value= false
// //                 }
// //             }
// //             return value
// //         }
// //         checkboxhelp(checked, day, student, students, i, state){
// //             if(state.currentuser.role==="student"){
// //                 let ob = checked;
// //             ob[day]=!ob[day];
// //             student.daysPracticed = ob[day]? (parseInt(student.daysPracticed)+1).toString() : (parseInt(student.daysPracticed)-1).toString()
// //             student.daystreak = ob[day]? (parseInt(student.daystreak)+1).toString() : (parseInt(student.daystreak)-1).toString()
// //             student.starpoints= ob[day]? starpointService.calcstarpoints(parseInt(student.starpoints), parseInt(student.daystreak), 20) : student.starpoints
// //             student.checked= ob;
// //             return({student:  student})
// //             }
// //             else{
    
            
// //             let mystudents= students;
// //             let ob = checked;
// //             ob[day]=!ob[day];
// //             student.daysPracticed = ob[day]? (parseInt(student.daysPracticed)+1).toString() : (parseInt(student.daysPracticed)-1).toString()
// //             student.daystreak = ob[day]? (parseInt(student.daystreak)+1).toString() : (parseInt(student.daystreak)-1).toString()
// //             student.starpoints= ob[day]? starpointService.calcstarpoints(parseInt(student.starpoints), parseInt(student.daystreak), 20) : student.starpoints
// //             student.checked= ob;
// //             mystudents[i] = student;
// //             return({student:  mystudents[i], i:i})
// //             }
            
// //         }
// //         let homeworks =  studentService.updateAdddelhomework(homework, this.props.app.state.currentstudent.homeworks,  myswitch);
// //         await this.props.app.dispatch({[this.props.app.state.currentstudent.homeworks]:homeworks, addhomework:false, showhomework:false})
// //        authService.changeData("student", this.props.app.state.currentstudent._id, this.props.app.state.currentuser._id, {homeworks: homeworks,})
// //    }
// //    async cleartimeorchecks(time){
// //        let timeorchecks=time?  this.props.app.state.currentstudent.hwtime :this.props.app.state.currentstudent.checked;
// //        for(const key in timeorchecks){
// //            timeorchecks[key]= time? "0": false;
// //        }
// //         await this.props.app.dispatch(time?{[this.props.app.state.currentstudent.hwtime]:timeorchecks} : {[this.props.app.state.currentstudent.checked]:timeorchecks,});
// //        authService.changeData("student", this.props.app.state.currentstudent._id, this.props.app.state.currentuser._id, time?{ hwtime: timeorchecks}:{checked: timeorchecks,});
// //    }
// //     //     ;
// //         //     let user = day !=="sun"? await authService.getCurrentUser(): this.props.app.state.currentuser;

// //         // if(this.props.app.homework){
// //         //         //check long term memory
                
// //         //         let i = this.props.app.state.currentuser.role==="student"? studentService.compare(this.props.app.state.currentstudent.homeworks, this.props.app.homework, true) :studentService.compare(this.props.app.state.currentstudent.homeworks, this.props.app.homework, true);
// //         //         let j = this.props.app.state.currentuser.role==="student"? "":studentService.compare( user.students,  this.props.app.state.currentstudent,true)
// //         //         let myhomework= this.props.app.homework
// //         //         let ob =  this.props.app.homework.hwchecked
// //         //         if(this.props.app.state.currentuser.role==="student"){
// //         //                 ob[day]=ob[day] === user.homeworks[i].hwchecked[day]? !ob[day] :  user.homeworks[i].hwchecked[day]

// //         //         }
// //         //         else{
// //         //                 ob[day]=ob[day] === user.students[j].homeworks[i].hwchecked[day]? !ob[day] :  user.students[j].homeworks[i].hwchecked[day]

// //         //         }
// //         //         this.props.app.dispatch({currentuser:user})
// //         //         myhomework.hwchecked=ob
// //         //         await this.props.app.dispatch({[this.props.app.state.currentstudent?.homeworks[i].hwchecked]:ob})
// //         //         authService.changeData("student", this.props.app.state.currentstudent._id, this.props.app.state.currentuser._id, {homeworks: this.props.app.state.currentstudent.homeworks})
// //         // }
// //         // else{
// //         //         await this.props.app.dispatch({currentuser:user})
// //         //         let i = this.props.app.state.currentuser.role==="student"? "": studentService.compare( user.students,  this.props.app.student,true)  
// //         //      let student = this.props.app.state.currentuser.role==="student"? await studentService.checkboxhelp(user.checked, day, user, false, i, this.props.app.state): await studentService.checkboxhelp(user.students[i].checked, day, user.students[i], user.students, i, this.props.app.state)  
// //         //      let mystudent= student.student
             
// //         //      let spstuff = starpointService.getstarpointgoalandlevel(mystudent.starpoints)
// //         //      
// //         // this.props.app.dispatch({[this.props.app.state.currentuser.role==="student"? this.props.app.state.currentuser:mystudent]: student.student, level: spstuff.level, spgoal:spstuff.spgoal, spamount: spstuff.spamount})
// //         // this.props.app.dispatch({currentstudent:mystudent})
// //         // authService.changeData("student", this.props.app.student._id, this.props.app.state.currentuser.role==="student"?this.props.app.state.currentuser.userID:  this.props.app.state.currentuser._id, 
// //         // {checked: mystudent.checked, 
// //         // daysPracticed: mystudent.daysPracticed,
// //         // daystreak:mystudent.daystreak,
// //         // starpoints: mystudent.starpoints
// //         //         })
// //         // }
// // 
       
// // let i = this.props.app.state.currentuser.role==="student"?"":studentService.compare( this.props.app.state.currentuser.students,  this.props.app.state.currentstudent ,true)
// // let j =  studentService.compare(this.props.app.state.currentstudent.mainGoals,  this.props.app.maingoal, );
// // let k = !this.props.app.main? studentService.compare( this.props.app.state.currentuser.role==="student"? this.props.app.state.currentstudent.mainGoals[j].mainGoal.goals: this.props.app.state.currentstudent.mainGoals[j].mainGoal.goals,  this.props.app.goal,  true):0;
// // let user= await authService.getCurrentUser();
// // let mygoal = this.props.app.main? false: this.props.app.goal
// // let maingoal=this.props.app.maingoal
// // if(this.props.app.state.currentuser.role==="student"){
// //     maingoal.mainGoal.complete= this.props.app.main? !user.mainGoals[j].mainGoal.complete: user.mainGoals[j].mainGoal.complete;
// // }
// // else{
// //     maingoal.mainGoal.complete= this.props.app.main? !user.students[i].mainGoals[j].mainGoal.complete: user.students[i].mainGoals[j].mainGoal.complete;
// // }
// // if(mygoal){mygoal.complete= this.props.app.state.currentuser.role==="student"?!user.mainGoals[j].mainGoal.goals[k].complete: !user.students[i].mainGoals[j].mainGoal.goals[k].complete}
// // this.props.app.dispatch({currentuser:user});
// // this.props.app.AddUpdateDeleteArchiveGoal(mygoal, maingoal, this.props.app.myswitch);

// if(this.props.app.homework){
//     let myhomework= this.props.app.homework;
//     let ob =  this.props.app.homework.hwtime;
//     ob[this.props.app.state.dayfortimepopup]=this.props.app.state.timeadded;
//     myhomework.hwtime=ob;
//     let i = studentService.compare(this.props.app.state.currentstudent.homeworks, this.props.app.homework, true);
//     await this.props.app.dispatch({[this.props.app.state.currentstudent?.homeworks[i].hwtime]:ob});
//     authService.changeData("student", this.props.app.state.currentstudent._id, this.props.app.state.currentuser._id, {homeworks: this.props.app.state.currentstudent.homeworks});
// }
// else{
//     let ob= this.props.app.state.currentstudent?.hwtime;
//     ob[this.props.app.state.dayfortimepopup]=this.props.app.state.timeadded;
//     let mins = 0
//     for(const key in ob){
//         mins+= parseInt(ob[key])
//     }
//     let student= this.props.app.state.currentstudent
//     student.timeTotal=mins;
//     student.hwtime=ob;
//     await this.props.app.dispatch({[this.props.app.state.currentstudent]:student});
//     authService.changeData("student", this.props.app.state.currentstudent._id, this.props.app.state.currentuser._id, {hwtime: this.props.app.state.currentstudent.hwtime, timeTotal:mins });
// }
//    // let n = parseInt(starpoints)<100? 0: Math.ciel((Math.log(parseInt(starpoints)/100))/(Math.log(1.5)));
//     //    let goal = parseInt(starpoints)<=100? 100: 100*(Math.pow(1.5, n));
//     /*showstarpoints(n, starpoints, goal){
    
    
//     let spgoal = parseInt(goal)===100? 100: this.recursivestarpoints(n-1, starpoints);
//     return spgoal;
// }
// recursivestarpoints(n, starpoints) {
//     if (n < 1) {
//       return parseInt(starpoints)-100;
//     }
//     let expo= 100*Math.pow(1.5, n)
//     let whatsleft= this.recursivestarpoints(n - 1, starpoints);
//     if(whatsleft>expo){
//         return  whatsleft - expo 
//     }
//     else{return whatsleft}

//   }
//   */
// use case average
/**
 *    async progressbar(){
        let percent = 100 / parseInt(this.props.app.goal);
        let calc = percent * parseInt(this.props.app.amount);
        if (calc === 0) {
            this.setState({
                style: "0px",
                height: "0px",
            })
        }
        else {
            if (parseInt(calc) > 100) {
                calc = 100
            }
            this.setState({
                style: calc.toString() + "%",
                height: "40px"
            })
        }
    }
    componentDidMount() {
           this.progressbar();
        }
    componentDidUpdate(props, state){
        if(this.props.app.goal!== props.goal || this.props.app.amount !== props.amount){
            this.progressbar();
        }

    }
 */
    // * 
    // * @param {*} student 
    // * @param {*} obj 
    // * @param {*} i 
    // * @returns updated student with any value I want but also has edge cases solved.
    // */
   // studentUpdateDirect(student, obj, i){
   //     let mystudent = student
   //     
   //     for(const key in obj){
   //         switch(updateswitch){
   //             case "object":
   //                 mystudent[key][obj[key]]= obj.value;
   //                 break;
   //             case "arrobject":
   //                 mystudent[key][i][obj[key]]= obj.value;
   //                 break;
   //             default:
   //                 mystudent[key]= obj[key]
   //                 break;
   //         }
   //     }
   //     return mystudent

   // }        let j = obj.myswitch.search("update")>=0? this.compare(todispatch.currentstudent[obj[Object.keys(obj.obj)]], obj.realobj):0;

   //        // student = await this.studentUpdateDirect(student, obj.obj, Object.keys(obj.obj)[0]==="hwtime"||Object.keys(obj.obj)[0]==="checked"?"noobj":obj.i);
       // todispatch.currentstudent= obj.tostudentdirect ?this.studentUpdateDirect(todispatch.currentstudent,  obj.tostudentdirect): todispatch.currentstudent;

