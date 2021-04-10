import { Select, Spin } from 'antd';
import systemApi from 'apis/systemApi';
import GrantRevoke from 'components/SystemAdmin/GrantRevoke';
import helper from 'helper';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEditName } from 'redux/slices/sql.slice';
import { setEditedUserInfo, setGrantedInit } from 'redux/slices/userRole.slice';

function EditGrantUserRole() {
  const [isLoading, setIsLoading] = useState(false);
  const { usernameList, roleList } = useSelector((state) => state.system);
  const [usernameSelected, setUsernameSelected] = useState('');
  const isRole = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let isSubscribe = true;
    dispatch(setEditName(usernameSelected));
    (async function getUserRolePriv() {
      setIsLoading(true);
      try {
        if (usernameSelected !== '') {
          const res = isRole.current
            ? await systemApi.getUserRolePriv(usernameSelected)
            : await Promise.all([
                await systemApi.getBriefUserInfo(usernameSelected),
                await systemApi.getUserRolePriv(usernameSelected),
              ]);

          if (res) {
            if (isSubscribe) {
              if (!isRole.current) {
                dispatch(setEditedUserInfo(res[0].data));
                dispatch(setGrantedInit(res[1].data));
              } else {
                dispatch(setGrantedInit(res.data));
              }
              setIsLoading(false);
            }
          }
        }
      } catch (error) {
      } finally {
        if (isSubscribe) setIsLoading(false);
      }
    })();

    return () => (isSubscribe = false);
  }, [usernameSelected]);

  const onSelectChange = (val) => {
    isRole.current = val.indexOf('(ROLE)') !== -1;
    setUsernameSelected(val.split(' ')[0]);
  };

  const onEditUserRolePriv = (e, record, key) => {
    console.log(e, record, key);
  };

  return (
    <>
      <div className="p-lr-32 p-t-32">
        <Select
          placeholder="Select a User/Role"
          size="large"
          style={{ width: 360 }}
          showSearch
          optionFilterProp="children"
          onChange={(val) => onSelectChange(val)}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }>
          {helper.renderOptions(usernameList)}
          {helper.renderOptions(roleList, true)}
        </Select>
      </div>
      {isLoading ? (
        <Spin tip="Đang tải dữ liệu" size="large" className="trans-center" />
      ) : (
        <>
          {usernameSelected !== '' && (
            <GrantRevoke
              isEdit={true}
              isUser={!isRole.current}
              username={usernameSelected}
              onEditUserRolePriv={onEditUserRolePriv}
            />
          )}
        </>
      )}
    </>
  );
}

export default EditGrantUserRole;
