import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AppBreadcrumb extends Component {

    static propTypes = {
        match: PropTypes.object
    }

    render() {
        const { location } = this.props;

        return (
            <div className="layout-breadcrumb">
                <ul>
                    <li><a ><i className="material-icons">home</i></a></li>
                    <li>{location.pathname}</li>
                </ul>
    
                <div className="layout-breadcrumb-options">
                    <a title="Backup">
                        <i className="material-icons">backup</i>
                    </a>
                    <a title="Bookmark">
                        <i className="material-icons">bookmark</i>
                    </a>
                    <a title="Logout">
                        <i className="material-icons">power_settings_new</i>
                    </a>
                </div>
            </div>
        );
    }
}