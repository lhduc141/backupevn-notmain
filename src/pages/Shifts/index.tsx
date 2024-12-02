import { Button, Form, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PlusIcon } from 'assets';
import {
  CommonStatus,
  message,
  PageHeader,
  ShiftActions,
  Modal,
  Table,
  ChangeShiftStatusModal,
  ShiftDrawer,
  InputSearch
} from 'components';
import ShiftForm, { ShiftFormRefProps } from 'components/shifts/ShiftForm';
import { useSearchParamsForm, useShiftsPaging, useTitle } from 'hooks';
import { messages, shiftsMessages, sidebarMenuMessages } from 'messages';
import React, { useEffect, useRef, useState } from 'react';
import { useDeleteShiftMutation } from 'services';
import { FindAllShiftDto, ShiftDto } from 'types';
type FindType = Omit<FindAllShiftDto, 'pageIndex' | 'pageSize'> & {
  /** params id của ca trực xem chi tiết  */
  shiftId: number;
};
const { confirm } = Modal;

const ShiftsPage: React.FC = () => {
  useTitle(sidebarMenuMessages.agentShift);
  const { setSearchParams, getSearchParams, setSearchParam } = useSearchParamsForm();
  const [form] = Form.useForm<FindType>();
  const { shiftId: shiftIdStr, ...values } = Form.useWatch([], form) || getSearchParams();
  const shiftIdParam = shiftIdStr ? Number(shiftIdStr) : undefined;

  const { shifts, count, pageIndex, handleChangePage, isLoading, resetPage } = useShiftsPaging({
    ...values
  });
  const [onDelete, { isLoading: isLoadingDelete }] = useDeleteShiftMutation();

  const handleDelete = (shift: ShiftDto) => {
    confirm({
      title: `${shiftsMessages.delete} ${shift.name}`,
      content: shiftsMessages.confirmDelete,
      cancelText: messages.cancelButtonText,
      okText: messages.confirmButtonText,
      onOk: () => {
        onDelete(shift.shiftId)
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
            setShiftId(undefined);
            setOpenDrawer(false);
          });
      },
      okButtonProps: {
        loading: isLoadingDelete
      }
    });
  };

  const [open, setOpen] = useState(false);
  const [loadingShift, setLoadingShift] = useState(false);
  const [shift, setShift] = useState<ShiftDto | undefined>();
  const [openStatus, setOpenStatus] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(!!shiftIdParam);
  const [shiftId, setShiftId] = useState<number | undefined>(shiftIdParam);

  const formRef = useRef<ShiftFormRefProps>(null);

  useEffect(() => {
    if (!open && formRef.current) {
      setShift(undefined);
      formRef.current.form.resetFields();
    }
  }, [open, formRef.current]);

  useEffect(() => {
    if (shiftIdParam && shiftIdParam !== shiftId) {
      setShiftId(shiftIdParam);
      setOpenDrawer(true);
    }
  }, [shiftIdParam]);

  const columns: ColumnsType<ShiftDto> = [
    {
      title: shiftsMessages.name,
      key: 'name',
      dataIndex: 'name',
      render: (val) => <Typography.Text className='text-sm font-semibold'>{val ?? '-'}</Typography.Text>
    },
    {
      title: shiftsMessages.code,
      key: 'code',
      dataIndex: 'code'
    },
    {
      title: shiftsMessages.fromTime,
      key: 'fromTime',
      render: (_, record) => (
        <Typography.Text className='text-sm'>{record.fromTime ? `${record.fromTime}` : '-'}</Typography.Text>
      )
    },
    {
      title: shiftsMessages.toTime,
      key: 'toTime',
      render: (_, record) => (
        <Typography.Text className='text-sm'>{record.toTime ? `${record.toTime}` : '-'}</Typography.Text>
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
          <ShiftActions
            onUpdateInfo={handleOpenUpdateModal}
            shift={record}
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

  const handleCreate = () => {
    setOpen(true);
  };

  const handleOpenStatusModal = (data: ShiftDto) => {
    setOpenStatus(true);
    setShift(data);
  };

  const handleCloseStatusModal = () => {
    setOpenStatus(false);
    setShift(undefined);
  };

  const handleOpenUpdateModal = (data: ShiftDto) => {
    setShift(data);
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setShiftId(undefined);
    setSearchParam('shiftId', '');
  };
  return (
    <div>
      <PageHeader className='flex items-center gap-1'>
        <Typography.Title className='mb-0 text-header-title font-bold' level={4}>
          {sidebarMenuMessages.agentShift}
        </Typography.Title>
      </PageHeader>
      <div className='flex flex-col gap-5 rounded-xl bg-colorBgContainer px-6 py-5'>
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
              <Form.Item<FindType> className='mb-0 mr-2 max-w-[400px] flex-1' name='keyword'>
                <InputSearch placeholder={shiftsMessages.findByName} />
              </Form.Item>
              <Button className='ml-auto' onClick={handleCreate} type='primary' icon={<PlusIcon />}>
                {messages.createButtonText}
              </Button>
            </div>
          </div>
        </Form>
        <div>
          <Table
            loading={isLoading || loadingShift}
            currentPage={pageIndex}
            count={count}
            handleChangePage={handleChangePage}
            columns={columns}
            dataSource={shifts || []}
            rowKey={(record: ShiftDto) => record.shiftId}
            onRow={(record: ShiftDto) => ({
              onClick: () => {
                setShiftId(record.shiftId);
                setSearchParam('shiftId', record.shiftId);
                setOpenDrawer(true);
              }
            })}
          />
        </div>

        <Modal.Headless
          title={shift ? `${shiftsMessages.update}` : shiftsMessages.create}
          maskClosable={false}
          centered
          width={568}
          open={open}
          onCancel={() => {
            setOpen(false);
          }}
          footer={[
            <Button
              key='save'
              loading={loadingShift}
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
          <ShiftForm
            onCreateSuccess={() => {
              setOpen(false);
            }}
            ref={formRef}
            onChangeLoading={setLoadingShift}
            shiftId={shift?.shiftId}
          />
        </Modal.Headless>
        {shift && (
          <ChangeShiftStatusModal
            shiftId={shift?.shiftId}
            open={openStatus}
            onCancel={handleCloseStatusModal}
            onClose={handleCloseStatusModal}
          />
        )}
        <ShiftDrawer
          open={openDrawer}
          shiftId={shiftId}
          onClose={handleCloseDrawer}
          onChangeLoading={setLoadingShift}
          onDelete={handleDelete}
          onUpdateStatus={handleOpenStatusModal}
          onUpdateInfo={handleOpenUpdateModal}
        />
      </div>
    </div>
  );
};

export default ShiftsPage;
