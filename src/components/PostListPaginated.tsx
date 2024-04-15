import { useState } from "react";
import usePostsPaginated from "../hooks/usePostsPaginated";

const PostListPaginated = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const {
    data: posts,
    isLoading,
    error,
  } = usePostsPaginated({ page, pageSize });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <ul className="list-group">
        {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="btn btn-primary mt-3"
      >
        Previous
      </button>
      <button
        onClick={() => setPage(page + 1)}
        className="btn btn-primary mt-3 ms-2"
      >
        Next
      </button>
    </div>
  );
};

export default PostListPaginated;
