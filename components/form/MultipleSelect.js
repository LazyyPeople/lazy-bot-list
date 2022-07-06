import React, {
    MouseEventHandler,
    useState
} from 'react';
import Select, {
    components,
    StylesConfig
} from 'react-select';
import {
    Box
} from '@chakra-ui/react';

export default function MultipleSelect(props) {
    return (
        <Select
            {...props}
            components={{ Control }}
            isSearchable
            isMulti
            styles={{
                control: (base) => ({
                    ...base,
                    paddingLeft: '5px',
                    ":hover": {
                        borderColor: props.isInvalid ? 'red' : 'rgba(0, 0, 0, 0.16)'
                    },
                    borderColor: props.isInvalid ? 'red' : 'rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.16)'
                }),
                placeholder: (base) => ({
                    ...base,
                    fontSize: '13px',
                    color: '#718096'
                })
            }}
        />
    )
}

const Control = ({children, ...props}) => {
    const sy = { cursor: 'pointer' }
    return (
        <components.Control  {...props}>
            {children}
        </components.Control>
    )
}