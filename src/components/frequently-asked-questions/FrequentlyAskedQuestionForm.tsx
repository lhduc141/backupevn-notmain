import { Divider, Form, FormInstance, Input, InputNumber, Spin, Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { Editor, FormItem, message } from 'components';
import SelectServiceTypes from 'components/service-types/SelectServiceTypes';
import { validateMessages } from 'messages';
import { frequentlyAskedQuestionsMessages } from 'messages/frequently-asked-questions.messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import {
  useCreateFrequentlyAskedQuestionMutation,
  useGetFrequentlyAskedQuestionDetailQuery,
  useUpdateFrequentlyAskedQuestionMutation
} from 'services';
import { CreateFrequentlyAskedQuestionDto } from 'types';
import { SERVICE_TYPE_SELECT_ALL } from 'utils';
import {
  createFrequentlyAskedQuestionInitialValues,
  updateFrequentlyAskedQuestionsInitialValues
} from 'utils/initial-values/frequently-asked-questions';
import { frequentlyAskedQuestionsValidationRules } from 'utils/validation-rules';
export type FrequentlyAskedQuestionFormProps = {
  onChangeLoading?: (value: boolean) => void;
  onSubmitSuccess?: () => void;
  frequentlyAskedQuestionId?: number;
};

export type FrequentlyAskedQuestionFormRefProps = {
  form: FormInstance<FrequentlyAskedQuestionFormType>;
  isLoading: boolean;
};

export type FrequentlyAskedQuestionFormType = Omit<CreateFrequentlyAskedQuestionDto, 'serviceTypeId'> & {
  serviceTypeId: DefaultOptionType;
};
const FrequentlyAskedQuestionForm = forwardRef<FrequentlyAskedQuestionFormRefProps, FrequentlyAskedQuestionFormProps>(
  ({ onChangeLoading, onSubmitSuccess, frequentlyAskedQuestionId }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoadingCreate || isLoadingUpdate
    }));

    const { data: frequentlyAskedQuestion, isLoading: isLoadingDetail } = useGetFrequentlyAskedQuestionDetailQuery(
      frequentlyAskedQuestionId!,
      {
        skip: !frequentlyAskedQuestionId,
        refetchOnMountOrArgChange: true
      }
    );

    useEffect(() => {
      if (frequentlyAskedQuestion && frequentlyAskedQuestionId) {
        form.setFieldsValue({
          ...frequentlyAskedQuestion.data,
          serviceTypeId: frequentlyAskedQuestion.data.serviceType
            ? {
                label: frequentlyAskedQuestion.data.serviceType?.name,
                value: frequentlyAskedQuestion.data.serviceTypeId
              }
            : SERVICE_TYPE_SELECT_ALL
        });
      }
    }, [frequentlyAskedQuestion, frequentlyAskedQuestionId]);

    const [onCreate, { isLoading: isLoadingCreate }] = useCreateFrequentlyAskedQuestionMutation();
    const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateFrequentlyAskedQuestionMutation();

    const [form] = Form.useForm<FrequentlyAskedQuestionFormType>();
    const content = Form.useWatch('content', form);

    useEffect(() => {
      if (onChangeLoading) {
        onChangeLoading(isLoadingCreate || isLoadingUpdate);
      }
    }, [onChangeLoading, isLoadingCreate, isLoadingUpdate]);

    const onFinish = ({ ...values }: FrequentlyAskedQuestionFormType) => {
      const data: CreateFrequentlyAskedQuestionDto = {
        ...values,
        serviceTypeId: values.serviceTypeId.value as number
      };
      if (!frequentlyAskedQuestionId) {
        onCreate(data)
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
            onSubmitSuccess?.();
          });
      } else {
        onUpdate({
          frequentlyAskedQuestionId,
          ...data
        })
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
            onSubmitSuccess?.();
          });
      }
    };

    return (
      <Form
        scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
        labelAlign='right'
        labelCol={{
          flex: '180px'
        }}
        requiredMark={false}
        form={form}
        name='faqForm'
        onFinish={onFinish}
        layout='horizontal'
        validateMessages={validateMessages}
        initialValues={
          frequentlyAskedQuestionId
            ? updateFrequentlyAskedQuestionsInitialValues
            : createFrequentlyAskedQuestionInitialValues
        }
      >
        <Spin spinning={isLoadingCreate || isLoadingUpdate || isLoadingDetail}>
          <>
            <Typography.Title level={5} className='mb-5 text-lg'>
              {frequentlyAskedQuestionsMessages.general}
            </Typography.Title>

            <FormItem.FloatLabel<FrequentlyAskedQuestionFormType>
              name='title'
              label={frequentlyAskedQuestionsMessages.title}
              rules={frequentlyAskedQuestionsValidationRules.title}
            >
              <Input />
            </FormItem.FloatLabel>

            <FormItem.FloatLabel<FrequentlyAskedQuestionFormType>
              name='keyword'
              label={frequentlyAskedQuestionsMessages.keyword}
              rules={frequentlyAskedQuestionsValidationRules.keyword}
            >
              <Input />
            </FormItem.FloatLabel>

            <FormItem.FloatLabel<FrequentlyAskedQuestionFormType>
              name='serviceTypeId'
              label={frequentlyAskedQuestionsMessages.serviceType}
              rules={frequentlyAskedQuestionsValidationRules.serviceTypeId}
              classFloatLabel='has-value'
            >
              <SelectServiceTypes labelInValue defaultActiveFirstOption isAll isActive />
            </FormItem.FloatLabel>

            <FormItem.FloatLabel<FrequentlyAskedQuestionFormType>
              name='priority'
              label={frequentlyAskedQuestionsMessages.priority}
              rules={frequentlyAskedQuestionsValidationRules.priority}
            >
              <InputNumber min={1} className='w-full' />
            </FormItem.FloatLabel>
          </>

          <Divider className='mb-8 mt-5' />

          <>
            <Typography.Title level={5} className='mb-5 text-lg'>
              {frequentlyAskedQuestionsMessages.content}
            </Typography.Title>
            <Editor
              value={content}
              onEditorChange={(a) => {
                form.setFieldValue('content', a);
              }}
            />
            <FormItem<FrequentlyAskedQuestionFormType>
              name='content'
              label={frequentlyAskedQuestionsMessages.content}
              rules={frequentlyAskedQuestionsValidationRules.content}
              className='hide-label'
            ></FormItem>
          </>
        </Spin>
      </Form>
    );
  }
);
export default FrequentlyAskedQuestionForm;
