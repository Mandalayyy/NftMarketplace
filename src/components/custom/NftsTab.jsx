import Link from "next/link";
import { NftCard } from "./NftCard";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export function NftsTab({ nftsData, tab, user }) {
  const data = nftsData?.data || [];
  const meta = nftsData?.meta || {};
  const nfts = data;

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
    <div className="grid justify-items-center px-30 md:px-72 lg:px-115 gap-40 justify-self-center max-w-[37.5rem] md:max-w-[83.5rem] lg:max-w-[105rem]">
      {nfts.length === 0 ? (
        <div className="text-white text-lg">No NFTs found.</div>
      ) : (
        <div className="grid gap-30 md:grid-cols-2 lg:grid-cols-3">
          {nfts.map((nft) => (
            <div key={nft.id}>
              <NftCard nft={nft} key={nft.id} userData={nft.nft_creator} user={user} />
            </div>
          ))}
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
