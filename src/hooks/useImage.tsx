import React from "react";

const useImage = (fileName: string) => {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<any>(null);
    const [image, setImage] = React.useState<string>();

    React.useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await import("../img/" + fileName + ".png");
                setImage(response.default);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [fileName]);

    return { loading, error, image };
};

export default useImage;
