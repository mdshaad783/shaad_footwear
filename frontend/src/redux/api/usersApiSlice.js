import {apiSlice} from "./apiSlice.js"
import {USERS_URL} from "../features/constants.js"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        login: builder.mutation({
            query: (data)=>({
                url: `${USERS_URL}/auth`,
                method: "POST",
                body: data,
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:"POST",
            })
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/register`,
                method:"POST",
                body:data,
            })
        })
    })
})

export const { useLoginMutation,useLogoutMutation, useRegisterMutation } = userApiSlice;