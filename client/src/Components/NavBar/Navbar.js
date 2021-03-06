import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom";
import {AppBar,Typography,Toolbar,Button,Avatar} from "@material-ui/core";
import memories from "../../Images/memories.png";
import {useDispatch} from "react-redux";
import useStyles from "./Styles";
import { useHistory ,useLocation} from 'react-router-dom';
import { LOGOUT } from '../../constants/actionTypes';
import decode from "jwt-decode";


const Navbar = () => {
    const classes = useStyles(); // Style CSS Classes
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile"))) //* Trying to retrieve Login Information from localstrorage which is set in Auth Reducer
    const dispatch = useDispatch(); 
    const history = useHistory();
    const location = useLocation(); //* To detect Change in URL
    console.log(user);

    const logout = () =>{
        dispatch({type:LOGOUT});

        history.push("/"); //? Redirect to Home Page
        setUser(null);
    }
  
    useEffect(()=>{
        const token = user?.token;

        if(token){
          const decodedToken = decode(token);

          if(decodedToken.exp * 1000 < new Date().getTime())
            logout();
        }

        setUser(JSON.parse(localStorage.getItem("profile")));
    },[location]);


    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h4" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="40" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
    )
}

export default Navbar
