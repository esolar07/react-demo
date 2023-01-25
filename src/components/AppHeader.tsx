import React from 'react'
import AuthService from "../services/auth.service";
import {Navigate} from "react-router-dom";




type State = {
    userAuthenticated: boolean,
    redirect: string
};

class AppHeader extends React.Component <any, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            userAuthenticated: false,
            redirect: ''
        };
    }

    componentDidMount() {
        if (AuthService.getCurrentUser()) this.setState({ userAuthenticated: true });
    }

    handleLogOut() {
        AuthService.logout()
        window.location.href = '/'
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }
        return (
            <header className="flex justify-end	w-full mt-0 mb-10">
                {this.state.userAuthenticated ? (
                    <button
                        className="w-40 p-3 font-bold text-white bg-[#354740] hover:bg-green-700  rounded-full focus:outline-none transition duration-500"
                        onClick={this.handleLogOut}>
                        Sign Out
                    </button>
                ) : (<div/>)
                }
            </header>
        )
    }
}

export default AppHeader;
