export const fetchCepData = async (cep, setState, setFormData) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.ok) {
      const data = await response.json();

      if (!data.erro) {
        setFormData((prevData) => ({
          ...prevData,
          endereco: data.logradouro || "",
          bairro: data.bairro || "",
          cidade: data.localidade || "",
          estado: data.uf || "",
        }));

        // Atualiza os municípios com a cidade retornada pela API
        setState([{label: data.localidade, value: data.localidade}]);

        // Foca no campo "número" após preencher os dados
        setTimeout(() => {
          document.querySelector('input[name="numero"]').focus();
        }, 0);
      } else {
        alert("CEP não encontrado.");
      }
    } else {
      console.error("Erro ao buscar o CEP.");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
};
