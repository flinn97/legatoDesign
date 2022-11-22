import {Student, Notes, Goals, UserThings, Homework, Starpoints, Post, ChatRoom, Badge } from "../model/myComponents.js"
import BaseClass from "./baseClass";

class Factory {
    operationsFactory;

    factory ={
        post: Post,
        chatroom: ChatRoom,
        starpoints: Starpoints,
        baseClass: BaseClass,
        homework: Homework,
        user:  UserThings,
        goal:  Goals,
        mainGoal: Goals,
        notes:  Notes,
        student:  Student,
        badge: Badge
    }
    registerComponents(register){
        this.factory[register.name]= register.component;
    }
    setOperationsFactory(operationsFactory){
        this.operationsFactory= operationsFactory
    }

    getComponent(obj){
        // 
        let key = Object.keys(this.factory).includes(obj.component)? obj.component:"baseClass"
        let comp = new this.factory[key](this.operationsFactory);
        comp.setJson({...comp.getJson(), ...obj.json});
        return comp;      
    }
}
export default Factory;