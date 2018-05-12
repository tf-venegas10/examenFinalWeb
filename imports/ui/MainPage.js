import React, {Component} from 'react';
import RealChart from "./D3/RealChart";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import "/imports/api/Comments.js";
import Subheader from 'material-ui/Subheader';
import Slider from 'material-ui/Slider';

// App component - represents the whole app

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agency: "",
            route: "",
            buses: [],
            comment: "",
            type: -1,
            types: [],
            secondSlider: 1,
        };
        this.handleChangeAgency = this.handleChangeAgency.bind(this);
        this.handleChangeRoute = this.handleChangeRoute.bind(this);
        this.comment = this.comment.bind(this);
        this.changeCommentText = this.changeCommentText.bind(this);
        this.handleTypeOfRoute = this.handleTypeOfRoute.bind(this);
        this.handleSecondSlider = this.handleSecondSlider.bind(this);
    }



    handleSecondSlider = (event, value) => {

        this.setState({secondSlider: value});

    };

    handleChangeAgency(event, index, value) {
        this.setState((prevState) => {
            if (prevState.agency !== value) {
                return {agency: value, buses: [], route: "", types: "", type: -1}
            }
        });
        if (value) {
            Meteor.call('buses.getRoutesList', value, (err, res) => {
                if (err) throw err;

                this.setState({routes: res});

            })
        }
    }

    handleChangeRoute(event, index, value) {
        this.setState((prevState) => {
            if (prevState.route !== value && !value) {
                return {route: value, types: "", type: -1}
            }
            else {
                return {route: value}
            }
        });
        if (value) {
            Meteor.call("buses.getRoute", this.state.agency, value, (err, res) => {
                    if (err) throw err;
                    else {

                        this.setState({types: res.route});
                    }
                }
            );
        }
    }

    handleTypeOfRoute(event, index, value) {
        this.setState({type: value});

        if ((value|| value===0) && value !== -1) {
            this.selectedRoute = this.state.types[value];
            this.buses = [];
            /**
             * Otro error a veces .tr no es un arreglo
             */
            if (!Array.isArray(this.state.types[value].tr)) {
                let route = this.state.types[value].tr.stop.filter((d) => d.content !== "--");
                route.forEach((d) => d.date = new Date(+d.epochTime));
                this.buses.push(route);
            }
            else {
                for (let bus of this.state.types[value].tr) {
                    let route=[];
                    if(bus.stop) {
                        route = bus.stop.filter((d) => d.content !== "--");
                    }
                    /**
                     * Hay un error con la hora, esto da la hora GMT o local tocaría acomodarla a la zona horaria.
                     */
                    route.forEach((d) => d.date = new Date(+d.epochTime));
                    this.buses.push(route);
                }
            }


            this.setState({buses: this.buses})
        }
        else {
            this.setState({buses: []})
        }
    }

    componentDidMount() {
        Meteor.call("buses.getAgencyList", (err, res) => {
                if (err) throw err;
                else {
                    this.setState({agencies: res});
                }
            }
        );
    }

    comment() {
        if (Meteor.user().username) {
            Meteor.call("comments.insert", this.state.comment, Meteor.user().username, this.state.agency, this.state.route, this.state.type)
        }
    }


    changeCommentText(e) {
        this.setState({comment: e.target.value});
    }

    clickOnComment(agency, route, type) {
        this.setState({agency: agency, route: route, type: type});

        Meteor.call("buses.getRoute", agency, route, (err, res) => {
                if (err) throw err;
                else {
                    this.setState({types: res.route});

                    this.selectedRoute = res.route[type];
                    this.buses = [];
                    /**
                     * Otro error a veces .tr no es un arreglo
                     */
                    if (!Array.isArray(res.route[type].tr)) {
                        let route = res.route[type].tr.stop.filter((d) => d.content !== "--");
                        route.forEach((d) => d.date = new Date(+d.epochTime));
                        this.buses.push(route);
                    }
                    else {
                        for (let bus of res.route[type].tr) {
                            let route=[];
                            if(bus.stop) {
                                route = bus.stop.filter((d) => d.content !== "--");
                            }
                            /**
                             * Hay un error con la hora, esto da la hora GMT o local tocaría acomodarla a la zona horaria.
                             */
                            route.forEach((d) => d.date = new Date(+d.epochTime));
                            this.buses.push(route);
                        }
                    }


                    this.setState({buses: this.buses})

                }
            }
        );

        Meteor.call('buses.getRoutesList', agency, (err, res) => {
            if (err) throw err;
            this.setState({routes: res});

        })
    }

    render() {


        let menuItems = [];
        menuItems.push(<MenuItem key={0} value={""} primaryText="Choose an agency"/>);
        if (this.state.agencies) {
            this.state.agencies.forEach((a) => {
                menuItems.push(<MenuItem key={a.tag} value={a.tag} primaryText={a.title}/>);
            });
        }
        let routeItems = [];
        routeItems.push(<MenuItem key={0} value={""} primaryText="Choose a route"/>);
        if (this.state.routes) {
            this.state.routes.forEach((a) => {
                routeItems.push(<MenuItem key={a.tag} value={a.tag} primaryText={a.title}/>);
            });
        }
        let typeItems = [];
        typeItems.push(<MenuItem key={-1} value={""} primaryText="Choose a service class"/>);
        if (this.state.types) {
            let i = 0;
            this.state.types.forEach((a) => {
                typeItems.push(<MenuItem key={i} value={i} primaryText={a.serviceClass + "-" + a.direction}/>);
                i++;
            });
        }
        let listComments = [];
        if (this.props.comments) {
            let i = 0;
            this.props.comments.forEach((a) => {
                listComments.push(<ListItem onClick={this.clickOnComment.bind(this, a.agency, a.route, a.type)}
                                            key={i++} primaryText={<div>
                    <MuiThemeProvider><Subheader>{a.username}</Subheader></MuiThemeProvider>
                    <div>Agency: <strong>{a.agency}</strong> Route: <strong>{a.route}</strong></div>
                    <br/>
                    <div>Comment:</div>
                    <div>{a.text}</div>
                </div>}/>);
                listComments.push(<Divider key={i++}/>)

            });
        }
        const listScroll = {
            overflowY: listComments.length > 4 ? "scroll" : "auto",
            height: "20em",
        };
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 col-6">
                        <MuiThemeProvider>
                            <DropDownMenu value={this.state.agency} onChange={this.handleChangeAgency}>
                                {menuItems}
                            </DropDownMenu>
                        </MuiThemeProvider>
                        <MuiThemeProvider>
                            <DropDownMenu value={this.state.route} onChange={this.handleChangeRoute}>
                                {routeItems}
                            </DropDownMenu>
                        </MuiThemeProvider>
                        <MuiThemeProvider>
                            <DropDownMenu value={this.state.type} onChange={this.handleTypeOfRoute}>
                                {typeItems}
                            </DropDownMenu>
                        </MuiThemeProvider>
                        <br/>
                        <div className="sliders">
                            <h5>Filter by frame of hours</h5>
                            <MuiThemeProvider>
                                <Slider min={0}
                                        max={1}
                                        step={0.01}
                                        value={this.state.secondSlider}
                                        onChange={this.handleSecondSlider}/>
                            </MuiThemeProvider>
                        </div>
                        <br/>
                        {this.state.type !== -1 ?
                            <div className="comment">
                                <h5>Comment this route</h5>
                                <MuiThemeProvider>
                                    <TextField
                                        hintText="Comment Field"
                                        multiLine={true}
                                        rows={2}
                                        onChange={this.changeCommentText}
                                    />
                                </MuiThemeProvider>
                                <MuiThemeProvider>
                                    <RaisedButton label="Post Comment" onClick={this.comment}/>
                                </MuiThemeProvider>
                            </div>
                            : null}
                        <br/>
                        {(this.props.comments && this.props.comments.length > 0) ?
                            <div className="comments">
                                <h5>Comments on routes:</h5>
                                <MuiThemeProvider>
                                    <List style={listScroll}>
                                        {listComments}
                                    </List>
                                </MuiThemeProvider>
                            </div>
                            : null
                        }
                    </div>
                    <div className="col-sm-8 col-12">
                        <RealChart data={this.state.buses} selectedRoute={this.selectedRoute}
                                   maxVal={this.state.secondSlider}/>
                    </div>
                </div>
            </div>

        );

    }

}