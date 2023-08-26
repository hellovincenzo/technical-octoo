import { useEffect } from "react";
import type { UseIntersectionObserverParameters } from "./types";

export const useIntersectionObserver = ({
  observableRef,
  callback,
  options,
}: UseIntersectionObserverParameters) => {
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          callback();
        }
      },
      {
        threshold: 0,
        ...options,
      }
    );

    if (observableRef.current) {
      intersectionObserver.observe(observableRef.current);
    }

    return () => {
      if (observableRef.current) {
        intersectionObserver.unobserve(observableRef.current);
      }
    };
  }, [callback]);
};
