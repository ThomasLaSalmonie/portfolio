import type { NitroFetchRequest } from 'nitropack';
import type { Nullable } from '~/utils/types/common.types';

const useFetchData = <T = unknown>(params: NitroFetchRequest) => {
  const isLoading = ref<boolean>(false);
  const hasError = ref<boolean>(false);
  const result = shallowRef<Nullable<T>>(null);
  const error = ref<Nullable<Error>>(null);
  const fetchParams: NitroFetchRequest = params;

  const fetchData = async (): Promise<void> => {
    isLoading.value = true;
    try {
      const { data, error: errorFetch } = await useFetch<T>(fetchParams);
      if (data.value) {
        result.value = data.value as T;
      }
      error.value = errorFetch.value;
    } catch (err) {
      error.value = err as Error;
    } finally {
      isLoading.value = false;
    }
  };

  return { result, isLoading, hasError, error, fetchData };
};

export default useFetchData;
