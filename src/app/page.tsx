"use client";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";

import { Loading } from "components/common/Loading";
import { InfiniteScroll } from "components/InfiniteScroll/InfiniteScroll";

interface Pic {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export default function Home() {
  const [pics, setPics] = useState<Pic[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<null | any>(null);

  const fetchPics = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await axios
        .get(`https://picsum.photos/v2/list?page=${page}&limit=1`)
        .then((pics) => {
          setPics((prevData) => [...prevData, ...pics.data]);
          setPage((prevPage) => prevPage + 1);
        });
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col">
        <InfiniteScroll
          loadMoreFunction={fetchPics}
          isLoadingMore={isLoading}
          loadingMoreMessage={<Loading />}
        >
          {pics.map(({ width, height, download_url }: Pic, idx) => {
            return (
              <Image
                className="my-6 shadow-xl"
                key={idx}
                src={download_url}
                width={width}
                height={height}
                alt="profile_picture"
                priority
              />
            );
          })}
        </InfiniteScroll>
      </div>
    </main>
  );
}
