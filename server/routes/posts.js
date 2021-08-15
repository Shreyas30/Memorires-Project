import express from "express";
const router = express.Router();
import {getPostsBySearch ,getPosts,getPost,createPost,updatePost,deletePost,likePost,commentPost} from "../Controllers/posts.js";
import auth from "../middleware/auth.js";

// ! localhost:5000/    Incorrect
//* localhost:5000/posts  Correct

router.get("/",getPosts);
router.get("/search",getPostsBySearch); //? This has to be above  
router.get("/:id",getPost);     //! This has to below 
router.post("/",auth,createPost);
router.post("/commentPost/:id",auth,commentPost);
router.patch("/:id",auth,updatePost);
router.delete("/:id",auth,deletePost);
router.patch("/likePost/:id",auth,likePost);

export default router;
