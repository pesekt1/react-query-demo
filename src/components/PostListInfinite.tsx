import { useState } from "react";
import usePostsInfinite from "../hooks/usePostsInfinite";

const PostListInfinite = () => {
  const pageSize = 10;

  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } =
    usePostsInfinite({ pageSize });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <ul className="list-group">
        {data.pages.map((page, index) => (
          <div key={index}>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </div>
        ))}
      </ul>
      <button
        disabled={isFetchingNextPage}
        onClick={() => {
          fetchNextPage();
        }}
        className="btn btn-primary mt-3"
      >
        load more
      </button>
    </div>
  );
};

export default PostListInfinite;
