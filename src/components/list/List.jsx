import React, { Component } from 'react';
import './list.less';

import axios from 'axios';
import Mock from 'mockjs';
import moment from 'moment';
import {connect} from 'react-redux';
import {Card, Row, Col, Input, Icon, Cascader, DatePicker, Button, Tooltip, Popconfirm } from 'antd';

import BreadcrumbCustom from '../common/BreadcrumbCustom';
import FormTable from './FormTable';

const Search = Input.Search;
const options = [];

class List extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userName: '',           
            visible: false, //新建窗口隐藏
            selectedRowKeys: [],
            tableRowKey: 0,
            loading: true,
            sortInfo:null, //排序
            searchProperty: '' ,//搜索property
            dataSource: this.props.propertyData
        };
    }  

    //property 输入
    onChangeProperty = (e) => {
        const value = e.target.value;
        this.setState({
            searchProperty: value,
        })
    };
    //property 搜索
    onSearchProperty = (value) => {
        this.state.dataSource = this.props.propertyData;
        const { dataSource } = this.state;
        const data = dataSource.filter(function(item) {
            return item.saved && item.name.includes(value);
        }) 
        this.setState({
            dataSource: data
        })
    };


    //重置按钮
    btnClear_Click = () => {
        this.setState({
            searchProperty: ''
        });
        this.state.dataSource = this.props.propertyData;
    };

 
    render(){
        const { userName, visible, loading } = this.state;
        const propertyData = this.state.dataSource;
        const List = propertyData.map(function(data) {
          return (
            data.room.length > 0 && data.saved &&
            <Card title={data.name} hoverable= {true} style={{ marginBottom: 20 }}>
                <div>
                    <FormTable
                        dataSource={data.room}
                        loading={loading} 
                    />
                </div>
            </Card>  
        
          );
        });
        return(
            <div>
                <BreadcrumbCustom paths={['Property List']} />

                <div className='formBody'>
                    <Row gutter={16}>
                        <Col className="gutter-row" sm={8}>
                            <Search
                                placeholder="property"
                                prefix={<Icon type="home" />}
                                value={this.state.searchProperty}
                                onChange={this.onChangeProperty}
                                onSearch={this.onSearchProperty}
                            />
                        </Col>
                        <div className='btnOpera'>
                            <Button type="primary" onClick={this.btnClear_Click} style={{background:'rgb(56, 178, 166)', color: '#fff', border: 'rgba(56,178,166)'}}>重置</Button>
                        </div>
                    </Row>
                    {List}
                
                </div>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        propertyData: state.Edit
    }
})(List);
