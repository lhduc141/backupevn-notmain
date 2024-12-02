import { Button, Form, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { HierachyTwoToneIcon, ListIcon, PlusIcon, ThreeSquareOneCircleIcon, TreeListIcon } from 'assets';
import {
  OrganizationUnitForm,
  Modal,
  OrganizationUnitFormRefProps,
  FilterOrganizationUnits,
  FilterOptions,
  FilterServiceTypes,
  HierachyOrganizationUnitList,
  OrganizationUnitTable,
  OrganizationUnitUserList,
  OrganizationUnitDrawer,
  OrganizationUnitHierachyServiceTypeList
} from 'components';
import { InputSearch, message, PageHeader } from 'components/common';
import { useSearchParamsForm, useTitle } from 'hooks';
import { messages } from 'messages';
import { organizationUnitsMessages } from 'messages/organization-units.messages';
import React, { useEffect, useRef, useState } from 'react';
import { useDeleteOrganizationUnitMutation } from 'services';
import { twMerge } from 'tailwind-merge';
import { FindOrganizationUnitHierarchyDto, OrganizationUnitDto, OrganizationUnitHierarchyDto } from 'types';
import { AUTH_OPTION_TYPES, MICROSERVICES } from 'utils';
const { confirm } = Modal;

type LAYOUT_TYPE = 'table' | 'tree';

type FindType = FindOrganizationUnitHierarchyDto;
const OrganizationUnitList: React.FC = () => {
  useTitle(organizationUnitsMessages.name);
  const { setSearchParams, getSearchParams } = useSearchParamsForm();
  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState<LAYOUT_TYPE>('table');
  const [organizationUnitId, setOrganizationUnitId] = useState<number | undefined>();
  const [openServiceTypes, setOpenSeviceTypes] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [loading, setLoading] = useState(false);
  const organizationUnitFormRef = useRef<OrganizationUnitFormRefProps>(null);

  const [form] = Form.useForm<FindType>();
  const [onDelete, { isLoading: isLoadingDelete }] = useDeleteOrganizationUnitMutation();

  const handleDelete = (record: OrganizationUnitHierarchyDto | OrganizationUnitDto) => {
    confirm({
      title: `${organizationUnitsMessages.delete} ${record.name}`,
      content: organizationUnitsMessages.confirmDelete,
      cancelText: messages.cancelButtonText,
      okText: messages.confirmButtonText,
      onOk: () => {
        onDelete(record.organizationUnitId)
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
            setOpenDrawer(false);
            setOrganizationUnitId(undefined);
          });
      },
      okButtonProps: {
        loading: isLoadingDelete
      }
    });
  };

  useEffect(() => {
    if (!open && organizationUnitFormRef.current) {
      organizationUnitFormRef.current.form.resetFields();
      setOrganizationUnitId(undefined);
    }
  }, [open, organizationUnitFormRef.current]);

  const handleOnClickRow = ({ organizationUnitId }: OrganizationUnitHierarchyDto | OrganizationUnitDto) => {
    setOrganizationUnitId(organizationUnitId);
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setOrganizationUnitId(undefined);
  };

  const handleOpenInfoModal = ({ organizationUnitId }: OrganizationUnitHierarchyDto | OrganizationUnitDto) => {
    setOrganizationUnitId(organizationUnitId);
    setOpen(true);
  };

  const handleCloseInfoModal = () => {
    setOpen(false);
    setOrganizationUnitId(undefined);
  };

  const handleOpenServiceTypeModal = ({ organizationUnitId }: OrganizationUnitHierarchyDto | OrganizationUnitDto) => {
    setOrganizationUnitId(organizationUnitId);
    setOpenSeviceTypes(true);
  };

  const handleCloseServiceTypeModal = () => {
    setOpenSeviceTypes(false);
    setOrganizationUnitId(undefined);
  };

  const handleOpenUserModal = ({ organizationUnitId }: OrganizationUnitHierarchyDto | OrganizationUnitDto) => {
    setOrganizationUnitId(organizationUnitId);
    setOpenUsers(true);
  };

  const handleCloseUserModal = () => {
    setOpenUsers(false);
    setOrganizationUnitId(undefined);
  };

  return (
    <div>
      <PageHeader className='flex items-center gap-1'>
        <Typography.Title className='mb-0 text-2.5xl font-bold' level={4}>
          {organizationUnitsMessages.name}
        </Typography.Title>
      </PageHeader>
      <Content className='flex flex-col gap-5 rounded-xl bg-colorBgContainer p-5'>
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
            <div className='flex items-center justify-between'>
              <div className='flex flex-1 gap-6'>
                <Form.Item<FindType> className='mb-0 max-w-[400px] flex-1' name='keyword'>
                  <InputSearch
                    placeholder={[organizationUnitsMessages.code, organizationUnitsMessages.name].join(', ')}
                  />
                </Form.Item>
                <div className='flex items-center gap-2 p-1'>
                  <Button
                    className={twMerge(
                      'h-8 w-8',
                      layout === 'table' ? 'bg-backgroundColor3 text-colorTextContrast' : ''
                    )}
                    icon={<ListIcon />}
                    onClick={() => setLayout('table')}
                  />
                  <Button
                    className={twMerge(
                      'h-8 w-8',
                      layout === 'tree' ? 'bg-backgroundColor3 text-colorTextContrast' : ''
                    )}
                    icon={<TreeListIcon />}
                    onClick={() => setLayout('tree')}
                  />
                </div>
                <div className='flex items-center gap-2'>
                  <Form.Item<FindType> noStyle name='organizationUnitClassifyId'>
                    <FilterOptions
                      title={organizationUnitsMessages.classify}
                      optionTypeId={AUTH_OPTION_TYPES.ORGANIZATION_UNIT_CLASSIFY}
                      service={MICROSERVICES.AUTH}
                      icon={<ThreeSquareOneCircleIcon />}
                    />
                  </Form.Item>
                  <Form.Item<FindType> noStyle name='serviceTypeId'>
                    <FilterServiceTypes />
                  </Form.Item>
                  <Form.Item<FindType> noStyle name='parentId'>
                    <FilterOrganizationUnits icon={<HierachyTwoToneIcon />} title={organizationUnitsMessages.parent} />
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
        {layout === 'table' && (
          <OrganizationUnitTable
            onClick={handleOnClickRow}
            onDelete={handleDelete}
            onClickServiceType={handleOpenServiceTypeModal}
            onClickUser={handleOpenUserModal}
            onUpdateInfo={handleOpenInfoModal}
          />
        )}
        {layout === 'tree' && (
          <div className='ml-[516px] w-[568px]'>
            <HierachyOrganizationUnitList
              onClick={handleOnClickRow}
              onClickServiceType={handleOpenServiceTypeModal}
              onClickUser={handleOpenUserModal}
              onDelete={handleDelete}
              onUpdateInfo={handleOpenInfoModal}
            />
          </div>
        )}
        <Modal.Headless
          title={organizationUnitId ? organizationUnitsMessages.update : organizationUnitsMessages.createNew}
          maskClosable={false}
          centered
          width={688}
          open={open}
          onCancel={() => {
            handleCloseInfoModal();
          }}
          destroyOnClose
          footer={[
            <Button
              loading={loading}
              onClick={() => {
                if (organizationUnitFormRef.current) {
                  organizationUnitFormRef.current.form.submit();
                }
              }}
              size='large'
              type='primary'
            >
              {messages.saveButtonText}
            </Button>
          ]}
        >
          <OrganizationUnitForm
            onCreateSuccess={() => {
              handleCloseInfoModal();
            }}
            ref={organizationUnitFormRef}
            onChangeLoading={setLoading}
            organizationUnitId={organizationUnitId}
          />
        </Modal.Headless>
        <Modal
          title={organizationUnitsMessages.service}
          width={568}
          open={openServiceTypes}
          onCancel={handleCloseServiceTypeModal}
          footer={null}
          destroyOnClose
        >
          <div className='-mx-6 max-h-[600px] overflow-auto px-6'>
            {organizationUnitId && <OrganizationUnitHierachyServiceTypeList organizationUnitId={organizationUnitId} />}
          </div>
        </Modal>
        <Modal
          title={organizationUnitsMessages.users}
          width={568}
          open={openUsers}
          onCancel={handleCloseUserModal}
          footer={null}
          destroyOnClose
        >
          <div className='-mx-6 max-h-[600px] overflow-auto px-6'>
            {organizationUnitId && <OrganizationUnitUserList organizationUnitId={organizationUnitId} />}
          </div>
        </Modal>
      </Content>
      <OrganizationUnitDrawer
        open={openDrawer}
        organizationUnitId={organizationUnitId}
        onClose={handleCloseDrawer}
        onDelete={handleDelete}
        onUpdateInfo={handleOpenInfoModal}
      />
    </div>
  );
};

export default OrganizationUnitList;
