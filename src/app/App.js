import React from "react";
import { Route } from "react-router-dom";
import Users from "./components/layouts/users";
import Navbar from "./components/navBar";
import Login from "./components/layouts/login";
import Main from "./components/layouts/main";

function App() {
    return (
        <div>
            <Navbar />
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/users/:userId?">
                {(props) => <Users {...props} />}
            </Route>
        </div>
    );
}

export default App;
