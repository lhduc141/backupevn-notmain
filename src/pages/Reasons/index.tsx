import { Button, Form, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PlusIcon } from 'assets';
import {
  ChangeReasonStatusModal,
  CommonStatus,
  message,
  Modal,
  PageHeader,
  ReasonActions,
  ReasonForm,
  Table
} from 'components';
import { ReasonFormRefProps } from 'components/reasons/ReasonForm';
import { useReasonsPaging, useSearchParamsForm, useTitle } from 'hooks';
import { messages, reasonsMessages, sidebarMenuMessages } from 'messages';
import React, { useEffect, useRef, useState } from 'react';
import { useDeleteReasonMutation } from 'services';
import { FindAllReasonDto, ReasonDto } from 'types';
type FindType = Omit<FindAllReasonDto, 'pageIndex' | 'pageSize'>;
const { confirm } = Modal;

const ReasonsPage: React.FC = () => {
  useTitle(sidebarMenuMessages.busyReasons);
  const { setSearchParams, getSearchParams } = useSearchParamsForm();
  const [form] = Form.useForm<FindType>();
  const values = Form.useWatch([], form) || getSearchParams();

  const [openStatus, setOpenStatus] = useState(false);

  const { reasons, count, pageIndex, handleChangePage, isLoading, resetPage } = useReasonsPaging({
    ...values
  });
  const [onDelete, { isLoading: isLoadingDelete }] = useDeleteReasonMutation();

  const handleDelete = (reason: ReasonDto) => {
    confirm({
      title: `${reasonsMessages.delete} ${reason.content}`,
      content: reasonsMessages.confirmDelete,
      cancelText: messages.cancelButtonText,
      okText: messages.confirmButtonText,
      onOk: () => {
        onDelete(reason.reasonId)
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
  const [reason, setReason] = useState<ReasonDto | undefined>();

  const formRef = useRef<ReasonFormRefProps>(null);

  useEffect(() => {
    if (!open && formRef.current) {
      setReason(undefined);
      formRef.current.form.resetFields();
    }
  }, [open, formRef.current]);

  const columns: ColumnsType<ReasonDto> = [
    {
      title: reasonsMessages.content,
      key: 'content',
      dataIndex: 'content',
      render: (val) => <Typography.Text className='text-sm font-semibold'>{val ?? '-'}</Typography.Text>
    },
    {
      title: reasonsMessages.code,
      key: 'code',
      dataIndex: 'code'
    },
    {
      title: messages.status,
      key: 'isActive',
      dataIndex: 'isActive',
      render: (value) => <CommonStatus value={value} />
    },
    {
      title: '',
      key: 'actions',
      render: (_, record) => (
        <div onClick={(e) => e.stopPropagation()}>
          <ReasonActions reason={record} onDelete={handleDelete} onUpdateStatus={handleOpenStatusModal} />
        </div>
      ),
      className: 'px-0',
      fixed: 'right',
      width: 32
    }
  ];

  const handleCreate = () => {
    setOpen(true);
    if (formRef.current) {
      formRef.current.form.setFieldsValue({});
    }
  };

  const handleOpenStatusModal = (data: ReasonDto) => {
    setOpenStatus(true);
    setReason(data);
  };

  const handleCloseStatusModal = () => {
    setOpenStatus(false);
    setReason(undefined);
  };

  return (
    <div>
      <PageHeader className='flex items-center gap-1'>
        <Typography.Title className='mb-0 text-2.5xl font-bold' level={4}>
          {sidebarMenuMessages.busyReasons}
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
            dataSource={reasons || []}
            rowKey={(record: ReasonDto) => record.reasonId}
            onRow={(record: ReasonDto) => ({
              onClick: () => {
                setReason(record);
                setOpen(true);
              }
            })}
          />
        </div>

        <Modal.Headless
          title={reason ? reasonsMessages.update : reasonsMessages.create}
          maskClosable={false}
          centered
          width={686}
          open={open}
          onCancel={() => {
            setOpen(false);
          }}
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
          destroyOnClose
        >
          <ReasonForm
            onCreateSuccess={() => {
              setOpen(false);
            }}
            ref={formRef}
            onChangeLoading={setLoadingCustomerSI}
            reasonId={reason?.reasonId}
          />
        </Modal.Headless>
        {reason && (
          <ChangeReasonStatusModal
            reasonId={reason.reasonId}
            open={openStatus}
            onCancel={handleCloseStatusModal}
            onClose={handleCloseStatusModal}
          />
        )}
      </div>
    </div>
  );
};

export default ReasonsPage;
