export type Comment = {
  id: number;
  name: string;
  text: string;
  date: string;
};

// Post from the DummyJSON API
export type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
};

// What the API sends back: { posts: [...], total, skip, limit }
export type PostsResponse = {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
};