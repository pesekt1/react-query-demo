import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  page: number;
  pageSize: number;
}

// _start
// _limit
const usePosts = (postQuery: PostQuery) => {
  const fetchPosts = () =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _start: (postQuery.page - 1) * postQuery.pageSize,
          _limit: postQuery.pageSize,
        },
      })
      .then((res) => res.data);

  return useQuery<Post[], Error>({
    queryKey: ["posts", postQuery],
    queryFn: fetchPosts,
    staleTime: 5_000,
    cacheTime: 5_000,
  });
};

export default usePosts;
