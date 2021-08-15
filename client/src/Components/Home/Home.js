import React,{useEffect,useState} from 'react'
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';      
import {getPosts,getPostsBySearch} from "../../actions/posts"
import {Container,Grow,Grid,Paper,AppBar,TextField,Button} from "@material-ui/core";
import Pagination  from "../Pagination" ;
import useStyles from "./Styles";
import { useHistory,useLocation } from 'react-router-dom';
import ChipInput from "material-ui-chip-input";

function useQuery () {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles(); // Style CSS Classes
    const dispatch = useDispatch(); 
    const query = useQuery();
    const history = useHistory();
    const page = query.get("page") || 1;
    const searchQuery = query.get("searchQuery"); 
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);

    
    const handleAdd = (tag) => setTags([...tags,tag])
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete)); 

    const handleKeyPress = (e) =>{
        //* keyCode = 13 === Enter Key is Pressed
        if(e.keyCode === 13){
            //* Search Post
            searchPost();
        }
    }
    
    const searchPost = () =>{
        if(search.trim() || tags){

            //* Dispatch -> Fetch Post from Backend
            dispatch(getPostsBySearch({search: search,tags:tags.join(',')})) //* Join method is used to join all tags in a single String as we cant send Array in QuerySting
                                                                                //* ex.. tag1,tag2,tag3   

            history.push(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
        }
        else{
            //* Since Search term is blank ... well redirect to Home page
            history.push("/");
        }
    }

    return (
        <Grow in>
                <Container maxWidth="xl">
                    <Grid container justifyContent="space-between" className={classes.gridContainer} alignItems="stretch" spacing={3} >
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                <TextField  name="search" variant="outlined" onKeyPress={handleKeyPress} label="Search Memories" fullWidth value={search} onChange={(e)=>setSearch(e.target.value)} />
                                <ChipInput style={{margin:"10px 0"}} label="Search tags" variant="outlined" value={tags} onAdd={handleAdd} onDelete={handleDelete} />
                                <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">Search</Button>
                            </AppBar>
                            <Form setCurrentId={setCurrentId} currentId={currentId}/>
                            {(!searchQuery && !tags.length) &&(
                                <Paper className={classes.pagination} elevation={6}>
                                    < Pagination page={page} />
                                </Paper>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    )
}

export default Home
