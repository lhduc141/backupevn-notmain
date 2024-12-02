import { Button, Form, message, Tooltip } from 'antd';
import { AgentMapDoubleDoor, AgentMapSingleDoor, AgentMapSlidingDoor, AgentMapWall } from 'assets';
import { AgentMapModalInfo, Loadable } from 'components';
import { AgentMapModalInfoRef } from 'components/agent-map/AgentMaModalInfo';
import { AgentMapRefProps } from 'components/agent-map/AgentMap';
import { useAgentMapDetail, useCreateAgentMap, useTitle, useUpdateAgentMap } from 'hooks';
import { sidebarMenuMessages, validateMessages } from 'messages';
import { agentMapsMessages } from 'messages/agent-maps.messages';
import React, { lazy, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE } from 'routes/constants';
import { CreateAgentMapDto } from 'types';
import { FabricAgentMapOtherObject, FabricAgentMapSeat } from 'types/fabric-agent-map';
import { AGENT_MAP_OBJECT_TYPE } from 'utils';

const AgentMap = lazy(() => import('components/agent-map/AgentMap'));

export type AgentMapFormType = CreateAgentMapDto & {
  fabricSeats: FabricAgentMapSeat[];
  fabricOtherObjects: FabricAgentMapOtherObject[];
};

const AgentMapsPage: React.FC = () => {
  useTitle(sidebarMenuMessages.agentMaps);
  const navigate = useNavigate();
  const { agentMapId: agentMapIdStr } = useParams();
  const agentMapId = agentMapIdStr === 'new' ? 0 : parseInt(agentMapIdStr?.toString() || '');
  const agentRef = useRef<AgentMapRefProps>(null);
  const [form] = Form.useForm<AgentMapFormType>();

  const [openInfo, setOpenInfo] = useState(false);
  const infoRef = useRef<AgentMapModalInfoRef>(null);

  const { isLoading } = useAgentMapDetail(agentMapId, form);
  const { createAgentMap, isLoading: isLoadingCreate } = useCreateAgentMap();
  const { updateAgentMap, isLoading: isLoadingUpdate } = useUpdateAgentMap(agentMapId!);

  const fabricSeats = Form.useWatch('fabricSeats', form) || [];
  const name = Form.useWatch('name', form) || '';

  const fabricOtherObjects = Form.useWatch('fabricOtherObjects', form) || [];

  useEffect(() => {
    const handlePopState = () => {
      handleBackToList();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleBackToList = () => {
    navigate(`${ROUTE.AGENT_MAPS}`);
  };

  const handleAddSeat = () => {
    if (agentRef.current) {
      agentRef.current.addSeat();
    }
  };
  const handleAddWall = () => {
    if (agentRef.current) {
      agentRef.current.addObject({ objectTypeId: AGENT_MAP_OBJECT_TYPE.WALL });
    }
  };
  const handleAddDoor = (objectTypeId: AGENT_MAP_OBJECT_TYPE) => {
    if (agentRef.current) {
      agentRef.current.addObject({ objectTypeId });
    }
  };

  const onSubmit = (values: AgentMapFormType) => {
    if (agentRef.current) {
      const { otherObjects, seats } = agentRef.current.getObjects();
      if (agentMapId) {
        updateAgentMap(values, seats, otherObjects)
          ?.unwrap()
          .then((rs) => {
            message.success(rs.message);
          })
          .catch(() => {});
        return;
      }
      createAgentMap(values, seats, otherObjects)
        ?.unwrap()
        .then((rs) => {
          message.success(rs.message);
          navigate(`${ROUTE.AGENT_MAPS}/${rs.data.agentMapId}`);
        })
        .catch(() => {});
    }
  };
  return (
    <div className='flex h-full gap-x-8'>
      <Form
        labelAlign='right'
        scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
        form={form}
        onFinish={onSubmit}
        labelCol={{
          flex: '180px'
        }}
        layout='horizontal'
        validateMessages={validateMessages}
        className='flex w-full'
        initialValues={{
          name: agentMapsMessages.newMap
        }}
      >
        {isLoading ? (
          <div></div>
        ) : (
          <div className='flex w-full flex-col'>
            <div className='relative flex h-18 w-full items-center gap-6 rounded-t-xl bg-backgroundColor2 px-6'>
              <Form.Item<AgentMapFormType> name='name' noStyle />

              <Button
                onClick={() => {
                  infoRef.current &&
                    infoRef.current.setFieldsValue({
                      name
                    });
                  setOpenInfo(true);
                }}
                type='link'
                className='text-lg text-colorTextBase hover:bg-hoverColor2'
              >
                {name}
              </Button>
              <div className='absolute left-1/2 flex -translate-x-1/2 gap-4'>
                <Tooltip trigger={'hover'} title={agentMapsMessages.addSeat}>
                  <Button
                    ghost
                    className='h-10 w-10 rounded-base border-none p-0 text-colorTextBase hover:bg-hoverColor2'
                    onClick={handleAddSeat}
                  >
                    <div className='h-6 w-6 rounded-[3px] border border-colorTextBase'></div>
                  </Button>
                </Tooltip>

                <Tooltip trigger={'hover'} title={agentMapsMessages.addSingleDoor}>
                  <Button
                    ghost
                    className='h-10 w-10 rounded-base border-none p-0 text-colorTextBase hover:bg-hoverColor2'
                    onClick={() => handleAddDoor(AGENT_MAP_OBJECT_TYPE.SINGLE_DOOR)}
                  >
                    <AgentMapSingleDoor className='h-8 w-8' />
                  </Button>
                </Tooltip>

                <Tooltip trigger={'hover'} title={agentMapsMessages.addDoubleDoor}>
                  <Button
                    ghost
                    className='h-10 w-10 rounded-base border-none p-0 text-colorTextBase hover:bg-hoverColor2'
                    onClick={() => handleAddDoor(AGENT_MAP_OBJECT_TYPE.DOUBLE_DOOR)}
                  >
                    <AgentMapDoubleDoor className='h-8 w-8' />
                  </Button>
                </Tooltip>

                <Tooltip trigger={'hover'} title={agentMapsMessages.addSlidingDoor}>
                  <Button
                    ghost
                    className='h-10 w-10 rounded-base border-none p-0 text-colorTextBase hover:bg-hoverColor2'
                    onClick={() => handleAddDoor(AGENT_MAP_OBJECT_TYPE.SLIDING_DOOR)}
                  >
                    <AgentMapSlidingDoor className='h-8 w-8' />
                  </Button>
                </Tooltip>

                <Tooltip trigger={'hover'} title={agentMapsMessages.addWall}>
                  <Button
                    ghost
                    className='h-10 w-10 rounded-base border-none p-0 text-colorTextBase hover:bg-hoverColor2'
                    onClick={handleAddWall}
                  >
                    <AgentMapWall className='h-8 w-8' />
                  </Button>
                </Tooltip>
              </div>

              <Button
                size='small'
                className='ml-auto h-8 w-[77px] rounded-base'
                loading={isLoadingCreate || isLoadingUpdate}
                type='primary'
                onClick={() => {
                  form.submit();
                }}
              >
                {agentMapsMessages.save}
              </Button>
            </div>
            <div className='max-h-[calc(100%-72px)] max-w-full'>
              <Form.Item<AgentMapFormType> name='fabricSeats' noStyle />
              <Form.Item<AgentMapFormType> name='fabricOtherObjects' noStyle />
              <Form.Item<AgentMapFormType> name='isActive' initialValue={true} noStyle />

              <Loadable message={agentMapsMessages.drawGrid}>
                <AgentMap ref={agentRef} seats={fabricSeats} otherObjects={fabricOtherObjects} />
              </Loadable>
            </div>
          </div>
        )}
      </Form>
      <AgentMapModalInfo
        ref={infoRef}
        open={openInfo}
        onCancel={() => {
          setOpenInfo(false);
        }}
        handleSubmit={(values) => {
          form.setFieldValue('name', values.name);
          setOpenInfo(false);
        }}
      />
    </div>
  );
};

export default AgentMapsPage;
