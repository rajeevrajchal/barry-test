import {useEffect, useState} from 'react';
import Navbar from "@components/Navbar";
import {Box, Grid, GridItem, Text, Stack} from "@chakra-ui/react";
import ListApartment from "@components/ListApartment";
import AddApartment from "@components/AddApartment";
import {gql} from "@apollo/client";
import client from "@lib/apolloClient";
import {NextPage} from "next";
import {$FIXME} from "@utils/constant";
import Cookies from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';

interface SellerInterface {
    apartments: $FIXME
    accessToken: string
}
const Seller:NextPage<SellerInterface> = (props) => {
    const {apartments,accessToken} = props
    const [screen, setScreen] = useState('add')
    const getScreen = () => {
        switch (screen) {
            case "add":
                return <AddApartment accessToken={accessToken}/>
            case "list":
                return <ListApartment apartments={apartments} isSeller={true}  bookButtonClick={(obj) => console.log(obj)}/>
            default:
                return <Text> No Screen</Text>
        }
    }
    return (
        <>
            <Navbar token={accessToken}/>
            <Grid
                templateColumns="15rem 1fr"
                gap={10}
                position='relative'
                zIndex={1}
                height="calc(100vh - 3rem)"
                overflow='hidden'
                px="10rem"
                py="2rem"
                marginTop="3rem"
            >
                <Stack
                    padding="1rem"
                    spacing="24px"
                    borderRadius='10px'
                    boxShadow="0px 0px 5px 0px rgba(0,0,0,0.7)">
                    <Box
                        textAlign='center'
                        bg='tomato'
                        padding="1rem"
                        borderRadius='10px'
                        cursor="pointer"
                        _hover={{
                           filter: "brightness(0.8)"
                        }}
                        _active={{
                            transform: "translateY(1px)"
                        }}
                        onClick={() => setScreen('add')}
                    >
                        <Text
                            color='white'
                            fontWeight='bold'
                        >Add Apartment</Text>
                    </Box>
                    <Box
                        textAlign='center'
                        bg='tomato'
                        padding="1rem"
                        borderRadius='10px'
                        cursor="pointer"
                        _hover={{
                            filter: "brightness(0.8)"
                        }}
                        _active={{
                            transform: "translateY(1px)"
                        }}
                        onClick={() => setScreen('list')}
                    >
                        <Text
                            color='white'
                            fontWeight='bold'
                        >List Apartment</Text>
                    </Box>
                </Stack>
                <GridItem>
                    {
                        getScreen()
                    }
                </GridItem>
            </Grid>
        </>
    );
};

export default Seller;

export async function getServerSideProps(context: { req: IncomingMessage; res: ServerResponse; }) {

    const secure: boolean = process.env.NODE_ENV === 'production';
    const myCookies = new Cookies(context.req, context.res, { secure });
    const accessToken = myCookies.get('BarryTestAccessToken');
    const fetchApartment = gql`
        {
            getApartmentsByUser(userID:"60e1e8036bdb893bce77400d"){
                name
                id
                description
                type
                price
                number_room
                slots{
                    id
                    date
                    booked
                }
            }
        }
    `
    const {data: {getApartmentsByUser}} = await client(accessToken || '').query({
        query: fetchApartment
    })
    if (!accessToken) {
        return {
        redirect: {
            destination: '/login',
            permanent: false,
        },
        };
    }
    return {
        props: {
            apartments: getApartmentsByUser,
            accessToken: accessToken
        }
    }
}

