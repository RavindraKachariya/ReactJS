import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterForm = () => {
    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        gender: "",
        skills: [],
        country: "",
        terms: false,
    };

    const validationSchema = Yup.object({
        name: Yup.string().min(3, "Minimum 3 characters").required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string().min(6, "Min 6 characters").required("Required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Required"),
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, "Must be 10 digits")
            .required("Required"),
        gender: Yup.string().required("Select gender"),
        skills: Yup.array().min(1, "Select at least one skill"),
        country: Yup.string().required("Select country"),
        terms: Yup.boolean().oneOf([true], "Accept terms"),
    });

    const onSubmit = (values, { resetForm }) => {
        console.log(values);
        alert("Form Submitted Successfully 🚀");
        resetForm();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
                    Registration Form
                </h2>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form className="space-y-4">

                        {/* Name */}
                        <div>
                            <Field
                                name="name"
                                type="text"
                                placeholder="Full Name"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Email */}
                        <div>
                            <Field
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Password */}
                        <div>
                            <Field
                                name="password"
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <Field
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Phone */}
                        <div>
                            <Field
                                name="phone"
                                type="text"
                                placeholder="Phone Number"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                            />
                            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Gender */}
                        <div>
                            <p className="font-medium text-gray-600">Gender</p>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center gap-1">
                                    <Field type="radio" name="gender" value="male" />
                                    Male
                                </label>
                                <label className="flex items-center gap-1">
                                    <Field type="radio" name="gender" value="female" />
                                    Female
                                </label>
                            </div>
                            <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Skills */}
                        <div>
                            <p className="font-medium text-gray-600">Skills</p>
                            <div className="flex gap-3 mt-1">
                                <label><Field type="checkbox" name="skills" value="HTML" /> HTML</label>
                                <label><Field type="checkbox" name="skills" value="CSS" /> CSS</label>
                                <label><Field type="checkbox" name="skills" value="JS" /> JS</label>
                            </div>
                            <ErrorMessage name="skills" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Country */}
                        <div>
                            <Field
                                as="select"
                                name="country"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                            >
                                <option value="">Select Country</option>
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                            </Field>
                            <ErrorMessage name="country" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Terms */}
                        <div className="flex items-center gap-2">
                            <Field type="checkbox" name="terms" />
                            <span>I accept terms & conditions</span>
                        </div>
                        <ErrorMessage name="terms" component="div" className="text-red-500 text-sm mt-1" />

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                        >
                            Register
                        </button>

                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default RegisterForm;
