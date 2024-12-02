import { AuthLayout, MainLayout } from 'layouts';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { ROUTE } from './constants';

export const routes: RouteObject[] = [
  {
    Component: MainLayout,
    children: [
      {
        path: ROUTE.ALL,
        Component: lazy(() => import('pages/404'))
      },
      {
        path: ROUTE.HOME,
        Component: lazy(() => import('pages/Home'))
      },
      {
        path: ROUTE.PROFILE,
        Component: lazy(() => import('pages/Profile'))
      },
      {
        path: ROUTE.USERS,
        children: [
          {
            index: true,
            Component: lazy(() => import('pages/Users'))
          },
          {
            path: ':userId',
            Component: lazy(() => import('pages/User'))
          }
        ]
      },
      {
        path: ROUTE.ORGANIZATION_UNITS,
        Component: lazy(() => import('pages/OrganizationUnits'))
      },
      {
        path: ROUTE.USER_GROUPS,
        children: [
          {
            index: true,
            Component: lazy(() => import('pages/UserGroups'))
          }
        ]
      },
      {
        path: ROUTE.ROLES,
        Component: lazy(() => import('pages/Roles'))
      },
      {
        path: ROUTE.PERMISSIONS,
        Component: lazy(() => import('pages/Permissions'))
      },
      {
        path: ROUTE.CUSTOMER_SUPPORT_INFORMATION,
        children: [
          {
            index: true,
            Component: lazy(() => import('pages/CustomerSupportInformationList'))
          },
          {
            path: ':customerSupportInformationId',
            Component: lazy(() => import('pages/CustomerSupportInformation'))
          }
        ]
      },
      {
        path: ROUTE.CUSTOMER_LOOKUP,
        children: [
          {
            index: true,
            Component: lazy(() => import('pages/CustomerLookup'))
          },
          {
            path: ':customerId',
            Component: lazy(() => import('pages/CustomerLookupDetailed'))
          }
        ]
      },
      {
        path: ROUTE.SERVICE_TYPES,
        Component: lazy(() => import('pages/ServiceTypes'))
      },
      {
        path: ROUTE.FREQUENTLY_ASKED_QUESTION,
        Component: lazy(() => import('pages/FrequentlyAskedQuestions'))
      },
      {
        path: ROUTE.SERVICE_INSTRUCTIONS,
        Component: lazy(() => import('pages/ServiceInstructions'))
      },
      {
        path: ROUTE.WORKING_SCHEDULES,
        Component: lazy(() => import('pages/WorkingSchedules'))
      },
      {
        path: ROUTE.SHIFTS,
        Component: lazy(() => import('pages/Shifts'))
      },
      {
        path: ROUTE.REASONS,
        Component: lazy(() => import('pages/Reasons'))
      },
      {
        path: ROUTE.VIP_CUSTOMERS,
        Component: lazy(() => import('pages/VipCustomers'))
      },
      {
        path: ROUTE.TICKET_CANCEL_REASONS,
        Component: lazy(() => import('pages/TicketCancelReasons'))
      },
      {
        path: ROUTE.TICKET_SAMPLES,
        Component: lazy(() => import('pages/TicketSamples'))
      },
      {
        path: ROUTE.RATING_SYSTEM,
        Component: lazy(() => import('pages/RatingSystem'))
      },
      {
        path: ROUTE.INTERNAL_ANNOUNCEMENTS_DELETED,
        Component: lazy(() => import('pages/InternalAnnouncementsDeleted'))
      },
      {
        path: ROUTE.INTERNAL_ANNOUNCEMENTS,
        children: [
          {
            index: true,
            Component: lazy(() => import('pages/InternalAnnouncements'))
          },
          {
            path: ':internalAnnouncementId',
            Component: lazy(() => import('pages/InternalAnnouncement'))
          }
        ]
      },
      {
        path: ROUTE.AGENT_MAPS,
        children: [
          {
            index: true,
            Component: lazy(() => import('pages/AgentMaps'))
          },
          {
            path: ':agentMapId',
            Component: lazy(() => import('pages/AgentMap'))
          }
        ]
      }
    ]
  },
  {
    Component: AuthLayout,
    children: [
      {
        path: ROUTE.LOGIN,
        Component: lazy(() => import('pages/Login'))
      },
      {
        path: ROUTE.FORGOT_PASSWORD,
        Component: lazy(() => import('pages/ForgotPassword'))
      },
      {
        path: ROUTE.VERIFY_FORGOT_PASSWORD,
        Component: lazy(() => import('pages/VerifyForgotPassword'))
      },
      {
        path: ROUTE.RESET_PASSWORD,
        Component: lazy(() => import('pages/ResetPassword'))
      }
    ]
  },
  {
    path: '/icons',
    Component: lazy(() => import('pages/Icons'))
  }
];
