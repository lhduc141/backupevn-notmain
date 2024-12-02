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
  TicketCancelReasonActions,
  ChangeTicketCancelReasonStatusModal
} from 'components';
import TicketCancelReasonForm, {
  TicketCancelReasonFormRefProps
} from 'components/ticket-cancel-reasons/TicketCancelReasonForm';
import dayjs from 'dayjs';
import { useSearchParamsForm, useServiceTypesOptions, useTicketCancelReasonsPaging, useTitle } from 'hooks';
import { messages, sidebarMenuMessages, ticketCancelReasonsMessages } from 'messages';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDeleteTicketCancelReasonMutation } from 'services';
import { FindAllTicketCancelReasonDto, TicketCancelReasonDto } from 'types';
import { DATE_TIME_FORMAT } from 'utils';
type FindType = Omit<FindAllTicketCancelReasonDto, 'pageIndex' | 'pageSize'>;
const { confirm } = Modal;

const TicketCancelReasonsPage: React.FC = () => {
  useTitle(sidebarMenuMessages.ticketCancelReasons);
  const { setSearchParams, getSearchParams } = useSearchParamsForm();
  const [form] = Form.useForm<FindType>();
  const values = Form.useWatch([], form) || getSearchParams();

  const { ticketCancelReasons, count, pageIndex, handleChangePage, isLoading, resetPage } =
    useTicketCancelReasonsPaging({
      ...values
    });
  const { serviceTypesOptions: serviceTypesOptionsSelected } = useServiceTypesOptions(
    {
      serviceTypeId: values.serviceTypeId
    },
    { skip: values.serviceTypeId?.length === 0 }
  );
  const [onDelete, { isLoading: isLoadingDelete }] = useDeleteTicketCancelReasonMutation();

  const handleDelete = (ticketCancelReason: TicketCancelReasonDto) => {
    confirm({
      title: `${ticketCancelReasonsMessages.delete} ${ticketCancelReason.content}`,
      content: ticketCancelReasonsMessages.confirmDelete,
      cancelText: messages.cancelButtonText,
      okText: messages.confirmButtonText,
      onOk: () => {
        onDelete(ticketCancelReason.ticketCancelReasonId)
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
  const [loading, setLoading] = useState(false);
  const [ticketCancelReasonId, setTicketCancelReasonId] = useState<number | undefined>();
  const [openStatus, setOpenStatus] = useState(false);

  const formRef = useRef<TicketCancelReasonFormRefProps>(null);

  useEffect(() => {
    if (!open && formRef.current && !ticketCancelReasonId) {
      setTicketCancelReasonId(undefined);
      formRef.current.form.resetFields();
    }
  }, [open, formRef.current]);

  const handleOpenStatusModal = (data: TicketCancelReasonDto) => {
    setOpenStatus(true);
    setTicketCancelReasonId(data.ticketCancelReasonId);
  };

  const handleCloseStatusModal = () => {
    setOpenStatus(false);
    setTicketCancelReasonId(undefined);
  };

  const columns: ColumnsType<TicketCancelReasonDto> = [
    {
      title: ticketCancelReasonsMessages.content,
      key: 'content',
      dataIndex: 'content'
    },
    {
      title: ticketCancelReasonsMessages.serviceTypes,
      key: 'serviceTypes',
      dataIndex: 'serviceTypes',
      render: (_val, record) => (
        <Typography.Text className='text-sm'>{record.serviceTypes.map((o) => o.name).join(', ')}</Typography.Text>
      )
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
          <TicketCancelReasonActions
            ticketCancelReason={record}
            onDelete={handleDelete}
            onUpdateStatus={handleOpenStatusModal}
          />
        </div>
      ),
      className: 'px-0',
      fixed: 'right',
      width: 32
    }
  ];

  const handleCreate = useCallback(() => {
    setOpen(true);
    if (formRef.current && values.serviceTypeId?.length && values.serviceTypeId?.length > 0) {
      formRef.current.form.setFieldsValue({
        serviceTypeIds: serviceTypesOptionsSelected.map((o) => ({
          label: o.name,
          value: o.serviceTypeId
        }))
      });
    }
  }, [formRef.current, serviceTypesOptionsSelected]);
  return (
    <div>
      <PageHeader className='flex items-center gap-1'>
        <Typography.Title className='mb-0 text-2.5xl font-bold' level={4}>
          {sidebarMenuMessages.ticketCancelReasons}
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
                <FilterServiceTypes isActive serviceTypeId={values.serviceTypeId} />
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
            dataSource={ticketCancelReasons || []}
            rowKey={(record: TicketCancelReasonDto) => record.ticketCancelReasonId}
            onRow={(record: TicketCancelReasonDto) => ({
              onClick: () => {
                setTicketCancelReasonId(record.ticketCancelReasonId);
                setOpen(true);
              }
            })}
          />
        </div>

        <Modal.Headless
          title={ticketCancelReasonId ? ticketCancelReasonsMessages.update : ticketCancelReasonsMessages.create}
          maskClosable={false}
          centered
          width={888}
          open={open}
          onCancel={() => {
            setOpen(false);
            setTicketCancelReasonId(undefined);
          }}
          forceRender
          footer={[
            <Button
              key='save'
              loading={loading}
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
          <TicketCancelReasonForm
            onCreateSuccess={() => {
              setOpen(false);
              setTicketCancelReasonId(undefined);
            }}
            ref={formRef}
            onChangeLoading={setLoading}
            ticketCancelReasonId={ticketCancelReasonId}
          />
        </Modal.Headless>
        {ticketCancelReasonId && (
          <ChangeTicketCancelReasonStatusModal
            ticketCancelReasonId={ticketCancelReasonId}
            open={openStatus}
            onCancel={handleCloseStatusModal}
            onClose={handleCloseStatusModal}
          />
        )}
      </div>
    </div>
  );
};

export default TicketCancelReasonsPage;
