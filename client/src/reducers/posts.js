//* It Updates the State 
//* action object comes from Actions Folder
//* here Posts is equivalent to State 
import {CREATE,FETCH_BY_SEARCH,FETCH_ALL,FETCH_POST,UPDATE,DELETE,LIKE,START_LOADING,END_LOADING,COMMENT} from "../constants/actionTypes";

const reducer = (state =  { isLoading: true, posts: [] },action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {...state,posts:action.payload.data,currentPage:action.payload.currentPage,numberOfPages:action.payload.numberOfPages};
        case FETCH_POST:
            return {...state,post:action.payload};
        case FETCH_BY_SEARCH:
            return {...state,posts:action.payload};
        case CREATE:
            return {...state,posts:[...state.posts,action.payload]};
        case UPDATE:
        case LIKE:         //? LIKE has similar logic as UPDATE
            return {...state,posts:state.posts.map((post)=> post._id === action.payload._id ? action.payload : post)};
        case DELETE:
            return {...state,posts:state.posts.filter((post)=> post._id !== action.payload)};
        case COMMENT:
            return {...state,posts:state.posts.map((post)=>{
                if(post._id === action.payload._id)
                    return action.payload; //* Updating only Post which got Comment just now
                else
                    return post;
            })}
        default:
            return state;
    }
}

export default reducer;


