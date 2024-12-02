import { Descriptions, Divider, Spin, Tag, Typography } from 'antd';
import { OptionStatus } from 'components/common';
import { internalAnnouncementsMessages, messages } from 'messages';
import { forwardRef, useImperativeHandle } from 'react';
import { InternalAnnouncementDto } from 'types';
import InternalAnnouncementAttachment from './InternalAnnouncementAttachment';

export type InternalAnnouncementInfoProps = {
  data?: InternalAnnouncementDto;
  isLoading?: boolean;
};

export type InternalAnnouncementInfoRefProps = {};

const InternalAnnouncementInfo = forwardRef<InternalAnnouncementInfoRefProps, InternalAnnouncementInfoProps>(
  ({ data, isLoading }, ref) => {
    useImperativeHandle(ref, () => ({}));

    const generalInfoItems = [
      {
        key: 'organizationUnit',
        label: internalAnnouncementsMessages.organizationUnit,
        children: (
          <div className='flex flex-wrap gap-y-2'>
            {data?.organizationUnits?.map((orgUnit) => <Tag key={orgUnit.organizationUnitId}>{orgUnit.name}</Tag>)}
          </div>
        )
      },
      {
        key: 'priority',
        label: internalAnnouncementsMessages.priority,
        children: data?.priority ?? '-'
      },
      {
        key: 'status',
        label: internalAnnouncementsMessages.status,
        children: data?.status ? <OptionStatus value={data.status} /> : '-'
      },
      {
        key: 'isRequestConfirm',
        label: internalAnnouncementsMessages.isRequestConfirm,
        children: data?.isRequestConfirm ? messages.booleanEnum.true : messages.booleanEnum.false
      }
    ];

    if (isLoading) return <Spin spinning />;

    return (
      <>
        {data && (
          <>
            <Typography.Title className='mb-4 text-lg'>{messages.general}</Typography.Title>
            <Descriptions items={generalInfoItems} column={1} labelStyle={{ minWidth: 140 }} />
            <Divider className='mb-8 mt-2' />

            <Typography.Title className='mb-4 mt-0 text-lg'>{internalAnnouncementsMessages.content}</Typography.Title>
            <div className='-mx-6 flex flex-1 flex-col px-6'>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.content
                }}
                className='mb-2 flex-1'
              />
            </div>
            <InternalAnnouncementAttachment files={data.files} />
          </>
        )}
      </>
    );
  }
);
export default InternalAnnouncementInfo;
