import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useRequest from "@/hooks/useRequest";
import {Notify, notifyError, notifySuccess} from "./Notify";
import {useRouter} from "next/navigation";

export default function AlertDialog({
  state,
  setState,
  itemId,
  itemData,
  setReload,
  isPrint,
  url,
}) {
  const {del, patch, error, loading} = useRequest();
  const router = useRouter();

  const handleClose = () => {
    setState(false);
  };
  const handleEditarRegistro = async (itemId, itemData) => {
    console.log(itemId, itemData);
    setState(false);
    setReload(true);
  };
  const handleExcluirRegistro = async (url) => {
    try {
      const response = await del(`${url}`);
      console.log(response.data);
      setReload(true);

      if (response.data) {
        setState(false);
        notifySuccess(response.data.message);
      }
    } catch {
      console.error("Erro ao buscar:", error);
      notifyError(error?.message);
    }
  };
  const handleImprimir = (itemId) => {
    if (itemId) {
      router.push(`/advertencias/imprimir/${itemId}`);
    }
  };
  return (
    <React.Fragment>
      <Notify />
      <Dialog
        open={state}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Editar ou Excluir</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você deseja Editar ou Excluir este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleExcluirRegistro(url)} color="error">
            Excluir
          </Button>
          <Button
            onClick={() => handleEditarRegistro(itemId, itemData)}
            color="text-slate-900"
          >
            Editar
          </Button>
          {isPrint && (
            <Button
              onClick={() => handleImprimir(itemId)}
              color="text-slate-900"
            >
              Imprimir
            </Button>
          )}
          <Button onClick={handleClose} autoFocus>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
