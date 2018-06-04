import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'

export default class BreadcrumbCustom extends Component{
    Breadcrumbs(){
        const { paths } = this.props;
        let v = paths.map(function(item,index){
            return (
                <Breadcrumb.Item key="item">
                    {item==="Home"?<Link to={"/app"}>{item}</Link>:item}
                </Breadcrumb.Item>
            )
        });
        return v;
    }

    render(){
        return(
            <Breadcrumb style={{ margin: '24px 0', fontSize:20 }}>
                {this.Breadcrumbs()}
            </Breadcrumb>
        )
    }
} 