//table
import React, { Component } from 'react';
import { Icon, Popconfirm,  Button, Input , Card, Select, message} from 'antd';
import moment from 'moment';
//table
import FormTable from './FormTable';
import {connect} from 'react-redux';
import { selectPropertyAction, deSelectPropertyAction, addRoomAction, saveEditedRoomAction, deleteRoomAction, savePropertyAction, selectMenuAction, deletePropertyAction} from '../../store/actions/Edit';

class Property extends Component{
    constructor(props){
        super(props);
        this.state = {
            roomname: '',
            price: ''
        };
        this.selectProperty = this.selectProperty.bind(this);
        this.selectMenu = this.selectMenu.bind(this);
        this.addRoom = this.addRoom.bind(this);
        this.deleteProperty = this.deleteProperty.bind(this);
        this.saveProperty = this.saveProperty.bind(this);
    }

    //select property
    selectProperty = (v) => {
        this.props.selectProperty(v);
        this.props.selectMenu([]);
    }  

    //隐藏 add property 面板
    hideAddProperty = (v) => {
        this.props.handleHideAddProperty();
    }

    selectMenu = (v) => {
        this.props.selectMenu(v);
    }

    //新增room
    addRoom = (v) => {
        if (!this.validateForm(this.state.roomname, this.state.price)) {
          return;
        }
        this.props.addRoom(
            {
                'name': this.state.roomname,
                'price': this.state.price
            } 
        ); 
        this.setState({ 'roomname': null, 'price': null });     
    }

    setRoomName = (e) => {
        this.setState({ roomname: e.target.value });
    }

    setPrice = (e) => {
        this.setState({ price: e.target.value });
    }

    saveProperty = (v) => {
        this.props.saveProperty(v);
        this.hideAddProperty();
    }

    deleteProperty = (v) => {
        this.props.deleteProperty(v);
    }
    //表单验证
    validateForm = (roomName, price) => {
        if (!roomName) {
          message.warning('Room name cannot be empty!');
          return;
        }
        if (!price) {
          message.warning('Price cannot be empty!');
          return;
        }
        if (isNaN(price)) {
            message.warning('Price must be a number!');
            return;
        }

        return true;
      }
 

    render(){
        const { hideAddProperty } = this.props;
        const Option = Select.Option;
        const dataSource =  this.props.propertyData;
        const isAddProperty = this.props.isAddProperty;
        //选中的menu data
        const selectMenuData = dataSource.find(function(value, index, arr) {
          return value.selectMenu;
        })
        //选中的menu key
        const selectedKeys = selectMenuData ? [selectMenuData.id] : [];
        //选中的proprerty item
        const selectPropertyData = dataSource.find(function(value, index, arr) {
          return value.selectProperty;
        })
 
        //表单是否可编辑
        const formDisabled = selectPropertyData ? false : true;
        const selectOptions = dataSource.map(function(data) {
            if (data.room.length < 1) {
                return (
                    <Option value={data.id}>{data.name}</Option>                              
                );
            }
        });

        const selectPropertyForm = dataSource.map(function(data) {
            if (selectedKeys[0] === data.id) {
            return ( 
                selectedKeys.length > 0 && data.room.length > 0 ?           
                <FormTable dataSource={data.room}/>  
                :
                null 
            );
            }
        });

        return(
            <div>
                {
                    isAddProperty && 
                    <div>
                        <Icon className='close' type='close' onClick={this.hideAddProperty}/>
                        <h1 className="title">Property name</h1>
                        <Select
                            style={{width: '100%', height: 48}} 
                            size='large' 
                            placeholder="Select Property" 
                            onSelect={this.selectProperty}
                            
                        >
                            {selectOptions}
                        </Select>
                    </div>
                }
                
                
                {selectPropertyForm}
                
                {
                    ( selectedKeys.length > 0 ||  isAddProperty ) && 
                    <div>
                        <h1 className="title">Price</h1>
                        <Card className='dark-card'>                     
                            <Input className='edit-input room' size="large" placeholder="Room name" disabled={isAddProperty && formDisabled} onChange={this.setRoomName} value={this.state.roomname}/>
                            <Input className='edit-input price' size="large" placeholder="Price" disabled={isAddProperty && formDisabled} onChange={this.setPrice} value={this.state.price} suffix={<Icon type="question-circle-o" style={{color: '#38b2a6', fontSize: 14}} />}/>
                            <Button className="add-btn" type="primary" size="large" onClick={this.addRoom} disabled={isAddProperty && formDisabled}>Add</Button>
                        </Card> 
                    </div>
                }                

                {   
                    isAddProperty &&
                    <div>
                        <Button className="save-btn " type="primary" size="large" onClick={() => this.saveProperty(this.props.selectedKeys[0])}>Save</Button> 
                        <Button className="save-btn cancel" type="primary" size="large" onClick={() => this.deleteProperty(this.props.selectedKeys[0])}>Cancel</Button> 
                    </div>
                }
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
    },
    deleteProperty: (data) => {
      dispatch(deletePropertyAction(data));
    }
  }
}
export default connect(mapStateToProps, mapDispathToProps)(Property);
