import React, {Component, Fragment} from 'react';
import NavBar from "./NavBar";
import axios from "axios";
import Search from "./Search";
import Alert from "./Alert";
import {BrowserRouter, Switch, Route} from "react-router-dom"
import AboutPage from "./AboutPage";
import Users from "./Users";
import UserDetails from "./UserDetails";

class App extends Component {

    constructor(props) {
        super(props);

        this.searchUsers = this.searchUsers.bind(this);
        this.clearUsers = this.clearUsers.bind(this);
        this.setAlert = this.setAlert.bind(this);
        this.getUser = this.getUser.bind(this);
        this.getUserRepos = this.getUserRepos.bind(this);

        this.state = {
            loading: false,
            users: [],
            repos: [],
            user: {},
            alert: null
        }
    }

    componentDidMount() {
        // this.setState({
        //     loading: true
        // });
        //
        // axios.get("https://api.github.com/users")
        //     .then(response => this.setState({users: response.data, loading: false}))
    }

    searchUsers(keyword) {
        this.setState({
            loading: true
        });

        axios.get(`https://api.github.com/search/users?q=${keyword}`)
            .then(response => this.setState({users: response.data.items, loading: false}))
    }

    clearUsers() {
        this.setState({
            users: []
        })
    }

    setAlert(msg, type) {
        this.setState({
            alert: {msg, type}
        });

        setTimeout(() => {
            this.setState({
                alert: null
            });

        }, 3000);
    }

    getUser(username) {
        this.setState({loading: true});
        axios.get(`https://api.github.com/users/${username}`)
            .then(res => this.setState({user: res.data, loading: false}));
    }

    getUserRepos(username) {
        this.setState({loading: true});
        axios.get(`https://api.github.com/users/${username}/repos`)
            .then(response => this.setState({repos: response.data, loading: false}));
    }

    render() {
        return (
            <BrowserRouter>
                <NavBar title="Github Finder" icon="fab fa-github"/>
                <Alert alert={this.state.alert}/>
                <Switch>

                    <Route exact path="/" render={props => (
                        <>
                            <Search searchUsers={this.searchUsers}
                                    clearUsers={this.clearUsers}
                                    showClearButton={this.state.users.length > 0 ? true : false}
                                    setAlert={this.setAlert}/>


                            <Users users={this.state.users} loading={this.state.loading}/>
                        </>
                    )}/>

                    <Route path="/about" component={AboutPage}/>
                    <Route exact path="/user/:login" render={props => (
                        <UserDetails
                            {...props}
                            getUser={this.getUser}
                            user={this.state.user}
                            getUserRepos={this.getUserRepos}
                            repos={this.state.repos}
                            loading={this.state.loading} />
                    )}/>
                </Switch>

            </BrowserRouter>
        );
    }
}

export default App;