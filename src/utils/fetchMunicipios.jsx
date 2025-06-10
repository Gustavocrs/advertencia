export const fetchMunicipios = async (estado, setData, setFormData) => {
  try {
    const response = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`
    );
    if (response.ok) {
      const municipios = await response.json();
      const municipiosFormatados = municipios.map((municipio) => ({
        label: municipio.nome,
        value: municipio.nome,
      }));
      setFormData((prevData) => ({
        ...prevData,
        cidade: "",
      }));
      setData(municipiosFormatados);
    } else {
      console.log("Erro ao buscar os municípios.");
    }
  } catch (error) {
    console.log("Erro na requisição:", error);
  }
};
