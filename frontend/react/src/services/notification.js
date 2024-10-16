// Utility functions for displaying notifications using Chakra UI's toast
import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

// General notification function
const notification = (title, description, status) => {
    toast({
        title,
        description,
        status,
        isClosable: true,
        duration: 4000
    });
};

// Success notification
export const successNotification = (title, description) => {
    notification(title, description, "success");
};

// Error notification
export const errorNotification = (title, description) => {
    notification(title, description, "error");
};
