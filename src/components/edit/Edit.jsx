import React, { Component } from 'react';
import './edit.less';

import axios from 'axios';
import Mock from 'mockjs';
import moment from 'moment';
import {connect} from 'react-redux';
import {Card, Tab, Row, Col, Input, Icon, Button, Tooltip, Popconfirm } from 'antd';

import { selectPropertyAction, deSelectPropertyAction, addRoomAction, saveEditedRoomAction, deleteRoomAction, savePropertyAction, selectMenuAction } from '../../store/actions/Edit';

import BreadcrumbCustom from '../common/BreadcrumbCustom';

//table组件
import FormTable from './FormTable';
//menu面板
import EditTab from './EditTab';


class Edit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            sortInfo:null ,//排序
            isAddProperty:  false//是否打开新增property面板

        };
        this.selectMenu = this.selectMenu.bind(this);
    }

    //设置选中的menu key
    selectMenu = (item) => {
        this.props.selectMenu(item);

    }
    showAddProperty = () => {
        this.setState({ isAddProperty: true});
        this.selectMenu([]);
    }

    //设置add property面板 状态
    hideAddProperty = () => {
        this.setState({ isAddProperty: false});
    }

    //设置表单状态
    setDisabledForm = () => {
        this.setState({
            formDisabled: false
        });
    }   
 
    render(){
        const { loading, isAddProperty } = this.state;
        const propertyData = this.props.propertyData;
        const selectedKeys = this.state.selectedKeys;
        const formDisabled = this.state.formDisabled
        
        return(
            <div>
                <div className='bread-header'>
                    <Button className="add-btn" type="primary" size="large" onClick={this.showAddProperty}>Add new property</Button>
                    <BreadcrumbCustom paths={['Edit Properties']} />
                </div>                

                <div className='formBody editBody'>    
                    <EditTab
                        dataSource={propertyData}
                        isAddProperty = {this.state.isAddProperty }
                        handleHideAddProperty = {this.hideAddProperty}
                        selectedKeys = {selectedKeys}
                        formDisabled = {formDisabled}

                    />                       
                </div>
            </div>
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
export default connect(mapStateToProps, mapDispathToProps)(Edit);