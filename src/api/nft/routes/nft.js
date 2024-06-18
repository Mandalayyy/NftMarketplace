'use strict';

/**
 * nft router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::nft.nft', {
    config: {
        create:{
            middlewares: ["api::nft.on-nft-create"],
        }
    }
});

