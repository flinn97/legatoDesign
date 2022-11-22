import React, { Component } from 'react';
import InputFormComponent from '/componentForms/inputComponent.js'

class ParentFormComponent extends Component {
    constructor(props) {
        //create state
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.prepareOnClick=this.prepareOnClick.bind(this);
        this.state = {
            obj: undefined
        };
    }
    componentDidMount(){
        if(!this.prepareOnClick){
            this.setState({
                obj: this.props.obj? this.props.obj: this.props.app.state.currentComponent
            })
        }
       

    }
    async prepareOnClick(){
        if(this.props.prepareOnClick){
            await this.props.app.dispatch({operate:this.props.prepareOnClick.operate, operation:this.props.prepareOnClick.operation, object:this.props.obj});
            let obj = await this.props.app.state.componentList.getOperationsFactory().getUpdater(this.props.prepareOnClick.operate)[0];
            this.setState({
                obj:obj
            })
        }
        
    }
    handleChange = async (event) => {
    
        const { name, value } = event.target

            this.state.obj.setJson({...this.state.obj.getJson(), [name]:value})
        
        

    }
    
    render() {
        return (
           
            <InputFormComponent 
            id={this.props.id}
            type={this.props.type? this.props.type: 'text'}
            prepareOnClick={this.props.prepareOnClick}
            onClick={this.props.prepareOnClickFunc? this.props.prepareOnClickFunc:this.prepareOnClick}
            style={this.props.style}
            class = {this.props.class} 
            placeholder={this.props.placeholder} 
            handleChange={this.props.func? this.props.func:this.handleChange} 
            name={this.props.name} 
            value={this.state.obj?.getJson()[this.props.name]} 
            min={this.props.min}
            max={this.props.max}
            autocomplete={this.props.autocomplete}
            checked={this.props.checked}
            minlength={this.props.minlength}
            maxlength={this.props.maxlength}
            input={this.props.required? "required": this.props.disabled? "disabled": "normal"}
            requiredMessage={this.props.requiredMessage}
            />
        );
    }
}

export default ParentFormComponent;