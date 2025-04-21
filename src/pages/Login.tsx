
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });
    setLoading(false);
    if (loginError) {
      setError("E-mail ou senha inválidos.");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white shadow-md rounded-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-black mb-2">Entrar</h2>
        <div>
          <label htmlFor="email" className="block text-black mb-2">E-mail</label>
          <Input
            id="email"
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="bg-transparent border-black"
          />
        </div>
        <div>
          <label htmlFor="senha" className="block text-black mb-2">Senha</label>
          <Input
            id="senha"
            type="password"
            required
            autoComplete="current-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            disabled={loading}
            className="bg-transparent border-black"
          />
        </div>
        {error && (
          <div className="text-red-500 font-medium text-sm">{error}</div>
        )}
        <Button
          type="submit"
          variant="default"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>
        <div className="text-sm text-black text-center mt-2">
          Não tem conta?{" "}
          <a href="/cadastro" className="underline text-black">Cadastre-se</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
