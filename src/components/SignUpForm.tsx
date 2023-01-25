import React from 'react'
import { string, object } from "yup";
import {Link, Navigate} from "react-router-dom";
import {Formik, Field, Form, ErrorMessage } from "formik"
import AuthService from "../services/auth.service";

// interface LoginFormValues {
//     email: string;
//     password: string
// }

interface RouterProps {
    history: string;
}

type Props = {};

type State = {
    email: string,
    password: string,
    successful: boolean,
    loading: boolean,
    redirect: string | null,
    userToken: { accessToken: string },
    userAuthenticated: boolean,
};

class SignUpForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleSignUp = this.handleSignUp.bind(this);

        this.state = {
            email: "",
            password: "",
            successful: false,
            loading:false,
            redirect: null,
            userToken: { accessToken: "" },
            userAuthenticated: false,
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

    handleSignUp(formValue: { email: string; password: string }) {
        const { email, password } = formValue
        this.setState({
            loading: true,
            successful: false
        });
        AuthService.register(email, password)
            .then(res => {
                this.setState({
                    successful: true,
                    redirect: "/home"
                });
            },
            e => {
                const resMessage =
                    (e.response &&
                        e.response.data &&
                        e.response.data.message) ||
                    e.message ||
                    e.toString();
                this.setState({
                    successful: false,
                });
            }
        );
    }

    render() {
        const { successful, loading } = this.state;
        const formInitialValues = {
            email: "",
            password: "",
        };
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }
        // disabled={!isValid || isSubmitting}
        return (
            <div className="mx-auto py-14 px-12 w-full md:w-3/5 lg:w-2/5 bg-white rounded-lg">
                <h3 className="text-center text-3xl font-bold tracking-tight text-gray-700">Sign Up</h3>
                <Formik
                    initialValues={formInitialValues}
                    validationSchema={this.formValidationSchema}
                    onSubmit={this.handleSignUp}>
                    {({isValid, isSubmitting}) => (
                        <Form className="w-full md:w-4/5 mx-auto mt-5">
                            <fieldset className="mb-4">
                                <label className="text-sm font-bold mb-2" htmlFor="email">Email</label>
                                <Field id='email'
                                       className="w-full p-3 text-md border rounded shadow focus:border-indigo-500 focus:ring-indigo-500focus:shadow-outline"
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
                                    type='submit'
                                   >
                                    {!this.state.loading ? "Sign In" : "Processing..."}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <hr className="mb-4 border-t w-3/4 m-auto"/>
                <div className="text-sm text-center font-medium text-black-600">
                    Already have an account.
                    <Link
                        className="ml-1 text-[#995e30] hover:text-[#462f1e]"
                        style={{ textDecoration: "none" }}
                        to={"/login"}>
                         Login into your account.
                    </Link>
                </div>
            </div>
        )
    }
}

export default SignUpForm;
