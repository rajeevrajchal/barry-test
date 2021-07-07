import React from 'react';
import {Grid} from "@chakra-ui/react";
import {map} from "lodash";
import ApartmentSimpleCard from "@containers/ApartmentSimpleCard";

const ListApartment = () => {
    return (
        <Grid
            width='100%'
            height="87vh"
            overflowY='scroll'
            templateColumns="repeat(3, 1fr)"
            gap={5}
        >
            {
                map([1, 2, 3, 4, 5,6,7,8,9,10,11,12], item => (
                    <ApartmentSimpleCard key={item}/>
                ))
            }
        </Grid>
    );
};

export default ListApartment;
