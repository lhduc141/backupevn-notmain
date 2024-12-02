import { Button, Form, Modal, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { InputSearch, PageHeader, ServiceInstructionForm } from 'components';
import { ServiceInstructionsFromRefProps } from 'components/service-instructions/ServiceInstructionForm';
import { useSearchParamsForm, useServiceInstructionsHierarchy, useTitle } from 'hooks';
import { messages, serviceInstructionsMessages, sidebarMenuMessages } from 'messages';
import { serviceTypesMessages } from 'messages/service-types.messages';

import React, { useEffect, useRef, useState } from 'react';
import { FindWithKeywordDto, ServiceTypeHierarchyDto } from 'types';
type FindType = FindWithKeywordDto;
const ServiceInstructionsPage: React.FC = () => {
  useTitle(sidebarMenuMessages.serviceInstructions);
  const { setSearchParams, getSearchParams } = useSearchParamsForm();
  const [form] = Form.useForm<FindType>();
  const values = Form.useWatch([], form) || getSearchParams();
  const { serviceTypesWithInstructionsHierarchy, isLoading } = useServiceInstructionsHierarchy({
    ...values
  });

  const [expandedKeys, setExpandedKeys] = useState<number[]>([]);
  const expandFirstRef = useRef<boolean>(false);

  const [open, setOpen] = useState(false);
  const [serviceTypeId, setServiceInstructionId] = useState<number | undefined>();

  const [loadingCustomerSI, setLoadingCustomerSI] = useState(false);
  const serviceTypeFormRef = useRef<ServiceInstructionsFromRefProps>(null);

  useEffect(() => {
    if (!open && serviceTypeFormRef.current) {
      setServiceInstructionId(undefined);
      serviceTypeFormRef.current.form.resetFields();
    }
  }, [open, serviceTypeFormRef.current]);

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
    }
  ];

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
    if (!expandFirstRef.current && serviceTypesWithInstructionsHierarchy.length > 0) {
      setExpandedKeys(getAllKeys(serviceTypesWithInstructionsHierarchy || []));
      expandFirstRef.current = true;
    }
  }, [serviceTypesWithInstructionsHierarchy]);

  const handleOnExpand = (expanded: boolean, record: ServiceTypeHierarchyDto) => {
    if (expanded) {
      setExpandedKeys((prev) => [...prev, record.serviceTypeId]);
    } else {
      setExpandedKeys((prev) => prev.filter((key) => key !== record.serviceTypeId));
    }
  };

  return (
    <div>
      <PageHeader className='flex items-center gap-1'>
        <Typography.Title className='mb-0 text-2.5xl font-bold' level={4}>
          {sidebarMenuMessages.serviceInstructions}
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
                <InputSearch placeholder={serviceTypesMessages.serviceType} />
              </Form.Item>
            </div>
          </div>
        </Form>
        <div>
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={serviceTypesWithInstructionsHierarchy || []}
            rowKey={(record: ServiceTypeHierarchyDto) => record.serviceTypeId}
            onRow={(record: ServiceTypeHierarchyDto) => ({
              onClick: () => {
                setServiceInstructionId(record.serviceTypeId);
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

        <Modal
          maskClosable={false}
          centered
          width={800}
          title={serviceInstructionsMessages.update}
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
            >
              {messages.saveButtonText}
            </Button>
          ]}
        >
          {serviceTypeId && (
            <ServiceInstructionForm
              serviceTypeId={serviceTypeId}
              onCreateSuccess={() => {
                setOpen(false);
              }}
              ref={serviceTypeFormRef}
              onChangeLoading={setLoadingCustomerSI}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ServiceInstructionsPage;
