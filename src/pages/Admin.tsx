
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Demanda, StatusDemanda } from "@/types/demandas";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Filter, Eye, Edit, Trash2, Send } from "lucide-react";
import AdminDemandaDetails from "@/components/AdminDemandaDetails";
import { useToast } from "@/hooks/use-toast";
import { demandasExemplo } from "@/data/demandas";

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [demandas, setDemandas] = useState<Demanda[]>([]);
  const [filteredDemandas, setFilteredDemandas] = useState<Demanda[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusDemanda | "todas">("todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDemanda, setSelectedDemanda] = useState<Demanda | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        // In a real app, you would check admin status from Supabase
        // For now, we'll use a simple check - in production you would 
        // replace this with a proper RLS policy check or a database query
        const isUserAdmin = true; // Placeholder for actual admin check
        setIsAdmin(isUserAdmin);

        if (!isUserAdmin) {
          navigate("/");
          toast({
            title: "Acesso negado",
            description: "Você não tem permissão para acessar esta página.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        navigate("/");
      }
    };

    checkAdminStatus();
  }, [user, navigate, toast]);

  // Fetch demandas
  useEffect(() => {
    const fetchDemandas = async () => {
      if (!isAdmin) return;

      setIsLoading(true);
      try {
        // In a real app, you would fetch data from Supabase
        // For demo purposes, we'll use mock data
        setDemandas(demandasExemplo);
        setFilteredDemandas(demandasExemplo);
      } catch (error) {
        console.error("Error fetching demandas:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar as demandas.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDemandas();
  }, [isAdmin, toast]);

  // Filter demandas by status and search term
  useEffect(() => {
    let filtered = [...demandas];
    
    // Filter by status
    if (statusFilter !== "todas") {
      filtered = filtered.filter(demanda => demanda.status === statusFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(demanda => 
        demanda.titulo.toLowerCase().includes(term) || 
        demanda.descricao.toLowerCase().includes(term) ||
        demanda.localizacao.endereco.toLowerCase().includes(term) ||
        demanda.protocolo.toLowerCase().includes(term)
      );
    }
    
    setFilteredDemandas(filtered);
  }, [demandas, statusFilter, searchTerm]);

  // Update demanda status
  const updateDemandaStatus = async (id: string, newStatus: StatusDemanda) => {
    try {
      // In a real app, you would update the status in Supabase
      // For demo purposes, we'll update it locally
      const updatedDemandas = demandas.map(demanda => {
        if (demanda.id === id) {
          return {
            ...demanda,
            status: newStatus,
            dataAtualizacao: new Date().toISOString()
          };
        }
        return demanda;
      });
      
      setDemandas(updatedDemandas);
      
      toast({
        title: "Status atualizado",
        description: `Demanda ${id} atualizada para ${newStatus}.`
      });
      
      // If the currently selected demanda was updated, update it in the details view
      if (selectedDemanda && selectedDemanda.id === id) {
        setSelectedDemanda({
          ...selectedDemanda,
          status: newStatus,
          dataAtualizacao: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error("Error updating demanda status:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status da demanda.",
        variant: "destructive"
      });
    }
  };

  // Delete demanda
  const deleteDemanda = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta demanda?")) return;

    try {
      // In a real app, you would delete the demanda from Supabase
      // For demo purposes, we'll delete it locally
      const updatedDemandas = demandas.filter(demanda => demanda.id !== id);
      setDemandas(updatedDemandas);
      
      // If the currently selected demanda was deleted, close the details view
      if (selectedDemanda && selectedDemanda.id === id) {
        setSelectedDemanda(null);
      }
      
      toast({
        title: "Demanda excluída",
        description: `Demanda ${id} foi excluída com sucesso.`
      });
    } catch (error) {
      console.error("Error deleting demanda:", error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir a demanda.",
        variant: "destructive"
      });
    }
  };

  if (!user || !isAdmin) {
    return <div className="flex items-center justify-center min-h-screen">Verificando permissões...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-eu-gray-white">
      <Header />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-2 text-black">Painel de Administração</h1>
        <p className="text-gray-600 mb-8">Gerencie todas as solicitações dos cidadãos</p>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow-sm border border-eu-gray-light flex-1">
            <Search className="h-5 w-5 text-gray-400" />
            <Input 
              type="text"
              placeholder="Pesquisar por título, descrição ou protocolo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-eu-gray-light">
              <Filter className="h-5 w-5 text-gray-400" />
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as StatusDemanda | "todas")}
              >
                <SelectTrigger className="border-0 focus:ring-0 w-[180px] h-8 p-0">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="recebido">Recebido</SelectItem>
                  <SelectItem value="analise">Em Análise</SelectItem>
                  <SelectItem value="andamento">Em Andamento</SelectItem>
                  <SelectItem value="resolvido">Resolvido</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="bg-black text-white">Nova Demanda</Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Table of demandas */}
          <Card className="w-full md:w-7/12 bg-white shadow-md">
            <CardHeader className="pb-3">
              <CardTitle>Solicitações ({filteredDemandas.length})</CardTitle>
              <CardDescription>Gerencie todas as demandas enviadas</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-white">
                    <TableRow>
                      <TableHead className="w-[120px]">Protocolo</TableHead>
                      <TableHead>Título</TableHead>
                      <TableHead className="w-[100px]">Data</TableHead>
                      <TableHead className="w-[120px]">Status</TableHead>
                      <TableHead className="w-[100px] text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          Carregando demandas...
                        </TableCell>
                      </TableRow>
                    ) : filteredDemandas.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          Nenhuma demanda encontrada.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDemandas.map((demanda) => (
                        <TableRow key={demanda.id}>
                          <TableCell className="font-mono text-xs">{demanda.protocolo}</TableCell>
                          <TableCell className="font-medium">{demanda.titulo}</TableCell>
                          <TableCell>{new Date(demanda.dataCriacao).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Select
                              value={demanda.status}
                              onValueChange={(value) => updateDemandaStatus(demanda.id, value as StatusDemanda)}
                            >
                              <SelectTrigger className={`w-full h-7 text-xs ${
                                demanda.status === "recebido" ? "bg-eu-yellow/20 text-eu-text" :
                                demanda.status === "analise" ? "bg-eu-blue/20 text-eu-blue" :
                                demanda.status === "andamento" ? "bg-eu-blue/30 text-eu-text" :
                                demanda.status === "resolvido" ? "bg-green-100 text-green-800" : ""
                              }`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="recebido">Recebido</SelectItem>
                                <SelectItem value="analise">Em Análise</SelectItem>
                                <SelectItem value="andamento">Em Andamento</SelectItem>
                                <SelectItem value="resolvido">Resolvido</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => setSelectedDemanda(demanda)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => deleteDemanda(demanda.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Details panel */}
          <Card className="w-full md:w-5/12 bg-white shadow-md">
            {selectedDemanda ? (
              <>
                <CardHeader>
                  <CardTitle>Detalhes da Solicitação</CardTitle>
                  <CardDescription>
                    Protocolo: {selectedDemanda.protocolo}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AdminDemandaDetails 
                    demanda={selectedDemanda}
                    onStatusChange={(status) => updateDemandaStatus(selectedDemanda.id, status)}
                  />
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" onClick={() => setSelectedDemanda(null)}>
                    Fechar
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center gap-1">
                      <Send className="h-4 w-4" /> Responder
                    </Button>
                    <Button className="bg-black text-white">
                      <Edit className="h-4 w-4 mr-1" /> Editar
                    </Button>
                  </div>
                </CardFooter>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center text-gray-500">
                <Eye className="h-12 w-12 mb-4 opacity-20" />
                <h3 className="font-medium mb-1">Nenhuma solicitação selecionada</h3>
                <p className="text-sm">Clique em uma solicitação para ver seus detalhes</p>
              </div>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
