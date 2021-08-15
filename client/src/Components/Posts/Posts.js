import React from 'react'
import Post from './Post/Post';
import { Grid,CircularProgress } from '@material-ui/core';
import useStyles from "./Styles";
import { useSelector } from 'react-redux';
const Posts = ({setCurrentId}) => {
    const classes = useStyles();
    const {posts,isLoading} = useSelector((state)=> state.posts);
    
    //* No Posts to show
    if(!posts.length && !isLoading) return "No Posts";

    //*  If Posts.length === 0, then we'll show CircularProgress(Spinner),,, Otherwise ALl Posts will be shown in Grid
    return(
        isLoading ? <CircularProgress/>: (
        <Grid className={classes.container} container alignItems="stretch" spacing={3} >
            {posts.map((post)=>(  //? use "(" here, not "{"
                <Grid item key={post._id} xs={12} sm={12} md={6} lg={4} >
                    <Post post={post} setCurrentId={setCurrentId}/> 
                </Grid>
            ))}
        </Grid>
    ));
}

export default Posts;