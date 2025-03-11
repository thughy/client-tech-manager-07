
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";
import ClientList from "./pages/clients/ClientList";
import ClientDetails from "./pages/clients/ClientDetails";
import React from "react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="clients" element={<ClientList />} />
            <Route path="clients/:id" element={<ClientDetails />} />
            <Route path="servers" element={<NotFound />} />
            <Route path="networks" element={<NotFound />} />
            <Route path="credentials" element={<NotFound />} />
            <Route path="access-requests" element={<NotFound />} />
            <Route path="users" element={<NotFound />} />
            <Route path="audit" element={<NotFound />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </React.StrictMode>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
