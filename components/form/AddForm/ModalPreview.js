import {
    Modal,
    ModalOverlay,
    ModalCloseButton,
    ModalHeader,
    ModalContent,
    ModalBody,
    Text,
    ModalFooter
} from '@chakra-ui/react';
import { Prose } from "@nikolovlazar/chakra-ui-prose";

export default function Preview({onClose, preViewRef, isOpen, html}) {
    return (
        <Modal
            onClose={onClose}
            finalFocusRef={preViewRef}
            isOpen={isOpen}
            scrollBehavior={'inside'}
            size={"full"}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader color={'gray.400'}>Preview Description</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Prose>
                        <div dangerouslySetInnerHTML={{ __html: html }} />
                    </Prose>
                </ModalBody>
                <ModalFooter>
                    <Text fontSize={{ base: 'xs', md: 'sm' }} color={'gray.400'} fontWeight={'medium'}>*This is just a preview, maybe the text size will change when on the page view bot</Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}