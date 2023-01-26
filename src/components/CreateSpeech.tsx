import React from 'react'
import {Link, Navigate} from "react-router-dom";
import {string, object, array} from "yup";
import {Formik, Field, Form, ErrorMessage } from "formik"
import AuthService from "../services/auth.service";
import axios from "axios";
import authHeader from '../services/auth.header';

type Props = {};

type State = {
    redirect: string | null,
    userAuthenticated: boolean,
    userToken: { accessToken: string },
    name: string,
    type: string,
    years: string,
    speech: string | null,
    save: boolean,
    loading: boolean,
    error: boolean
}

class CreateSpeech extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            loading: false,
            redirect: null,
            userAuthenticated: false,
            userToken: { accessToken: "" },
            name: "",
            type: "",
            years: "",
            speech: null,
            save: true,
            error: false
        };

        this.handleCreateSpeech = this.handleCreateSpeech.bind(this)
    }
    formValidationSchema = object({
        name: string().required("Please enter a name."),
        years: string()
            .required("Please select the years you have know them."),
        type: string()
            .required("Please select the type of speech.")
    });

    handleCreateSpeech(formValue: {name: string, type: string, years: string, save: boolean} ) {
        const {name, type, years, save} = formValue;
        this.setState({
            loading: true
        })
        return axios.post("/api/generate",{ name, type, years, save},
            { headers: authHeader() }).then(response => {
                this.setState({
                    loading: false,
                    name: name,
                    type: type,
                    years: years,
                    save: save,
                    speech: response.data.result,
                    error: false
                });
        }).catch(error => {
           this.setState({
               error: true
           })
        })
    }

    componentDidMount() {
        const userToken = AuthService.getCurrentUser();
        if (!userToken) this.setState({ redirect: "/login" });
        this.setState({ userToken: userToken, userAuthenticated: true })
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect}/>
        }

        const {userToken} = this.state;
        const formInitialValues = {
            name: "",
            type: "",
            years: "",
            save: true
        };
        return (
            <section>
                    <div className="mx-auto p-12 w-5/6 lg:w-3/5 bg-white rounded-lg">
                        {!this.state.speech ?
                            <><h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">Create your speech</h2>
                                <Formik
                                initialValues={formInitialValues}
                                validationSchema={this.formValidationSchema}
                                onSubmit={this.handleCreateSpeech}>
                                <Form className="w-full md:w-5/6 mx-auto">
                                    <fieldset className="my-8">
                                        <div className="text-sm font-bold mb-2">Who is this for?</div>
                                        <Field id='name'
                                               className="w-full p-3 text-md border rounded shadow focus:border-indigo-500 focus:ring-indigo-500 focus:shadow-outline"
                                               name='name'
                                               type='text'
                                               placeholder="Name"/>
                                        <ErrorMessage name="name" component="div" className="text-red-800"/>
                                    </fieldset>
                                    <fieldset className="my-8">
                                        <div className="text-sm font-bold mb-2" id="type">Speech Type:</div>
                                        <div className="items-center" role="group">
                                            <div className="flex items-center">
                                                <Field
                                                    className="mr-2 h-4 w-4 border-gray-300 accent-[#354740]"
                                                    type="radio"
                                                    name="type"
                                                    value="wedding vows"/>
                                                 Wedding Vows
                                            </div>
                                            <div className="flex items-center">
                                                <Field
                                                    className="mr-2 h-4 w-4 border-gray-300 accent-[#354740]"
                                                    type="radio"
                                                    name="type"
                                                    value="best man speech"/>
                                                Best Man Speech
                                            </div>
                                            <div className="flex items-center">
                                                <Field
                                                    className="mr-2 h-4 w-4 border-gray-300 accent-[#354740]"
                                                    type="radio"
                                                    name="type"
                                                    value="maid of honor speech"/>
                                                Maid of Honor Speech
                                            </div>
                                        </div>

                                    </fieldset>
                                    <fieldset className="my-8">
                                        <label className="text-sm font-bold mb-8" htmlFor="years">How many years have
                                            you known this person?</label>
                                        <Field id='years'
                                               className="w-full mt-3 p-3 text-md border rounded shadow focus:border-indigo-500 focus:ring-indigo-500focus:shadow-outline"
                                               placeholder="johndoe@example.com"
                                               name='years'
                                               component="select">
                                            <option value=""> Select </option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </Field>
                                        <ErrorMessage name="years" component="div" className="text-red-800"/>
                                    </fieldset>
                                    <fieldset className="mb-4">
                                        <div className="flex items-center">
                                            <Field
                                                className="mr-2 w-4 rounded border-gray-300 accent-[#354740]"
                                                type="checkbox"
                                                name="save"/>
                                            Store my speech
                                        </div>
                                    </fieldset>
                                    <div className="flex flex-col md:flex-row md:space-x-4 my-8 text-center">
                                    <button
                                        className="flex-1 mt-3 md:mt-0 w-full md:w-1/3 p-3 font-bold text-white bg-[#354740] hover:bg-green-900 rounded-full focus:outline-none transition duration-500"
                                        type='submit'>
                                        {!this.state.loading ? "Create" : "Processing..."}
                                    </button>
                                    </div>
                                    {this.state.error &&
                                    <div className="md:space-x-4 my-5 px-3 py-5 text-left bg-red-100 rounded-md">
                                        <p className="text-red-800">Looks like something went wrong. Please try again
                                            later.</p>
                                    </div>
                                    }
                                </Form>
                            </Formik></>
                            :
                            <div className="px-5 py-5 w-full  bg-white rounded-lg">
                                <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">Your speech</h2>
                                <dl className="mt-12 border overflow-y-scroll h-[550px]">
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Name:</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{this.state.name}
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Speech Type:</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{this.state.type}
                                        </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Years Known:</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{this.state.years}</dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Stored to Profile:</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{this.state.save ? "Yes" : "No"}</dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Speech</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{this.state.speech}</dd>
                                    </div>
                                </dl>
                                <div className="flex flex-col md:flex-row md:space-x-5 my-8 text-center">
                                    <Link className="flex-1 w-full md:w-1/3 mt-3 md:mt-0" style={{ textDecoration: "none" }} to={"/create"}>
                                        <button
                                            className="p-3 w-full font-bold text-white bg-[#354740] hover:bg-green-900 rounded-full focus:outline-none transition duration-500">
                                                Create Another Speech
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        }
                    </div>
            </section>
        )
    }
}
export default CreateSpeech;
