import {useContext} from "react";
import styled from "styled-components";
import {post} from "../hooks/useApi";
import {useHttp} from "../hooks/useHttp";
import {Toast} from "./Toastify";
import NotifyMessage from "../../util/NotifyMessage";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import {IconButton, Tooltip} from "@mui/material";
import {Cinza} from "../../util/variaveis";
import {MultimidiaDomain} from "../../domain/Utils/MultimidiasDomain";
import {BaseCardListPageContext} from "../../contexts/BaseCardListPageContext";
import {UploadContext} from "../../contexts/UploadContext";
import {notifyError} from "../atomics/Toastify";
import {PegaExtensao} from "@/util/PegaExtensao";

export const UploadFileForm = ({
  name,
  children,
  domain,
  file,
  setFile,
  setValue,
  multimidiaId,
  setMultimidiaId,
  afterSubmitCallBack = null,
  w = null,
  h = null,
  disabled = false,
}) => {
  const d = domain;
  const {idItem} = useContext(BaseCardListPageContext);
  const {previewURL, setPreviewURL} = useContext(UploadContext);

  const http = useHttp(domain);

  const errorHandler = (response) => {
    for (var x in response.erros) {
      setError(response.erros[x].field, {
        type: "remote",
        message: response.erros[x].mensagem,
      });
    }
  };

  const handleFileInputChange = (e) => {
    e.stopPropagation();

    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      const fileURL = URL.createObjectURL(selectedFile);
      setPreviewURL(fileURL);

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("nome", selectedFile.name);
      formData.append("sigilo", "Ostensivo");
      formData.append("ativo", true);

      post(MultimidiaDomain[d.categoria].upload, formData, http.defaultParams)
        .then((response) => {
          setMultimidiaId(response.data.id);
          setValue(name, response.data.id);
          if (afterSubmitCallBack) {
            afterSubmitCallBack();
          }
          console.log("-----POST-IMAGE-----");
          console.log(response.data);
          console.log("URL: " + fileURL);
        })
        .catch((error) => {
          errorHandler(error)
            ? errorHandler(error)
            : notifyError(error.message);
        });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let url = `${MultimidiaDomain[d.categoria].associado}/${idItem}`;

    const data = {
      multimidiaId,
    };

    post(url, data, http.defaultParams)
      .then((response) => {
        NotifyMessage("post", response.data);
        console.log("-----POST-NOVO-MULTIMIDIA-----");
        console.log(response.data);
        setModalIncluirMultimidia(!modalIncluirMultimidia);
      })
      .catch((error) => {
        errorHandler(error) ? errorHandler(error) : notifyError(error.message);
      });
  };

  return (
    <>
      <Toast />
      <Form
        name="UploadFileForm"
        onSubmit={handleFormSubmit}
        id="UploadFileForm"
        style={{
          ...(w && {width: w}),
          ...(h && {height: h}),
        }}
      >
        <Tooltip title="Carregar arquivo" placement="top" arrow>
          <IconButtonMUI
            id="IconButtonMUI"
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              type="file"
              name="file"
              onChange={handleFileInputChange}
              disabled={disabled}
            />
            {!previewURL && (
              <>
                <PhotoCamera />
                <span>{file && file.name}</span>
              </>
            )}
            {previewURL ? (
              <PreviewArea
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PreviewImg src={previewURL} alt={file && file.name} />
                <span>{file && file.name}</span>
              </PreviewArea>
            ) : null}
          </IconButtonMUI>
        </Tooltip>
        {children}
      </Form>
    </>
  );
};

const PreviewArea = styled.div`
  max-width: 130px;
  max-height: 130px;
  transition: 2000ms;
`;

const PreviewImg = styled.img`
  max-width: 100px;
  max-height: 100px;
  object-fit: contain;
  padding: 5px;
  margin: 5px;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  width: 360px;
  margin: 5px 0;
  /* overflow: hidden; */
`;

const IconButtonMUI = styled(IconButton)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${Cinza};
  border-radius: 5px;
  /* width: 79%; */
  width: 100%;
  height: auto;
  padding: 10px;
  /* margin: 10px; */
  z-index: 1;

  span {
    font-size: 1rem;
  }
`;
