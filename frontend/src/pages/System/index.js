import { Spin } from 'antd';
import SystemAdmin from 'components/SystemAdmin';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSysInitVal } from 'redux/slices/system.slice';

function SystemAdminPage() {
  const [loadingInitVal, setLoadingInitVal] = useState(true);
  const dispatch = useDispatch();
  const system = useSelector((state) => state.system);

  useEffect(() => {
    let isSubscribe = true;
    (async function loadingSystemInitVal() {
      const result = await dispatch(getSysInitVal());
      if (result && isSubscribe) {
        setLoadingInitVal(false);
      }
    })();

    return () => (isSubscribe = false);
  }, []);

  return (
    <>
      {loadingInitVal ? (
        <Spin
          tip="Đang tải dữ liệu ..."
          className="trans-center"
          size="large"
        />
      ) : (
        <SystemAdmin />
      )}
    </>
  );
}

export default SystemAdminPage;
