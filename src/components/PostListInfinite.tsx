import InfiniteScroll from "react-infinite-scroll-component";
import usePostsInfinite from "../hooks/usePostsInfinite";

const PostListInfinite = () => {
  const pageSize = 10;

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = usePostsInfinite({ pageSize });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  const fetchedDataCount =
    data.pages.reduce((count, page) => count + page.length, 0) || 0;

  return (
    <InfiniteScroll
      dataLength={fetchedDataCount}
      next={fetchNextPage}
      hasMore={hasNextPage || false}
      loader={<p>Loading...</p>}
    >
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
        {/* <button
          disabled={isFetchingNextPage}
          onClick={() => {
            fetchNextPage();
          }}
          className="btn btn-primary mt-3"
        >
          load more
        </button> */}
      </div>
    </InfiniteScroll>
  );
};

export default PostListInfinite;
