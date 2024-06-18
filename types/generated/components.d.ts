import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentsCategory extends Schema.Component {
  collectionName: 'components_components_categories';
  info: {
    displayName: 'category';
  };
  attributes: {
    title: Attribute.String;
    categoryImg: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    icon: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ComponentsLink extends Schema.Component {
  collectionName: 'components_components_links';
  info: {
    displayName: 'link';
    description: '';
  };
  attributes: {
    url: Attribute.String;
    isExternal: Attribute.Boolean & Attribute.DefaultTo<false>;
    text: Attribute.String;
  };
}

export interface ComponentsNft extends Schema.Component {
  collectionName: 'components_components_nfts';
  info: {
    displayName: 'nft';
    description: '';
  };
  attributes: {};
}

export interface LayoutArtistInfoSection extends Schema.Component {
  collectionName: 'components_layout_artist_info_sections';
  info: {
    displayName: 'ArtistInfoSection';
  };
  attributes: {
    til: Attribute.String;
  };
}

export interface LayoutArtistinfo extends Schema.Component {
  collectionName: 'components_layout_artistinfos';
  info: {
    displayName: 'Artistinfo';
  };
  attributes: {
    title: Attribute.String;
    artistImg: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    user: Attribute.Relation<
      'layout.artistinfo',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    link: Attribute.Component<'components.link', true>;
  };
}

export interface LayoutCategories extends Schema.Component {
  collectionName: 'components_layout_categories';
  info: {
    displayName: 'Categories';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
  };
}

export interface LayoutDiscoverNft extends Schema.Component {
  collectionName: 'components_layout_discover_nfts';
  info: {
    displayName: 'DiscoverNFT';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    link: Attribute.Component<'components.link'>;
    nfts: Attribute.Relation<
      'layout.discover-nft',
      'oneToMany',
      'api::nft.nft'
    >;
  };
}

export interface LayoutFooter extends Schema.Component {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
    description: '';
  };
  attributes: {
    logoDescription: Attribute.String;
    socialDescription: Attribute.Text;
    navText: Attribute.String;
    socialLinks: Attribute.Component<'components.link', true>;
    navLinks: Attribute.Component<'components.link', true>;
    logo: Attribute.Component<'components.link'>;
    copyright: Attribute.String;
  };
}

export interface LayoutHeader extends Schema.Component {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
    description: '';
  };
  attributes: {
    logo: Attribute.Component<'components.link'>;
    navlinks: Attribute.Component<'components.link', true>;
    signUp: Attribute.Component<'components.link'>;
  };
}

export interface LayoutHeroSection extends Schema.Component {
  collectionName: 'components_layout_hero_sections';
  info: {
    displayName: 'Hero Section';
    description: '';
  };
  attributes: {
    nfts: Attribute.Relation<'layout.hero-section', 'oneToOne', 'api::nft.nft'>;
    title: Attribute.String;
    subTitle: Attribute.Text;
    link: Attribute.Component<'components.link'>;
  };
}

export interface LayoutTopCreators extends Schema.Component {
  collectionName: 'components_layout_top_creators';
  info: {
    displayName: 'TopCreators';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    link: Attribute.Component<'components.link'>;
    users: Attribute.Relation<
      'layout.top-creators',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface LayoutTrendingCollections extends Schema.Component {
  collectionName: 'components_layout_trending_collections';
  info: {
    displayName: 'trendingCollections';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    collections: Attribute.Relation<
      'layout.trending-collections',
      'oneToMany',
      'api::collection.collection'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'components.category': ComponentsCategory;
      'components.link': ComponentsLink;
      'components.nft': ComponentsNft;
      'layout.artist-info-section': LayoutArtistInfoSection;
      'layout.artistinfo': LayoutArtistinfo;
      'layout.categories': LayoutCategories;
      'layout.discover-nft': LayoutDiscoverNft;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
      'layout.hero-section': LayoutHeroSection;
      'layout.top-creators': LayoutTopCreators;
      'layout.trending-collections': LayoutTrendingCollections;
    }
  }
}
