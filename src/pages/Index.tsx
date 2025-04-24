
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { categorias } from "../data/categorias";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section with City Image */}
        <section className="relative bg-[url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070')] bg-cover bg-center bg-no-repeat h-screen">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-black/50 to-black/80" />
          <div className="container relative h-full flex items-center">
            <div className="max-w-2xl mx-auto text-center text-white space-y-6 mt-16">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Sua voz na gestão da cidade
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Conectamos os cidadãos à gestão pública para resolver problemas urbanos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/enviar-demanda" className="bg-black text-white font-medium py-3 px-6 rounded-md hover:bg-gray-900 transition-colors">
                  Enviar uma demanda
                </Link>
                <Link to="/acompanhar" className="bg-white/20 text-white font-medium py-3 px-6 rounded-md hover:bg-white/30 transition-colors">
                  Acompanhar solicitação
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Como Funciona Section */}
        <section className="py-16 bg-eu-gray-white">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-10 text-eu-text">Como funciona?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-eu-red text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-4">1</div>
                <p className="text-sm text-eu-text">Descreva sua demanda</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-eu-blue text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-4">2</div>
                <p className="text-sm text-eu-text">A prefeitura analisa</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-eu-yellow text-eu-text font-bold rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-4">3</div>
                <p className="text-sm text-eu-text">Acompanhe o status</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-green-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-4">4</div>
                <p className="text-sm text-eu-text">Problema resolvido</p>
              </div>
            </div>
          </div>
        </section>

        {/* Por que usar o Eu Fiscalizo Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8 text-eu-text">Por que usar o Eu Fiscalizo?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-3 text-eu-text">Rapidez e Eficiência</h3>
                <p className="text-sm text-eu-text/80">Envie suas demandas de forma ágil e receba atualizações em tempo real.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-3 text-eu-text">Transparência</h3>
                <p className="text-sm text-eu-text/80">Acompanhe todo o processo de resolução da sua solicitação.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-3 text-eu-text">Participação Cidadã</h3>
                <p className="text-sm text-eu-text/80">Contribua ativamente para a melhoria da sua cidade.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categorias Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8 text-eu-text">O que você pode solicitar?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {categorias.map((categoria) => (
                <Link 
                  key={categoria.id}
                  to={`/enviar-demanda?categoria=${categoria.id}`}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center"
                >
                  <div className="w-10 h-10 bg-eu-blue/10 rounded-full flex items-center justify-center mb-2">
                    <span className="text-eu-blue">{categoria.icone.charAt(0).toUpperCase()}</span>
                  </div>
                  <h3 className="text-sm text-center text-eu-text">{categoria.nome}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-eu-gray-white">
          <div className="container">
            <div className="bg-eu-red/95 backdrop-blur rounded-lg px-6 py-10 text-center text-white max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Pronto para melhorar sua cidade?</h2>
              <p className="mb-6 text-white/90">
                Participe ativamente da transformação da sua cidade.
              </p>
              <Link to="/enviar-demanda" className="bg-white text-eu-red font-medium py-2.5 px-6 rounded-md hover:bg-opacity-90 transition-colors inline-block">
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
