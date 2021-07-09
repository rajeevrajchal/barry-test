import React from 'react';
import {$FIXME} from "@utils/constant";
import client from "@lib/apolloClient";
import {gql} from "@apollo/client";
import {map} from 'lodash'
import {NextPage} from "next";
import moment from "moment";
import Navbar from "@components/Navbar";
import {Box, Button, Center, Flex, Image, Stack, Text} from "@chakra-ui/react";

interface ApartmentDetailProps {
    apartment: $FIXME
}

const ApartmentDetail: NextPage<ApartmentDetailProps> = (props) => {
    const {apartment: {name, price, type, number_room, description, slots}} = props
    return (
        <>
            <Navbar/>
            <Box
                position='relative'
                px="10rem"
                zIndex={1}
                marginTop={20}>
                <Flex>
                    <Box>
                        <Image
                            boxSize="400px"
                            borderRadius="5px"
                            objectFit="cover"
                            src="https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070__340.jpg"
                            alt="Beautiful House"
                        />
                    </Box>
                    <Box
                        marginLeft={10}
                        flexGrow={3}
                    >
                        <Center>
                            <Stack
                                spacing={3}
                            >
                                <Box>
                                    <Text>{name}</Text>
                                </Box>
                                <Box>
                                    <Text>{type}</Text>
                                </Box>
                                <Box>
                                    <Text>{price}</Text>
                                </Box>
                                <Box>
                                    <Text>{number_room}</Text>
                                </Box>
                                <Box>
                                    <Text>{description}</Text>
                                </Box>
                                <Stack
                                    direction={"row"}>
                                    {
                                        slots ? map(slots, (slot) => (
                                            <Button colorScheme="teal" size="sm" key={slot.id}>
                                                {moment(slot.date).format('LL')}
                                            </Button>
                                        )): <Text>No Date Given</Text>
                                    }
                                </Stack>
                            </Stack>

                        </Center>
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export const getServerSideProps = async (context: $FIXME) => {
    const {params: {apartment}} = context
    const fetchApartment = gql`
        {
            getApartment(name:"${apartment}" ){
                name
                id
                description
                price
                number_room
                type
                slots{
                    id
                    date
                    booked
                }
            }
        }
    `
    const {data: {getApartment}} = await client('').query({
        query: fetchApartment
    })
    return {
        props: {
            apartment: getApartment,
        }
    }
}

export default ApartmentDetail;
