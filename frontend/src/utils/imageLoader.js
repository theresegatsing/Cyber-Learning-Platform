/**
 * Converts scenario image references into frontend asset URLs.
 */

export function getImagePath(image) {

    console.log("imageLoader received:", image);

    if (!image) {
        return null;
    }


    if (!image.startsWith("icons/")) {

        return new URL(
            `../assets/illustrations/${image}`,
            import.meta.url
        ).href;

    }


    return new URL(
        `../assets/${image}`,
        import.meta.url
    ).href;

}