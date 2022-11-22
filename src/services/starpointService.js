
class starpointService {
getstarpointgoalandlevel(starpoints){
    let sp = parseInt(starpoints);
    let track = parseInt(starpoints);
    let goal=0;
    let n;
    for(let i =0; goal<=parseInt(starpoints) &&track>=0; i++ ){
        goal=100*Math.pow(1.5, i)
            sp=goal>sp? sp:sp-goal;
            track= track-goal;
            n=i ;
    }
    return({level: n.toString(), spgoal:goal.toString(), spamount:sp});
}
calcstarpoints(starpoints, streak, points){
    streak = streak===0 ||streak===undefined? 1: parseInt(streak);
    let calc = parseInt(starpoints)+ (streak*parseInt(points));
    return calc.toString()
} 
}
export default new starpointService();

 

