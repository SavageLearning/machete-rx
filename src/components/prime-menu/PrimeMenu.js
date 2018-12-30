import * as React from 'react';
import {Component} from 'react';
import classNames from 'classnames';
import {AppTopbar} from './AppTopbar';
import { AppBreadcrumb } from "./AppBreadcrumb";
import {AppInlineProfile} from './AppInlineProfile';
import {AppFooter} from './AppFooter';
import {AppMenu} from './AppMenu';
import {AppRightPanel} from './AppRightPanel';
import {Route} from 'react-router-dom'
// import {Dashboard} from './components/Dashboard';
// import {FormsDemo} from './components/FormsDemo';
// import {SampleDemo} from './components/SampleDemo';
// import {DataDemo} from './components/DataDemo';
// import {PanelsDemo} from './components/PanelsDemo';
// import {OverlaysDemo} from './components/OverlaysDemo';
// import {MenusDemo} from './components/MenusDemo';
// import {MessagesDemo} from './components/MessagesDemo';
// import {ChartsDemo} from './components/ChartsDemo';
// import {MiscDemo} from './components/MiscDemo';
import {EmptyPage} from './EmptyPage';
// import {UtilsDemo} from './components/UtilsDemo';
//import {Documentation} from './components/Documentation';
import {ScrollPanel} from 'primereact/components/scrollpanel/ScrollPanel';
import { withRouter } from 'react-router';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'fullcalendar/dist/fullcalendar.css';
import './ripple.js';
import './App.css';

class PrimeMenu extends Component {

    constructor() {
        super();
        this.state = {
            layoutMode: 'static',
            profileMode: 'inline',
            overlayMenuActive: false,
            staticMenuDesktopInactive: false,
            staticMenuMobileActive: false,
            rotateMenuButton: false,
            topbarMenuActive: false,
            activeTopbarItem: null,
            darkMenu: false,
            rightPanelActive: false,
            menuActive: false
        };
        
        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.onMenuClick = this.onMenuClick.bind(this);
        this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
        this.onTopbarMenuButtonClick = this.onTopbarMenuButtonClick.bind(this);
        this.onTopbarItemClick = this.onTopbarItemClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.onRootMenuItemClick = this.onRootMenuItemClick.bind(this);
        this.onRightPanelButtonClick = this.onRightPanelButtonClick.bind(this);
        this.onRightPanelClick = this.onRightPanelClick.bind(this);
        this.createMenu();
    }

    onMenuClick(event) {
        this.menuClick = true;

        if(!this.isHorizontal()) {
            setTimeout(() => {this.layoutMenuScroller.moveBar(); }, 500);
        }
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.setState(({
            rotateMenuButton: !this.state.rotateMenuButton,
            topbarMenuActive: false
        }));

        if(this.state.layoutMode === 'overlay') {
            this.setState({
                overlayMenuActive: !this.state.overlayMenuActive
            });
        }
        else {
            if(this.isDesktop())
                this.setState({staticMenuDesktopInactive: !this.state.staticMenuDesktopInactive});
            else
                this.setState({staticMenuMobileActive: !this.state.staticMenuMobileActive});
        }

        event.preventDefault();
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.setState({topbarMenuActive: !this.state.topbarMenuActive});
        this.hideOverlayMenu();
        event.preventDefault();
    }

    onTopbarItemClick(event) {
        this.topbarItemClick = true;

        if(this.state.activeTopbarItem === event.item)
            this.setState({activeTopbarItem: null});
        else
            this.setState({activeTopbarItem: event.item});

        event.originalEvent.preventDefault();
    }

    onMenuItemClick(event) {
        if(!event.item.items) {
            this.hideOverlayMenu();
        }
        if(!event.item.items && (this.isHorizontal() || this.isSlim())) {
            this.setState({
                menuActive: false
            })
        }
    }
    
    onRootMenuItemClick(event) {
        this.setState({
            menuActive: !this.state.menuActive
        });
        
        event.originalEvent.preventDefault();
    }
    
    onRightPanelButtonClick(event) {
        this.rightPanelClick = true;
        this.setState({
            rightPanelActive: !this.state.rightPanelActive
        });
        event.preventDefault();
    }
    
    onRightPanelClick(event) {
        this.rightPanelClick = true;
    }
    
    onDocumentClick(event) {
        if(!this.topbarItemClick) {
            this.setState({
                activeTopbarItem: null,
                topbarMenuActive: false
            });
        }

        if(!this.menuClick) {
            if(this.isHorizontal() || this.isSlim()) {
                this.setState({
                    menuActive: false
                })
            }
            
            this.hideOverlayMenu();
        }
        
        if(!this.rightPanelClick) {
            this.setState({
                rightPanelActive: false
            })
        }

        this.topbarItemClick = false;
        this.menuClick = false;
        this.rightPanelClick = false;
    }
    
    hideOverlayMenu() {
        this.setState({
            rotateMenuButton: false,
            overlayMenuActive: false,
            staticMenuMobileActive: false
        })
    }

    isTablet() {
        let width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.state.layoutMode === 'overlay';
    }

    isHorizontal() {
        return this.state.layoutMode === 'horizontal';
    }
    
    isSlim() {
        return this.state.layoutMode === 'slim';
    }

    changeTheme(theme) {
        this.changeStyleSheetUrl('layout-css', theme, 'layout');
        this.changeStyleSheetUrl('theme-css', theme, 'theme');
    }
    
    changeStyleSheetUrl(id, value, prefix) {
        let element = document.getElementById(id);
        let urlTokens = element.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = prefix + '-' + value + '.css';
        let newURL = urlTokens.join('/');
        element.setAttribute('href', newURL);
    }

    createMenu() {
        this.menu = [
            {label: 'Dashboard', icon: 'dashboard', command:()=>{ window.location = "#/"}},
            {label: 'Sample Page', icon: 'desktop_mac', command:()=>{ window.location = "#/empty"}},
        ];
    }

    render() {
        const layoutContainerClassName = classNames('layout-container', {
            'menu-layout-static': this.state.layoutMode !== 'overlay',
            'menu-layout-overlay': this.state.layoutMode === 'overlay',
            'layout-menu-overlay-active': this.state.overlayMenuActive,
            'menu-layout-slim': this.state.layoutMode === 'slim',
            'menu-layout-horizontal': this.state.layoutMode === 'horizontal',
            'layout-menu-static-inactive': this.state.staticMenuDesktopInactive,
            'layout-menu-static-active': this.state.staticMenuMobileActive
        });
        const menuClassName = classNames('layout-menu', {'layout-menu-dark': this.state.darkMenu});
        const AppBreadCrumbWithRouter = withRouter(AppBreadcrumb);
        
        return (
            <div className="layout-wrapper" onClick={this.onDocumentClick}>
                <div ref={(el) => this.layoutContainer = el} className={layoutContainerClassName}>
                    <AppTopbar profileMode={this.state.profileMode} horizontal={this.props.horizontal} 
                            topbarMenuActive={this.state.topbarMenuActive} activeTopbarItem={this.state.activeTopbarItem}
                            onMenuButtonClick={this.onMenuButtonClick} onTopbarMenuButtonClick={this.onTopbarMenuButtonClick} 
                            onTopbarItemClick={this.onTopbarItemClick} onRightPanelButtonClick={this.onRightPanelButtonClick} />

                    <div className={menuClassName} onClick={this.onMenuClick}>
                        <ScrollPanel ref={(el) => this.layoutMenuScroller = el} style={{height: '100%'}}>
                            <div className="menu-scroll-content">
                                {(this.state.profileMode === 'inline' && this.state.layoutMode !== 'horizontal') && <AppInlineProfile />}
                                <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} onRootMenuItemClick={this.onRootMenuItemClick} 
                                        layoutMode={this.state.layoutMode} active={this.state.menuActive} /> 
                            </div>
                        </ScrollPanel>
                    </div>

                    <div className="layout-main">

                        <AppBreadCrumbWithRouter />

                        <div className="layout-content">

                            {/* <Route path="/" exact component={Dashboard} />
                            <Route path="/forms" component={FormsDemo} />
                            <Route path="/sample" component={SampleDemo} />
                            <Route path="/data" component={DataDemo} />
                            <Route path="/panels" component={PanelsDemo} />
                            <Route path="/overlays" component={OverlaysDemo} />
                            <Route path="/menus" component={MenusDemo} />
                            <Route path="/messages" component={MessagesDemo} />
                            <Route path="/charts" component={ChartsDemo} />
                            <Route path="/misc" component={MiscDemo} />

                            <Route path="/utils" component={UtilsDemo} />
                            <Route path="/documentation" component={Documentation} /> */}
                            <Route path="/empty" component={EmptyPage} />

                        </div>
                    </div>
                    
                    <AppRightPanel expanded={this.state.rightPanelActive} onContentClick={this.onRightPanelClick} />
                    
                    <div className="layout-mask"></div>
                </div>
            </div>
        );
    }
}

export default PrimeMenu;
