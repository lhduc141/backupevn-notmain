import { Button, Form, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PlusIcon } from 'assets';
import {
  ChangeServiceTypeStatusModal,
  CommonStatus,
  InputSearch,
  message,
  Modal,
  PageHeader,
  ServiceTypeActions,
  ServiceTypeForm
} from 'components';
import { ServiceTypeFromRefProps } from 'components/service-types/ServiceTypeForm';
import { useSearchParamsForm, useTitle } from 'hooks';
import { useServiceTypesHierarchy } from 'hooks/service-types/useServiceTypesHierarchy';
import { messages, sidebarMenuMessages } from 'messages';
import { serviceTypesMessages } from 'messages/service-types.messages';

import React, { useEffect, useRef, useState } from 'react';
import { useDeleteServiceTypeMutation } from 'services';
import { FindWithKeywordDto, ServiceTypeHierarchyDto } from 'types';
type FindType = FindWithKeywordDto;
const { confirm } = Modal;

const ServiceTypesPage: React.FC = () => {
  useTitle(sidebarMenuMessages.serviceTypes);
  const { setSearchParams, getSearchParams } = useSearchParamsForm();
  const [expandedKeys, setExpandedKeys] = useState<number[]>([]);

  const [form] = Form.useForm<FindType>();
  const values = Form.useWatch([], form) || getSearchParams();
  const { serviceTypesHierarchy, isLoading } = useServiceTypesHierarchy({
    ...values
  });
  const [onDelete, { isLoading: isLoadingDelete }] = useDeleteServiceTypeMutation();

  const [open, setOpen] = useState(false);
  const [serviceTypeId, setServiceTypeId] = useState<number | undefined>();
  const [openStatus, setOpenStatus] = useState(false);

  const [loadingCustomerSI, setLoadingCustomerSI] = useState(false);
  const serviceTypeFormRef = useRef<ServiceTypeFromRefProps>(null);
  const expandFirstRef = useRef<boolean>(false);

  useEffect(() => {
    if (!open && serviceTypeFormRef.current) {
      setServiceTypeId(undefined);
      serviceTypeFormRef.current.form.resetFields();
    }
  }, [open, serviceTypeFormRef.current]);

  const getAllKeys = (data: ServiceTypeHierarchyDto[]): number[] => {
    let keys: number[] = [];
    if (!data) return [];
    data.forEach((item) => {
      keys.push(item.serviceTypeId);
      if (item.children) {
        keys = keys.concat(getAllKeys(item.children));
      }
    });
    return keys;
  };

  useEffect(() => {
    if (!expandFirstRef.current && serviceTypesHierarchy?.length && serviceTypesHierarchy?.length > 0) {
      setExpandedKeys(getAllKeys(serviceTypesHierarchy || []));
      expandFirstRef.current = true;
    }
  }, [serviceTypesHierarchy]);

  const handleDelete = (serviceType: ServiceTypeHierarchyDto) => {
    confirm({
      title: `${serviceTypesMessages.delete} ${serviceType.name}`,
      content: serviceTypesMessages.confirmDelete,
      cancelText: messages.cancelButtonText,
      okText: messages.confirmButtonText,
      onOk: () => {
        onDelete(serviceType.serviceTypeId)
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

  const columns: ColumnsType<ServiceTypeHierarchyDto> = [
    {
      title: serviceTypesMessages.code,
      key: 'code',
      dataIndex: 'code',
      render: (val) => <Typography.Text className='text-sm font-semibold'>{val ?? '-'}</Typography.Text>
    },
    {
      title: serviceTypesMessages.serviceType,
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: serviceTypesMessages.status,
      key: 'status',
      dataIndex: 'isActive',
      render: (value) => <CommonStatus value={value} />
    },
    {
      title: serviceTypesMessages.priority,
      key: 'priority',
      dataIndex: 'priority'
    },
    {
      title: serviceTypesMessages.processingDeadline,
      key: 'processingDeadline',
      dataIndex: 'processingDeadline'
    },
    {
      title: '',
      key: 'actions',
      render: (_, record) => (
        <div onClick={(e) => e.stopPropagation()}>
          <ServiceTypeActions serviceType={record} onDelete={handleDelete} onUpdateStatus={handleOpenStatusModal} />
        </div>
      ),
      className: 'px-0',
      fixed: 'right',
      width: 32
    }
  ];

  const handleCreate = () => {
    setOpen(true);
    if (serviceTypeFormRef.current) {
      serviceTypeFormRef.current.form.resetFields();
    }
  };

  const handleOnExpand = (expanded: boolean, record: ServiceTypeHierarchyDto) => {
    if (expanded) {
      setExpandedKeys((prev) => [...prev, record.serviceTypeId]);
    } else {
      setExpandedKeys((prev) => prev.filter((key) => key !== record.serviceTypeId));
    }
  };

  const handleOpenStatusModal = (data: ServiceTypeHierarchyDto) => {
    setOpenStatus(true);
    setServiceTypeId(data.serviceTypeId);
  };

  const handleCloseStatusModal = () => {
    setOpenStatus(false);
    setServiceTypeId(undefined);
  };

  return (
    <div>
      <PageHeader className='flex items-center gap-1'>
        <Typography.Title className='mb-0 text-2.5xl font-bold' level={4}>
          {sidebarMenuMessages.serviceTypes}
        </Typography.Title>
      </PageHeader>
      <div className='flex flex-col gap-5 rounded-xl bg-colorBgContainer p-5'>
        <Form
          scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
          form={form}
          initialValues={getSearchParams()}
          onValuesChange={() => {
            const values = form.getFieldsValue();
            setSearchParams(values);
          }}
        >
          <div>
            <div className='flex items-center gap-4'>
              <Form.Item<FindType> className='mb-0 mr-6 max-w-[400px] flex-1' name='keyword'>
                <InputSearch placeholder={serviceTypesMessages.name} />
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
            columns={columns}
            dataSource={serviceTypesHierarchy || []}
            rowKey={(record: ServiceTypeHierarchyDto) => record.serviceTypeId}
            onRow={(record: ServiceTypeHierarchyDto) => ({
              onClick: () => {
                setServiceTypeId(record.serviceTypeId);
                setOpen(true);
              }
            })}
            expandable={{
              expandedRowKeys: expandedKeys,
              onExpand: handleOnExpand
            }}
            pagination={false}
          />
        </div>

        <Modal.Headless
          title={serviceTypeId ? serviceTypesMessages.update : serviceTypesMessages.create}
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
              loading={loadingCustomerSI}
              onClick={() => {
                if (serviceTypeFormRef.current) {
                  serviceTypeFormRef.current.form.submit();
                }
              }}
              size='large'
              type='primary'
              key='submit'
            >
              {messages.saveButtonText}
            </Button>
          ]}
        >
          <ServiceTypeForm
            serviceTypeId={serviceTypeId}
            onCreateSuccess={() => {
              setOpen(false);
            }}
            ref={serviceTypeFormRef}
            onChangeLoading={setLoadingCustomerSI}
          />
        </Modal.Headless>
        {serviceTypeId && (
          <ChangeServiceTypeStatusModal
            serviceTypeId={serviceTypeId}
            open={openStatus}
            onCancel={handleCloseStatusModal}
            onClose={handleCloseStatusModal}
          />
        )}
      </div>
    </div>
  );
};

export default ServiceTypesPage;
