import { Flex } from "@chakra-ui/react";
import React from "react";

function CenterColumnLayout({ children }: React.PropsWithChildren<{}>) {
    return (
        <Flex
            height="100vh"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
        >
            {children}
        </Flex>
    );
}

export default CenterColumnLayout;
