'use strict';

/**
 * `on-nft-create` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized("You are not authenticated");

    if (user) {
      // Add the nftOwner and nft_creator fields to the request body
      ctx.request.body.data.nftOwner = user.id;
      ctx.request.body.data.nft_creator = user.id;
    }
    await next();
  };
};
