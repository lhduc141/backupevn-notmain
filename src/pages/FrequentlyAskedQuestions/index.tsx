import { Button, Form, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PlusIcon } from 'assets';
import { FilterServiceTypes, FrequentlyAskedQuestionActions, Modal, FrequentlyAskedQuestionForm } from 'components';
import { CommonStatus, InputSearch, message, PageHeader, Table } from 'components/common';
import ChangeFrequentlyAskedQuestionStatusModal from 'components/frequently-asked-questions/ChangeFrequentlyAskedQuestionStatusModal';
import { FrequentlyAskedQuestionFormRefProps } from 'components/frequently-asked-questions/FrequentlyAskedQuestionForm';
import { useFrequentlyAskedQuestionsPaging, useSearchParamsForm, useTitle } from 'hooks';
import { messages, serviceTypesMessages, sidebarMenuMessages } from 'messages';
import { frequentlyAskedQuestionsMessages } from 'messages/frequently-asked-questions.messages';

import React, { useEffect, useRef, useState } from 'react';
import { useDeleteFrequentlyAskedQuestionMutation } from 'services';
import { FindAllFrequentlyAskedQuestionDto, FrequentlyAskedQuestionOmitContentDto } from 'types';
type FindType = Omit<FindAllFrequentlyAskedQuestionDto, 'pageIndex' | 'pageSize'>;
const { confirm } = Modal;

const FrequentlyAskedQuestionsPage: React.FC = () => {
  useTitle(sidebarMenuMessages.frequentlyAskedQuestions);
  const { setSearchParams, getSearchParams } = useSearchParamsForm();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [frequentlyAskedQuestionId, setFrequentlyAskedQuestionId] = useState<number | undefined>();
  const frequentlyAskedQuestionFormRef = useRef<FrequentlyAskedQuestionFormRefProps>(null);
  const [form] = Form.useForm<FindType>();
  const values = Form.useWatch([], form) || getSearchParams();
  const [openStatus, setOpenStatus] = useState(false);

  const { frequentlyAskedQuestions, count, pageIndex, handleChangePage, isLoading, resetPage } =
    useFrequentlyAskedQuestionsPaging({ ...values });
  const [onDelete, { isLoading: isLoadingDelete }] = useDeleteFrequentlyAskedQuestionMutation();

  const handleDelete = (faq: FrequentlyAskedQuestionOmitContentDto) => {
    confirm({
      title: `${frequentlyAskedQuestionsMessages.delete} ${faq.title}`,
      content: frequentlyAskedQuestionsMessages.confirmDelete,
      cancelText: messages.cancelButtonText,
      okText: messages.confirmButtonText,
      onOk: () => {
        onDelete(faq.frequentlyAskedQuestionId)
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
  useEffect(() => {
    if (!open && frequentlyAskedQuestionFormRef.current) {
      setFrequentlyAskedQuestionId(undefined);
      frequentlyAskedQuestionFormRef.current.form.resetFields();
    }
  }, [open, frequentlyAskedQuestionFormRef.current]);

  const handleOpenStatusModal = (data: FrequentlyAskedQuestionOmitContentDto) => {
    setOpenStatus(true);
    setFrequentlyAskedQuestionId(data.frequentlyAskedQuestionId);
  };

  const handleCloseStatusModal = () => {
    setOpenStatus(false);
    setFrequentlyAskedQuestionId(undefined);
  };

  const columns: ColumnsType<FrequentlyAskedQuestionOmitContentDto> = [
    {
      title: messages.index,
      key: 'index',
      render: (_, _record, index) => <Typography.Text className='text-s'>{index + 1}</Typography.Text>
    },
    {
      title: frequentlyAskedQuestionsMessages.title,
      key: 'title',
      dataIndex: 'title'
    },
    {
      title: frequentlyAskedQuestionsMessages.serviceType,
      key: 'serviceType',
      render: (_, record) => (
        <Typography.Text className='text-sm'>
          {record.serviceTypeId ? record.serviceType?.name || '-' : serviceTypesMessages.allServiceType}
        </Typography.Text>
      )
    },

    {
      title: frequentlyAskedQuestionsMessages.keyword,
      key: 'keyword',
      dataIndex: 'keyword'
    },
    {
      title: frequentlyAskedQuestionsMessages.priority,
      key: 'priority',
      dataIndex: 'priority'
    },
    {
      title: frequentlyAskedQuestionsMessages.status,
      key: 'isActive',
      dataIndex: 'isActive',
      render: (value) => <CommonStatus value={value} />
    },
    {
      title: '',
      key: 'actions',
      render: (_, record) => (
        <div onClick={(e) => e.stopPropagation()}>
          <FrequentlyAskedQuestionActions faq={record} onDelete={handleDelete} onUpdateStatus={handleOpenStatusModal} />
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
          {sidebarMenuMessages.frequentlyAskedQuestions}
        </Typography.Title>
      </PageHeader>
      <div className='flex flex-col rounded-xl bg-colorBgContainer p-5'>
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
            <div className='flex items-center justify-between'>
              <div className='flex flex-1 gap-6'>
                <Form.Item<FindType> className='mb-0 max-w-[400px] flex-1' name='keyword'>
                  <InputSearch placeholder={[frequentlyAskedQuestionsMessages.title].join(', ')} />
                </Form.Item>
                <div className='flex items-center gap-2'>
                  <Form.Item<FindType> className='mb-0 mr-6' name='serviceTypeId'>
                    <FilterServiceTypes />
                  </Form.Item>
                </div>
              </div>
              <Button
                className='ml-auto'
                onClick={() => {
                  setOpen(true);
                }}
                type='primary'
                icon={<PlusIcon />}
              >
                {messages.createButtonText}
              </Button>
            </div>
          </div>
        </Form>
        <div className='pt-5'>
          <Table
            loading={isLoading}
            currentPage={pageIndex}
            count={count}
            handleChangePage={handleChangePage}
            columns={columns}
            dataSource={frequentlyAskedQuestions || []}
            rowKey={(record: FrequentlyAskedQuestionOmitContentDto) => record.frequentlyAskedQuestionId}
            onRow={(record: FrequentlyAskedQuestionOmitContentDto) => ({
              onClick: () => {
                setOpen(true);
                setFrequentlyAskedQuestionId(record.frequentlyAskedQuestionId);
              }
            })}
          />
        </div>
        <Modal.Headless
          title={
            frequentlyAskedQuestionId
              ? frequentlyAskedQuestionsMessages.update
              : frequentlyAskedQuestionsMessages.create
          }
          maskClosable={false}
          centered
          width={688}
          open={open}
          onCancel={() => {
            setOpen(false);
          }}
          destroyOnClose
          footer={[
            <Button
              key='btn-submit'
              loading={loading}
              onClick={() => {
                if (frequentlyAskedQuestionFormRef.current) {
                  frequentlyAskedQuestionFormRef.current.form.submit();
                }
              }}
              size='large'
              type='primary'
            >
              {messages.saveButtonText}
            </Button>
          ]}
        >
          <FrequentlyAskedQuestionForm
            ref={frequentlyAskedQuestionFormRef}
            frequentlyAskedQuestionId={frequentlyAskedQuestionId}
            onChangeLoading={setLoading}
            onSubmitSuccess={() => {
              setOpen(false);
            }}
          />
        </Modal.Headless>
        {frequentlyAskedQuestionId && (
          <ChangeFrequentlyAskedQuestionStatusModal
            frequentlyAskedQuestionId={frequentlyAskedQuestionId}
            open={openStatus}
            onCancel={handleCloseStatusModal}
            onClose={handleCloseStatusModal}
          />
        )}
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestionsPage;
