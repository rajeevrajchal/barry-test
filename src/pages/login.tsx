import React from 'react';
import {useFormik} from "formik";
import Navbar from "@components/Navbar";
import {Button, Grid, Input, Link, Stack, Text} from "@chakra-ui/react";

const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ''
        },
        onSubmit: async (values) => {
            console.log(' the values are', values)
        }
    })
    return (
        <>
            <Navbar/>
            <Grid
                width={"100%"}
                height={"90vh"}
                placeContent="center"
            >
                <Stack
                    p={"2rem"}
                    spacing={5}
                    borderRadius='10px'
                    boxShadow="0px 0px 5px 0px rgba(0,0,0,0.7)"
                >
                    <Stack>
                        <Text>Email</Text>
                        <Input placeholder="your Email"
                               type="text"
                               name="email"
                               onChange={formik.handleChange}
                               value={formik.values.email}
                        />
                    </Stack>
                    <Stack>
                        <Text>Password</Text>
                        <Input placeholder="******"
                               type="password"
                               name="password"
                               onChange={formik.handleChange}
                               value={formik.values.password}
                        />
                    </Stack>
                    <Stack>
                        <Text>
                            No Account? <Link color="teal.500" href="/register">Register</Link>
                        </Text>
                    </Stack>
                    <Stack width='100%'>
                        <Button colorScheme="teal" size="md" onClick={() => formik.handleSubmit()}>
                            Login
                        </Button>
                    </Stack>
                </Stack>
            </Grid>
        </>
    );
};

export default Login;
