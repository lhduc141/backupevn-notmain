import { Button, Form, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PlusIcon } from 'assets';
import { message, PageHeader, Table, Modal, VipCustomerActions, VipCustomerForm, InputSearch } from 'components';
import { VipCustomerFromRefProps } from 'components/vip-customers/VipCustomerForm';
import { useSearchParamsForm, useTitle, useVipCustomersPaging } from 'hooks';
import { messages, sidebarMenuMessages, vipCustomersMessages } from 'messages';
import React, { useEffect, useRef, useState } from 'react';
import { useDeleteVipCustomerMutation } from 'services';
import { FindAllVipCustomerDto, VipCustomerDto } from 'types';
type FindType = Omit<FindAllVipCustomerDto, 'pageIndex' | 'pageSize'>;
const { confirm } = Modal;

const VipCustomersPage: React.FC = () => {
  useTitle(sidebarMenuMessages.vipCustomers);
  const { setSearchParams, getSearchParams } = useSearchParamsForm();
  const [form] = Form.useForm<FindType>();
  const values = Form.useWatch([], form) || getSearchParams();
  const { vipCustomers, count, pageIndex, handleChangePage, isLoading, resetPage } = useVipCustomersPaging({
    ...values
  });
  const [onDelete, { isLoading: isLoadingDelete }] = useDeleteVipCustomerMutation();

  const handleDelete = (vipCustomer: VipCustomerDto) => {
    confirm({
      title: `${vipCustomersMessages.delete} ${vipCustomer.name}`,
      content: vipCustomersMessages.confirmDelete,
      cancelText: messages.cancelButtonText,
      okText: messages.confirmButtonText,
      onOk: () => {
        onDelete(vipCustomer.vipCustomerId)
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
  const [vipCustomerId, setVipCustomerId] = useState<number | undefined>();

  const [loadingCustomerSI, setLoadingCustomerSI] = useState(false);
  const vipCustomerFormRef = useRef<VipCustomerFromRefProps>(null);

  useEffect(() => {
    if (!open && vipCustomerFormRef.current) {
      setVipCustomerId(undefined);
      vipCustomerFormRef.current.form.resetFields();
    }
  }, [open, vipCustomerFormRef.current]);

  const columns: ColumnsType<VipCustomerDto> = [
    {
      title: vipCustomersMessages.code,
      key: 'code',
      dataIndex: 'code',
      render: (val) => <Typography.Text className='text-sm font-semibold'>{val ?? '-'}</Typography.Text>
    },
    {
      title: vipCustomersMessages.phoneNumber,
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: vipCustomersMessages.name,
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: vipCustomersMessages.note,
      dataIndex: 'note',
      key: 'note'
    },
    {
      title: vipCustomersMessages.color,
      key: 'color',
      dataIndex: 'color',
      render: (val) => <div className='h-6 w-6 rounded' style={{ background: val }} />
    },
    {
      title: '',
      key: 'actions',
      render: (_, record) => (
        <div onClick={(e) => e.stopPropagation()}>
          <VipCustomerActions vipCustomer={record} onDelete={handleDelete} />
        </div>
      ),
      className: 'px-0',
      fixed: 'right',
      width: 32
    }
  ];
  const handleCreate = () => {
    setOpen(true);
    if (vipCustomerFormRef.current) {
      vipCustomerFormRef.current.form.resetFields();
    }
  };
  return (
    <div>
      <PageHeader className='flex items-center gap-1'>
        <Typography.Title className='mb-0 text-2.5xl font-bold' level={4}>
          {sidebarMenuMessages.vipCustomers}
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
              <Form.Item<FindType> className='mb-0 mr-6 max-w-[400px] flex-1' name='keyword'>
                <InputSearch placeholder={vipCustomersMessages.name} />
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
            dataSource={vipCustomers || []}
            rowKey={(record: VipCustomerDto) => record.vipCustomerId}
            onRow={(record: VipCustomerDto) => ({
              onClick: () => {
                setVipCustomerId(record.vipCustomerId);
                setOpen(true);
              }
            })}
          />
        </div>

        <Modal.Headless
          title={vipCustomerId ? vipCustomersMessages.update : vipCustomersMessages.create}
          maskClosable={false}
          centered
          width={686}
          open={open}
          onCancel={() => {
            setOpen(false);
          }}
          destroyOnClose
          footer={[
            <Button
              key='save'
              loading={loadingCustomerSI}
              onClick={() => {
                if (vipCustomerFormRef.current) {
                  vipCustomerFormRef.current.form.submit();
                }
              }}
              size='large'
              type='primary'
            >
              {messages.saveButtonText}
            </Button>
          ]}
        >
          <VipCustomerForm
            vipCustomerId={vipCustomerId}
            onCreateSuccess={() => {
              setOpen(false);
            }}
            ref={vipCustomerFormRef}
            onChangeLoading={setLoadingCustomerSI}
          />
        </Modal.Headless>
      </div>
    </div>
  );
};

export default VipCustomersPage;
