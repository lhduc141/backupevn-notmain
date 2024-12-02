import { Form, Typography } from 'antd';
import { InternalAnnouncementsDeletedTable, NavigateBack, PageHeader } from 'components';
import { InternalAnnouncementsTableRefProps } from 'components/internal-announcements/InternalAnnouncementsTable';
import { useSearchParamsForm } from 'hooks';
import { internalAnnouncementsMessages } from 'messages';
import React, { useEffect, useRef, useState } from 'react';
import { ROUTE } from 'routes/constants';
import { FindAllInternalAnnouncementDto } from 'types';
type FindType = Omit<FindAllInternalAnnouncementDto, 'pageIndex' | 'pageSize'> & {
  /** params id của thông báo xem chi tiết  */
  IA: number;
};

const InternalAnnouncementsDeletedPage: React.FC = () => {
  const { getSearchParams } = useSearchParamsForm();
  const [form] = Form.useForm<FindType>();
  const { IA: internalAnnouncementParam, ...values } = Form.useWatch([], form) || getSearchParams();
  const IA = internalAnnouncementParam ? Number(internalAnnouncementParam) : undefined;

  const [internalAnnouncementId, setInternalAnnouncementId] = useState<number | undefined>(IA);

  const internalAnnouncementTableRef = useRef<InternalAnnouncementsTableRefProps>(null);

  useEffect(() => {
    if (IA && IA !== internalAnnouncementId) {
      setInternalAnnouncementId(IA);
    }
  }, [IA]);

  return (
    <div>
      <PageHeader>
        <div className='flex items-center gap-3'>
          <NavigateBack defaultUrl={ROUTE.INTERNAL_ANNOUNCEMENTS} />
          <Typography.Title level={4} className='mb-0'>
            {internalAnnouncementsMessages.saved}
          </Typography.Title>
        </div>
      </PageHeader>
      <div className='flex flex-col gap-5 rounded-xl bg-colorBgContainer p-5'>
        <InternalAnnouncementsDeletedTable
          ref={internalAnnouncementTableRef}
          filterData={values}
          onRowClick={(record) => {
            setInternalAnnouncementId(record.internalAnnouncementId);
          }}
        />
      </div>
    </div>
  );
};

export default InternalAnnouncementsDeletedPage;
