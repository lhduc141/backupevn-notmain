import { Col, Row, Tabs, TabsProps } from 'antd';
import { UserPermissionsTab, UserPersonalInfo, UserShiftsTab } from 'components';
import { usersMessages } from 'messages/users.messages';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
const UserPage: React.FC = () => {
  const { userId: userIdStr } = useParams();
  const userId = parseInt(userIdStr?.toString() || '');

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: usersMessages.permissions,
      children: <UserPermissionsTab userId={userId} />
    },
    {
      key: '2',
      label: usersMessages.creationHistory,
      children: 'Content of Tab Pane creationHistory'
    },
    {
      key: '3',
      label: usersMessages.evaluationHistory,
      children: 'Content of Tab Pane evaluationHistory'
    },
    {
      key: '4',
      label: usersMessages.workingTime,
      children: <UserShiftsTab userId={userId} />
    }
  ];
  if (!userIdStr) {
    return <Navigate to={'not-found'} />;
  }
  return (
    <div>
      <Row gutter={24} className='flex h-full flex-1'>
        <Col flex='433px'>
          <UserPersonalInfo userId={userId} />
        </Col>
        <Col flex={1}>
          <div className='flex h-full flex-col gap-4 rounded-xl bg-colorBgContainer p-5'>
            <Tabs defaultActiveKey='1' items={items} prefixCls='user-tab-content' />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserPage;
