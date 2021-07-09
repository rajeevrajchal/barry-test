import React from 'react';
import {Box, Button, Grid, Link} from "@chakra-ui/react";
import {NextPage} from "next";

interface NavbarInterface {
    token?: string
}

const Navbar: NextPage<NavbarInterface> = (props) => {
    const {token} = props
    return (
        <Grid
            bg="white"
            h="8vh"
            px='10rem'
            position='fixed'
            top={0}
            left={0}
            width="100%"
            zIndex={9}
            templateColumns="repeat(2, 1fr)"
            placeContent='center'
            alignItems='center'
            boxShadow="-1px -1px 9px 0px rgba(0,0,0,0.79)"
        >
            <Box>
                <Link href='/'>Apartment</Link>
            </Box>
            <Box
                d="flex"
                alignItems='center'
                justifyContent='flex-end'
            >

                <Link px="5">Order</Link>
                {
                    token && <Button>Logout</Button>
                }
                {
                    !token && <Link px="5" href="/login">Login</Link>
                }
            </Box>
        </Grid>
    );
};

export default Navbar;
