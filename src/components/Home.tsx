import React from 'react'
import {Link, Navigate} from "react-router-dom";
import {string, object, array} from "yup";
import {Formik, Field, Form, ErrorMessage } from "formik"
import AuthService from "../services/auth.service";
import axios from "axios";
import authHeader from '../services/auth.header';

type Props = {};

type State = {
    speeches: object,
    redirect: string | null,
    userAuthenticated: boolean,
    userToken: { accessToken: string },
}

class Home extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            speeches: [],
            redirect: null,
            userToken: { accessToken: "" },
            userAuthenticated: false,
        };
    }


    handleGetSpeeches() {
        return axios.get("/api/speeches",
            { headers: authHeader() }).then(response => {
            this.setState({
                speeches: response.data.data
            })
        })
    }

    componentDidMount() {
        const userToken = AuthService.getCurrentUser();
        if (!userToken) this.setState({ redirect: "/login" });
        this.handleGetSpeeches()
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect}/>
        }
        const myArray = ['Jack', 'Mary', 'John', 'Krish', 'Navin'];

        return (
            <section>
                <div className="mx-auto py-14 px-12 w-5/6 md:w-5/6 bg-white rounded-lg">
                    <div className="mb-9 font-bold text-[#354740] text-3xl">Your Speeches</div>
                    <div className="space-y-2">
                        <div className="my-9 bg-white shadow-lg hover:shadow-xl rounded overflow-y-scroll min-h-[250px] max-h-[550px]">
                            <table className="table-auto w-full">
                                <thead className="uppercase text-xs font-semibold text-gray-600 bg-gray-200">
                                <tr className="hidden md:table-row">
                                    <th className="p-2 border">
                                        <p>Name</p>
                                    </th>
                                    <th className="p-2 border">
                                        <p>Speech Type</p>
                                    </th>
                                    <th className="p-2 border">
                                        <p>Years Know</p>
                                    </th>
                                    <th className="p-5 border">
                                        <p>Speech</p>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="flex-1 sm:flex-none divide-y ">
                                    { Object.entries(this.state.speeches).map(([key, value]) => (
                                        <tr className="flex p-2 hover:bg-gray-100 md:table-row flex-col flex-no-wrap">
                                            <td className="px-3 py-2 border text-center">{value.name }</td>
                                            <td className="px-3 py-2 border text-center">{value.speech_type }</td>
                                            <td className="px-3 py-2 border text-center">{value.years }</td>
                                            <td className="px-1 py-4 border">{value.speech }</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button className="w-full md:w-1/3 p-3 font-bold text-white bg-[#354740] hover:bg-green-700 rounded-full focus:outline-none transition duration-500">
                            <Link style={{ textDecoration: "none" }} to={"/create"}>
                                Create a Speech
                            </Link>
                        </button>
                    </div>
                </div>
            </section>
        )
    }
}
export default Home;
