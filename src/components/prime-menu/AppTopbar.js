import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {InputText} from 'primereact/components/inputtext/InputText';

export class AppTopbar extends Component {

    static defaultProps = {
        onMenuButtonClick: null,
        onTopbarMenuButtonClick: null,
        onTopbarItemClick: null,
        profileMode: null,
        horizontal: false,
        topbarMenuActive: false,
        activeTopbarItem: null,
        onRightPanelButtonClick: null
    }

    static propTypes = {
        onMenuButtonClick: PropTypes.func.isRequired,
        onTopbarMenuButtonClick: PropTypes.func.isRequired,
        onTopbarItemClick: PropTypes.func.isRequired,
        profileMode: PropTypes.string.isRequired,
        horizontal: PropTypes.bool.isRequired,
        topbarMenuActive: PropTypes.bool.isRequired,
        activeTopbarItem: PropTypes.string,
        onRightPanelButtonClick: PropTypes.func.isRequired
    }

    constructor() {
        super();
        this.state = {};
    }

    onTopbarItemClick(event, item) {
        if(this.props.onTopbarItemClick) {
            this.props.onTopbarItemClick({
                originalEvent: event,
                item: item
            });
        }
    }

    render() {
        let topbarItemsClassName = classNames('topbar-items animated fadeInDown', {'topbar-items-visible': this.props.topbarMenuActive});

        return <div className="topbar clearfix">
                    <div className="topbar-left">            
                        <div className="logo"></div>
                    </div>

                    <div className="topbar-right">
                        <a id="menu-button" onClick={this.props.onMenuButtonClick}>
                            <i></i>
                        </a>
                        
                        <a id="rightpanel-menu-button" onClick={this.props.onRightPanelButtonClick}>
                            <i className="material-icons">more_vert</i>
                        </a>
                        
                        <a id="topbar-menu-button" onClick={this.props.onTopbarMenuButtonClick}>
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className={topbarItemsClassName}>
                            {(this.props.profileMode === 'top' || this.props.horizontal) && 
                                <li className={classNames('profile-item', {'active-top-menu': this.props.activeTopbarItem === 'profile'})}>

                                    <a onClick={(e) => this.onTopbarItemClick(e, 'profile')}>
                                        <img className="profile-image" src="assets/layout/images/avatar.png" alt="Profile"/>
                                        <span className="topbar-item-name">Jane Williams</span>
                                    </a>
                                
                                    <ul className="ultima-menu animated fadeInDown">
                                        <li role="menuitem">
                                            <a >
                                                <i className="material-icons">person</i>
                                                <span>Profile</span>
                                            </a>
                                        </li>
                                        <li role="menuitem">
                                            <a >
                                                <i className="material-icons">security</i>
                                                <span>Privacy</span>
                                            </a>
                                        </li>
                                        <li role="menuitem">
                                            <a >
                                                <i className="material-icons">settings_applications</i>
                                                <span>Settings</span>
                                            </a>
                                        </li>
                                        <li role="menuitem">
                                            <a >
                                                <i className="material-icons">power_settings_new</i>
                                                <span>Logout</span>
                                            </a>
                                        </li>
                                    </ul>
                            </li>}

                            <li className={classNames({'active-top-menu': this.props.activeTopbarItem === 'settings'})}>
                                <a onClick={(e) => this.onTopbarItemClick(e, 'settings')}>
                                    <i className="topbar-icon material-icons">settings</i>
                                    <span className="topbar-item-name">Settings</span>
                                </a>
                                <ul className="ultima-menu animated fadeInDown">
                                    <li role="menuitem">
                                        <a >
                                            <i className="material-icons">palette</i>
                                            <span>Change Theme</span>
                                        </a>
                                    </li>
                                    <li role="menuitem">
                                        <a >
                                            <i className="material-icons">favorite_border</i>
                                            <span>Favorites</span>
                                        </a>
                                    </li>
                                    <li role="menuitem">
                                        <a >
                                            <i className="material-icons">lock</i>
                                            <span>Lock Screen</span>
                                        </a>
                                    </li>
                                    <li role="menuitem">
                                        <a >
                                            <i className="material-icons">wallpaper</i>
                                            <span>Wallpaper</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className={classNames({'active-top-menu': this.props.activeTopbarItem === 'messages'})}>
                                <a onClick={(e) => this.onTopbarItemClick(e, 'messages')}>
                                    <i className="topbar-icon material-icons animated swing">message</i>
                                    <span className="topbar-badge animated rubberBand">5</span>
                                    <span className="topbar-item-name">Messages</span>
                                </a>
                                <ul className="ultima-menu animated fadeInDown">
                                    <li role="menuitem">
                                        <a  className="topbar-message">
                                            <img src="assets/layout/images/avatar1.png" width="35" alt="avatar1" />
                                            <span>Give me a call</span>
                                        </a>
                                    </li>
                                    <li role="menuitem">
                                        <a  className="topbar-message">
                                            <img src="assets/layout/images/avatar2.png" width="35" alt="avatar2"/>
                                            <span>Sales reports attached</span>
                                        </a>
                                    </li>
                                    <li role="menuitem">
                                        <a  className="topbar-message">
                                            <img src="assets/layout/images/avatar3.png" width="35" alt="avatar3"/>
                                            <span>About your invoice</span>
                                        </a>
                                    </li>
                                    <li role="menuitem">
                                        <a  className="topbar-message">
                                            <img src="assets/layout/images/avatar2.png" width="35" alt="avatar2"/>
                                            <span>Meeting today at 10pm</span>
                                        </a>
                                    </li>
                                    <li role="menuitem">
                                        <a  className="topbar-message">
                                            <img src="assets/layout/images/avatar4.png" width="35" alt="avatar4"/>
                                            <span>Out of office</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className={classNames({'active-top-menu': this.props.activeTopbarItem === 'notifications'})}>
                                <a onClick={(e) => this.onTopbarItemClick(e, 'notifications')}>
                                    <i className="topbar-icon material-icons">timer</i>
                                    <span className="topbar-badge animated rubberBand">4</span>
                                    <span className="topbar-item-name">Notifications</span>
                                </a>
                                <ul className="ultima-menu animated fadeInDown">
                                    <li role="menuitem">
                                        <a >
                                            <i className="material-icons">bug_report</i>
                                            <span>Pending tasks</span>
                                        </a>
                                    </li>
                                    <li role="menuitem">
                                        <a >
                                            <i className="material-icons">event</i>
                                            <span>Meeting today at 3pm</span>
                                        </a>
                                    </li>
                                    <li role="menuitem">
                                        <a >
                                            <i className="material-icons">file_download</i>
                                            <span>Download documents</span>
                                        </a>
                                    </li>
                                    <li role="menuitem">
                                        <a >
                                            <i className="material-icons">flight</i>
                                            <span>Book flight</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className={classNames('search-item', {'active-top-menu': this.props.activeTopbarItem === 'search'})}
                                    onClick={(e) => this.onTopbarItemClick(e, 'search')}>
                                <span className="md-inputfield">
                                    <InputText type="text" />
                                    <label>Search</label>
                                    <i className="topbar-icon material-icons">search</i>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>;
    }
}