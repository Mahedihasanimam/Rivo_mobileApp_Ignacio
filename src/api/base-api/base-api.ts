import { BaseQueryArgs } from "@/types/base-api-type"
import { BaseQueryFn } from "@reduxjs/toolkit/query/react"
import axios, { AxiosResponse } from "axios"

export const baseQueryWithRath: BaseQueryFn<BaseQueryArgs> = async (args) => {
  // const token = await appStorage.get<string | null>("auth-token", null)
  // const token = await appStorage.get<string | null>("auth-token", null)

  const token = "43|EQJD9oqb4PdEtJwOjTfWu2ZMEw5sIRoWM91BR2Cibc883c5f"

  try {
    const result: AxiosResponse = await axios({
      baseURL: "https://rivo.kaziomar.dpdns.org/api/v1/",
      ...args,
      url: args.url,
      method: args.method,
      data: args.body,
      headers: {
        Accept: "application/json",
        ...args.headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
    if (typeof result?.data === "string") {
      // if (!result.data.endsWith('}')) {
      const withCurly = (result.data += "}")
      return { data: JSON.parse(withCurly) }
      // }
    }
    if (typeof result?.data === "object") {
      return { data: result?.data }
    }

    return { data: result?.data }
  } catch (error: any) {
    if (error.response?.data) {
      if (typeof error.response?.data === "string") {
        const withCurly = (error.response.data += "}")
        return { error: JSON.parse(withCurly) }
      } else {
        return { error: error.response?.data }
      }
    }
    return {
      error: {
        status: error.response?.status || 500,
        data: error.message || "Something went wrong",
      },
    }
  }
}
