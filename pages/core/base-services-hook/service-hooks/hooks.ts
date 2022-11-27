import { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { storageClear } from "../../storage";

// get mothed use hook of useQuery
// If "isFirst" is true, it will directly call api.
// If it is not, it will be waiting until you call the "refetch" then trigger the api.
export function useQueryService(
  keyName: string,
  func: () => Promise<AxiosResponse<any, any>>,
  isFirst = true,
  isUseHandlling = true
) {
  const { data, isLoading, isError, isSuccess, isFetching, error, refetch, remove } =
    useQuery(keyName, () => func(), {
      enabled: isFirst,
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: 0,
    });
  const queryClient = useQueryClient();

  isUseHandlling && handllingError(error);

  const cancel = () => {
    queryClient.cancelQueries(keyName);
  }

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    refetch,
    remove,
    cancel
  };
}

export function useMutationService(
  keyName: string,
  func: (value: any) => Promise<AxiosResponse<any, any>>,
  isUseHandlling = true
) {
  const { data, isLoading, isError, isSuccess, error, mutate } = useMutation(
    keyName,
    func
  );
  isUseHandlling && handllingError(error);
  return { data, isLoading, isError, isSuccess, error: error as any, mutate };
}

const handllingError = (error: any) => {
  if (error?.response?.status === 401) {
    storageClear();
    window.location.href = "/";
  }
};
