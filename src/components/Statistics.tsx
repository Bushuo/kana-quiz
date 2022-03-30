import {
    Box,
    Button,
    Flex,
    Heading,
    SimpleGrid,
    Spacer,
    Text,
} from "@chakra-ui/react";
import React from "react";
import { ServiceContext } from "../routes";
import HiraImage from "./HiraImage";
import LinkButton from "./LinkButton";

function Statistics() {
    const { store } = React.useContext(ServiceContext);
    const [statistics] = React.useState(() => store.getStatistics());

    return (
        <Flex
            height="100%"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            mx="200px"
        >
            <SimpleGrid w="100%" columns={3} alignItems="center">
                <LinkButton to="/" text="Back" />
                <Heading my="5" textAlign="center">
                    Statistics
                </Heading>
                <Flex justifyContent="end" alignItems="center">
                    <Button onClick={() => store.clear()}>
                        Clear Progress
                    </Button>
                </Flex>
            </SimpleGrid>
            <SimpleGrid w="100%" columns={10} spacing="2">
                {statistics.map((statistic, index) => (
                    <Flex flexDir="column" key={index}>
                        <Heading fontSize="xl" textAlign="center">
                            {statistic.name}
                        </Heading>
                        <HiraImage url={statistic.url} size="50px" />
                        <Text>hits: {statistic.hits}</Text>
                        <Text>misses: {statistic.misses}</Text>
                        <Text>
                            hit ratio: {(statistic.hitRatio * 100).toFixed(2)} %
                        </Text>
                    </Flex>
                ))}
            </SimpleGrid>
        </Flex>
    );
}

export default Statistics;
