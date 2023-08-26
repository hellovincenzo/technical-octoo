import type { ReactNode } from "react";

export interface InfiniteScrollProps {
  loadMoreFunction: () => void;
  isLoadingMore: boolean;
  loadingMoreMessage: ReactNode;
  children: ReactNode;
}
