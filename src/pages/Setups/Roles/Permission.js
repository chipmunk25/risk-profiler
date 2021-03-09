import React, { useEffect, useState, } from 'react';
import TransferComponent from "components/Transfer"

import { SaveOutlined } from "@ant-design/icons"
import {  Button,  } from "antd"
import { useSelector } from 'react-redux';
const Permission = ({ detail, hideModalLoader,UpdatePermissionsHandler,setPermissionsLists }) => {
    const { permissionLists } = useSelector(({ auth }) => auth);
    const [permissions, setPermissions] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            hideModalLoader()
        }, 1500);

    }, [])
    useEffect(() => {
        setPermissions(detail.role_permission_ms &&detail.role_permission_ms.map(item=>{
            return item.permission_id
        }))
      
    }, [detail])
    const onChange = (nextTargetKeys) => {
        setPermissions(nextTargetKeys);
         setPermissionsLists(nextTargetKeys)
    };

//console.log(permissions)
    return (
        <div>
                <TransferComponent
                    titles={['Permissions', 'Role Permission']}
                    data={permissionLists && permissionLists.map(item => {
                        return {
                            ...item,
                            key: item.id
                        }
                    })}
                    targetKeys={permissions}
                    handleChange={onChange}
                />
        
            <div>
               <Button type="primary" onClick={UpdatePermissionsHandler}>
                        <SaveOutlined />  Update
                 </Button>
            </div>
            
        </div>
    );
};

export default Permission;