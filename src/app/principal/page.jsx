"use client";
import {NavBar} from "@/components/NavBar";
import {SideBar} from "@/components/SideBar";
import {useEffect, useState} from "react";

export default function Principal() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className="flex flex-col h-screen bg-zinc-200 w-full">
      <SideBar />
      <NavBar user={user} />
      <div className="ml-16 mt-14">
        <div className="flex flex-col items-center justify-center h-full">
<h1>Bem-vindo ao Sistema de Gestão Escolar</h1>

<h2>Organize, registre e acompanhe as atividades escolares com mais eficiência.</h2>

<p>Nosso sistema foi desenvolvido para facilitar o dia a dia de escolas, oferecendo uma plataforma simples e intuitiva para o gerenciamento de ocorrências disciplinares, cadastros de advertências, controle de alunos e outras funcionalidades administrativas.</p>

<h2>Principais funcionalidades:</h2>

<p>📌 Cadastro e acompanhamento de advertências disciplinares</p>
<p>Registre ocorrências com detalhes, acompanhe o histórico do aluno e gere relatórios com facilidade.</p>

<p>🧑‍🎓 Gerenciamento de alunos</p>
Mantenha informações atualizadas de cada estudante, com acesso rápido a dados importantes.</p>

<p>🗂️ Organização de turmas e disciplinas</p>
<p>Visualize e edite a estrutura da escola de forma prática, com controle completo sobre turmas, séries e professores.</p>

<p>📝 Relatórios e histórico disciplinar</p>
<p>Gere relatórios completos para reuniões pedagógicas, conselhos escolares ou comunicação com os responsáveis.</p>

<p>🔐 Acesso seguro por perfil de usuário</p>
<p>Controle o que cada colaborador pode visualizar ou editar no sistema, garantindo segurança e responsabilidade.</p>
</div>
      </div>
    </div>
  );
}
