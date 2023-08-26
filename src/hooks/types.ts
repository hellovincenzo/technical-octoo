import type { RefObject } from "react";

export interface UseIntersectionObserverParameters {
  observableRef: RefObject<HTMLElement>;
  callback: () => void;
  options?: IntersectionObserverInit;
}
