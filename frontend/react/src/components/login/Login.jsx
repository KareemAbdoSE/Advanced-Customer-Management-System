// Login page component that handles user authentication
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Flex,
    FormLabel,
    Heading,
    Image,
    Input,
    Link,
    Stack,
    Text,
} from '@chakra-ui/react';
import { Formik, Form, useField } from "formik";
import * as Yup from 'yup';
import { useAuth } from "../context/AuthContext.jsx";
import { errorNotification } from "../../services/notification.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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

// Login form using Formik and Yup for validation
const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    return (
        <Formik
            validateOnMount={true}
            validationSchema={Yup.object({
                username: Yup.string()
                    .email("Must be a valid email")
                    .required("Email is required"),
                password: Yup.string()
                    .max(20, "Password cannot be more than 20 characters")
                    .required("Password is required"),
            })}
            initialValues={{ username: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                login(values)
                    .then(() => {
                        navigate("/dashboard");
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
                    <Stack mt={15} spacing={15}>
                        <MyTextInput
                            label="Email"
                            name="username"
                            type="email"
                            placeholder="email@example.com"
                        />
                        <MyTextInput
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                        />
                        <Button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                        >
                            Login
                        </Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};

// Main login component
const Login = () => {
    const { customer } = useAuth();
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        if (customer) {
            navigate("/dashboard/customers");
        }
    }, [customer, navigate]);

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            {/* Login Form Section */}
            <Flex p={8} flex={1} alignItems={'center'} justifyContent={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Image
                        src={"https://github.com/KareemAbdoSE/Full-Stack-Developer-Project/blob/main/KAlogo.png?raw=true"}
                        boxSize={"200px"}
                        alt={"Logo"}
                        alignSelf={"center"}
                    />
                    <Heading fontSize={'2xl'} mb={15}>Sign in to your account</Heading>
                    <LoginForm />
                    <Link color={"blue.500"} href={"/signup"}>
                        Don't have an account? Signup now.
                    </Link>
                </Stack>
            </Flex>
            {/* Side Image Section */}
            <Flex
                flex={1}
                p={10}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                bgGradient={{ sm: 'linear(to-r, blue.600, purple.600)' }}
            >
                <Text fontSize={"6xl"} color={'white'} fontWeight={"bold"} mb={5}>
                    <Link target={"_blank"} href={""}>
                        Enroll Now
                    </Link>
                </Text>
                <Image
                    alt={'Login Image'}
                    objectFit={'scale-down'}
                    src={
                        'https://github.com/KareemAbdoSE/Full-Stack-Developer-Project/blob/main/%E2%80%94Pngtree%E2%80%94enroll%20now%20banner%20png%20image_8330526.png?raw=true'
                    }
                />
            </Flex>
        </Stack>
    );
};

export default Login;
