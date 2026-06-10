import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const queryclient = new QueryClient({
    defaultOptions : {
        queries : {
            staleTime : ((1000 * 60) * 60) * 24,
            gcTime : ((1000 * 60) * 60) * 1,
            refetchOnMount: false,       // ✅ 마운트 시 재요청 막기
            refetchOnWindowFocus: false, // ✅ 포커스 시 재요청 막기
            retry : false,
        }
    }
})

export const QueryProvider = ({ children } : LAYOUT_CHILD) => {
    
    return (
        <QueryClientProvider client={queryclient}>
            {children}
            <ReactQueryDevtools initialIsOpen={import.meta.env.DEV} />
        </QueryClientProvider>
    )
}
