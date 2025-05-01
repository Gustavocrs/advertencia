export const fetchEstados = async (setData) => {
  try {
    const response = await fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );
    if (response.ok) {
      const estados = await response.json();
      const estadosFormatados = estados.map((estado) => ({
        label: estado.sigla,
        value: estado.sigla,
      }));
      setData(estadosFormatados);
    } else {
      console.error("Erro ao buscar os estados.");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
};
