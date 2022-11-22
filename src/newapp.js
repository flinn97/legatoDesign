import React, { Component } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//uploade above stuff from npm.
import "./App.css";
import AuthService from "./services/auth.service";
import Register from "./pages/usersignup";
import Login from "./pages/signin";
import Home from "./pages/home";
import About from "./pages/about";
import Metro from "./pages/metro";
import Contact from "./pages/contact";
import UsrProfile from "./pages/userProfile";
import Profile from "./pages/profile";
import Calendar from "./pages/calendar";
import StudentsTeacher from "./pages/students.teacher";
import legato from "./legato.png";
import Admin from "./services/admin.js";
import Menu from "./menu.png";

//import BoardUser from "./components/board-user.component";
import Student from "./pages/student";
import student_routes from "./components/student_routes";

//nav bar helps to navigate from page to page with authorizations to login or sign up etc. 
class App extends Component {
    constructor(props) {
        //create state
        super(props);
        this.logOut = this.logOut.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.menu = this.menu.bind(this);

        
        this.state = {
            currentUser: undefined,
            tooSmall: false,
            menu: false
        };
    }
    menu(){
        this.setState({menu:!this.state.menu})
    }
    updateWindowDimensions() {
        if(parseInt(window.innerWidth) <= 600){
        this.setState({ tooSmall: true });
        }
     }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions)
    }
    //get user if it exists from the jwt.sign for browser history. I don't use cookies for this app.
    componentDidMount() {
        window.addEventListener("resize", this.updateWindowDimensions());

        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
            
            });
        }
    }
    //logout
    logOut() {
        AuthService.logout();
    }

    render() {
        const align = {
            paddingRight: "30px",
            position: "absolute",
            right: 0,
            top: 0,
            


        };
        
        
        //render navbar and pages according to information sent from backend and jwt.
        const { currentUser} = this.state;

        return (


            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">

                    {currentUser ? (
                    

                        <div className="navbar-nav">
                            
                            {currentUser.role === "student" ?
                                (
                                    <div>
                                        {this.state.tooSmall?(<div><img className="huv" onClick={this.menu} alt="" src={Menu} style={{width:"40px", marginLeft:"20px"}}/></div>):(
                                    <div className="navbar-nav">
                                <li className="nav-item">


                                    <Link
                                        to={{
                                            pathname: "/student_routes",

                                            state: { current: currentUser }
                                        }}
                                        className="nav-link"   >

                                            Dashboard
                                    </Link>
                                    </li>
                                   

                                    <div className="navbar-nav">



                                <li className="nav-item">
                                    <Link to={"/metro"} className="nav-link">
                                                Metronome
                </Link>
                                </li>

                                        </div>
                                        <div className="navbar-nav">



                                            <li className="nav-item">
                                                <Link to={"/students.teacher"} className="nav-link">
                                                    My Teacher
                </Link>
                                            </li>

                                        </div>
                                        </div>)}

                                        </div>

                                ) : (
                                    <div>
                                    {this.state.tooSmall?(<div><img className="huv" onClick={this.menu} alt="" src={Menu} style={{width:"40px", marginLeft:"20px"}}/></div>):(

                                    <div className="navbar-nav">
                                <li className="nav-item">
                                    <Link to={"/userProfile"} className="nav-link" >
                                        {currentUser.firstname}
                                    </Link>
                                </li>
                            
                            
                            <div className="navbar-nav">



                                <li className="nav-item">
                                    <Link to={"/profile"} className="nav-link">
                                                Students
                </Link>
                                </li>

                            </div>
                            <div className="navbar-nav">



                                <li className="nav-item">
                                    <Link to={"/metro"} className="nav-link">
                                                Metronome
                </Link>
                                </li>

                            </div>
                            <div className="navbar-nav">



                                <li className="nav-item">
                                    <Link to={"/calendar"} className="nav-link">
                                                Calendar
                </Link>
                                </li>

                                        </div>
                                    </div>
                                    )}</div>
                                )
                                        }
                            <div className="navbar-nav" style={{ marginRight:"300px"}}>
                                {currentUser.role === "admin" ? (<div className="navbar-nav" >
                                    <li className="nav-item">
                                        <a href="/admin" className="nav-link" >
                                            Admin
                </a>
                                    </li>
                                </div>
                                    )
                                    :
                                    (<div></div>)}
                            </div>
                            {this.state.tooSmall?(<div></div>):(

<div className="navbar-nav" style={align}>
<li className="nav-item">
    <a href="/login" className="nav-link" onClick={this.logOut}>
        LogOut
</a>
</li>
        </div>
                            )}
                            
                                
                    </div>
                    ) : (
                            <div className="navbar-nav">
                            <div className="navbar-nav">

                
                                    {/* <Link to={"/"} className="navbar-brand">
                                        <img
                                            src={legato}
                                            alt="profile-img"
                                            width="50px"
                                            height="50px"


                                        />

                                    </Link>*/}
                    <div className="navbar-nav">
                        

                        
                                        {/*<li className="nav-item">
                                <Link to={"/about"} className="nav-link">
                                    About
                </Link>
                            </li>*/}
                        
                    </div>
                    <div className="navbar-nav">



                        {/*<li className="nav-item">
                            <Link to={"/contact"} className="nav-link">
                                Contact
                </Link>
                        </li>*/}

                    </div>
                                </div>
                                
                                <div className="navbar-nav ml-auto" style={align}  >
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link">
                                        Login
                </Link>
                                    </li>
                                    {/* 
                                <li className="nav-item">
                                    <Link to={"/register"} className="nav-link">
                                        Sign Up
                </Link>
                                    </li>*/}

                            </div>
                            </div>
                        )}
                        
                    
                            
                </nav>
                {this.state.menu?(<div style={{display: "flex", flexDirection:"column", position: "absolute", zIndex:"2000", background:"white", color:"#696eb5", border:"1px solid gray", borderRadius: "0px 0px 5px 5px", }}>
                    {currentUser.role === "student"?(<div><div onClick={this.menu} >


                                    <Link
                                        to={{
                                            pathname: "/student_routes",

                                            state: { current: currentUser }
                                        }}
                                        className="nav-link"   style={{ color:"#696eb5"}}>

                                            Dashboard
                                    </Link>
                                    </div>
                                   

                                    <div >



                                    <div onClick={this.menu}>
                                    <Link to={"/metro"} className="nav-link" style={{ color:"#696eb5"}}>
                                                Metronome
                </Link>
                </div>

                                        </div>
                                        <div >



                                        <div onClick={this.menu}>
                                                <Link to={"/students.teacher"} className="nav-link" style={{ color:"#696eb5"}}>
                                                    My Teacher
                </Link>
                </div>

                                        </div>
                                        
<div style={{ color:"#696eb5"}}>
                        <div onClick={this.menu}>
                            <a href="/login" className="nav-link" onClick={this.logOut} style={{ color:"#696eb5"}}>
                                LogOut
                </a>
                        </div>
                                </div>
                                        </div>):(<div>
                                            <div >
                                            <div >



<div onClick={this.menu}>
<Link to={"/userProfile"} className="nav-link" style={{ color:"#696eb5"}}>
                                        {currentUser.firstname}
                                    </Link>
</div>

</div>
                                        
                                
                            
<div >



<div onClick={this.menu}>
<Link to={"/profile"} className="nav-link" style={{ color:"#696eb5"}}>
                                                Students
                </Link>
</div>

</div>
<div >



<div onClick={this.menu}>
<Link to={"/metro"} className="nav-link" style={{ color:"#696eb5"}}>
                                                Metronome
                </Link>
</div>

</div>
<div >



<div onClick={this.menu}>
<Link to={"/calendar"} className="nav-link" style={{ color:"#696eb5"}}>
                                                Calendar
                </Link>
</div>

</div>
<div style={{ color:"#696eb5"}}>
                        <div onClick={this.menu}>
                            <a href="/login" className="nav-link" onClick={this.logOut} style={{ color:"#696eb5"}}>
                                LogOut
                </a>
                        </div>
                                </div>
                        
                           



                                
                            
                                

                                       
                                    </div>
                                        </div>)}
                                </div>):(<div></div>)}

                
                <div className="myContainer">
                    

                    <Switch >
                        <Route exact path={["/", "/home"]} component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/profile" component={Profile} />
                       
                        <Route path="/student/" component={Student} />
                        <Route exact path="/admin" component={Admin} />

                        <Route exact path="/student_routes" component={student_routes} />
                        <Route exact path="/metro" component={Metro} />
                        <Route exact path="/userProfile" component={UsrProfile} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/contact" component={Contact} />
                        <Route exact path="/calendar" component={Calendar} />
                        <Route exact path="/students.teacher" component={StudentsTeacher} />

                    
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;

 /**
     * 
     * @param {*} obj 
     * @returns an obdated copy of any object passed to it.
     * factory. Pass in A: data object to be updated, B: The key to the data to be uploaded. C: the thing to upload with. D: Some misc stuff to do other actions.
     
  addUpdateDelete(obj) {
        
    let dataobject= obj.realobject
    let mainob = obj.updateobj;
    let objs= obj.objs;
    let spliceadd = dataobject[obj.addsplice];
    for(const key in mainob){
    let i= obj.myswitch !=="noarray" && obj.myswitch !=="add"? this.compare(obj.addsplice? spliceadd:objs, mainob[key]): 0;
        switch(obj.myswitch){
            case "add":
                objs.push(mainob[key]);
                break;
            case "del":
                objs.splice(i, 1);
                break;
            case "update":
                objs[i]= mainob[key];
                break;
            case "noarray":
                dataobject[key]= mainob[key];
                break;
            case "splice":
                objs.push(mainob[key]);
                spliceadd.splice(i, 1);
                dataobject[obj.addsplice]= spliceadd;
                break;
        }
    }
    if(obj.myswitch!=="noarray"){dataobject[Object.keys(obj.updateobj)[0]]= objs}
    return  dataobject;
    }*/