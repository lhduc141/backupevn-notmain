import { MenuProps } from 'antd';
import { CustomerSearchIcon, EditFormIcon, HeadPhoneIcon, ManagementIcon, ReportIcon, SystemIcon } from 'assets';
import { sidebarMenuMessages } from 'messages/sidebar-menu.messages';
import { ReactNode } from 'react';
import { ROUTE } from 'routes/constants';
import { SIDEBAR_MENU_KEY } from 'utils/enums';

export type MenuItemType = Required<MenuProps>['items'][number] & {
  key?: string;
  href?: string;
  label?: string | ReactNode;
  icon?: ReactNode | string;
  children?: MenuItemType[];
};
export const MENU_LIST_ITEM: MenuItemType[] = [
  {
    key: SIDEBAR_MENU_KEY.CUSTOMER_LOOKUP,
    label: sidebarMenuMessages.customerLookup,
    icon: <CustomerSearchIcon />,
    href: ROUTE.CUSTOMER_LOOKUP
  },
  {
    key: SIDEBAR_MENU_KEY.REQUEST_FORM,
    label: sidebarMenuMessages.requestForm,
    icon: <EditFormIcon />
  },
  {
    key: SIDEBAR_MENU_KEY.CALL_CENTER_MANAGEMENT,
    label: sidebarMenuMessages.callCenterManagement,
    icon: <HeadPhoneIcon />
  },
  {
    key: SIDEBAR_MENU_KEY.REPORTS,
    label: sidebarMenuMessages.reports,
    icon: <ReportIcon />
  },
  {
    key: SIDEBAR_MENU_KEY.MANAGEMENT,
    label: sidebarMenuMessages.management,
    icon: <ManagementIcon />,
    children: [
      {
        key: SIDEBAR_MENU_KEY.INTERNAL_ANNOUNCEMENTS,
        label: sidebarMenuMessages.internalAnnouncements,
        href: ROUTE.INTERNAL_ANNOUNCEMENTS
      },
      {
        key: SIDEBAR_MENU_KEY.VIP_CUSTOMERS,
        label: sidebarMenuMessages.vipCustomers,
        href: ROUTE.VIP_CUSTOMERS
      },
      {
        key: SIDEBAR_MENU_KEY.AGENT_MAPS,
        label: sidebarMenuMessages.agentMaps,
        href: ROUTE.AGENT_MAPS
      },
      {
        key: SIDEBAR_MENU_KEY.AGENT_STATUS,
        label: sidebarMenuMessages.agentStatus,
        href: ROUTE.REASONS
      },
      {
        key: SIDEBAR_MENU_KEY.WORKING_SCHEDULES,
        label: sidebarMenuMessages.workingSchedules,
        href: ROUTE.WORKING_SCHEDULES
      },
      {
        key: SIDEBAR_MENU_KEY.SHIFTS,
        label: sidebarMenuMessages.agentShift,
        href: ROUTE.SHIFTS
      },
      {
        key: SIDEBAR_MENU_KEY.SERVICE_INSTRUCTIONS,
        label: sidebarMenuMessages.serviceInstructions,
        href: ROUTE.SERVICE_INSTRUCTIONS
      },
      {
        key: SIDEBAR_MENU_KEY.CUSTOMER_SUPPORT_INFORMATION,
        label: sidebarMenuMessages.customerSupportInformation,
        href: ROUTE.CUSTOMER_SUPPORT_INFORMATION
      },
      {
        key: SIDEBAR_MENU_KEY.FREQUENTLY_ASKED_QUESTIONS,
        label: sidebarMenuMessages.frequentlyAskedQuestions,
        href: ROUTE.FREQUENTLY_ASKED_QUESTION
      },
      {
        key: SIDEBAR_MENU_KEY.FANPAGE_CONNECTION,
        label: sidebarMenuMessages.fanpageConnection
      },
      {
        key: SIDEBAR_MENU_KEY.TICKET_CANCEL_REASONS,
        label: sidebarMenuMessages.ticketCancelReasons,
        href: ROUTE.TICKET_CANCEL_REASONS
      }
    ]
  },
  {
    type: 'divider'
  },
  {
    key: SIDEBAR_MENU_KEY.SYSTEM,
    label: sidebarMenuMessages.system,
    icon: <SystemIcon />,
    children: [
      {
        key: SIDEBAR_MENU_KEY.USERS,
        label: sidebarMenuMessages.users,
        href: ROUTE.USERS
      },
      {
        key: SIDEBAR_MENU_KEY.USER_GROUPS,
        label: sidebarMenuMessages.userGroups,
        href: ROUTE.USER_GROUPS
      },
      {
        key: SIDEBAR_MENU_KEY.PERMISSIONS,
        label: sidebarMenuMessages.permissions,
        href: ROUTE.PERMISSIONS
      },
      {
        key: SIDEBAR_MENU_KEY.ORGANIZATION_UNIT,
        label: sidebarMenuMessages.organizationUnit,
        href: ROUTE.ORGANIZATION_UNITS
      },
      {
        key: SIDEBAR_MENU_KEY.SERVICE_TYPES,
        label: sidebarMenuMessages.serviceTypes,
        href: ROUTE.SERVICE_TYPES
      },
      {
        key: SIDEBAR_MENU_KEY.TICKET_SAMPLES,
        label: sidebarMenuMessages.ticketSamples,
        href: ROUTE.TICKET_SAMPLES
      },
      {
        key: SIDEBAR_MENU_KEY.SYSTEM_CONFIGS,
        label: sidebarMenuMessages.systemConfigs,
        href: ROUTE.RATING_SYSTEM
      }
    ]
  },
  {
    type: 'divider'
  },
  {
    key: SIDEBAR_MENU_KEY.PROFILE,
    label: sidebarMenuMessages.profile,
    icon: 'avatar',
    href: ROUTE.PROFILE
  }
];
