import React, { Component } from 'react';
import classNames from 'classnames';

export class AppInlineProfile extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.setState({expanded: !this.state.expanded});
        event.preventDefault();
    }

    render() {
        return  <div>
                    <div className={classNames('profile', {'profile-expanded': this.state.expanded})}>
                        <a onClick={this.onClick}>
                            <img className="profile-image" src="assets/layout/images/avatar.png" alt="Profile"/>
                            <span className="profile-name">Jane Williams</span>
                            <i className="material-icons">keyboard_arrow_down</i>
                        </a>
                    </div>
                    
                    <ul className="ultima-menu profile-menu">
                        <li role="menuitem">
                            <a  className="ripplelink" tabIndex={this.state.expanded ? null : '-1'}>
                                <i className="material-icons">person</i>
                                <span>Profile</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a  className="ripplelink" tabIndex={this.state.expanded ? null : '-1'}>
                                <i className="material-icons">security</i>
                                <span>Privacy</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a  className="ripplelink" tabIndex={this.state.expanded ? null : '-1'}>
                                <i className="material-icons">settings_application</i>
                                <span>Settings</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a  className="ripplelink" tabIndex={this.state.expanded ? null : '-1'}>
                                <i className="material-icons">power_settings_new</i>
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
    }
}