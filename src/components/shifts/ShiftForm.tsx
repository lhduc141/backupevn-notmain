import { Divider, Form, FormInstance, Input, Spin, TimePicker, Typography } from 'antd';
import Compact from 'antd/es/space/Compact';
import { FormItem, message, SelectIcon } from 'components/common';
import dayjs, { Dayjs } from 'dayjs';
import { useUploadForm } from 'hooks';
import { find } from 'lodash';
import { shiftsMessages, validateMessages } from 'messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useCreateShiftMutation, useGetShiftDetailQuery, useLazyGetFileQuery, useUpdateShiftMutation } from 'services';
import { CreateShiftDto } from 'types';
import {
  createShiftInitialValues,
  SHIFT_DEFAULT_ICONS,
  shiftsValidationRules,
  TIME_FORMAT,
  updateShiftInitialValues
} from 'utils';

export type ShiftFormProps = {
  onChangeLoading?: (value: boolean) => void;
  onCreateSuccess?: () => void;
  shiftId?: number;
};

export type ShiftFormRefProps = {
  form: FormInstance<ShiftFormType>;
  isLoading: boolean;
};

export type ShiftFormType = Omit<CreateShiftDto, 'fromTime' | 'toTime'> & {
  toTime: Dayjs;
  fromTime: Dayjs;
  iconName?: string;
};
const ShiftForm = forwardRef<ShiftFormRefProps, ShiftFormProps>(
  ({ onChangeLoading, onCreateSuccess, shiftId }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoadingUpdate
    }));
    const [fetchIcon, { data: iconFetched, isLoading: isLoadingFetchingIcon }] = useLazyGetFileQuery();
    const { handleUploadIcon, isLoading: isLoadingUpload } = useUploadForm();
    const { data: shift, isLoading: isLoadingDetail } = useGetShiftDetailQuery(shiftId!, {
      skip: !shiftId,
      refetchOnMountOrArgChange: true
    });

    useEffect(() => {
      handleLoadDetail();
    }, [shift, shiftId]);

    const [form] = Form.useForm<ShiftFormType>();
    const iconName = Form.useWatch('iconName', form);

    const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateShiftMutation();
    const [onCreate, { isLoading: isLoadingCreate }] = useCreateShiftMutation();
    const handleLoadDetail = async () => {
      if (shift && shiftId) {
        if (shift.data.icon) {
          const iconShift = await fetchIcon(shift.data.icon);
          if (iconShift.data?.data.originalName) {
            form.setFieldValue('iconName', iconShift.data.data.originalName);
          }
        }

        form.setFieldsValue({
          code: shift.data.code,
          name: shift.data.name,
          fromTime: dayjs(shift.data.fromTime, TIME_FORMAT),
          toTime: dayjs(shift.data.toTime, TIME_FORMAT),
          isActive: shift.data.isActive,
          icon: shift?.data.icon
        });
      }
    };
    const onFinish = async ({ iconName, ...values }: ShiftFormType) => {
      let iconUpload;
      if (iconName && iconFetched?.data.objectName !== iconName) {
        const iconSelected = find(SHIFT_DEFAULT_ICONS, (o) => o.key === iconName);
        if (iconSelected) {
          iconUpload = await handleUploadIcon(iconSelected, iconFetched?.data.fileId);
        }
      }
      const data: CreateShiftDto = {
        ...values,
        fromTime: values.fromTime.format(TIME_FORMAT),
        toTime: values.toTime.format(TIME_FORMAT),
        icon: iconUpload?.data.fileId ?? values.icon ?? undefined
      };

      if (!shiftId) {
        onCreate(data)
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
            onCreateSuccess?.();
          });
      } else {
        onUpdate({
          shiftId,
          ...data
        })
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
            onCreateSuccess?.();
          });
      }
    };
    const isLoading = isLoadingUpdate || isLoadingCreate || isLoadingUpload;
    useEffect(() => {
      if (onChangeLoading) {
        onChangeLoading(isLoading);
      }
    }, [onChangeLoading, isLoading]);

    return (
      <Form
        scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
        requiredMark={false}
        form={form}
        name='shiftForm'
        onFinish={onFinish}
        layout='vertical'
        validateMessages={validateMessages}
        initialValues={shiftId ? updateShiftInitialValues : createShiftInitialValues}
      >
        <Spin spinning={isLoading || isLoadingDetail || isLoadingFetchingIcon}>
          <Compact direction='vertical' className='mb-8 w-full'>
            <FormItem.FloatLabel<ShiftFormType>
              name='code'
              rules={shiftsValidationRules.code}
              label={shiftsMessages.code}
            >
              <Input />
            </FormItem.FloatLabel>
            <FormItem.FloatLabel<ShiftFormType>
              name='name'
              rules={shiftsValidationRules.name}
              label={shiftsMessages.name}
            >
              <Input />
            </FormItem.FloatLabel>
          </Compact>
          <Compact className='w-full'>
            <FormItem.FloatLabel<ShiftFormType>
              className='mb-0 flex-1'
              name='fromTime'
              rules={shiftsValidationRules.fromTime}
              label={shiftsMessages.fromTime}
            >
              <TimePicker showNow={false} needConfirm={false} className='w-full' format={TIME_FORMAT} />
            </FormItem.FloatLabel>
            <FormItem.FloatLabel<ShiftFormType>
              className='mb-0 flex-1'
              name='toTime'
              rules={shiftsValidationRules.toTime}
              label={shiftsMessages.toTime}
            >
              <TimePicker showNow={false} needConfirm={false} className='w-full' format={TIME_FORMAT} />
            </FormItem.FloatLabel>
          </Compact>
          <Divider className='mb-8 mt-5' />
          <Typography.Paragraph className='mb-4'>{shiftsMessages.selectIcon}</Typography.Paragraph>
          <FormItem noStyle name={'icon'}></FormItem>
          <FormItem<ShiftFormType>
            name='iconName'
            hiddenLabel
            label={shiftsMessages.icon}
            rules={shiftsValidationRules.icon}
            className='mb-6'
          >
            <SelectIcon
              iconName={iconName}
              iconItems={SHIFT_DEFAULT_ICONS}
              onChange={(filedName) => {
                form.setFieldValue('iconName', filedName);
              }}
            />
          </FormItem>
        </Spin>
      </Form>
    );
  }
);
export default ShiftForm;
