//table
import React, { Component } from 'react';
import {Table, Icon, Popconfirm, Modal, Button, Input} from 'antd';
import moment from 'moment';

import {connect} from 'react-redux';
import { selectPropertyAction, deSelectPropertyAction, addRoomAction, saveEditedRoomAction, deleteRoomAction, savePropertyAction, selectMenuAction } from '../../store/actions/Edit';

class FormTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false, //弹出框状态
            loading: false,
            roomname: null,
            price: null,
            tableIndex: null
        };
        this.deleteRoom = this.deleteRoom.bind(this);
        this.saveEditRoom = this.saveEditRoom.bind(this);
    }

    setName = (e) => {
        this.setState({
            roomname: e.target.value
        });
    }

    setPrice = (e) => {
        this.setState({
            price: e.target.value
        });
    }

    //删除room
    deleteRoom = (v) => {
        this.setState({
            visible: false,
        });
        this.props.deleteRoom(v)
    }

    //新增room
    saveEditRoom = (v) => {
        this.props.saveEditRoom(
            {
                'name': this.state.roomname,
                'price': this.state.price,
            } 
        ); 
        this.setState({ 'roomname': null, 'price': null, visible:false });     
    }

    //显示对话框
    showModal = (v) => {
        this.setState({
            roomname: v.name,
            price: v.price,
            visible: true,
            tableIndex : v.index
            
        });
    }

    //对话框 数据保存
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 3000);
    }

    //关闭 对话框
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    render(){
        const { onDelete, editClick, dataSource, loading } = this.props;
        
        //table 列
        const columns = [
        {
            title: 'Room name',
            dataIndex: 'name',
            width: '40%'
        }, {
            title: 'Price(per week)',
            dataIndex: 'price',
            width: '30%',
            sorter: (a, b) => a.price - b.price 
        },  {
            title: 'Edit',
            key: 'edit',
            width: "15%",
            render: (text,record) => <div className='edit-table' onClick={() => this.showModal(record)}><Icon type='edit' style={{ marginRight: 5, color: 'rgb(56, 178, 166)'}}/>Edit</div>
        }, {
            title: 'Delete',
            key: 'delete',
            width: "15%",
            render: (text, record) => {
            return (
                dataSource.length > 0 ?
                  (
                    <Popconfirm title="Sure to delete?" cancelText='Cancel' okText='OK' onConfirm={() => this.deleteRoom(record.index)}>
                        <div className='delete-table'><Icon type='delete' style={{ marginRight: 5, color: 'rgb(56, 178, 166)'}}/>Delete</div>
                    </Popconfirm>
                  ) : null
            );
          },
        }];

        return(
            <div>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    bordered={false}
                    scroll={{x:'100%'}}
                    className='formTable'
                    pagination={false}
                />
                <Modal title="Edit Room"
                    className='edit-modal'
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[                       
                        <Button className='save-btn' key="submit" type="primary" loading={this.state.loading} onClick={this.saveEditRoom}>
                          Save
                        </Button>,
                        <Popconfirm title="Sure to delete?" cancelText='Cancel' okText='OK' onConfirm={() => this.deleteRoom(this.state.tableIndex)}>
                            <div className='delete-option'><Icon type='delete' style={{ marginRight: 5, color: 'rgb(56, 178, 166)'}}/>Delete</div>
                        </Popconfirm>                       
                    ]}
                >

                    <div className='form-name'>Room name</div> 
                    <Input className='edit-input room' placeholder="Room name" value={this.state.roomname} onChange={this.setName}/>
                    <div className='form-name'>Price</div> 
                    <Input className='edit-input price' placeholder="Price" value={this.state.price} onChange={this.setPrice}/>

                </Modal>
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
    saveEditRoom: (data) => {
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
export default connect(mapStateToProps, mapDispathToProps)(FormTable);



