import React from "react";
import { Alert, AlertIcon, Image, ImageProps, Spinner } from "@chakra-ui/react";
import useImage from "../hooks/useImage";

type ImageSize = ImageProps["boxSize"];

function HiraImage({ url, size = "150px" }: { url: string; size?: ImageSize }) {
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

    return (
        <Image
            justifySelf="center"
            alignSelf="center"
            boxSize={size}
            src={image}
            alt="question"
        />
    );
}

export default HiraImage;
