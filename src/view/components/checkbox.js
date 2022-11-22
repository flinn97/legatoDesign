import React, { Component } from 'react';
import starpointService from '../../services/starpointService';
import styleService from '../../services/styleService';
import "./checkbox.css"
class Checkedd extends Component {
        constructor(props) {
                super(props);
                this.markcheckbox = this.markcheckbox.bind(this);
                this.state = {
                        checked: { ...this.props.checked },
                        style: styleService.getCustomCheckbox(true),
                }

        }
        componentDidUpdate(props, state) {
                if ((this.props.component?.getJson()?.checked !== state.checked)) {
                        this.setState({ checked: this.props.component?.getJson()?.checked })
                }
        }
        componentDidMount(){
                let style = styleService.getCustomCheckbox(this.props.big);
                this.setState({style: style});
        }

        /**
         * 
         * @param {*} e 
         * @param {*} day 
         * check the box send to backend.
         */
        async markcheckbox(day) {
                //
                let comp = this.props.component
                let component = this.props.component.getJson();
                let checked = { ...this.state.checked }
                checked[day] = !checked[day];
                await this.setState({ checked: checked });
                await this.props.component.checked(day);
                let sp = checked[day] ? { addStarpoints: component.type } : { subStarpoints: component.type };
                this.props.app.dispatch({ ...sp, spRun: true, spid: component.type==="student"? component._id: component.owner });
                //

                        if (component.time &&component.type === "student" &&checked[day]) {
                                this.props.app.dispatch({ popupSwitch: "addTime", currentComponent: this.props.component, forTime: day })
                        }
                
        }

        render() {
                let app = this.props.app;
                let state = app.state;
                let styles = state.styles;
                let component = this.props.component;
                let opps = component?.getOperationsFactory();
                let dispatch = app.dispatch;

                return (

                        <div style={{ 
                                display: "flex", flexDirection: "row", 
                                padding: "4%",
                                }}>
                                <div style={{ 
                                        display: "flex", flexDirection: "column",   }}>
                                        <div style={{
                                               color: styles.colors.colorSubtext, 
                                               fontSize: styles.fonts.fontsize5,
                                               fontSize: component.getJson().check?"10px":"14px",
                                               textAlign: "center"
                                                }}>Mon</div>
                                                {component.getJson().check&&(<>
                                        <input type="checkbox" checked={this.state.checked?.mon} />
                                        <label onClick={this.markcheckbox.bind(this, "mon")} 
                                        className={this.state.style.change} style={{ cursor: "pointer" }}>
                                                
                                                <div className={this.state.style.tick}></div>
                                        </label>
                                        </>)}
                                        {component.getJson().trackTime&&(<>
                                        <div style={{color: styles.colors.colorSubtext, 
                                        fontSize: component.getJson().check?"10px":"14px",
                                        textAlign: "center",
                                        marginTop: "-6px"
                                }}>{this.props.time?.mon}</div></>)}

                                </div>

                                <div style={{ 
                                        display: "flex", flexDirection: "column", marginLeft:!component.getJson().check? "1vw": "0px",  }}>
                                <div style={{
                                        color: styles.colors.colorSubtext, 
                                        fontSize: styles.fonts.fontsize5,
                                        fontSize: component.getJson().check?"10px":"14px",
                                        textAlign: "center"
                                        }}>Tue</div>
                                        {component.getJson().check&&(<>
                                        <input type="checkbox" checked={this.state.checked?.tues} />
                                        <label onClick={this.markcheckbox.bind(this, "tues")} 
                                        className={this.state.style.change} style={{ cursor: "pointer",
                                        }}>
                                                
                                                <div className={this.state.style.tick}></div>
                                        </label></>)}
                                        {component.getJson().trackTime&&(<>
                                        <div style={{color: styles.colors.colorSubtext, 
                                        fontSize: component.getJson().check?"10px":"14px",
                                        textAlign: "center",
                                        marginTop: "-6px"
                                }}>{this.props.time?.tues}</div></>)}

                                </div>

                                <div style={{ 
                                        display: "flex", flexDirection: "column" , marginLeft:!component.getJson().check? "1vw": "0px", }}>
                                <div style={{
                                        color: styles.colors.colorSubtext, 
                                        fontSize: styles.fonts.fontsize5,
                                        fontSize: component.getJson().check?"10px":"14px",
                                        textAlign: "center"
                                        }}>Wed</div>
                                        {component.getJson().check&&(<>
                                        <input type="checkbox" checked={this.state.checked?.wed} />
                                        <label onClick={this.markcheckbox.bind(this, "wed")} 
                                        className={this.state.style.change} style={{ cursor: "pointer" }}>
                                                
                                                <div className={this.state.style.tick}></div>
                                        </label></>)}
                                        {component.getJson().trackTime&&(<>
                                        <div style={{color: styles.colors.colorSubtext, 
                                        fontSize: component.getJson().check?"10px":"14px",
                                        textAlign: "center",
                                        marginTop: "-6px"
                                }}>{this.props.time?.wed}</div></>)}

                                </div>

                                <div style={{ 
                                        display: "flex", flexDirection: "column", marginLeft:!component.getJson().check? "1vw": "0px", }}>
                                <div style={{
                                        color: styles.colors.colorSubtext, 
                                        fontSize: styles.fonts.fontsize5,
                                        fontSize: component.getJson().check?"10px":"14px",
                                        textAlign: "center"
                                        }}>Thur</div>
                                        {component.getJson().check&&(<>
                                        <input type="checkbox" checked={this.state.checked?.thur} />
                                        <label onClick={this.markcheckbox.bind(this, "thur")} 
                                        className={this.state.style.change} style={{ cursor: "pointer" }}>
                                                
                                                <div className={this.state.style.tick}></div>
                                        </label></>)}
                                        {component.getJson().trackTime&&(<>
                                        <div style={{color: styles.colors.colorSubtext, 
                                        fontSize: component.getJson().check?"10px":"14px",
                                        textAlign: "center",
                                        marginTop: "-6px"
                                }}>{this.props.time?.thur}</div></>)}

                                </div>

                                <div style={{ 
                                        display: "flex", flexDirection: "column", marginLeft:!component.getJson().check? "1vw": "0px",  }}>
                                <div style={{
                                        color: styles.colors.colorSubtext, 
                                        fontSize: styles.fonts.fontsize5,
                                        fontSize: component.getJson().check?"10px":"14px",
                                        textAlign: "center"
                                        }}>Fri</div>
                                        {component.getJson().check&&(<>
                                        <input type="checkbox" checked={this.state.checked?.fri} />
                                        <label onClick={this.markcheckbox.bind(this, "fri")} 
                                        className={this.state.style.change} style={{ cursor: "pointer" }}>
                                               
                                                <div className={this.state.style.tick}></div>
                                        </label></>)}
                                        {component.getJson().trackTime&&(<>
                                        <div style={{color: styles.colors.colorSubtext, 
                                        fontSize: component.getJson().check?"10px":"14px",
                                        textAlign: "center",
                                        marginTop: "-6px"
                                }}>{this.props.time?.fri}</div></>)}

                                </div>
                                <div style={{ 
                                        display: "flex", flexDirection: "column", marginLeft:!component.getJson().check? "1vw": "0px",  }}>
                                <div style={{
                                        color: styles.colors.colorSubtext, 
                                        fontSize: styles.fonts.fontsize5,
                                        fontSize: component.getJson().check?"10px":"14px",
                                        textAlign: "center"
                                        }}>Sat</div>
                                        {component.getJson().check&&(<>
                                        <input type="checkbox" checked={this.state.checked?.sat} />
                                        <label onClick={this.markcheckbox.bind(this, "sat")} 
                                        className={this.state.style.change} style={{ cursor: "pointer" }}>
                                                
                                                <div className={this.state.style.tick}></div>
                                        </label></>)}
                                        {component.getJson().trackTime&&(<>
                                        <div style={{color: styles.colors.colorSubtext, 
                                        fontSize: component.getJson().check?"10px":"14px",
                                        textAlign: "center",
                                        marginTop: "-6px"
                                }}>{this.props.time?.sat}</div></>)}

                                </div>
                                <div style={{ display: "flex", flexDirection: "column" , marginLeft:!component.getJson().check? "1vw": "0px"}}>
                                <div style={{
                                        color: styles.colors.colorSubtext, 
                                        fontSize: styles.fonts.fontsize5,
                                        fontSize: component.getJson().check?"10px":"14px",
                                        textAlign: "center"
                                        }}>Sun</div>
                                        {component.getJson().check&&(<>
                                        <input type="checkbox" checked={this.state.checked?.sun} />
                                        <label onClick={this.markcheckbox.bind(this, "sun")} 
                                        className={this.state.style.change} style={{ cursor: "pointer" }}>
                                                
                                                <div className={this.state.style.tick}></div>
                                        </label></>)}
                                        {component.getJson().trackTime&&(<>
                                        <div style={{color: styles.colors.colorSubtext, 
                                        fontSize: component.getJson().check?"10px":"14px",
                                        textAlign: "center",
                                        marginTop: "-6px"
                                }}>{this.props.time?.sun}</div></>)}

                                </div>
                        </div>
                )
        }
}

export default Checkedd;