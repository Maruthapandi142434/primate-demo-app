// src/types/next.d.ts
import 'next';

declare module 'next' {
  export interface PageProps {
    params: Promise<Record<string, string>>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
  }
}