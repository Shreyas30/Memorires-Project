import * as api from "../api/index.js";
import { FETCH_ALL ,FETCH_POST,FETCH_BY_SEARCH,CREATE, UPDATE, DELETE, LIKE,START_LOADING,END_LOADING,COMMENT} from '../constants/actionTypes';
// Action Creators
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING});

        const {data} = await api.fetchPosts(page); 
       
        dispatch({type:FETCH_ALL,payload:data }); // This will go to Reducer for updating State
                                              //* Here,You need dispatch Action not Return 
        dispatch({type:END_LOADING});
    }catch(err){
        console.error(err);
    }
}
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING});

        const {data} = await api.fetchPost(id); 
        
        dispatch({type:FETCH_POST,payload:data }); // This will go to Reducer for updating State
                                              //* Here,You need dispatch Action not Return 
        dispatch({type:END_LOADING});
    }catch(err){
        console.error(err);
    }
}
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING});

        const {data} = await api.fetchPostsBySearch(searchQuery); 

        dispatch({type:FETCH_BY_SEARCH,payload:data }); // This will go to Reducer for updating State
                                              //* Here,You need dispatch Action not Return 
        dispatch({type:END_LOADING});
    }catch(err){
        console.error(err);
    }
}
export const createPost = (post,history) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING});
        
        const {data} = await api.createPost(post);
        
        history.push(`/posts/${data._id}`);//* Redirect to Newly Created Post
        // console.log(data);   
        dispatch({type:CREATE ,payload:data }); // This will go to Reducer for updating State
                                              //* Here,You need dispatch Action not Return 
        dispatch({type:END_LOADING});
    }catch(err){
        console.error(err);
    }
}

export const updatePost = (id,post) => async (dispatch) => {
    try{
        const {data} = await api.updatePost(id,post);
        dispatch({type:UPDATE ,payload:data}); // This will go to Reducer for updating State
                                                 //* Here,You need dispatch Action not Return 
    }catch(err){
        console.error(err);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try{
        await api.deletePost(id);
        dispatch({type:DELETE ,payload:id}); // This will go to Reducer for updating State
                                                 //* Here,You need dispatch Action not Return 
    }catch(err){
        console.error(err);
    }
}

export const likePost = (id) => async (dispatch) => {
    try{
        const {data} = await api.likePost(id); //? Here LIKE is same as UPDATE
        dispatch({type:LIKE ,payload:data}); // This will go to Reducer for updating State
                                                 //* Here,You need dispatch Action not Return 
    }catch(err){
        console.error(err);
    }
}

export const commentPost = (value,id) => async (dispatch) => {
    try {
        const {data} = await api.comment(value,id);

        dispatch({type:COMMENT ,payload:data}); // This will go to Reducer for updating State
                                                 //* Here,You need dispatch Action not Return 
        return data.comments;
        
    } catch (err) {
        console.error(err);
    }
}