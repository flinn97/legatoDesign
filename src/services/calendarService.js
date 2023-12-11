import moment from 'moment';

class calendarService {
    getTime(obj){
        
        
        let myTime = obj;
        let start = myTime.slice(0, -5);
        let end;
        if(start.length===1){
            end=myTime.substring(1);
        }
        else{
            end=myTime.substring(2);
        }
        start = start==="12"?start:(parseInt(start)-12).toString()
        return start+ ":" + end
    }


    getDay(){
        const currentDate = new Date();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const year = currentDate.getFullYear();
        return `${month}/${day}/${year}`;
    }

    getMostRecentMonday() {
        const currentDate = new Date();
        const currentDay = currentDate.getDay(); // Sunday is 0, Monday is 1, and so on
        const daysSinceMonday = (currentDay + 6) % 7; // Calculate the difference
        const mostRecentMonday = new Date(currentDate);
        
        mostRecentMonday.setDate(currentDate.getDate() - daysSinceMonday);
        
        const month = (mostRecentMonday.getMonth() + 1).toString().padStart(2, '0');
        const day = mostRecentMonday.getDate().toString().padStart(2, '0');
        const year = mostRecentMonday.getFullYear();

        return `${month}/${day}/${year}`;
    }

    getUpcomingSunday() {
        const currentDate = new Date();
        const currentDay = currentDate.getDay(); // Sunday is 0, Monday is 1, and so on
        const daysUntilSunday = (7 - currentDay) % 7; // Calculate the difference
        const upcomingSunday = new Date(currentDate);
        
        upcomingSunday.setDate(currentDate.getDate() + daysUntilSunday);
        
        const month = (upcomingSunday.getMonth() + 1).toString().padStart(2, '0');
        const day = upcomingSunday.getDate().toString().padStart(2, '0');
        const year = upcomingSunday.getFullYear();

        return `${month}/${day}/${year}`;
    }


    formatDate(date) {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }

    generatePastWeeks() {
        const now = new Date();
        const pastWeeks = [];

        for (let i = 0; i <= 13; i++) { // Generate dates for the past 6 months
            const currentDate = new Date(now);
            currentDate.setDate(now.getDate() - i * 7); // Move back i weeks

            const week = {
                mon: this.formatDate(this.getDayOfTheWeek(currentDate, 1)),
                tue: this.formatDate(this.getDayOfTheWeek(currentDate, 2)),
                wed: this.formatDate(this.getDayOfTheWeek(currentDate, 3)),
                thu: this.formatDate(this.getDayOfTheWeek(currentDate, 4)),
                fri: this.formatDate(this.getDayOfTheWeek(currentDate, 5)),
                sat: this.formatDate(this.getDayOfTheWeek(currentDate, 6)),
                sun: this.formatDate(this.getDayOfTheWeek(currentDate, 0)),
            };

            pastWeeks.push(week);
        }

        return pastWeeks;
    }

    getDayOfTheWeek(date, dayIndex) {
        const day = date.getDay();
        const diff = dayIndex - day;
        date.setDate(date.getDate() + diff);
        return date;
    }

   /**
    * 
    * @param {*} students 
    * @returns sorted schedule of students
    */
getOrganizedCalendar(students) {
    //
    let myob={
        Monday: [],
        Tuesday: [],
        Wednesday:[],
        Thursday:[],
        Friday:[],
        Saturday:[],
        Sunday: [],
    }
    for(let i =0; i<students?.length; i++){ 
        if(Object.keys(students[i].getJson().days)[0]){
            let days = students[i].getJson().days;
            for(const day in days){
                let ar =myob[day];
                let s = days[day];
                let schedule;
                if(s[3]===" "){
                    schedule= s[0]+":"+s.substr(1);
                }
                else{

                    let sc = s.substr(0, 2)==="12"? "12":(parseInt(s.substr(0, 2))-12).toString();
                    let scs = ":"+s.substr(2);
                    schedule= sc+scs;
                }
                if(schedule.includes("-1")){
                    schedule="11:00 am";

                }
                if(schedule.includes("-2")){
                    schedule="10:00 am";

                }
                
                ar.push({firstName: students[i].getJson().firstName, lastName: students[i].getJson().lastName, scheduling: schedule, picURL:students[i].getJson().picURL})
            


    ar.sort(function (a, b) {
        a.schedule = a.scheduling[4]===" "? parseInt((a.scheduling[0]+a.scheduling.substr(2, 3))): parseInt((a.scheduling.substr(0, 1)+a.scheduling.substr(3, 4)))
        b.schedule = b.scheduling[4]===" "? parseInt((b.scheduling[0]+b.scheduling.substr(2, 3))): parseInt((b.scheduling.substr(0, 1)+b.scheduling.substr(3, 4)))
        return a.schedule - b.schedule;
    });
    ar.sort(function (a, b) {
        a.schedule = a.scheduling.endsWith("am")? 1: 0
        b.schedule = b.scheduling.endsWith("am")? 1: 0
        return b.schedule - a.schedule;
    });
    myob[day]=ar
        }
    }
}

return myob
}
}
export default new calendarService();