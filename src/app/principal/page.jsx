"use client";
import BasePage from "@/components/BasePage";

export default function Principal() {
  return (
    <BasePage title={"Sistema de Gestão Escolar"}>
      <div className="mb-8">
        <h2 className="text-xl  font-semibold mb-4">
          Organize, registre e acompanhe as atividades escolares com mais
          eficiência.
        </h2>
        <p className="text-base ">
          Nosso sistema foi desenvolvido para facilitar o dia a dia de escolas,
          oferecendo uma plataforma simples e intuitiva para o gerenciamento de
          ocorrências disciplinares, cadastros de advertências, controle de
          alunos e outras funcionalidades administrativas.
        </p>
      </div>
      <h2 className="text-xl mb-4 font-semibold underline">
        Principais funcionalidades:
      </h2>
      <div className="mb-4">
        <p className="font-semibold">
          📌 Cadastro e acompanhamento de advertências disciplinares
        </p>
        <p>
          Registre ocorrências com detalhes, acompanhe o histórico do aluno e
          gere relatórios com facilidade.
        </p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">🧑‍🎓 Gerenciamento de alunos</p>
        <p>
          Mantenha informações atualizadas de cada estudante, com acesso rápido
          a dados importantes.
        </p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">🗂️ Organização de turmas e disciplinas</p>
        <p>
          Visualize e edite a estrutura da escola de forma prática, com controle
          completo sobre turmas, séries e professores.
        </p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">📝 Relatórios e histórico disciplinar</p>
        <p>
          Gere relatórios completos para reuniões pedagógicas, conselhos
          escolares ou comunicação com os responsáveis.
        </p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">🔐 Acesso seguro por perfil de usuário</p>
        <p>
          Controle o que cada colaborador pode visualizar ou editar no sistema,
          garantindo segurança e responsabilidade.
        </p>
      </div>
    </BasePage>
  );
}
