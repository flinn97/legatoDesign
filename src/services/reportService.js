import moment from 'moment';
import calendarService from './calendarService';

class ReportService {

    async createCurrentReport(componentList, studentID, doNotUpdate) {
        
        
        let opps =await  componentList.getOperationsFactory();
        
        let currentReport = await componentList.getList('report', studentID);
        
        currentReport = await currentReport.filter((obj) => {
            let thisMonday = calendarService.getMostRecentMonday();
            let start = obj.getJson().start;
            return start === thisMonday
        })[0];

        let currentStudent = componentList.getComponent("student", studentID);
        let checks = {...currentStudent.getJson().checked};
        let time = {...currentStudent.getJson().time};
        let check = currentStudent.getJson().check;
        let trackTime = currentStudent.getJson().trackTime;
        if (!currentReport) {

            let startDay = calendarService.getMostRecentMonday();
            let endDay = calendarService.getUpcomingSunday();
            
            let currentReportJson = {owner: studentID,checked: {mon: false,tues: false,wed: false,thur: false,fri: false,sat: false,sun: false,},
            time:{mon: '0',tues:'0',wed: '0',thur: '0',fri: '0',sat: '0',sun: '0'}, type: "report", start: startDay, end: endDay, trackTime:trackTime, check:check}
            // if(!currentStudent.getJson().firstReportCreated){
            //     currentReportJson= { owner: studentID, checked: checks, time: time, type: "report", start: startDay, end: endDay, trackTime:trackTime, check:check };
               
               
               
            // }
            

            
            
                await opps.cleanJsonPrepare({ addreport: currentReportJson });
                currentReport = opps.getUpdater('add')[0];


                    
                    
                


                if(!doNotUpdate){
                await opps.run();
                if(currentStudent.getJson().firstReportCreated){
                    await currentStudent.clearChecks();
                    await currentStudent.clearTime();
                    
                }
                else{
                    // await currentStudent.setJson({...currentStudent.getJson(), firstReportCreated:true});
                    await currentStudent.clearChecks();
                    await currentStudent.clearTime();
                }
               
            }
            else{
                opps.clearUpdater();
            }
            

        }
        else {
            await currentReport.setJson({ ...currentReport.getJson(), checked: checks, time: time })
            if(!doNotUpdate){
            await opps.cleanPrepareRun({ update: currentReport, trackTime:trackTime, check:check })
            }
        }
        return currentReport;
    }


    checkIfNewWeek(){

    }



    async getAllReportsFromNow(componentList, studentID) {
        
        
        let cal = await calendarService.generatePastWeeks();
        let list = componentList.getList('report', studentID);
        let opps = componentList.getOperationsFactory();
        let i = 0;
        for(let i = 0; i<cal.length; i++){
            let week = cal[i];
            let report = list.filter(obj => obj.getJson().start ===week.mon)[0];
            if(!report){
                let startDay = week.mon;
                let endDay = cal[i-1].sun;
                let currentReportJson = { owner: studentID, checked: {mon: false,tues: false,wed: false,thur: false,fri: false,sat: false,sun: false,},
                time:{mon: '0',tues:'0',wed: '0',thur: '0',fri: '0',sat: '0',sun: '0'}, type: "report", start: startDay, end: endDay, trackTime:true, check:true }
                await opps.cleanJsonPrepareRun({ addreport: currentReportJson });
                
            }

        }

    }

    async getLastWeeksReport(componentList, studentID, currentReport, reverse){
        
        let cal = await calendarService.generatePastWeeks();
        let i = 0
        for(i; i<=cal.length; i++){
            if(currentReport.getJson().start === cal[i].mon){
                break;
            }
        }
        let reportStart = cal[reverse?i-1:i+1].mon;
        let list = componentList.getList('report', studentID).filter(obj=>obj.getJson().start=== reportStart);
        let lastWeeksReport =  list[0];
        return lastWeeksReport


    }
    


}
export default new ReportService();