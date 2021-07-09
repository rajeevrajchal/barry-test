import React from 'react';
import Navbar from "@components/Navbar";
import {Button, Flex, Grid, Input, Link, Select, Spacer, Stack, Text} from "@chakra-ui/react";
import {useFormik} from "formik";
import {IncomingMessage, ServerResponse} from "http";
import Cookies from "cookies";

const Register = () => {
    const formik = useFormik({
        initialValues: {
            first_name:"",
            last_name:"",
            role:"seller",
            email: "",
            password: '',
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
                height={"100vh"}
                placeContent="center"
            >
                <Stack
                    p={"2rem"}
                    spacing={5}
                    borderRadius='10px'
                    boxShadow="0px 0px 5px 0px rgba(0,0,0,0.7)"
                >
                    <Flex>
                        <Stack>
                            <Text>First Name</Text>
                            <Input placeholder="Your first name"
                                   type="text"
                                   name="first_name"
                                   onChange={formik.handleChange}
                                   value={formik.values.first_name}
                            />
                        </Stack>
                        <Spacer />
                        <Stack marginLeft='1rem'>
                            <Text>Last Name</Text>
                            <Input placeholder="your last name"
                                   type="text"
                                   name="last_name"
                                   onChange={formik.handleChange}
                                   value={formik.values.last_name}
                            />
                        </Stack>
                    </Flex>
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
                        <Text>Role</Text>
                        <Select placeholder="Choose Your Role"
                                name="type"
                                onChange={formik.handleChange}
                                value={formik.values.role}
                        >
                            <option value="seller">Seller</option>
                            <option value="buyer">Buyer</option>
                        </Select>
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
                            Have Account? <Link color="teal.500" href="/login"> Login</Link>
                        </Text>
                    </Stack>
                    <Stack width='100%'>
                        <Button colorScheme="teal" size="md" onClick={() => formik.handleSubmit()}>
                            Register
                        </Button>
                    </Stack>
                </Stack>
            </Grid>
        </>
    );
};

export default Register;

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
