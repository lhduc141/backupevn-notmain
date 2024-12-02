import { Button, Form, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PlusIcon } from 'assets';
import {
  CommonStatus,
  FilterServiceTypes,
  message,
  PageHeader,
  Table,
  Modal,
  TicketSampleActions,
  TicketSampleForm,
  ChangeTicketSampleStatusModal
} from 'components';
import { TicketSampleFormRefProps } from 'components/ticket-samples/TicketSampleForm';
import dayjs from 'dayjs';
import { useSearchParamsForm, useServiceTypesOptions, useTicketSamplesPaging, useTitle } from 'hooks';
import { messages, sidebarMenuMessages, ticketSamplesMessages } from 'messages';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDeleteTicketSampleMutation } from 'services';
import { FindAllTicketSampleDto, TicketSampleDto } from 'types';
import { DATE_TIME_FORMAT } from 'utils';
type FindType = Omit<FindAllTicketSampleDto, 'pageIndex' | 'pageSize'>;
const { confirm } = Modal;

const TicketSamplesPage: React.FC = () => {
  useTitle(sidebarMenuMessages.ticketSamples);
  const { setSearchParams, getSearchParams } = useSearchParamsForm();
  const [form] = Form.useForm<FindType>();
  const values = Form.useWatch([], form) || getSearchParams();

  const { ticketSamples, count, pageIndex, handleChangePage, isLoading, resetPage } = useTicketSamplesPaging({
    ...values
  });
  const { serviceTypesOptions: serviceTypesOptionsSelected } = useServiceTypesOptions(
    {
      serviceTypeId: values.serviceTypeId
    },
    { skip: values.serviceTypeId?.length === 0 }
  );
  const [onDelete, { isLoading: isLoadingDelete }] = useDeleteTicketSampleMutation();
  const handleDelete = (ticketSample: TicketSampleDto) => {
    confirm({
      title: `${ticketSamplesMessages.delete} ${ticketSample.title}`,
      content: ticketSamplesMessages.confirmDelete,
      cancelText: messages.cancelButtonText,
      okText: messages.confirmButtonText,
      onOk: () => {
        onDelete(ticketSample.ticketSampleId)
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
  const [loadingFormRef, setLoadingFormRef] = useState(false);
  const [ticketSampleId, setTicketSampleId] = useState<number | undefined>();
  const [openStatus, setOpenStatus] = useState(false);

  const formRef = useRef<TicketSampleFormRefProps>(null);

  useEffect(() => {
    if (!open && formRef.current && !ticketSampleId) {
      setTicketSampleId(undefined);
      formRef.current.form.resetFields();
    }
  }, [open, formRef.current]);

  const columns: ColumnsType<TicketSampleDto> = [
    {
      title: ticketSamplesMessages.title,
      key: 'title',
      dataIndex: 'title'
    },
    {
      title: ticketSamplesMessages.summary,
      key: 'summary',
      dataIndex: 'summary'
    },

    {
      title: ticketSamplesMessages.serviceType,
      key: 'serviceType',
      dataIndex: 'serviceType',
      render: (_val, record) => <Typography.Text className='text-sm'>{record.serviceType?.name}</Typography.Text>
    },
    {
      title: ticketSamplesMessages.hotkey,
      key: 'hotkey',
      dataIndex: 'hotkey'
    },
    {
      title: messages.createdAt,
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (val, record) => (
        <Typography.Text className='text-sm'>{val ? dayjs(val).format(DATE_TIME_FORMAT) : '-'}</Typography.Text>
      )
    },
    {
      title: messages.status,
      key: 'isActive',
      dataIndex: 'isActive',
      render: (val) => <CommonStatus value={val} />
    },
    {
      title: '',
      key: 'actions',
      render: (_, record) => (
        <div onClick={(e) => e.stopPropagation()}>
          <TicketSampleActions ticketSample={record} onDelete={handleDelete} onUpdateStatus={handleOpenStatusModal} />
        </div>
      ),
      className: 'px-0',
      fixed: 'right',
      width: 32
    }
  ];

  const handleCreate = useCallback(() => {
    setOpen(true);
    const firstSelectedServiceType = serviceTypesOptionsSelected.find(
      (serviceType) => serviceType.serviceTypeId === values.serviceTypeId?.[0]
    );
    if (formRef.current && firstSelectedServiceType) {
      formRef.current.form.setFieldsValue({
        serviceTypeId: {
          label: firstSelectedServiceType.name,
          value: firstSelectedServiceType.serviceTypeId
        }
      });
    }
  }, [formRef.current, serviceTypesOptionsSelected]);

  const handleOpenStatusModal = (data: TicketSampleDto) => {
    setOpenStatus(true);
    setTicketSampleId(data.ticketSampleId);
  };

  const handleCloseStatusModal = () => {
    setOpenStatus(false);
    setTicketSampleId(undefined);
  };

  return (
    <div>
      <PageHeader className='flex items-center gap-1'>
        <Typography.Title className='mb-0 text-2.5xl font-bold' level={4}>
          {sidebarMenuMessages.ticketSamples}
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
              <Form.Item<FindType> noStyle name='serviceTypeId'>
                <FilterServiceTypes placement='bottomLeft' isActive serviceTypeId={values.serviceTypeId} />
              </Form.Item>
              <Button className='ml-auto' onClick={handleCreate} type='primary' icon={<PlusIcon />}>
                {messages.createButtonText}
              </Button>
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
            dataSource={ticketSamples || []}
            rowKey={(record: TicketSampleDto) => record.ticketSampleId}
            onRow={(record: TicketSampleDto) => ({
              onClick: () => {
                setTicketSampleId(record.ticketSampleId);
                setOpen(true);
              }
            })}
          />
        </div>

        <Modal.Headless
          title={ticketSampleId ? ticketSamplesMessages.update : ticketSamplesMessages.create}
          maskClosable={false}
          centered
          width={688}
          open={open}
          onCancel={() => {
            setOpen(false);
            setTicketSampleId(undefined);
          }}
          forceRender
          footer={[
            <Button
              key='save'
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
          <TicketSampleForm
            onCreateSuccess={() => {
              setOpen(false);
              setTicketSampleId(undefined);
            }}
            ref={formRef}
            onChangeLoading={setLoadingFormRef}
            ticketSampleId={ticketSampleId}
          />
        </Modal.Headless>
        {ticketSampleId && (
          <ChangeTicketSampleStatusModal
            ticketSampleId={ticketSampleId}
            open={openStatus}
            onCancel={handleCloseStatusModal}
            onClose={handleCloseStatusModal}
          />
        )}
      </div>
    </div>
  );
};

export default TicketSamplesPage;
