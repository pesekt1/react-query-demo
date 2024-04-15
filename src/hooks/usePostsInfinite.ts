import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  pageSize: number;
}

const usePosts = (postQuery: PostQuery) => {
  const fetchPosts = (page: number) =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _start: (page - 1) * postQuery.pageSize,
          _limit: postQuery.pageSize,
        },
      })
      .then((res) => res.data);

  return useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", postQuery],
    queryFn: (params) => fetchPosts(params.pageParam ?? 1),
    staleTime: 5_000,
    cacheTime: 5_000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
};

export default usePosts;
