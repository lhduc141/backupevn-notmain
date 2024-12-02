import { Button, Form, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CheckTwoToneCircledIcon, PlusIcon } from 'assets';
import { CommonStatus, FilterStatus, message, Modal, PageHeader, Table } from 'components';
import { AgentMapActions, ChangeAgentMapStatusModal } from 'components/agent-map';
import dayjs from 'dayjs';
import { useSearchParamsForm, useTitle, useAgentMapsPaging } from 'hooks';
import { agentMapsMessages, messages, sidebarMenuMessages } from 'messages';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTE } from 'routes/constants';
import { useDeleteAgentMapMutation } from 'services';
import { FindAllAgentMapDto, AgentMapDto } from 'types';
import { DATE_FORMAT } from 'utils';
const { confirm } = Modal;

type FindType = Omit<FindAllAgentMapDto, 'pageIndex' | 'pageSize'>;

const AgentMapsPage: React.FC = () => {
  useTitle(sidebarMenuMessages.agentMaps);
  const navigate = useNavigate();
  const { setSearchParams, getSearchParams } = useSearchParamsForm();
  const [form] = Form.useForm<FindType>();
  const values = Form.useWatch([], form) || getSearchParams();

  const [selectedAgentMapId, setSelectedAgentMapId] = useState<number>();
  const [openStatus, setOpenStatus] = useState(false);

  const { agentMaps, count, pageIndex, handleChangePage, isLoading, resetPage } = useAgentMapsPaging({
    ...values
  });
  const [onDelete, { isLoading: isLoadingDelete }] = useDeleteAgentMapMutation();

  const handleDelete = (agentMap: AgentMapDto) => {
    confirm({
      title: `${agentMapsMessages.deleteAgentMap} ${agentMap.name}`,
      content: agentMapsMessages.confirmDelete,
      cancelText: messages.cancelButtonText,
      okText: messages.confirmButtonText,
      onOk: () => {
        onDelete(agentMap.agentMapId)
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
          });
      },
      okButtonProps: {
        loading: isLoadingDelete
      }
    });
  };

  const handleOpenStatusModal = (data: AgentMapDto) => {
    setOpenStatus(true);
    setSelectedAgentMapId(data.agentMapId);
  };

  const handleCloseStatusModal = () => {
    setOpenStatus(false);
    setSelectedAgentMapId(undefined);
  };

  const handleUpdateInfo = (data: AgentMapDto) => {
    navigate(data.agentMapId.toString(), { relative: 'route' });
  };

  const columns: ColumnsType<AgentMapDto> = [
    {
      title: agentMapsMessages.name,
      dataIndex: 'name',
      key: 'name',
      className: 'font-semibold'
    },
    {
      title: messages.status,
      dataIndex: 'isActive',
      key: 'isActive',
      render: (value) => <CommonStatus value={value} />
    },
    {
      title: agentMapsMessages.seat,
      dataIndex: 'countSeats',
      key: 'countSeats'
    },
    {
      title: agentMapsMessages.door,
      dataIndex: 'countDoors',
      key: 'countDoors'
    },
    {
      title: messages.updateAt,
      key: 'updateAt',
      dataIndex: 'updateAt',
      render: (_, record) => (
        <Typography.Text className='text-sm'>
          {record.updatedAt ? dayjs(record.updatedAt).format(DATE_FORMAT) : '-'}
        </Typography.Text>
      )
    },
    {
      title: '',
      key: 'actions',
      render: (_, record) => (
        <div onClick={(e) => e.stopPropagation()}>
          <AgentMapActions
            agentMap={record}
            onUpdateInfo={handleUpdateInfo}
            onUpdateStatus={handleOpenStatusModal}
            onDelete={handleDelete}
          />
        </div>
      ),
      className: 'px-0',
      fixed: 'right',
      width: 32
    }
  ];

  return (
    <div>
      <PageHeader className='flex items-center gap-1'>
        <Typography.Title className='mb-0 text-2.5xl font-bold' level={4}>
          {sidebarMenuMessages.agentMaps}
        </Typography.Title>
      </PageHeader>
      <div className='flex flex-col gap-5 rounded-xl bg-colorBgContainer p-5'>
        <Form
          scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
          form={form}
          initialValues={getSearchParams()}
          onValuesChange={() => {
            resetPage();
            const values = form.getFieldsValue();
            setSearchParams(values);
          }}
        >
          <div>
            <div className='flex items-center gap-4'>
              <Form.Item<FindType> className='mb-0 mr-6' name='isActive'>
                <FilterStatus icon={<CheckTwoToneCircledIcon />} />
              </Form.Item>
              <Link to={`${ROUTE.AGENT_MAPS}/new`} className='ml-auto'>
                <Button type='primary' icon={<PlusIcon />}>
                  {messages.createButtonText}
                </Button>
              </Link>
            </div>
          </div>
        </Form>
        <div>
          <Table
            loading={isLoading}
            currentPage={pageIndex}
            count={count}
            handleChangePage={handleChangePage}
            columns={columns}
            dataSource={agentMaps || []}
            rowKey={(record: AgentMapDto) => record.agentMapId}
            onRow={(record: AgentMapDto) => ({
              onClick: () => {
                navigate(ROUTE.AGENT_MAPS + `/${record.agentMapId}`);
              }
            })}
          />
        </div>
      </div>
      {selectedAgentMapId && (
        <ChangeAgentMapStatusModal
          agentMapId={selectedAgentMapId}
          open={openStatus}
          onCancel={handleCloseStatusModal}
          onClose={handleCloseStatusModal}
        />
      )}
    </div>
  );
};

export default AgentMapsPage;
