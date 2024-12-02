import { Form, FormInstance, Input, Spin } from 'antd';
import { DatePicker, FormItem, message } from 'components/common';
import dayjs from 'dayjs';
import { validateMessages, workingSchedulesMessages } from 'messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import {
  useCreateWorkingScheduleMutation,
  useGetWorkingScheduleDetailQuery,
  useUpdateWorkingScheduleMutation
} from 'services';
import { CreateWorkingScheduleDto } from 'types';
import {
  createWorkingScheduleInitialValues,
  updateWorkingScheduleInitialValues,
  workingSchedulesValidationRules
} from 'utils';

export type WorkingScheduleFormProps = {
  onChangeLoading?: (value: boolean) => void;
  onCreateSuccess?: () => void;
  workingScheduleId?: number;
};

export type WorkingScheduleFormRefProps = {
  form: FormInstance<WorkingScheduleFormType>;
  isLoading: boolean;
};

export type WorkingScheduleFormType = CreateWorkingScheduleDto & {};
const WorkingScheduleForm = forwardRef<WorkingScheduleFormRefProps, WorkingScheduleFormProps>(
  ({ onChangeLoading, onCreateSuccess, workingScheduleId }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoadingUpdate
    }));

    const { data: workingSchedule, isLoading: isLoadingDetail } = useGetWorkingScheduleDetailQuery(workingScheduleId!, {
      skip: !workingScheduleId,
      refetchOnMountOrArgChange: true
    });

    useEffect(() => {
      if (workingSchedule && workingScheduleId) {
        form.setFieldsValue({
          applyDate: workingSchedule.data.applyDate ? dayjs(workingSchedule.data.applyDate) : undefined,
          description: workingSchedule.data.description,
          workingScheduleTypeId: workingSchedule.data.workingScheduleType.optionId
        });
      }
    }, [workingSchedule, workingScheduleId]);

    const [form] = Form.useForm<WorkingScheduleFormType>();

    const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateWorkingScheduleMutation();
    const [onCreate, { isLoading: isLoadingCreate }] = useCreateWorkingScheduleMutation();

    const onFinish = ({ ...values }: WorkingScheduleFormType) => {
      const data: CreateWorkingScheduleDto = {
        ...values
      };

      if (!workingScheduleId) {
        onCreate(data)
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
            onCreateSuccess?.();
          });
      } else {
        onUpdate({
          workingScheduleId,
          ...data
        })
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
            onCreateSuccess?.();
          });
      }
    };
    useEffect(() => {
      if (onChangeLoading) {
        onChangeLoading(isLoadingUpdate || isLoadingCreate);
      }
    }, [onChangeLoading, isLoadingUpdate, isLoadingCreate]);

    return (
      <Form
        scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
        labelAlign='right'
        labelCol={{
          flex: '180px'
        }}
        requiredMark={false}
        form={form}
        name='workingScheduleForm'
        onFinish={onFinish}
        layout='horizontal'
        validateMessages={validateMessages}
        initialValues={workingScheduleId ? updateWorkingScheduleInitialValues : createWorkingScheduleInitialValues}
      >
        <Spin spinning={isLoadingCreate || isLoadingDetail || isLoadingUpdate}>
          <Form.Item<WorkingScheduleFormType> noStyle name='workingScheduleTypeId'></Form.Item>
          <FormItem.FloatLabel<WorkingScheduleFormType>
            name='applyDate'
            rules={workingSchedulesValidationRules.applyDate}
            label={workingSchedulesMessages.applyDate}
          >
            <DatePicker className='w-full' />
          </FormItem.FloatLabel>
          <FormItem.FloatLabel<WorkingScheduleFormType>
            name='description'
            rules={workingSchedulesValidationRules.description}
            label={workingSchedulesMessages.description}
          >
            <Input.TextArea />
          </FormItem.FloatLabel>
        </Spin>
      </Form>
    );
  }
);
export default WorkingScheduleForm;
