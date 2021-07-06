import React from 'react';
import {GridItem, Image, Box, Button, Stack, Text} from "@chakra-ui/react";

const ApartmentSimpleCard = () => {
    return (
        <GridItem w="100%"
                  cursor={'pointer'}
                  _hover={{
                      boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.7)",
                      borderRadius: "5px"
                  }}
                  transition='.2s ease-in-out'

        >
            <Image
                borderRadius="5px 5px 0 0 "
                objectFit="cover"
                src="https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070__340.jpg"
                alt="Beautiful House"
            />
            <Box bg='tomato' borderRadius="0 0 5px 5px">
                <Box p='1rem'>
                    <Text>
                        Beautiful House
                    </Text>
                    <Text>
                        $20
                    </Text>
                    <Stack spacing={4} direction="row" align="center" marginTop={2}>
                        <Button colorScheme="teal" size="xs">
                            Book Now
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </GridItem>
    );
};

export default ApartmentSimpleCard;
