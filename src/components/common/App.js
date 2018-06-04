import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Layout} from 'antd';
import '../../style/index.less';

import SiderCustom from './SiderCustom';
import HeaderCustom from './HeaderCustom';
import MIndex from '../list/List';
import Edit from '../edit/Edit';
import List from '../list/List';
import noMatch from './404';

const {Content, Footer} = Layout;

export default class App extends Component {
    state = {
        collapsed: localStorage.getItem("mspa_SiderCollapsed") === "true",
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        }, function () {
            localStorage.setItem("mspa_SiderCollapsed", this.state.collapsed);
        });
    };

    componentDidMount() {
        //保存Sider收缩
        if (localStorage.getItem("mspa_SiderCollapsed") === null) {
            localStorage.setItem("mspa_SiderCollapsed", false);
        }
    }

    render() {
        const {collapsed} = this.state;
        const {location} = this.props;
        let name;
        if (localStorage.getItem("mspa_user") === null) {
            return <Redirect to="/login"/>
        } else {
            name = location.state === undefined ? JSON.parse(localStorage.getItem("mspa_user")).username : location.state.username;
        }

        return (
            <Layout className="ant-layout-has-sider" style={{height: '100%'}}>
                <SiderCustom collapsed={collapsed} path={location.pathname}/>
                <Layout>
                    <HeaderCustom collapsed={collapsed} toggle={this.toggle} username={name}/>
                    <Content style={{margin: '0 16px'}}>
                        <Switch>
                            <Route exact path={'/app'} component={MIndex} />
                            <Route exact path={'/app/list'} component={List} />
                            <Route exact path={'/app/edit'} component={Edit} />
                            <Route component={noMatch} />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Student.com ©2018-2019 Created by zhanglin
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
