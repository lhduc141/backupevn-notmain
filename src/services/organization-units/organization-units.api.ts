import { createApi } from '@reduxjs/toolkit/query/react';
import { AppDispatch } from 'store';
import {
  CreateOrganizationUnitDto,
  FindAllOrganizationUnitDto,
  FindOneOrganizationUnitChildrenDto,
  FindOneOrganizationUnitServiceTypeDto,
  FindOneOrganizationUnitUsersDto,
  FindOrganizationUnitHierarchyDto,
  OrganizationUnitCompactDto,
  OrganizationUnitDetailDto,
  OrganizationUnitDto,
  OrganizationUnitHierarchyCompactDto,
  OrganizationUnitHierarchyDto,
  ResponseDto,
  ResponsePagingDto,
  ServiceTypeCompactDto,
  UpdateOrganizationUnitDto,
  UserCompactDto
} from 'types';
import { removeEmptyChildren } from 'utils';
import axiosBaseQuery from 'utils/base-api';

export const organizationUnitsApi = createApi({
  reducerPath: 'organizationUnitsApi',
  tagTypes: [
    'organization_units',
    'organization_units_detail',
    'organization_units_params',
    'organization_unit_service_types',
    'organization_unit_users',
    'organization_unit_children',
    'organization_unit_service_types_hierachy'
  ],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getOrganizationUnits: builder.query<ResponsePagingDto<OrganizationUnitDto>, FindAllOrganizationUnitDto>({
      query: (params) => ({
        url: '/organization_units',
        method: 'get',
        params
      }),

      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ organizationUnitId }) => ({
              type: 'organization_units',
              id: organizationUnitId
            }))
          : ['organization_units']
    }),

    getOrganizationUnitsHierarchy: builder.query<
      ResponseDto<OrganizationUnitHierarchyDto[]>,
      FindOrganizationUnitHierarchyDto
    >({
      query: (params) => ({
        url: '/organization_units/hierarchy',
        method: 'get',
        params
      }),
      transformResponse: (res: ResponseDto<OrganizationUnitHierarchyDto[]>) => ({
        ...res,
        data: removeEmptyChildren(res.data)
      }),
      providesTags: ['organization_units']
    }),

    getOrganizationUnitsOptions: builder.query<
      ResponsePagingDto<OrganizationUnitCompactDto>,
      FindAllOrganizationUnitDto
    >({
      query: (params) => ({
        url: '/organization_units/options',
        method: 'get',
        params
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        if (queryArgs.organizationUnitId?.length && queryArgs.organizationUnitId.length > 0) {
          return endpointName + '/organizationUnitId';
        }
        return endpointName;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.pageIndex !== 1) {
          currentCache.data.rows.push(...newItems.data.rows);
        } else currentCache.data.rows = newItems.data.rows;
        currentCache.data.count = newItems.data.count;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.keyword !== previousArg?.keyword || currentArg?.pageIndex !== previousArg?.pageIndex;
      },
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ organizationUnitId }) => ({
              type: 'organization_units',
              id: organizationUnitId
            }))
          : ['organization_units']
    }),

    getOrganizationUnitsHierachyOptions: builder.query<
      ResponseDto<OrganizationUnitHierarchyCompactDto[]>,
      FindOrganizationUnitHierarchyDto
    >({
      query: (params) => ({
        url: '/organization_units/hierachy/options',
        method: 'get',
        params
      }),
      transformResponse: (res: ResponseDto<OrganizationUnitHierarchyCompactDto[]>) => ({
        ...res,
        data: removeEmptyChildren(res.data)
      }),
      providesTags: ['organization_units']
    }),

    getOrganizationUnitServiceTypes: builder.query<
      ResponsePagingDto<ServiceTypeCompactDto>,
      FindOneOrganizationUnitServiceTypeDto
    >({
      query: ({ organizationUnitId, ...params }) => ({
        url: `/organization_units/${organizationUnitId}/service_types`,
        method: 'get',
        params
      }),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, { arg }) => {
        if (arg.pageIndex !== 1) {
          currentCache.data.rows.push(...newItems.data.rows);
        } else currentCache.data.rows = newItems.data.rows;
        currentCache.data.count = newItems.data.count;
      },
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.keyword !== previousArg?.keyword ||
          currentArg?.pageIndex !== previousArg?.pageIndex ||
          currentArg?.organizationUnitId !== previousArg?.organizationUnitId
        );
      },
      providesTags: (result, _, params) =>
        result ? [{ type: 'organization_unit_service_types', id: params.organizationUnitId }] : []
    }),

    getOrganizationUnitServiceTypesHierachy: builder.query<ResponsePagingDto<ServiceTypeCompactDto>, Number>({
      query: (organizationUnitId) => ({
        url: `/organization_units/${organizationUnitId}/service_types/hierachy`,
        method: 'get'
      }),
      providesTags: (result, _, params) =>
        result ? [{ type: 'organization_unit_service_types_hierachy', id: params.toString() }] : []
    }),

    getOrganizationUnitUsers: builder.query<ResponsePagingDto<UserCompactDto>, FindOneOrganizationUnitUsersDto>({
      query: ({ organizationUnitId, ...params }) => ({
        url: `/organization_units/${organizationUnitId}/users`,
        method: 'get',
        params
      }),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, { arg }) => {
        if (arg.pageIndex !== 1) {
          currentCache.data.rows.push(...newItems.data.rows);
        } else currentCache.data.rows = newItems.data.rows;
        currentCache.data.count = newItems.data.count;
      },
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.keyword !== previousArg?.keyword ||
          currentArg?.pageIndex !== previousArg?.pageIndex ||
          currentArg?.organizationUnitId !== previousArg?.organizationUnitId
        );
      },
      providesTags: (result, _, params) =>
        result ? [{ type: 'organization_unit_users', id: params.organizationUnitId }] : []
    }),

    getOrganizationUnitChildren: builder.query<
      ResponsePagingDto<OrganizationUnitCompactDto>,
      FindOneOrganizationUnitChildrenDto
    >({
      query: ({ organizationUnitId, ...params }) => ({
        url: `/organization_units/${organizationUnitId}/children`,
        method: 'get',
        params
      }),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, { arg }) => {
        if (arg.pageIndex !== 1) {
          currentCache.data.rows.push(...newItems.data.rows);
        } else currentCache.data.rows = newItems.data.rows;
        currentCache.data.count = newItems.data.count;
      },
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.organizationUnitId !== previousArg?.organizationUnitId ||
          currentArg?.pageIndex !== previousArg?.pageIndex
        );
      },
      providesTags: (result, _, params) =>
        result ? [{ type: 'organization_unit_children', id: params.organizationUnitId }] : []
    }),

    getOrganizationUnitDetail: builder.query<ResponseDto<OrganizationUnitDetailDto>, number>({
      query: (organizationUnitId) => ({ url: `/organization_units/${organizationUnitId}`, method: 'get' }),
      providesTags: (result) =>
        result ? [{ type: 'organization_units_detail', id: result.data.organizationUnitId }] : []
    }),

    addOrganizationUnit: builder.mutation<ResponseDto<OrganizationUnitDto>, CreateOrganizationUnitDto>({
      query: (newOrganizationUnit) => ({
        url: '/organization_units',
        method: 'post',
        data: newOrganizationUnit
      }),
      invalidatesTags: ['organization_units']
    }),
    updateOrganizationUnit: builder.mutation<ResponseDto<OrganizationUnitDto>, UpdateOrganizationUnitDto>({
      query: ({ organizationUnitId, ...updateOrganizationUnit }) => ({
        url: `/organization_units/${organizationUnitId}`,
        method: 'patch',
        data: updateOrganizationUnit
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'organization_units' },
        { type: 'organization_units', id: param.organizationUnitId },
        { type: 'organization_units_detail', id: param.organizationUnitId }
      ]
    }),
    deleteOrganizationUnit: builder.mutation<ResponseDto<null>, number>({
      query: (organizationUnitId) => ({
        url: `/organization_units/${organizationUnitId}`,
        method: 'delete'
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'organization_units' },
        { type: 'organization_units', id: param },
        { type: 'organization_units_detail', id: param }
      ]
    })
  })
});

const resetOrganizationUnitServiceTypes = (endpointName: any, arg?: Partial<FindOneOrganizationUnitServiceTypeDto>) => {
  return (dispatch: AppDispatch) => {
    dispatch(
      organizationUnitsApi.util.updateQueryData(endpointName, undefined, (draftData: any) => {
        draftData.data.rows = [];
        draftData.data.count = 0;
      })
    );
  };
};

const resetOrganizationUnitUsers = (endpointName: any, arg?: Partial<FindOneOrganizationUnitUsersDto>) => {
  return (dispatch: AppDispatch) => {
    dispatch(
      organizationUnitsApi.util.updateQueryData(endpointName, undefined, (draftData: any) => {
        draftData.data.rows = [];
        draftData.data.count = 0;
      })
    );
  };
};

export { resetOrganizationUnitServiceTypes, resetOrganizationUnitUsers };

export const {
  useGetOrganizationUnitsHierarchyQuery,
  useLazyGetOrganizationUnitsOptionsQuery,
  useGetOrganizationUnitsOptionsQuery,
  useGetOrganizationUnitsQuery,
  useGetOrganizationUnitDetailQuery,
  useAddOrganizationUnitMutation,
  useUpdateOrganizationUnitMutation,
  useDeleteOrganizationUnitMutation,
  useLazyGetOrganizationUnitServiceTypesQuery,
  useLazyGetOrganizationUnitUsersQuery,
  useLazyGetOrganizationUnitChildrenQuery,
  useGetOrganizationUnitsHierachyOptionsQuery,
  useGetOrganizationUnitServiceTypesHierachyQuery
} = organizationUnitsApi;
