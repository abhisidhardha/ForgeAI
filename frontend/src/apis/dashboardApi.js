/** Dashboard report query. Separate API slices currently do not invalidate this cache after mutations. */
import {createApi} from '@reduxjs/toolkit/query/react' ;
import { axiosBaseQuery } from './baseQuery.js'
export const dashboardApi = createApi({

    reducerPath : "dashboardApi" ,
    baseQuery : axiosBaseQuery() ,
    tagTypes : ['Dashboard'] ,

    endpoints : (builder) => ({
        getReports : builder.query({
            query : () => ({
                url : '/dashboard' ,
                method : 'GET'
            }),
            transformResponse : (response) => response.data ,
        })
    })

})

export const { useGetReportsQuery } = dashboardApi ;
