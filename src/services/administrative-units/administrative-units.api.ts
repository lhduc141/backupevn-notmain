import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponsePagingDto } from 'types';
import { AdministrativeUnitDto } from 'types/dto/administrativeUnit';
import { FindAllAdministrativeUnitDto } from 'types/dto/administrativeUnit/find-all-administrativeUnit.dto';
import axiosBaseQuery from 'utils/base-api';

export const administrativeUnitsApi = createApi({
    reducerPath: 'administrativeUnitsApi',
    tagTypes: ['administrativeUnits', 'administrativeUnits_detail'],
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({
        getDistricts: builder.query<ResponsePagingDto<AdministrativeUnitDto>, FindAllAdministrativeUnitDto>({
            query: (params) => ({
                url: '/administrative_units/districts',
                method: 'get',
                params
            }),
            providesTags: (result) =>
                result && result.data.rows.length > 0
                    ? result.data.rows.map(({administrativeUnitId}) => ({
                        type: 'administrativeUnits',
                        id: administrativeUnitId
                     }))
                    : ['administrativeUnits']
        }),
    })
})

export const {
    useGetDistrictsQuery,
} = administrativeUnitsApi