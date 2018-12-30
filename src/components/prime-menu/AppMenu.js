import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class AppSubmenu extends Component {

    static defaultProps = {
        className: null,
        items: null,
        layoutMode: null,
        menuActive: false,
        onMenuItemClick: null,
        onRootItemClick: null,
        root: false
    }

    static propTypes = {
        className: PropTypes.string,
        items: PropTypes.array,
        layoutMode: PropTypes.string,
        menuActive: PropTypes.bool,
        onMenuItemClick: PropTypes.func,
        onRootItemClick: PropTypes.func,
        root: PropTypes.bool
    }
    
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    onMenuItemClick(event, item, index) {
        //avoid processing disabled items
        if(item.disabled) {
            event.preventDefault();
            return true;
        }
        
        if(this.props.root && this.props.onRootItemClick) {
            this.props.onRootItemClick({
                item: item,
                originalEvent: event
            });
        }
                        
        //execute command
        if(item.command) {
            item.command({originalEvent: event, item: item});
        }

        //prevent hash change
        if(item.items || !item.url) {
            event.preventDefault();
        }

        if(index === this.state.activeIndex)
            this.setState({activeIndex: null});    
        else
            this.setState({activeIndex: index});

        if(this.props.onMenuItemClick) {
            this.props.onMenuItemClick({
                originalEvent: event,
                item: item
            });
        }
    } 
    
    onMenuItemMouseEnter(index) {
        if(this.props.root && this.props.menuActive && this.isHorizontalOrSlim()) {
            this.setState({activeIndex: index});
        }
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.isHorizontalOrSlim() && prevProps.menuActive && !this.props.menuActive) {
            this.setState({activeIndex: null});
        }
    }
    
    isHorizontalOrSlim() {
        return (this.props.layoutMode === 'horizontal' || this.props.layoutMode === 'slim');
    }
    
    render() {
        var items = this.props.items && this.props.items.map((item, i) => {
            let active = this.state.activeIndex === i;
            let styleClass = classNames(item.badgeStyleClass, {'active-menuitem': active});
            let badge = item.badge && <span className="menuitem-badge">{item.badge}</span>;
            let submenuIcon = item.items && <i className="material-icons submenu-icon">keyboard_arrow_down</i>;
            let tooltip = this.props.root && <div className="layout-menu-tooltip">
                                                <div className="layout-menu-tooltip-arrow"></div>
                                                <div className="layout-menu-tooltip-text">{item.label}</div>
                                            </div>;

            return <li className={styleClass} key={i}>
                        <a className="ripplelink" href={item.url||'#'} onClick={(e) => this.onMenuItemClick(e, item, i)} target={item.target}
                            onMouseEnter={(e) => this.onMenuItemMouseEnter(i)}>
                            <i className="material-icons">{item.icon}</i>
                            <span>{item.label}</span>
                            {badge}
                            {submenuIcon}
                        </a>
                        {tooltip}
                        <AppSubmenu items={item.items} onMenuItemClick={this.props.onMenuItemClick} layoutMode={this.props.layoutMode} 
                                    menuActive={this.props.menuActive} />
                    </li>
        });
        
        return <ul className={this.props.className}>{items}</ul>;
    }
}

export class AppMenu extends Component {

    static defaultProps = {
        model: null,
        onMenuItemClick: null,
        onRootMenuItemClick: null,
        layoutMode: null,
        active: false
    }

    static propTypes = {
        model: PropTypes.array,
        layoutMode: PropTypes.string,
        onMenuItemClick: PropTypes.func,
        onRootMenuItemClick: PropTypes.func,
        active: PropTypes.bool
    }

    render() {
        return <AppSubmenu items={this.props.model} className="ultima-menu ultima-main-menu clearfix" 
                menuActive={this.props.active} onRootItemClick={this.props.onRootMenuItemClick}
                onMenuItemClick={this.props.onMenuItemClick} root={true} layoutMode={this.props.layoutMode}/>
    }
}
