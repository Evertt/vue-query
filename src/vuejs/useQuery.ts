import type { UnwrapRef } from "vue-demi";
import { QueryObserver } from "react-query/core";
import type {
  QueryFunction,
  QueryKey,
  QueryObserverResult,
} from "react-query/lib/core";
import { useBaseQuery, UseQueryReturnType as UQRT } from "./useBaseQuery";
import type { WithQueryClientKey, VueQueryObserverOptions } from "./types";

type UseQueryReturnType<TData, TError> = Omit<
  UQRT<TData, TError>,
  "refetch" | "remove"
> & {
  refetch: QueryObserverResult<TData, TError>["refetch"];
  remove: QueryObserverResult<TData, TError>["remove"];
};

export type UseQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = WithQueryClientKey<
  VueQueryObserverOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>
>;

export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseQueryReturnType<TData, TError>;
export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey"
  >
): UseQueryReturnType<TData, TError>;
export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, UnwrapRef<TQueryKey>>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >
): UseQueryReturnType<TData, TError>;

export function useQuery<
  TQueryFnData,
  TError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  arg1: TQueryKey | UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  arg2?:
    | QueryFunction<TQueryFnData, UnwrapRef<TQueryKey>>
    | UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  arg3?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseQueryReturnType<TData, TError> {
  const result = useBaseQuery(QueryObserver, arg1, arg2, arg3);

  return {
    ...result,
    refetch: result.refetch.value,
    remove: result.remove.value,
  };
}