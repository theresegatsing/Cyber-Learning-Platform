/**
 * ============================================================================
 * imageLoader.js
 * ----------------------------------------------------------------------------
 * This utility converts image paths stored inside scenario JSON files into
 * actual frontend asset URLs.
 *
 * JSON example:
 *
 * "image": "database/firewall_wall.png"
 *
 * The function will locate:
 *
 * src/assets/illustrations/database/firewall_wall.png
 *
 * Icons are handled separately:
 *
 * "image": "icons/warning.png"
 *
 * becomes:
 *
 * src/assets/icons/warning.png
 * ============================================================================
 */


export function getImagePath(image) {


    if (!image) {
        return null;
    }


    /*
        Scenario illustrations
    */
    if (!image.startsWith("icons/")) {


        return new URL(
            `../assets/illustrations/${image}`,
            import.meta.url
        ).href;


    }


    /*
        Scenario icons
    */
    return new URL(
        `../assets/${image}`,
        import.meta.url
    ).href;

}