import React, {useState} from 'react';
import NavBar from "./NavBar";
import axios from "axios";
import Search from "./Search";
import Alert from "./Alert";
import {BrowserRouter, Switch, Route} from "react-router-dom"
import AboutPage from "./AboutPage";
import Users from "./Users";
import UserDetails from "./UserDetails";
import GithubState from "../context/githubState";

const App = () => {

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const [repos, setRepos] = useState([]);


    const setAlertMsg = (msg, type) => {
        setAlert({
            alert: {msg, type}
        });

        setTimeout(() => {
            setAlert(null);

        }, 3000);
    }


    const getUserRepos = (username) => {
        setLoading(true);
        axios.get(`https://api.github.com/users/${username}/repos`)
            .then(response => {
                setRepos(response.data);
                setLoading(false);
            });
    }

    return (
        <GithubState>
            <BrowserRouter>
            <NavBar title="Github Finder" icon="fab fa-github"/>
            <Alert alert={alert}/>
            <Switch>

                <Route exact path="/" render={props => (
                    <>
                        <Search setAlert={setAlertMsg}/>
                        <Users />
                    </>
                )}/>

                <Route path="/about" component={AboutPage}/>
                <Route exact path="/user/:login" render={props => (
                    <UserDetails
                        {...props}
                        getUserRepos={getUserRepos}
                        repos={repos}
                        />
                )}/>
            </Switch>

        </BrowserRouter>
        </GithubState>
    );

}

export default App;