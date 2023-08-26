import { useRef } from "react";
import { useIntersectionObserver } from "hooks/useIntersectionObserver";
import type { InfiniteScrollProps } from "./types";

export const InfiniteScroll = ({
  loadMoreFunction,
  isLoadingMore,
  loadingMoreMessage,
  hasLoadedEverything,
  loadedEverythingMessage,
  children,
}: InfiniteScrollProps) => {
  const observableRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver({
    observableRef,
    callback: loadMoreFunction,
  });

  return (
    <>
      {children}

      {isLoadingMore && loadingMoreMessage}

      {hasLoadedEverything && loadedEverythingMessage}

      <div ref={observableRef} />
    </>
  );
};
