import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function CenterColumnLayout() {
    return (
        <Flex
            height="100vh"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
        >
            <Outlet />
        </Flex>
    );
}

export default CenterColumnLayout;
