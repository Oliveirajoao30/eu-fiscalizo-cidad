
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { categorias } from "../data/categorias";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-eu-blue py-16 md:py-24">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 text-center md:text-left text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Sua voz na gestão da cidade</h1>
                <p className="text-lg mb-6">
                  Conectamos os cidadãos à gestão pública para resolver problemas urbanos de forma simples, rápida e eficiente.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link to="/enviar-demanda" className="bg-white text-eu-blue font-medium py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors">
                    Enviar uma demanda
                  </Link>
                  <Link to="/acompanhar" className="bg-eu-red text-white font-medium py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors">
                    Acompanhar solicitação
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
                  <h2 className="text-xl font-medium text-eu-text mb-4">Como funciona?</h2>
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-eu-red text-white font-bold rounded-full w-7 h-7 flex items-center justify-center mr-3 flex-shrink-0">1</div>
                      <p className="text-eu-text">Descreva e envie sua demanda para a cidade</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-eu-blue text-white font-bold rounded-full w-7 h-7 flex items-center justify-center mr-3 flex-shrink-0">2</div>
                      <p className="text-eu-text">A prefeitura recebe e analisa a solicitação</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-eu-yellow text-eu-text font-bold rounded-full w-7 h-7 flex items-center justify-center mr-3 flex-shrink-0">3</div>
                      <p className="text-eu-text">Acompanhe o status da sua solicitação usando o protocolo</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-500 text-white font-bold rounded-full w-7 h-7 flex items-center justify-center mr-3 flex-shrink-0">4</div>
                      <p className="text-eu-text">Problema resolvido! A cidade fica melhor para todos</p>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categorias Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">O que você pode solicitar?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {categorias.map((categoria) => (
                <Link 
                  key={categoria.id}
                  to={`/enviar-demanda?categoria=${categoria.id}`}
                  className="card flex flex-col items-center py-6 hover:border-eu-blue transition-colors"
                >
                  <div className="w-12 h-12 bg-eu-blue/10 rounded-full flex items-center justify-center mb-3">
                    <span className="text-eu-blue">{categoria.icone.charAt(0).toUpperCase()}</span>
                  </div>
                  <h3 className="text-center text-eu-text font-medium">{categoria.nome}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Benefícios Section */}
        <section className="bg-eu-gray-light py-12 md:py-16">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Por que usar o Eu Fiscalizo?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card">
                <h3 className="text-xl font-medium mb-3 text-eu-text">Comunicação Simplificada</h3>
                <p className="text-eu-text">
                  Comunique-se diretamente com a prefeitura de forma simples e rápida, sem burocracia.
                </p>
              </div>
              <div className="card">
                <h3 className="text-xl font-medium mb-3 text-eu-text">Transparência</h3>
                <p className="text-eu-text">
                  Acompanhe em tempo real o status e progresso das suas solicitações.
                </p>
              </div>
              <div className="card">
                <h3 className="text-xl font-medium mb-3 text-eu-text">Participação Cidadã</h3>
                <p className="text-eu-text">
                  Contribua para melhorar sua cidade e exercer a cidadania de forma ativa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="bg-eu-red rounded-lg px-6 py-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para melhorar sua cidade?</h2>
              <p className="mb-8 max-w-2xl mx-auto">
                Juntos podemos transformar nossa cidade em um lugar melhor para se viver. Comece agora enviando sua primeira solicitação!
              </p>
              <Link to="/enviar-demanda" className="bg-white text-eu-red font-medium py-3 px-8 rounded-md hover:bg-opacity-90 transition-colors inline-block">
                Enviar uma demanda
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
