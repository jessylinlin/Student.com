import React, { Component } from 'react';
import { Table, Icon, Popconfirm} from 'antd';
import moment from 'moment';

export default class FormTable extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { checkChange, onDelete, editClick, dataSource, loading } = this.props;
        const rowSelection = {
                onChange: checkChange,
                getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
            }),
        };
        const columns = [{
            title: 'Room name',
            dataIndex: 'name',
            width: 100,
            render: text => <a href="javascript:;">{text}</a>
        }, {
            title: 'Price(per week)',
            dataIndex: 'price',
            width: 100,
            sorter: (a, b) => a.price - b.price }
        ];
        return(
            <Table
                columns={columns}
                dataSource={dataSource}
                bordered={false}
                scroll={{x:'100%'}}
                className='formTable'
                pagination={false}
            />
        )
    }
}
