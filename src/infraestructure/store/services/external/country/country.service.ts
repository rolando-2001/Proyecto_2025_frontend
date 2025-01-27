import { createApi } from "@reduxjs/toolkit/query/react";
import { requestConfig } from "../../config";
import type { ExternalCountryEntity } from "./country.entity";
import type { ApiResponse } from "../../response";

const PREFIX = "/external/country";

export const externalCountryService = createApi({
  reducerPath: "externalCountryService",
  baseQuery: requestConfig(PREFIX),
  endpoints: (builder) => ({
    getAllExternalCountries: builder.query<
      ApiResponse<ExternalCountryEntity[]>,
      void
    >({
      query: () => "/",
    }),
  }),
});

export const {
  useLazyGetAllExternalCountriesQuery,
  useGetAllExternalCountriesQuery,
} = externalCountryService;
