// Form component for creating a new customer with validation
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';
import { Alert, AlertIcon, Box, Button, FormLabel, Input, Select, Stack } from "@chakra-ui/react";
import { saveCustomer } from "../../services/client.js";
import { successNotification, errorNotification } from "../../services/notification.js";

// Custom input component with error handling
const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel>{label}</FormLabel>
            <Input {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert status={"error"} mt={2}>
                    <AlertIcon />
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

// Custom select component with error handling
const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel>{label}</FormLabel>
            <Select {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert status={"error"} mt={2}>
                    <AlertIcon />
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

// Formik form for creating a new customer
const CreateCustomerForm = ({ onSuccess }) => {
    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    age: 0,
                    gender: '',
                    password: ''
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    age: Yup.number()
                        .min(16, 'Must be at least 16 years of age')
                        .max(100, 'Must be less than 100 years of age')
                        .required('Required'),
                    password: Yup.string()
                        .min(4, 'Must be 4 characters or more')
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    gender: Yup.string()
                        .oneOf(['MALE', 'FEMALE'], 'Invalid gender')
                        .required('Required'),
                })}
                onSubmit={(customer, { setSubmitting }) => {
                    setSubmitting(true);
                    saveCustomer(customer)
                        .then(res => {
                            successNotification(
                                "Customer saved",
                                `${customer.name} was successfully saved`
                            );
                            onSuccess(res.headers["authorization"]);
                        })
                        .catch(err => {
                            errorNotification(
                                err.code,
                                err.response.data.message
                            );
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }}
            >
                {({ isValid, isSubmitting }) => (
                    <Form>
                        <Stack spacing={"24px"}>
                            <MyTextInput
                                label="Name"
                                name="name"
                                type="text"
                                placeholder="Jane"
                            />

                            <MyTextInput
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="jane@example.com"
                            />

                            <MyTextInput
                                label="Age"
                                name="age"
                                type="number"
                                placeholder="20"
                            />

                            <MyTextInput
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Pick a secure password"
                            />

                            <MySelect label="Gender" name="gender">
                                <option value="">Select gender</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </MySelect>

                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateCustomerForm;
