import React, { Component } from 'react';

class InputFormComponent extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind();
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            value: this.props.value,
            min: this.props.min,
            max: this.props.max
        };
    }
    handleChange(e) {


        let { name, value } = e.target;
        this.setState({ value: value });
        this.props.handleChange(e);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            if (this.props.emitClickedOutside() !== undefined)
                this.props.emitClickedOutside(this.state);
        }
    }
    render() {

        let inputType = {
            required: <input
                type={this.props.type}
                className={this.props.class ? this.props.class : "form-control"}
                placeholder={this.props.placeholder}
                onChange={this.handleChange}
                name={this.props.key + this.props.name}
                value={this.state.value}
                min={this.state.min}
                max={this.state.max}
                autocomplete={this.props.autocomplete ? this.props.autocomplete : "off"}
                checked={this.props.checked}
                required
                minlength={this.props.minlength}
                spellcheck={(this.props.type === "password" || this.props.spellcheck === undefined) ? false : this.props.spellcheck}

            />,
            normal: <input
                type={this.props.type}
                className={this.props.class ? this.props.class : "form-control"}
                placeholder={this.props.placeholder}
                onChange={this.handleChange}
                name={this.props.key + this.props.name}
                value={this.state.value}
                min={this.state.min}
                max={this.state.max}
                autocomplete={this.props.autocomplete ? this.props.autocomplete : "off"}

                checked={this.props.checked}
                spellcheck={(this.props.type === "password" || this.props.spellcheck === undefined) ? false : this.props.spellcheck}
                minlength={this.props.minlength}
                maxlength={this.props.maxlength}
            />,
            disabled: <input
                type={this.props.type}
                className={this.props.class ? this.props.class : "form-control"}
                placeholder={this.props.placeholder}
                value={this.state.value}
                disabled


            />
        }




        return (
            <div style={this.props.style}>
                {this.props.label && (<label>{this.props.label}</label>)}
                {inputType[this.props.input]}
                <div className="componentErrorMessage" >{this.props.errorMessage}</div>
            </div>
        );
    }
}



export default InputFormComponent;