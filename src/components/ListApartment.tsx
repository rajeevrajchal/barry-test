import React from 'react';
import {Grid} from "@chakra-ui/react";
import {map} from "lodash";
import ApartmentSimpleCard from "@containers/ApartmentSimpleCard";
import {NextPage} from "next";
import {$FIXME} from "@utils/constant";

interface ListApartmentInterface {
    apartments: $FIXME
}
const ListApartment: NextPage<ListApartmentInterface> = (props) => {
    const {apartments} = props
    return (
        <Grid
            width='100%'
            height="87vh"
            overflowY='scroll'
            templateColumns="repeat(3, 1fr)"
            gap={5}
        >
            {
                map(apartments, item => (
                    <ApartmentSimpleCard key={item.id} apartment={item}/>
                ))
            }
        </Grid>
    );
};

export default ListApartment;
