// Main component that displays a list of customers and provides options to add, update, or delete customers
import {
    Wrap,
    WrapItem,
    Spinner,
    Text
} from '@chakra-ui/react';
import SidebarWithHeader from "./components/shared/SideBar.jsx";
import { useEffect, useState } from 'react';
import { getCustomers } from "./services/client.js";
import CreateCustomerDrawer from "./components/customer/CreateCustomerDrawer.jsx";
import CustomerCard from "./components/customer/CustomerCard.jsx";
import { errorNotification } from "./services/notification.js";

const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState("");

    // Fetch customers from API
    const fetchCustomers = () => {
        setLoading(true);
        getCustomers()
            .then(res => {
                setCustomers(res.data);
            })
            .catch(err => {
                setError(err.response.data.message);
                errorNotification(
                    err.code,
                    err.response.data.message
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    if (loading) {
        return (
            <SidebarWithHeader>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </SidebarWithHeader>
        );
    }

    if (err) {
        return (
            <SidebarWithHeader>
                <CreateCustomerDrawer fetchCustomers={fetchCustomers} />
                <Text mt={5}>There is an error: {err}</Text>
            </SidebarWithHeader>
        );
    }

    return (
        <SidebarWithHeader>
            <CreateCustomerDrawer fetchCustomers={fetchCustomers} />
            {customers.length > 0 ? (
                <Wrap justify={"center"} spacing={"30px"}>
                    {customers.map((customer, index) => (
                        <WrapItem key={index}>
                            <CustomerCard
                                {...customer}
                                imageNumber={index}
                                fetchCustomers={fetchCustomers}
                            />
                        </WrapItem>
                    ))}
                </Wrap>
            ) : (
                <Text mt={5}>No customers available</Text>
            )}
        </SidebarWithHeader>
    );
};

export default Customer;
