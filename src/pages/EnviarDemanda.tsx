import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { categorias } from "../data/categorias";
import { useDemandas } from "../context/DemandasContext";
import LocationMap from "../components/LocationMap";

const EnviarDemanda = () => {
  const [searchParams] = useSearchParams();
  const categoriaParam = searchParams.get("categoria");
  const navigate = useNavigate();
  const { adicionarDemanda } = useDemandas();

  const [formState, setFormState] = useState({
    titulo: "",
    categoria: categoriaParam || "",
    descricao: "",
    endereco: "",
    bairro: "",
    cidade: "",
    estado: "",
    complemento: "",
    latitude: 0,
    longitude: 0,
  });

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (erro) setErro("");
  };

  const handleLocationSelect = (location: {
    latitude: number;
    longitude: number;
    address?: string;
    bairro?: string;
  }) => {
    setFormState(prev => ({
      ...prev,
      latitude: location.latitude,
      longitude: location.longitude,
      ...(location.address && { endereco: location.address }),
      ...(location.bairro && { bairro: location.bairro }),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setErro("");

    if (!formState.titulo || !formState.categoria || !formState.descricao || !formState.endereco || !formState.bairro || !formState.cidade || !formState.estado) {
      setErro("Por favor, preencha todos os campos obrigatórios.");
      setEnviando(false);
      return;
    }

    try {
      const protocolo = adicionarDemanda({
        titulo: formState.titulo,
        categoria: formState.categoria,
        descricao: formState.descricao,
        localizacao: {
          endereco: formState.endereco,
          bairro: formState.bairro,
          cidade: formState.cidade,
          estado: formState.estado,
          complemento: formState.complemento,
          latitude: formState.latitude,
          longitude: formState.longitude,
        }
      });

      setTimeout(() => {
        navigate(`/confirmacao?protocolo=${protocolo}`);
      }, 1000);
    } catch (error) {
      setErro("Ocorreu um erro ao enviar sua demanda. Por favor, tente novamente.");
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-eu-text mb-6">Enviar Nova Demanda</h1>
            <p className="text-eu-text mb-8">
              Preencha o formulário abaixo com os detalhes da sua solicitação. Campos com <span className="text-eu-red">*</span> são obrigatórios.
            </p>

            {erro && (
              <div className="bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded-md mb-6">
                {erro}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="titulo" className="block text-eu-text font-medium mb-2">
                  Título da Solicitação <span className="text-eu-red">*</span>
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={formState.titulo}
                  onChange={handleChange}
                  placeholder="Ex: Lâmpada queimada na Rua das Flores"
                  className="w-full p-3 border border-eu-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-eu-blue"
                  required
                />
              </div>

              <div>
                <label htmlFor="categoria" className="block text-eu-text font-medium mb-2">
                  Categoria <span className="text-eu-red">*</span>
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  value={formState.categoria}
                  onChange={handleChange}
                  className="w-full p-3 border border-eu-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-eu-blue bg-white"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="descricao" className="block text-eu-text font-medium mb-2">
                  Descrição Detalhada <span className="text-eu-red">*</span>
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={formState.descricao}
                  onChange={handleChange}
                  placeholder="Descreva o problema em detalhes"
                  rows={4}
                  className="w-full p-3 border border-eu-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-eu-blue"
                  required
                />
              </div>

              <div className="border-t border-eu-gray-light pt-6">
                <h2 className="text-xl font-medium text-eu-text mb-4">Localização</h2>
                
                <LocationMap
                  onLocationSelect={handleLocationSelect}
                  className="mb-6"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="endereco" className="block text-eu-text font-medium mb-2">
                      Endereço <span className="text-eu-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="endereco"
                      name="endereco"
                      value={formState.endereco}
                      onChange={handleChange}
                      placeholder="Rua, Número"
                      className="w-full p-3 border border-eu-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-eu-blue"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="bairro" className="block text-eu-text font-medium mb-2">
                      Bairro <span className="text-eu-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="bairro"
                      name="bairro"
                      value={formState.bairro}
                      onChange={handleChange}
                      placeholder="Seu bairro"
                      className="w-full p-3 border border-eu-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-eu-blue"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="cidade" className="block text-eu-text font-medium mb-2">
                      Cidade <span className="text-eu-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="cidade"
                      name="cidade"
                      value={formState.cidade}
                      onChange={handleChange}
                      placeholder="Sua cidade"
                      className="w-full p-3 border border-eu-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-eu-blue"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="estado" className="block text-eu-text font-medium mb-2">
                      Estado <span className="text-eu-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="estado"
                      name="estado"
                      value={formState.estado}
                      onChange={handleChange}
                      placeholder="UF"
                      maxLength={2}
                      className="w-full p-3 border border-eu-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-eu-blue uppercase"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="complemento" className="block text-eu-text font-medium mb-2">
                    Complemento
                  </label>
                  <input
                    type="text"
                    id="complemento"
                    name="complemento"
                    value={formState.complemento}
                    onChange={handleChange}
                    placeholder="Apartamento, bloco, referência, etc."
                    className="w-full p-3 border border-eu-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-eu-blue"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full btn-primary py-3 flex items-center justify-center"
                  disabled={enviando}
                >
                  {enviando ? "Enviando..." : "Enviar Solicitação"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EnviarDemanda;
