import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Form, MenuProps, Space, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
  FilterOptions,
  message,
  PageHeader,
  Table,
  Modal,
  WorkingScheduleActions,
  WorkingScheduleForm
} from 'components';
import { WorkingScheduleFormRefProps } from 'components/working-schedules/WorkingScheduleForm';
import dayjs from 'dayjs';
import { useOptions, useSearchParamsForm, useTitle, useWorkingSchedulesPaging } from 'hooks';
import { messages, sidebarMenuMessages } from 'messages';
import { workingSchedulesMessages } from 'messages/working-schedules.messages';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDeleteWorkingScheduleMutation } from 'services';
import { FindAllWorkingScheduleDto, WorkingScheduleDto } from 'types';
import { CORE_OPTION_TYPES, DATE_FORMAT, MICROSERVICES } from 'utils';
type FindType = Omit<FindAllWorkingScheduleDto, 'pageIndex' | 'pageSize'>;
const { confirm } = Modal;

const WorkingSchedulesPage: React.FC = () => {
  useTitle(sidebarMenuMessages.workingSchedules);
  const { setSearchParams, getSearchParams } = useSearchParamsForm();
  const [form] = Form.useForm<FindType>();
  const values = Form.useWatch([], form) || getSearchParams();

  const { workingSchedules, count, pageIndex, handleChangePage, isLoading, resetPage } = useWorkingSchedulesPaging({
    ...values
  });
  const { data: optionsWorkingScheduleType } = useOptions({
    optionTypeId: CORE_OPTION_TYPES.WORKING_SCHEDULE_TYPE,
    service: MICROSERVICES.CORE
  });
  const [onDelete, { isLoading: isLoadingDelete }] = useDeleteWorkingScheduleMutation();
  const handleDelete = (workingSchedule: WorkingScheduleDto) => {
    confirm({
      title: `${workingSchedulesMessages.delete} ${workingSchedule.workingScheduleType.name}`,
      content: workingSchedulesMessages.confirmDelete,
      cancelText: messages.cancelButtonText,
      okText: messages.confirmButtonText,
      onOk: () => {
        onDelete(workingSchedule.workingScheduleId)
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
  const [open, setOpen] = useState(false);
  const [loadingFormRef, setLoadingCustomerSI] = useState(false);
  const [workingScheduleId, setWorkingScheduleId] = useState<number | undefined>();

  const formRef = useRef<WorkingScheduleFormRefProps>(null);

  useEffect(() => {
    if (!open && formRef.current) {
      setWorkingScheduleId(undefined);
      formRef.current.form.resetFields();
    }
  }, [open, formRef.current]);

  const columns: ColumnsType<WorkingScheduleDto> = [
    {
      title: workingSchedulesMessages.workingScheduleType,
      dataIndex: 'workingScheduleType',
      key: 'workingScheduleType',
      render: (_, record) => (
        <Space>
          <Typography.Text className='text-sm'>{record.workingScheduleType.name ?? '-'}</Typography.Text>
        </Space>
      )
    },
    {
      title: workingSchedulesMessages.applyDate,
      dataIndex: 'applyDate',
      key: 'applyDate',
      render: (_, record) => (
        <Typography.Text className='text-sm'>
          {record.applyDate ? dayjs(record.applyDate).format(DATE_FORMAT) : '-'}
        </Typography.Text>
      )
    },
    {
      title: workingSchedulesMessages.description,
      key: 'description',
      dataIndex: 'description'
    },
    {
      title: '',
      key: 'actions',
      render: (_, record) => (
        <div onClick={(e) => e.stopPropagation()}>
          <WorkingScheduleActions workingSchedule={record} onDelete={handleDelete} />
        </div>
      ),
      className: 'px-0',
      fixed: 'right',
      width: 32
    }
  ];

  const handleCreate = useCallback(
    (type: number) => {
      setOpen(true);
      if (formRef.current) {
        formRef.current.form.setFieldsValue({
          workingScheduleTypeId: type
        });
      }
    },
    [formRef.current]
  );

  const itemsCreate: MenuProps['items'] = optionsWorkingScheduleType.map((o) => ({
    label: o.name,
    key: o.optionId,
    onClick: () => handleCreate(o.optionId)
  }));

  return (
    <div>
      <PageHeader className='flex items-center gap-1'>
        <Typography.Title className='mb-0 text-2.5xl font-bold' level={4}>
          {sidebarMenuMessages.workingSchedules}
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
              <Form.Item<FindType> noStyle name='workingScheduleTypeId'>
                <FilterOptions
                  title={workingSchedulesMessages.workingScheduleType}
                  optionTypeId={CORE_OPTION_TYPES.WORKING_SCHEDULE_TYPE}
                  service={MICROSERVICES.CORE}
                />
              </Form.Item>
              <Dropdown className='ml-auto' menu={{ items: itemsCreate }} trigger={['click']}>
                <Button iconPosition='end' type='primary' icon={<DownOutlined />}>
                  {messages.createButtonText}
                </Button>
              </Dropdown>
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
            dataSource={workingSchedules || []}
            rowKey={(record: WorkingScheduleDto) => record.workingScheduleId}
            onRow={(record: WorkingScheduleDto) => ({
              onClick: () => {
                setWorkingScheduleId(record.workingScheduleId);
                setOpen(true);
              }
            })}
          />
        </div>

        <Modal.Headless
          title={workingScheduleId ? workingSchedulesMessages.update : workingSchedulesMessages.create}
          maskClosable={false}
          centered
          width={888}
          open={open}
          onCancel={() => {
            setOpen(false);
          }}
          forceRender
          footer={[
            <Button
              loading={loadingFormRef}
              onClick={() => {
                if (formRef.current) {
                  formRef.current.form.submit();
                }
              }}
              size='large'
              type='primary'
            >
              {messages.saveButtonText}
            </Button>
          ]}
        >
          <WorkingScheduleForm
            onCreateSuccess={() => {
              setOpen(false);
            }}
            ref={formRef}
            onChangeLoading={setLoadingCustomerSI}
            workingScheduleId={workingScheduleId}
          />
        </Modal.Headless>
      </div>
    </div>
  );
};

export default WorkingSchedulesPage;
