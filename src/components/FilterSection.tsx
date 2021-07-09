import React from 'react';
import {useFormik} from 'formik';
import {Button, Input, Select, Stack, Text} from "@chakra-ui/react";
import {NextPage} from "next";
import {$FIXME} from "@utils/constant";
import {gql} from "@apollo/client";
import client from "@lib/apolloClient";


interface FilterSectionInterface {
    setQueryApartments: (obj: $FIXME) => void
}

const FilterSection: NextPage<FilterSectionInterface> = (props) => {
    const {setQueryApartments} = props
    const formik = useFormik({
        initialValues: {
            type: '',
            name:'',
            minPrice: '',
            maxPrice: '',
            minRoom: '',
            maxRoom: '',
            minDate: '',
            maxDate: '',
        },
        onSubmit: async (values) => {
            const FilterQuery = gql`
                query{
                    findApartments(
                        minPrice: ${values.minPrice || ' '}
                        maxPrice: ${values.maxPrice || ' '}
                        minRoom: ${values.minRoom || ' '}
                        maxRoom: ${values.maxRoom || ' '}
                        name: "${values.name || ' '}"
                        type: "${values.type || ' ' }"
                    ) {
                        name
                        id
                        description
                        type
                        price
                        number_room
                        slots {
                            id
                            date
                            booked
                        }
                    }
                }
            `;
            const {
                loading,
                data: {findApartments},
                error,
            } = await client("").query({
                query: FilterQuery,
            });
            console.log({loading, data: {findApartments}, error});
            if (findApartments) {
                setQueryApartments(findApartments);
            }
        }
    })
    return (
        <Stack spacing={5} direction="column" align="center" height="80vh" overflowY="scroll">
            <Stack width="100%">
                <Text width="100%">Name: </Text>
                <Input
                    placeholder="Name"
                    name="name"
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.name}/>
            </Stack>
            <Stack width="100%">
                <Text width="100%">Apartment Type: </Text>
                <Select
                    placeholder="Apartment Type"
                    name="type"
                    onChange={formik.handleChange}
                    value={formik.values.type}>
                    <option value="flat">Flat</option>
                    <option value="house">House</option>
                </Select>
            </Stack>
            <Stack>
                <Text>Price: </Text>
                <Input placeholder="Min Price"
                       type="number"
                       name="minPrice"
                       onChange={formik.handleChange}
                       value={formik.values.minPrice}/>
                <Input placeholder="Max Price"
                       type="number"
                       name="maxPrice"
                       onChange={formik.handleChange}
                       value={formik.values.maxPrice}
                />
            </Stack>
            <Stack>
                <Text>Rooms: </Text>
                <Input placeholder="Min room" type="number"
                       name="minRoom"
                       onChange={formik.handleChange}
                       value={formik.values.minRoom}
                />
                <Input
                    placeholder="Max room"
                    type="number"
                    name="maxRoom"
                    onChange={formik.handleChange}
                    value={formik.values.maxRoom}
                />
            </Stack>

            <Stack width="100%">
                <Text width="100%">Date: </Text>
                <Input placeholder="Min Date" type="date"
                       name="minDate"
                       onChange={formik.handleChange}
                       value={formik.values.minDate}
                />
                <Input placeholder="Max Date" type="date"
                       name="maxDate"
                       onChange={formik.handleChange}
                       value={formik.values.maxDate}
                />
            </Stack>
            <Stack width='100%'>
                <Button colorScheme="teal" size="md" onClick={() => formik.handleSubmit()}>
                    Apply
                </Button>
            </Stack>
        </Stack>
    );
};

export default FilterSection;
