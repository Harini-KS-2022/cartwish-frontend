import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../utils/api-client";

const useProductsList = (query) => {
  const fetchFunction = ({ pageParam = 1 }) =>
    apiClient
      .get("/products", { params: { ...query, page: pageParam } })
      .then((res) => res.data);
  return useInfiniteQuery({
    queryKey: ["porducts", query],
    queryFn: fetchFunction,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : null;
    },
  });
};

export default useProductsList;
