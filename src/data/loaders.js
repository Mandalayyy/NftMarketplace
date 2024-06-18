import qs from "qs";

import { getAuthToken } from "./services/get-token"
import { flattenAttributes, getStrapiURL } from "@/lib/utils";

const baseUrl = getStrapiURL();

async function fetchData(url) {
    const authToken = await getAuthToken();
  
    const headers = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
  
    try {
      const response = await fetch(url, authToken ? headers : {});
      const data = await response.json();
      return flattenAttributes(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // or return null;
    }
  }



export async function getGlobalPageData() {

    const url = new URL("/api/global", baseUrl);
  
    url.search = qs.stringify({
        populate: {
            header: {
              populate: {
                logo: true,
                navlinks: true,
                signUp: true
              }
            },
            footer: {
              populate: {
               socialLinks: true,
               navLinks: true,
               logo: true   
              }
            }
          }
    })
  
    return await fetchData(url.href);
    
  
  }

  export async function getSignInPageData() {

    const url = new URL("/api/sign-in-page", baseUrl);
  
    url.search = qs.stringify({
      populate: {
        img:{
          fields: ['url']
        }
      }
    })
    
    return await fetchData(url.href);
  }

  export async function getSignUpPageData() {

    const url = new URL("/api/sign-up-page", baseUrl);
  
    url.search = qs.stringify({
      populate: {
        img:{
          fields: ['url']
        }
      }
    })
  
    return await fetchData(url.href);
  }


  export async function getHomePageData() {
  
    const url = new URL("/api/home-page", baseUrl);
  
    url.search = qs.stringify({
      populate:{
        blocks:{
          populate:{
           link:{
             populate:true
           },        
           nfts:{
            populate: {
              nftImg: {
                fields: ['url']
              },
              nftOwner: {
                populate:{
               avatar: {
                 fields: ['url']
               }
             }
              }
            }
           },
           users:{
             populate:{
               avatar: {
                 fields: ['url']
               }
             }
           },
           collections:{
             populate: {
               nfts: {
                  populate: {
                    nftImg: {
                      fields: ['url']
                    }
                  }
               },
                 collectionName:{
                   populate:true
                 },
                 collectionOwner:{
                   populate: {
                     avatar: {
                       fields: ['url']
                     },
                     username:{
                       populate:true
                     }
                   }
     
                 }
               }
             }
           },   
        }
      }
    });
  
    return await fetchData(url.href);
  }
  
  export async function getUserById(userId) {
    const url = new URL(`/api/users/${userId}`, baseUrl);
  
    url.search = qs.stringify({
      populate: {
        avatar:{
          fields: ['url']
        },
        userPageImg: {
          fields: ['url']
        },
        collections:{
          populate:{
            nfts: {
              populate: {
               nftImg: {
                fields: ['url']
                },
                nft_creator: {
                  populate:{
                   avatar: {
                     fields: ['url']
                   },
                   nftsCreated:{
                     populate:{
                       nftImg:{
                         fields: ['url']
                       }
                     }
                   }
                  }
                }
              }
            },
            collctionOwner: {
              populate:{
               avatar: {
                 fields: ['url']
               },
               nftsCreated:{
                 populate:{
                   nftImg:{
                     fields: ['url']
                   }
                 }
               }
              }
            }
          }
        },
        nftsOwned: {
          populate: {
            nftImg: {
              fields: ['url']
            },
            nft_creator: {
              populate:{
               avatar: {
                 fields: ['url']
               },
               nftsCreated:{
                 populate:{
                   nftImg:{
                     fields: ['url']
                   }
                 }
               }
              }
            }
            
          }
        },
        nftsCreated: {
          populate: {
              nftImg: {
                fields: ['url']
              },
              nft_creator: {
                populate:{
                 avatar: {
                   fields: ['url']
                 },
                 nftsCreated:{
                   populate:{
                     nftImg:{
                       fields: ['url']
                     }
                   }
                 }
                }
              }
            }
        }
      }
    });
  
    return await fetchData(url.href);
  }

  export async function getNftById(nftId) {
    const url = new URL(`/api/nfts/${nftId}`, baseUrl);
  
    url.search = qs.stringify({
      populate: {
        nftImg: {
          fields: ['url']
        },
        nft_creator: {
          populate:{
           avatar: {
             fields: ['url']
           },
           nftsCreated:{
             populate:{
               nftImg:{
                 fields: ['url']
               }
             }
           }
          }
        }
      }
    });
  
    return await fetchData(url.href);
  }

  export async function getNfts(queryString, currentPage) {
    const url = new URL(`/api/nfts`, baseUrl);
    const PAGE_SIZE = 6;
  
    url.search = qs.stringify({
      populate: {
        nftImg: {
          fields: ['url']
        },
        nft_creator: {
          populate:{
           avatar: {
             fields: ['url']
           },
           nftsCreated:{
             populate:{
               nftImg:{
                 fields: ['url']
               }
             }
           }
          }
        }
      },
      
      filters: {
        $or: [
          {nftName: {$containsi: queryString } },
          { nft_creator : {
            username: {$containsi: queryString}
          }},
        ]
      },
      pagination: {
        pageSize: PAGE_SIZE,
        page: currentPage
      }
    });
  
    return await fetchData(url.href);
  }

  export async function getCollections (queryString, currentPage) {
    const url = new URL(`/api/collections`, baseUrl);
    const PAGE_SIZE = 2;
  
    url.search = qs.stringify({
      populate:{
        nfts: {
          populate: {
           nftImg: {
            fields: ['url']
            },
            nft_creator: {
              populate:{
               avatar: {
                 fields: ['url']
               },
               nftsCreated:{
                 populate:{
                   nftImg:{
                     fields: ['url']
                   }
                 }
               }
              }
            }
          }
        },
        collctionOwner: {
          populate:{
           avatar: {
             fields: ['url']
           },
           nftsCreated:{
             populate:{
               nftImg:{
                 fields: ['url']
               }
             }
           }
          }
        }
      },
      filters: {
        $or: [
          {collectionName: {$containsi: queryString } },
          {collectionOwner: {
            username: {$containsi: queryString }
          }},
          {nfts: {
            nftName: {$containsi: queryString },
          }},
          {nfts: {
            nft_creator:{
              username: {$containsi: queryString }},
          }}
        ]
      },
      pagination: {
        pageSize: PAGE_SIZE,
        page: currentPage
      }
    });
  
    return await fetchData(url.href);
  }

  export async function getCollectionsByUser (id, currentPage) {
    const url = new URL(`/api/collections`, baseUrl);
    const PAGE_SIZE = 3;
    url.search = qs.stringify({
      populate:{
        nfts: {
          populate: {
           nftImg: {
            fields: ['url']
            },
            nft_creator: {
              populate:{
               avatar: {
                 fields: ['url']
               },
               nftsCreated:{
                 populate:{
                   nftImg:{
                     fields: ['url']
                   }
                 }
               }
              }
            }
          }
        },
        collctionOwner: {
          populate:{
           avatar: {
             fields: ['url']
           },
           nftsCreated:{
             populate:{
               nftImg:{
                 fields: ['url']
               }
             }
           }
          }
        }
      },
      filters: {
        collectionOwner: {
            id: {$eq: id }
          }},
          pagination: {
            pageSize: PAGE_SIZE,
            page: currentPage
          }
    });
  
    return await fetchData(url.href);
  }

  export async function getNftsCreatedByUser(id, currentPage) {
    const url = new URL(`/api/nfts`, baseUrl);
    const PAGE_SIZE = 3;
    console.log(id)
    url.search = qs.stringify({
      populate: {
        nftImg: {
          fields: ['url']
        },
        nft_creator: {
          populate:{
           avatar: {
             fields: ['url']
           },
          }
        }
      },
      
      filters: {
        nft_creator: {
            id: {$eq: id }
      }},
      pagination: {
        pageSize: PAGE_SIZE,
        page: currentPage
      }
    });
  
    return await fetchData(url.href);
  }

  export async function getNftsOwnedByUser(id, currentPage) {
    const url = new URL(`/api/nfts`, baseUrl);
    const PAGE_SIZE = 3;
  
    url.search = qs.stringify({
      populate: {
        nftImg: {
          fields: ['url']
        },
        nft_creator: {
          populate:{
           avatar: {
             fields: ['url']
           },
          }
        }
      },
      filters: {
        nftOwner: {
            id: {$eq: id }
      }},
      pagination: {
        pageSize: PAGE_SIZE,
        page: currentPage
      }
    });
  
    return await fetchData(url.href);
  }

  export async function getUsers(currentPage) {
    const url = new URL(`/api/users`, baseUrl);
    const PAGE_SIZE = 20;
  
    url.search = qs.stringify({
      populate: {
        avatar:{
          fields: ['url']
        },
        
      },
      pagination: {
        pageSize: PAGE_SIZE,
        page: currentPage,
        withCount: true
      }
    });
    const result = await fetchData(url.href);
    return result
  }