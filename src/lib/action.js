"use server";

import { revalidatePath } from "next/cache";
import { Post } from "./models";
import { connectToDb } from "./utils";

export const addPost = async (formData) => {
  //   const title = formData.get("title");
  //   const desc = formData.get("desc");
  //   const slug = formData.get("slug");
  //   const userId = formData.get("userId");

  const { title, desc, slug, userId } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    });
    await newPost.save();
    console.log("save post success");
    revalidatePath("/blog");
  } catch (err) {
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);
    console.log("delete post success");
    revalidatePath("/blog");
  } catch (err) {
    return { error: "Something went wrong!" };
  }
};
