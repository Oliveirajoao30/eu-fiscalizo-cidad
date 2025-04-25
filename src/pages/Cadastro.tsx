import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, Phone, Check, AlertTriangle, Eye, EyeOff } from "lucide-react";
import Logo3d from "@/components/Logo3d";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!nome.trim()) {
      setError("Por favor, preencha seu nome completo.");
      return false;
    }
    
    if (!telefone.trim()) {
      setError("Por favor, informe seu número de telefone.");
      return false;
    }
    
    if (!email.includes("@") || !email.includes(".")) {
      setError("Por favor, informe um e-mail válido.");
      return false;
    }
    
    if (senha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }
    
    if (senha !== confirmSenha) {
      setError("As senhas não coincidem.");
      return false;
    }
    
    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const { error: signupError, data } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: {
            name: nome,
            phone: telefone
          }
        }
      });
      
      if (signupError) {
        throw signupError;
      }
      
      navigate("/login");
    } catch (err: any) {
      if (err.message.includes("already registered")) {
        setError("Este e-mail já está sendo utilizado.");
      } else {
        setError("Falha ao cadastrar. Por favor, tente novamente.");
        console.error("Signup error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error("Google signup error:", err);
      setError("Ocorreu um erro ao fazer cadastro com o Google. Por favor, tente novamente.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')",
          filter: "blur(8px) brightness(0.9)",
        }}
      />
      
      {/* Overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
      
      {/* Content */}
      <div className="flex min-h-screen w-full items-center justify-center relative z-10 py-10">
        <div className="w-full max-w-md bg-white bg-opacity-95 backdrop-blur-sm shadow-xl rounded-xl p-8 space-y-6">
          <div className="flex flex-col items-center justify-center mb-6">
            <Logo3d size={48} />
            <h1 className="text-2xl font-bold text-black mt-3">Eu Fiscalizo</h1>
            <p className="text-sm text-gray-600">Sua voz na gestão da cidade</p>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-black">Cadastro</h2>
          
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="nome" className="flex items-center gap-2 font-medium text-gray-700 text-sm">
                <User size={16} /> Nome completo
              </label>
              <Input
                id="nome"
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                disabled={loading}
                className="bg-white border-gray-300"
                placeholder="🧑‍💼 Seu nome completo"
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="telefone" className="flex items-center gap-2 font-medium text-gray-700 text-sm">
                <Phone size={16} /> Telefone
              </label>
              <Input
                id="telefone"
                type="tel"
                required
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                disabled={loading}
                className="bg-white border-gray-300"
                placeholder="📞 Seu telefone"
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="email" className="flex items-center gap-2 font-medium text-gray-700 text-sm">
                <Mail size={16} /> E-mail
              </label>
              <Input
                id="email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="bg-white border-gray-300"
                placeholder="✉️ Seu e-mail"
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="senha" className="flex items-center gap-2 font-medium text-gray-700 text-sm">
                <Lock size={16} /> Senha
              </label>
              <div className="relative">
                <Input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  disabled={loading}
                  className="bg-white border-gray-300 pr-10"
                  placeholder="🔒 Sua senha (mín. 6 caracteres)"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="confirmSenha" className="flex items-center gap-2 font-medium text-gray-700 text-sm">
                <Check size={16} /> Confirmar senha
              </label>
              <div className="relative">
                <Input
                  id="confirmSenha"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={confirmSenha}
                  onChange={(e) => setConfirmSenha(e.target.value)}
                  disabled={loading}
                  className="bg-white border-gray-300 pr-10"
                  placeholder="✅ Confirme sua senha"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-red-500 font-medium text-sm bg-red-50 p-3 rounded-md">
                <AlertTriangle size={16} />
                {error}
              </div>
            )}
            
            <div className="pt-2">
              <Button
                type="submit"
                variant="default"
                className="w-full bg-black text-white hover:bg-gray-800"
                disabled={loading}
              >
                {loading ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </div>
            
            <div className="relative flex items-center justify-center">
              <hr className="w-full border-gray-300" />
              <span className="absolute bg-white px-2 text-xs text-gray-500">ou</span>
            </div>
            
            <Button 
              type="button"
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleSignup}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              Cadastrar com Google
            </Button>
          </form>
          
          <div className="text-sm text-center text-black">
            Já tem uma conta?{" "}
            <Link to="/login" className="font-medium underline hover:text-gray-700">
              Faça login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
