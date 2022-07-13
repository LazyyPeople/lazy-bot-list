import React, {
    MouseEventHandler,
    useState
} from 'react';
import Select, {
    components,
    StylesConfig
} from 'react-select';
import {
    Box, useColorModeValue
} from '@chakra-ui/react';

export default function MultipleSelect(props) {
    return (
        <Select
            {...props}
            components={{ Control }}
            id='selectbox'
            instanceId="selectbox"
            placeholder={'Select Tags'}
            isSearchable
            isMulti
            styles={{
                control: (base) => ({
                    ...base,
                    paddingLeft: '5px',
                    ":hover": {
                        borderColor: props.isInvalid ? 'red' : 'rgba(225,225,225, 0.3)'
                    },
                    borderColor: props.isInvalid ? 'red' : 'rgba(225,225,225, 0.2)',
                    backgroundColor: 'gray.300'
                }),
                menu: (b) => ({
                    ...b,
                    background: "#171923"
                }),
                option: (b, {isFocused, isSelected}) => ({
                    ...b,
                    background: isFocused ? '#1A202C' : null,
                    ":active": {
                        background: '#2D3748'
                    }
                }),

                multiValue: (b) => ({
                    ...b,
                    background: '#2D3748'
                }),
                multiValueLabel: (b) => ({
                    ...b,
                    color: '#CBD5E0',
                    fontWeight: '600'
                }),
                multiValueRemove: (b) => ({
                    ...b,
                    backgroundColor: '#4A5568',
                    ":hover": {
                        backgroundColor: '#718096'
                    }
                }),

                placeholder: (base) => ({
                    ...base,
                    fontSize: '13px',
                    color: 'rgba(225,225,225,0.3)'
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