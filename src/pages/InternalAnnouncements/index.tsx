import { Button, Form, Typography } from 'antd';
import { CheckTwoToneCircledIcon, FolderFilledIcon, HierachyIcon, PlusIcon } from 'assets';
import {
  InternalAnnouncementsTable,
  PageHeader,
  InputSearchV2,
  FilterOrganizationUnits,
  FilterOptions
} from 'components';
import { InternalAnnouncementsTableRefProps } from 'components/internal-announcements/InternalAnnouncementsTable';
import { useSearchParamsForm, useTitle } from 'hooks';
import { internalAnnouncementsMessages, messages, sidebarMenuMessages } from 'messages';
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTE } from 'routes/constants';
import { FindAllInternalAnnouncementDto } from 'types';
import { CORE_OPTION_TYPES, MICROSERVICES } from 'utils';
type FindType = Omit<FindAllInternalAnnouncementDto, 'pageIndex' | 'pageSize'> & {
  /** params id của thông báo xem chi tiết  */
  IA: number;
};

const InternalAnnouncementsPage: React.FC = () => {
  useTitle(sidebarMenuMessages.internalAnnouncements);
  const { setSearchParams, getSearchParams } = useSearchParamsForm();
  const navigate = useNavigate();
  const [form] = Form.useForm<FindType>();
  const { IA: internalAnnouncementParam, ...values } = Form.useWatch([], form) || getSearchParams();

  const internalAnnouncementTableRef = useRef<InternalAnnouncementsTableRefProps>(null);

  return (
    <div>
      <PageHeader className='flex items-center gap-1'>
        <Typography.Title className='mb-0 text-2.5xl font-bold' level={4}>
          {sidebarMenuMessages.internalAnnouncements}
        </Typography.Title>
      </PageHeader>
      <div className='flex flex-col gap-5 rounded-xl bg-colorBgContainer p-5'>
        <Form
          scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
          form={form}
          initialValues={getSearchParams()}
          onValuesChange={() => {
            if (internalAnnouncementTableRef.current) {
              internalAnnouncementTableRef.current.resetPage();
            }
            const values = form.getFieldsValue();
            setSearchParams(values);
          }}
        >
          <div className='flex items-center justify-between'>
            <div className='flex flex-1 gap-x-6'>
              <Form.Item<FindType> className='mb-0 max-w-[400px] flex-1' name='keyword'>
                <InputSearchV2 placeholder={internalAnnouncementsMessages.searchByTitle} />
              </Form.Item>
              <div className='flex items-center gap-2'>
                <Form.Item<FindType> noStyle name='organizationUnitId'>
                  <FilterOrganizationUnits icon={<HierachyIcon />} />
                </Form.Item>
                <Form.Item<FindType> noStyle name='statusId'>
                  <FilterOptions
                    title={messages.status}
                    optionTypeId={CORE_OPTION_TYPES.INTERNAL_ANNOUNCEMENT_STATUS}
                    service={MICROSERVICES.CORE}
                    icon={<CheckTwoToneCircledIcon />}
                  />
                </Form.Item>
              </div>
            </div>
            <div className='flex items-center gap-6'>
              <Link to={ROUTE.INTERNAL_ANNOUNCEMENTS_DELETED}>
                <Button type='link' className='font-normal' ghost icon={<FolderFilledIcon />}>
                  {internalAnnouncementsMessages.saved}
                </Button>
              </Link>
              <Button
                className='ml-auto'
                type='primary'
                onClick={() => navigate(`${ROUTE.INTERNAL_ANNOUNCEMENTS}/new`)}
                icon={<PlusIcon />}
              >
                {messages.createButtonText}
              </Button>
            </div>
          </div>
        </Form>
        <div>
          <InternalAnnouncementsTable ref={internalAnnouncementTableRef} filterData={values} />
        </div>
      </div>
    </div>
  );
};

export default InternalAnnouncementsPage;
