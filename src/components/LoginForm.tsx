import React from 'react'
import { string, object } from "yup";
import {Link, Navigate} from "react-router-dom";
import {Formik, Field, Form, ErrorMessage } from "formik"
import AuthService from "../services/auth.service";
import {Props} from "@headlessui/react/dist/types"


interface LoginFormValues {
    email: string;
    password: string,
}

type State = {
    redirect: string | null,
    userAuthenticated: boolean,
    userToken: { accessToken: string },
    email: string,
    password: string,
    loading: boolean,
    error: boolean
};
class LoginForm extends React.Component <any, State> {

    constructor(props: any) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            email: "",
            password: "",
            loading:false,
            redirect: null,
            userToken: { accessToken: "" },
            userAuthenticated: false,
            error: false
        };
    }

    formValidationSchema = object({
        email: string().email('Invalid email address').required("Enter an email"),
        password: string()
            .required("Enter an password")
            .min(3, "Must contain at least 3 characters")
    });

    componentDidMount() {
        if (AuthService.getCurrentUser()) this.setState({ redirect: "/home" });
        this.setState({ userToken: AuthService.getCurrentUser(), userAuthenticated: true })
    }

    handleLogin(formValue: { email: string; password: string }) {
        const { email, password } = formValue
        this.setState({
            loading: true
        });

        AuthService.login(email, password).then(
            () => {
                this.setState({
                    redirect: '/home'
                });
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                this.setState({
                    loading: false,
                });
            }
        ).catch(error => {
            alert('test')
            this.setState({
                error: true
            })
        });
    }
    render() {
        const { loading } = this.state;
        const formInitialValues = {
            email: "",
            password: "",
        };
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }
        return (
            <div className="mx-auto py-14 px-12 w-full md:w-3/5 lg:w-2/5 bg-white rounded-lg">
                <h3 className="text-center text-3xl font-bold tracking-tight text-gray-700">Login</h3>
                <Formik
                    initialValues={formInitialValues}
                    validationSchema={this.formValidationSchema}
                    onSubmit={this.handleLogin}>
                    {({isValid, isSubmitting}) => (
                        <Form className="w-full md:w-4/5 mx-auto mt-8">
                            <fieldset className="mb-4">
                                <label className="text-sm font-bold mb-2" htmlFor="email">Email</label>
                                <Field id='email'
                                       className="w-full p-3 text-md border rounded shadow focus:border-indigo-500 focus:ring-indigo-500 focus:shadow-outline"
                                       placeholder="johndoe@example.com"
                                       name='email'
                                       type='text'/>
                                <ErrorMessage name="email" component="div" className="text-red-800"/>
                            </fieldset>
                            <fieldset className="mb-4">
                                <label className="text-sm font-bold mb-2" htmlFor="password">Password</label>
                                <Field id='password'
                                       className="w-full p-3 text-md border rounded shadow focus:border-indigo-500 focus:ring-indigo-500 focus:shadow-outline"
                                       name='password'
                                       type='password'
                                       placeholder="***********"/>
                                <ErrorMessage name="password" component="div" className="text-red-800"/>
                            </fieldset>
                            <div className="my-8 text-center">
                                <button
                                    className="w-full md:w-3/4 p-3 font-bold text-white bg-[#354740] hover:bg-green-700 rounded-full focus:outline-none transition duration-500"
                                    type='submit'>
                                    {!this.state.loading ? "Log In" : "Processing..."}
                                </button>
                            </div>
                            {this.state.error &&
                            <div className="w-full md:space-x-4 my-5 px-3 py-5 text-left bg-red-100 rounded-md">
                                <p className="text-red-800">Looks like something went wrong. Please try again.</p>
                            </div>
                            }
                        </Form>
                    )}
                </Formik>
                <hr className="mb-4 border-t w-3/4 m-auto"/>
                <div className="text-sm text-center font-medium text-black-600">
                    Don't have an account.
                    <Link
                        style={{ textDecoration: "none" }}
                        className="ml-1 text-[#995e30] hover:text-[#462f1e]"
                        to={"/register"}>
                        Create an Account.
                    </Link>
                </div>
            </div>
        )
    }
}

export default LoginForm;
