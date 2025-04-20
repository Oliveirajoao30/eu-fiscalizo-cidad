import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EnviarDemanda from "./pages/EnviarDemanda";
import Acompanhar from "./pages/Acompanhar";
import Confirmacao from "./pages/Confirmacao";
import NotFound from "./pages/NotFound";
import { DemandasProvider } from "./context/DemandasContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <DemandasProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/enviar-demanda" element={<EnviarDemanda />} />
            <Route path="/acompanhar" element={<Acompanhar />} />
            <Route path="/confirmacao" element={<Confirmacao />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DemandasProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
