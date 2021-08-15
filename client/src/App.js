import React from 'react';
import {Container} from "@material-ui/core";
import NavBar from './Components/NavBar/Navbar';
import { BrowserRouter,Switch,Route ,Redirect} from 'react-router-dom';
import Home from './Components/Home/Home';
import Auth from './Components/Auth/Auth';
import PostDetails from './Components/PostDetails/PostDetails';

const App = () => {

    const user = JSON.parse(localStorage.getItem("profile"));

    return (
        <BrowserRouter>
        <Container maxWidth="xl" >
           <NavBar /> 
           <Switch>
               <Route path="/" exact component={()=><Redirect to="/posts" /> } />
               <Route path="/posts" exact component={Home}/>
               <Route path="/posts/search" exact component={Home}/>
               <Route path="/posts/:id" exact component={PostDetails}/>
               <Route path="/auth" exact component={()=>(!user ? <Auth/> : <Redirect to="/posts" />)}/>
           </Switch>
        </Container>
        </BrowserRouter>
    )
}

export default App;