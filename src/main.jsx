import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import App from "./App"
import "./index.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5.1 * 60 * 1000,
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "rgb(30 41 59)",
              color: "rgb(248 250 252)",
              border: "1px solid rgb(51 65 85)",
            },
            success: {
              iconTheme: {
                primary: "rgb(34 197 94)",
                secondary: "white",
              },
            },
            error: {
              iconTheme: {
                primary: "rgb(239 68 68)",
                secondary: "white",
              },
            },
          }}
        />
      </BrowserRouter>

      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
)
