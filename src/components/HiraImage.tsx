import React from "react";
import { Alert, AlertIcon, Image, Spinner } from "@chakra-ui/react";
import useImage from "../hooks/useImage";

function HiraImage({ url }: { url: string }) {
    const { loading, error, image } = useImage(url);

    if (loading) {
        return <Spinner size="xl" />;
    }
    if (error) {
        return (
            <Alert status="error">
                <AlertIcon />
                Image could not be loaded
            </Alert>
        );
    }

    return <Image boxSize="150px" src={image} alt="question" />;
}

export default HiraImage;
