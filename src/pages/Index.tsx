
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { categorias } from "../data/categorias";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Background Image */}
        <section className="relative bg-[url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80')] bg-cover bg-center py-24 md:py-32 before:absolute before:inset-0 before:bg-black/50">
          <div className="container relative z-10">
            <div className="max-w-2xl mx-auto text-center text-white space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold">Sua voz na gestão da cidade</h1>
              <p className="text-base md:text-lg text-white/90">
                Conectamos os cidadãos à gestão pública para resolver problemas urbanos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/enviar-demanda" className="bg-eu-red text-white font-medium py-2.5 px-5 rounded-md hover:bg-opacity-90 transition-colors">
                  Enviar uma demanda
                </Link>
                <Link to="/acompanhar" className="bg-white/10 backdrop-blur-sm text-white font-medium py-2.5 px-5 rounded-md hover:bg-white/20 transition-colors">
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
