import PostCard from "@/components/postCard/PostCard";
import styles from "./blog.module.css";

// FETCH DATA WITH AN API
const getData = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

export const metadata = {
  title: "Blog Page",
  description: "Blog Description",
};

const BlogPage = async () => {
  // FETCH DATA WITH AN API
  const posts = await getData();
  
  // FETCH DATA WITHOUT AN API
  // const posts = await getPosts();

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div key={post._id} className={styles.post}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
