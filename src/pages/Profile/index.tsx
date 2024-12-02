import { Col, Row, Tabs, TabsProps, Typography } from 'antd';
import { NavigateBack, UserProfilePermissionsTab, UserProfilePersonalInfo, UserProfileShiftsTab } from 'components';
import PageHeader from 'components/common/PageHeader';
import { useTitle } from 'hooks';
import { messages } from 'messages';
import { usersMessages } from 'messages/users.messages';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectHasSelectShiftPermission } from 'store/features';
const ProfilePage: React.FC = () => {
  useTitle(messages.profile);
  const hasSelectShiftPermission = useSelector(selectHasSelectShiftPermission);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: usersMessages.permissions,
      children: <UserProfilePermissionsTab />
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
    }
  ];

  if (hasSelectShiftPermission) {
    items.push({
      key: '4',
      label: usersMessages.workingTime,
      children: <UserProfileShiftsTab />
    });
  }

  return (
    <div>
      <PageHeader className='flex items-center gap-1'>
        <NavigateBack />
        <Typography.Title className='mb-0' level={4}>
          {messages.profile}
        </Typography.Title>
      </PageHeader>

      <Row gutter={24} className='flex h-full flex-1'>
        <Col flex='433px'>
          <UserProfilePersonalInfo />
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

export default ProfilePage;
