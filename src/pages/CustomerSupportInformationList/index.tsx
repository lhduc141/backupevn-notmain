import { Button, Form, Space, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FormatIcon, PlusIcon } from 'assets';
import {
  FilterOptions,
  InputSearchV2,
  PageHeader,
  Table,
  CommonStatus,
  CustomerSupportInformationActions,
  CustomerSupportInformationDrawer,
  InputSearch
} from 'components';
import ChangeCustomerSupportInformationStatusModal from 'components/customer-support-information/ChangeCustomerSupportInformationStatusModal';
import { useSearchParamsForm, useTitle } from 'hooks';
import { useCustomerSupportInformationPaging } from 'hooks/customer-support-information';
import { messages, sidebarMenuMessages } from 'messages';
import { customerSupportInformationMessages } from 'messages/customer-support-information.messages';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from 'routes/constants';
import { colorsBase } from 'themes';
import { CustomerSupportInformationDto, FindAllCustomerSupportInformationDto } from 'types';
import { CORE_OPTION_TYPES, MICROSERVICES } from 'utils';

type FindType = Omit<FindAllCustomerSupportInformationDto, 'pageIndex' | 'pageSize'> & {
  /** params id của hướng dẫn xem chi tiết  */
  customerSI: number;
};
const CustomerSupportInformationListPage: React.FC = () => {
  useTitle(sidebarMenuMessages.customerSupportInformation);
  const { setSearchParams, getSearchParams, setSearchParam } = useSearchParamsForm();
  const [form] = Form.useForm<FindType>();
  const { customerSI: customerInformationIdParam, ...values } = Form.useWatch([], form) || getSearchParams();
  const customerSI = customerInformationIdParam ? Number(customerInformationIdParam) : undefined;

  const { customerSupportInformation, resetPage, count, pageIndex, handleChangePage, isLoading } =
    useCustomerSupportInformationPaging({
      ...values,
      isActive: values.isActive || undefined,
      isNew: values.isNew || undefined
    });

  const [loadingCustomerSI, setLoadingCustomerSI] = useState(false);
  const [customerSupportInformationId, setCustomerSupportInformationId] = useState<number | undefined>(customerSI);
  const [openStatus, setOpenStatus] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(!!customerSI);

  useEffect(() => {
    if (customerSI && customerSI !== customerSupportInformationId) {
      setCustomerSupportInformationId(customerSI);
      setOpenDrawer(true);
    }
  }, [customerSI]);

  const columns: ColumnsType<CustomerSupportInformationDto> = [
    {
      title: customerSupportInformationMessages.title,
      dataIndex: 'title',
      key: 'title',
      render: (val, record) => (
        <Space>
          <Typography.Text className='text-sm font-semibold'>{val ?? '-'}</Typography.Text>
          {record.isNew && <Tag color={colorsBase.colorPrimaryActive}>{customerSupportInformationMessages.isNew}</Tag>}
        </Space>
      )
    },
    {
      title: customerSupportInformationMessages.format,
      key: 'format',
      render: (_, record) => <Typography.Text className='text-sm'>{record.format.name ?? '-'}</Typography.Text>,
      width: '20%'
    },
    {
      title: customerSupportInformationMessages.status,
      key: 'status',
      dataIndex: 'isActive',
      render: (value) => <CommonStatus value={value} />,
      width: '35%'
    },
    {
      title: '',
      key: 'actions',
      render: (_, record) => (
        <div onClick={(e) => e.stopPropagation()}>
          <CustomerSupportInformationActions
            customerSupportInformation={record}
            onUpdateStatus={handleOpenStatusModal}
          />
        </div>
      ),
      width: 32,
      fixed: 'right',
      className: 'p-0'
    }
  ];

  const handleOpenStatusModal = (data: CustomerSupportInformationDto) => {
    setOpenStatus(true);
    setCustomerSupportInformationId(data.customerSupportInformationId);
  };

  const handleCloseStatusModal = () => {
    setOpenStatus(false);
    setCustomerSupportInformationId(undefined);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setCustomerSupportInformationId(undefined);
    setSearchParam('customerSI', '');
  };

  return (
    <div>
      <PageHeader className='flex items-center gap-1'>
        <Typography.Title className='mb-0 font-bold' level={3}>
          {sidebarMenuMessages.customerSupportInformation}
        </Typography.Title>
      </PageHeader>
      <div className='flex flex-col gap-5 rounded-xl bg-colorBgContainer px-6 py-5'>
        <Form
          scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
          form={form}
          initialValues={getSearchParams()}
          onValuesChange={() => {
            resetPage();
            const { isActive, isNew, ...values } = form.getFieldsValue();
            setSearchParams({ ...values, isActive: isActive || undefined, isNew: isNew || undefined });
          }}
        >
          <div>
            <div className='flex items-center gap-4'>
              <Form.Item<FindType> className='mb-0 mr-2 max-w-[400px] flex-1' name='keyword'>
                <InputSearch placeholder={customerSupportInformationMessages.findByTitle} />
              </Form.Item>
              <Form.Item<FindType> noStyle name='formatId'>
                <FilterOptions
                  icon={<FormatIcon />}
                  title={customerSupportInformationMessages.format}
                  optionTypeId={CORE_OPTION_TYPES.CUSTOMER_SUPPORT_INFORMATION_FORMAT}
                  service={MICROSERVICES.CORE}
                />
              </Form.Item>
              <Link to={`${ROUTE.CUSTOMER_SUPPORT_INFORMATION}/new`} className='ml-auto'>
                <Button className='ml-auto' type='primary' icon={<PlusIcon />}>
                  {messages.createButtonText}
                </Button>
              </Link>
            </div>
          </div>
        </Form>
        <div>
          <Table
            loading={isLoading || loadingCustomerSI}
            currentPage={pageIndex}
            count={count}
            handleChangePage={handleChangePage}
            columns={columns}
            dataSource={customerSupportInformation || []}
            rowKey={(record: CustomerSupportInformationDto) => record.customerSupportInformationId}
            onRow={(record: CustomerSupportInformationDto) => ({
              onClick: () => {
                setCustomerSupportInformationId(record.customerSupportInformationId);
                setSearchParam('customerSI', record.customerSupportInformationId);
                setOpenDrawer(true);
              }
            })}
          />
        </div>

        {customerSupportInformationId && (
          <ChangeCustomerSupportInformationStatusModal
            customerSupportInformationId={customerSupportInformationId}
            open={openStatus}
            onCancel={handleCloseStatusModal}
            onClose={handleCloseStatusModal}
          />
        )}
        <CustomerSupportInformationDrawer
          open={openDrawer}
          customerSupportInformationId={customerSupportInformationId}
          onClose={handleCloseDrawer}
          onChangeLoading={setLoadingCustomerSI}
        />
      </div>
    </div>
  );
};

export default CustomerSupportInformationListPage;
