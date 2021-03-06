//jshint esversion: 8
import React, { useState, useEffect } from "react";
//eslint-disable-next-line
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        plainPassword: "",
        error: "",
        loading: false,
        didRedirect: false,
    });
    // eslint-disable-next-line
    const { email, plainPassword, error, loading, didRedirect } = values;

    const { user } = isAuthenticated();

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, plainPassword })
            .then((data) => {
                if (data.error) {
                    errorMessage();
                    setValues({ ...values, error: data.error, loading: false });
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didRedirect: true,
                        });
                    });
                    dorun();
                }
            })
            .catch(() => {
                errorMessage();
                console.log("signin request failed");
            });
    };

    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role.toString() === "superman") {
                return <Redirect to="/admin/newdashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        // if (isAuthenticated()) {
        //   console.log("is authenticated failed")
        //   return <Redirect to="/" />;
        // }
    };

    const successMessage = () => {
        toast.success("logged in success", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const errorMessage = () => {
        if (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-lg-6 col-xl-4 col-sm-10 offset-lg-3 offset-xl-4 offset-sm-1 text-left">
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    <form action="">
                        <div className="form-group py-2">
                            <label className="fs-6 ls-1">Email</label>
                            <input className="form-control" onChange={handleChange("email")} value={email} type="email" />
                        </div>
                        <div className="form-group py-2">
                            <label className="fs-6 ls-1">Password</label>
                            <input
                                className="form-control"
                                onChange={handleChange("plainPassword")}
                                value={plainPassword}
                                type="password"
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <Link className=" color-white" to="/forgotpassword">
                                Forgot Password ?
                            </Link>
                            <Link className="color-white" to="/signup">
                                Sign Up!
                            </Link>
                        </div>
                        <button
                            onClick={onSubmit}
                            className="btn btn-success py-3 my-4 fs-7 ls-1 fw-bold border-0 bg-secondary btn-block"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    };
    const dorun = () => {
        window.location.reload(false);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            {/* <Base title="Sign up page" description="A page for user to sign up!"> */}
            <div class="signin signup py-5">
                <div className="container pt-5">
                    <div className="bg-transparent text-white text-center p-5">
                        <div class="heading-font text-center pb-4 fw-bold color-white ls-2">SignIn</div>
                        {errorMessage()}
                        {signInForm()}
                        {performRedirect()}
                        {isAuthenticated() && dorun}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
