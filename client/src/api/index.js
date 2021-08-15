import axios from "axios";

const API = axios.create({baseURL:"http://localhost:5000"});

//* Adding Authorization Token in req.headers
API.interceptors.request.use((req)=>{
    // if Profile Exists
    if(localStorage.getItem("profile")){
        const token = JSON.parse(localStorage.getItem("profile")).token;
        req.headers.authorization = `Bearer ${token}`;
    }

    return req;
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || "none" }&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post("/posts",newPost);
export const updatePost = (id,updatedPost) => API.patch("/posts/"+id,updatedPost);
export const deletePost = (id) => API.delete("/posts/"+id);
export const likePost = (id) => API.patch("/posts/likePost/"+id);
export const comment = (value,id) => API.post("/posts/commentPost/"+id,{value:value});

export const singIn = (formData) => API.post("/user/signin",formData);
export const singUp = (formData) => API.post("/user/signup",formData);