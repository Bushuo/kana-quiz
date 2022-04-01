import { Button, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
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
            <SimpleGrid w="100%" columns={9} spacing="2">
                {statistics.map((statistic, index) => (
                    <Flex flexDir="column" key={index}>
                        <Heading fontSize="xl" textAlign="center">
                            {statistic.name}
                        </Heading>
                        <HiraImage url={statistic.url} size="50px" />
                        <Flex
                            flexDir="column"
                            p="2"
                            bg="blackAlpha.100"
                            borderRadius="0.375rem"
                        >
                            <Text>
                                <Text as="strong">hits</Text> {statistic.hits}
                            </Text>
                            <Text>
                                <Text as="strong">misses</Text>{" "}
                                {statistic.misses}
                            </Text>
                            <Text>
                                <Text as="strong">hit ratio</Text>{" "}
                                {(statistic.hitRatio * 100).toFixed(2)} %
                            </Text>
                        </Flex>
                    </Flex>
                ))}
            </SimpleGrid>
        </Flex>
    );
}

export default Statistics;
