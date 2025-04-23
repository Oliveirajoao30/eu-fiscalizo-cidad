
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import EnviarDemanda from "./pages/EnviarDemanda";
import Acompanhar from "./pages/Acompanhar";
import Confirmacao from "./pages/Confirmacao";
import NotFound from "./pages/NotFound";
import { DemandasProvider } from "./context/DemandasContext";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Admin from "./pages/Admin";
import { AuthProvider, useAuth } from "./hooks/useAuth";

const queryClient = new QueryClient();

function ProtectedRoute({ children, adminOnly = false }: { children: JSX.Element, adminOnly?: boolean }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // For admin routes, you would add additional checks here
  // For now, we're allowing all authenticated users to access the admin page
  
  return children;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <DemandasProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/enviar-demanda" element={
                <ProtectedRoute>
                  <EnviarDemanda />
                </ProtectedRoute>
              } />
              <Route path="/acompanhar" element={
                <ProtectedRoute>
                  <Acompanhar />
                </ProtectedRoute>
              } />
              <Route path="/confirmacao" element={
                <ProtectedRoute>
                  <Confirmacao />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute adminOnly={true}>
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </DemandasProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
