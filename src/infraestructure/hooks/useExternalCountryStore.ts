import { useDispatch, useSelector } from "react-redux";
import { onSetExternalCountries } from "../store";
import { useLazyGetAllExternalCountriesQuery } from "../store/services";
import type { AppState } from "@/app/store";

export const useExternalCountryStore = () => {
  const dispatch = useDispatch();
  const { externalCountries, selectedExternalCountry } = useSelector(
    (state: AppState) => state.externalCountry
  );

  const [getAllExternalCountries, {
    isLoading: isGettingAllExternalCountries,
    ...getAllExternalCountriesResult
  }] =
    useLazyGetAllExternalCountriesQuery();

  const startGetAllExternalCountries = async () => {
    await getAllExternalCountries()
      .unwrap()
      .then(({ data }) => {
        dispatch(onSetExternalCountries(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    //* Atributtes
    getAllExternalCountriesResult: {
      isGettingAllExternalCountries,
      ...getAllExternalCountriesResult,
      refetch: () => getAllExternalCountries(),
    },
    externalCountries,
    selectedExternalCountry,

    //* Actions
    startGetAllExternalCountries,
  };
};
