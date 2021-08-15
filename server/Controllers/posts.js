import Mongoose from "mongoose";
import postMessage from "../Models/postMessages.js";

export const getPosts = async (req, res) => {

  const {page} = req.query;
  try {

    const LIMIT = 6;//? No of Posts to Show Per Page
    const startIndex = (Number(page) - 1) * LIMIT; //? Get Starting Index of Post for a Particular Page
    const total = await postMessage.countDocuments({}); //* Total No of Posts

    const posts = await postMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex); //* Sort to get Newest Posts && Skip to Fetch Posts from startIndex and Limit to limit no of posts to fetch
    
    res.status(200).json({data: posts,currentPage:Number(page),numberOfPages:Math.ceil(total / LIMIT)});
    
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPost = async (req, res) => {
  const {id} = req.params;
  try {
      const post = await postMessage.findById(id);
      // console.log(post);

      res.status(200).json(post);
  } catch (err) {
    
    res.status(404).json({ message: err.message });
  }

}

//? QUERY -> /posts?page=1
//? PARAMS -> /posts/1

export const getPostsBySearch = async (req, res) => {
 
  const {searchQuery,tags} = req.query;

  try {
    // console.log(searchQuery);
    // console.log(tags);
    const title = new RegExp(searchQuery, 'i'); //? 'i' -> Case Insensitive search

    const posts = await postMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});
    //* $in search whether any tag from tags matches with any tag in tags array of any post in database
    //* split is used bcoz before sending tags ... they were joined  in a single string by join(",") as array cannot be send by Query String  
    // const posts = await postMessage.find({ $or:[{title},{tags:{$in:tags.split(',')}}]});
    
    res.status(200).json(posts);

  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = await new postMessage({...post,creater:req.userId,createdAt:new Date().toISOString()});

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params; //* id getting from url "/:id" is renamed to "_id"
  const post = req.body;
  if (!Mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Invalid ID"); //* When Id is Invalid

  try {
    const updatedPost = await postMessage.findByIdAndUpdate(_id, post, {
      new: true,
    }); //? {new:true} returns Updated Post
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params; //* id getting from url "/:id" is renamed to "_id"

  if (!Mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Invalid ID"); //* When Id is Invalid

  try {
    await postMessage.findByIdAndRemove(_id);
    res.status(200).json({ message: "Post Deleted Successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params; //* id getting from url "/:id" is renamed to "_id"

  //* req.userId contain undefined or null means user is Unauthenticated
  if (!req.userId)
    return res.status(404).json({ message: "User is Unauthenticated" });

  if (!Mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Invalid ID"); //* When Id is Invalid

  try {
    const post = await postMessage.findById(_id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    
    //* userId is not present
    if (index === -1) {
      //? User want to LIKE the post
      post.likes.push(req.userId);
    }
    //* userId is absent
    else {
      //! User want to DISLIKE the post
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    
    const updatedPost = await postMessage.findByIdAndUpdate(_id,post,{ new: true }); //? {new:true} returns Updated Post
    res.status(200).json(updatedPost);

  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const commentPost = async (req, res) => {
  const {id} = req.params;
  const {value} = req.body;
  try {

    const post = await postMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await postMessage.findByIdAndUpdate(id, post, {new:true});

    res.status(200).json(updatedPost);

  } catch (error) {

    res.status(404).json({ message: err.message });

  }
}
