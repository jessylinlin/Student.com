//TAB组件

import React, { Component } from 'react';
import { Table, Tabs, Icon, Popconfirm, Card, Input, Button, Layout,  Menu} from 'antd';
import moment from 'moment';
//property
import Property from './Property';

import {connect} from 'react-redux';
import { selectPropertyAction, deSelectPropertyAction, addRoomAction, saveEditedRoomAction, deleteRoomAction, savePropertyAction, selectMenuAction} from '../../store/actions/Edit';


class EditTab extends Component{
    constructor(props){
        super(props);
        this.selectMenu = this.selectMenu.bind(this);
        this.hideAddProperty = this.hideAddProperty.bind(this);
    }

    //设置选中的menu key
    selectMenu = (item) => {
        this.props.selectMenu(item);
        this.hideAddProperty();
        this.props.deselectProperty()
    }

    //隐藏 add property 面板
    hideAddProperty = () => {
        this.props.handleHideAddProperty();
    }   

    render(){
        const { isAddProperty, hideAddProperty} = this.props;  
        const { Header, Content, Footer, Sider } = Layout;
        const dataSource = this.props.propertyData;
        //选中的menu data
        const selectMenuData = dataSource.find(function(value, index, arr) {
          return value.selectMenu;
        })
        //选中的menu key
        const selectedKeys = selectMenuData ? [selectMenuData.id] : [];

        const leftMenu = dataSource.map(function(data) {
            return ( 
                data.room.length > 0 && data.saved ? 
                <Menu.Item key={data.id}>
                    {data.name}
                </Menu.Item> 
                :
                null  
            );
        });

        return(
            <Layout className='edit-layout'>
                <Sider width='260'>
                    <Menu className='edit-menu' onSelect={this.selectMenu} selectedKeys={selectedKeys}>
                        {leftMenu}
                    </Menu>
                </Sider>
                <Content>
                     
                    <div className='property-panel'>
                        <Property 
                            dataSource={ dataSource } 
                            selectedKeys = {selectedKeys}
                            isAddProperty ={this.props.isAddProperty}
                            handlesetDisabledForm = {this.setDisabledForm}
                            handleHideAddProperty = {this.hideAddProperty}
                          >
                        </Property>
                    </div>

                </Content>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    propertyData: state.Edit
  }
}

const mapDispathToProps = (dispatch) => {
  return {
     selectMenu: (data) => {
      dispatch(selectMenuAction(data));
    },
    selectProperty: (data) => {
      dispatch(selectPropertyAction(data));
    },
    deselectProperty: () => {
      dispatch(deSelectPropertyAction());
    },
    addRoom: (data) => {
      dispatch(addRoomAction(data));
    },
    saveRoom: (data) => {
      dispatch(saveEditedRoomAction(data));
    },
    deleteRoom: (data) => {
      dispatch(deleteRoomAction(data));
    },
    saveProperty: () => {
      dispatch(savePropertyAction());
    }
  }
}
export default connect(mapStateToProps, mapDispathToProps)(EditTab);
