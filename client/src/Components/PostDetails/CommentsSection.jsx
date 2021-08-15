import React,{useState,useRef} from "react";
import {Typography,TextField,Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {commentPost} from "../../actions/posts";

import useStyles from "./styles";

const CommentsSection = ({post}) => {
    const classes = useStyles();
    const [comments,setComments] = useState(post?.comments); 
    const [comment, setComment] = useState("");
    const user = JSON.parse(localStorage.getItem("profile"));
    const dispatch = useDispatch();
    const commentRef = useRef();

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        setComment("");
        const newComments = await dispatch(commentPost(finalComment,post._id)); //* New Comments are returned from Actions/posts

        console.log(post);
        setComments(newComments); 
        //* To Scroll Down to newly Created Comment
        commentRef.current.scrollIntoView({behavior:"smooth"})
        
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6" >Comments</Typography>
                    {comments.map((comment,index)=>(
                        <Typography key={index} variant="subtitle1" gutterBottom >
                         <strong> {comment.split(":")[0]}: </strong>
                         {comment.split(":")[1]} 
                        </Typography>
                    ))} 
                    <div  ref={commentRef}/>
                </div>
                {user?.result?.name && (
                    <div style={{width:'60%'}}>
                        <Typography gutterBottom variant="h6" >Write a Comment</Typography>
                        <TextField fullWidth rows={4} variant="outlined" label="Comment"  value={comment} multiline onChange={(e)=> setComment(e.target.value)} />
                        <Button style={{marginTop:"10px"}} color="primary" fullWidth disabled={!comment} variant="contained" onClick={handleClick} >Comment</Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentsSection;

  
// import React, { useState, useRef } from 'react';
// import { Typography, TextField, Button } from '@material-ui/core/';
// import { useDispatch } from 'react-redux';

// import { commentPost } from '../../actions/posts';
// import useStyles from './styles';

// const CommentSection = ({ post }) => {
//   const user = JSON.parse(localStorage.getItem('profile'));
//   const [comment, setComment] = useState('');
//   const dispatch = useDispatch();
//   const [comments, setComments] = useState(post?.comments);
//   const classes = useStyles();
//   const commentsRef = useRef();

//   const handleComment = async () => {
//     const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

//     setComment('');
//     setComments(newComments);

//     commentsRef.current.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <div>
//       <div className={classes.commentsOuterContainer}>
//         <div className={classes.commentsInnerContainer}>
//           <Typography gutterBottom variant="h6">Comments</Typography>
//           {comments?.map((c, i) => (
//             <Typography key={i} gutterBottom variant="subtitle1">
//               <strong>{c.split(': ')[0]}</strong>
//               {c.split(':')[1]}
//             </Typography>
//           ))}
//           <div ref={commentsRef} />
//         </div>
//         <div style={{ width: '70%' }}>
//           <Typography gutterBottom variant="h6">Write a comment</Typography>
//           <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
//           <br />
//           <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
//             Comment
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommentSection;