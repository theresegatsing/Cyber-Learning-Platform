/**
 * Converts scenario image references into frontend asset URLs.
 *
 * Example:
 *
 * "network/firewall.jpg"
 * -> src/assets/illustrations/network/firewall.jpg
 *
 * "icons/warning.jpg"
 * -> src/assets/icons/warning.jpg
 */

export function getImagePath(image) {

    if (!image) {
        return null;
    }


    if (image.startsWith("icons/")) {

        return `/src/assets/${image}`;

    }


    return `/src/assets/illustrations/${image}`;

}