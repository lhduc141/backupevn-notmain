import Icon from '@ant-design/icons';
import { Form, FormInstance, Typography } from 'antd';
import { CheckCircleIcon, RestrictedIcon } from 'assets';
import { message, RadioGroup } from 'components/common';
import { useOptions } from 'hooks';
import { internalAnnouncementsMessages, validateMessages } from 'messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useGetInternalAnnouncementDetailQuery, useUpdateInternalAnnouncementMutation } from 'services';
import { OptionCompactDto } from 'types';
import { CORE_OPTION_TYPES, INTERNAL_ANNOUNCEMENT_STATUS, MICROSERVICES } from 'utils';

type ChangeInternalAnnouncementStatusFormType = {
  statusId: number;
};

export type InternalAnnouncementStatusProps = {
  internalAnnouncementId: number;
  onChangeLoading?: (value: boolean) => void;
  onSuccess?: () => void;
};

export type InternalAnnouncementStatusRefProps = {
  form: FormInstance<ChangeInternalAnnouncementStatusFormType>;
  isLoading: boolean;
};

const InternalAnnouncementStatus = forwardRef<InternalAnnouncementStatusRefProps, InternalAnnouncementStatusProps>(
  ({ internalAnnouncementId, onChangeLoading, onSuccess }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoadingUpdate || isLoadingInternalAnnouncement
    }));
    const [form] = Form.useForm();

    const { data: internalAnnouncement, isLoading: isLoadingInternalAnnouncement } =
      useGetInternalAnnouncementDetailQuery(internalAnnouncementId!, {
        skip: !internalAnnouncementId
      });

    const { data: optionsStatus } = useOptions({
      optionTypeId: CORE_OPTION_TYPES.INTERNAL_ANNOUNCEMENT_STATUS,
      service: MICROSERVICES.CORE
    });
    const data = internalAnnouncement?.data;
    const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateInternalAnnouncementMutation();

    const onFinish = (values: ChangeInternalAnnouncementStatusFormType) => {
      onUpdate({
        internalAnnouncementId: internalAnnouncementId,
        statusId: values.statusId
      })
        .unwrap()
        .then((rs) => {
          message.systemSuccess(rs.message);
          onSuccess?.();
        });
    };

    const formatStatusOptions = (options: OptionCompactDto[]) => {
      return options
        .filter((option) => option.optionId !== INTERNAL_ANNOUNCEMENT_STATUS.WAITING_APPROVE)
        .map((option) => ({
          label: option.name,
          value: option.optionId,
          icon: (
            <Icon
              className='text-[32px]'
              component={option.optionId === INTERNAL_ANNOUNCEMENT_STATUS.INACTIVE ? RestrictedIcon : CheckCircleIcon}
            />
          )
        }));
    };

    useEffect(() => {
      if (onChangeLoading) {
        onChangeLoading(isLoadingUpdate);
      }
    }, [onChangeLoading, isLoadingUpdate]);

    useEffect(() => {
      if (internalAnnouncement?.data) {
        form.setFieldValue('statusId', internalAnnouncement.data.statusId);
      }
    }, [internalAnnouncement]);

    return (
      <Form
        scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
        labelAlign='right'
        labelCol={{
          flex: '150px'
        }}
        requiredMark={false}
        form={form}
        name='userChangeStatusForm'
        onFinish={onFinish}
        layout='horizontal'
        validateMessages={validateMessages}
      >
        <Typography.Title level={5} className='mb-6'>
          {internalAnnouncementsMessages.currentStatus}: {data?.status.name}
        </Typography.Title>
        <Form.Item name='statusId' className='mb-0'>
          <RadioGroup className='bg-white' options={formatStatusOptions(optionsStatus)} />
        </Form.Item>
      </Form>
    );
  }
);
export default InternalAnnouncementStatus;
