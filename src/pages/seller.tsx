import {useState} from 'react';
import Navbar from "@components/Navbar";
import {Box, Grid, GridItem, Text, Stack} from "@chakra-ui/react";
import ListApartment from "@components/ListApartment";
import AddApartment from "@components/AddApartment";

const Seller = () => {
    const [screen, setScreen] = useState('add')
    const getScreen = () => {
        switch (screen) {
            case "add":
                return <AddApartment/>
            case "list":
                return <ListApartment/>
            default:
                return <Text> No Screen</Text>
        }
    }
    return (
        <>
            <Navbar/>
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
