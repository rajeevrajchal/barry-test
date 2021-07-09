import React from 'react';
import {useFormik} from "formik";
import Navbar from "@components/Navbar";
import {Button, Grid, Input, Link, Stack, Text} from "@chakra-ui/react";
import {includes} from 'lodash'
import {gql} from "@apollo/client";
import client from "@lib/apolloClient";
import {useRouter} from "next/router";
import Cookies from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';
const Login = () => {
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            email: "jane@gmail.com",
            password: 'Ch@ngeM3'
        },
        onSubmit: async (values) => {
        
            const LoginUser = gql`
                mutation{
                    loginUser(
                        email:"${values.email}"
                        password:"${values.password}"
                    ){
                        token
                        role
                    }
                }
            `
            const {data: {loginUser}} = await client('').mutate({mutation: LoginUser})
            if (includes(["admin", "seller"], loginUser.role) && loginUser.token) {
                router.push('/seller')
                localStorage.setItem('BarryTestLoginUser', JSON.stringify(loginUser));
            }else{
                console.log('please login')
            }
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

export async function getServerSideProps(context: { req: IncomingMessage; res: ServerResponse; }) {
    const secure: boolean = process.env.NODE_ENV === 'production';
    const myCookies = new Cookies(context.req, context.res, { secure });
    const accessToken = myCookies.get('BarryTestAccessToken');
    if (accessToken) {
        return {
        redirect: {
            destination: '/seller',
            permanent: false,
        },
        };
    }
    return {
        props: {}
    }
}
