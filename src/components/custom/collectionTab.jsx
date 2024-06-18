import { ThemeProvider, createTheme } from '@mui/material/styles';
import { NftCard } from "./NftCard";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export function CollectionTab({ collectionsData, tab, user }) {
  const data = collectionsData?.data || [];
  const meta = collectionsData?.meta || {};
  const collections = data;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let currentPage = Number(searchParams.get(`${tab}Page`)) || 1;

  useEffect(() => {
    if (currentPage > meta?.pagination?.pageCount) {
      const params = new URLSearchParams(searchParams);
      params.set(`${tab}Page`, "1");
      router.replace(`?${params.toString()}`);
    }
  }, [currentPage, meta?.pagination?.pageCount, router, searchParams, tab]);

  const createPageURL = (event, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(`${tab}Page`, value.toString());
    router.push(`?${params.toString()}`);
  };

  const theme = createTheme({
    components: {
      // Name of the component
      MuiPaginationItem: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            color: '#fff',
            '&.Mui-selected': {
              color: '#2B2B2B', // Black text for selected item
            },
            '&:hover': {
              backgroundColor: 'rgba(43, 43, 43, 0.8)', // Hover effect
            },
          },
        },
      },
    },
  });

  return (
    <div className="grid justify-items-center gap-40  px-30 md:px-72 lg:px-115 justify-self-center max-w-[37.5rem] md:max-w-[83.5rem] lg:max-w-[105rem]">
      {collections.length === 0 ? (
        <div className="text-white text-lg">No collections found.</div>
      ) : (
        <div className="grid gap-20">
          {collections.map((collection) => {
            const nfts = Array.isArray(collection.nfts) ? collection.nfts : collection.nfts?.data || [];
            return (
              <div key={collection.id} className="grid gap-30">
                <h4>{collection.collectionName}</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-30">
                  {nfts.map((nft) => (
                    <NftCard key={nft.id} nft={nft} user={user} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <ThemeProvider theme={theme}>
        <Stack spacing={2}>
          <Pagination
            theme={theme}
            count={meta?.pagination?.pageCount || 1}
            page={currentPage}
            shape="rounded"
            color="secondary"
            onChange={createPageURL}
          />
        </Stack>
      </ThemeProvider>
    </div>
  );
}
