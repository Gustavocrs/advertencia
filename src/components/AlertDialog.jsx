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
import {checkPermission} from "@/utils/checkPermission";

export default function AlertDialog({
  state,
  setState,
  itemId,
  itemData,
  setReload,
  isPrint,
  url,
  errorMsg = "Você não possui permissões para esta ação",
  onEdit,
}) {
  const {del, patch, error, loading} = useRequest();
  const router = useRouter();
  const hasPermission = checkPermission();

  const handleClose = () => {
    setState(false);
  };
  const handleExcluirRegistro = async (url) => {
    try {
      if (hasPermission) {
        const response = await del(`${url}`);
        setReload(true);

        if (response.data) {
          setState(false);
          notifySuccess(response.data.message);
        }
      } else {
        notifyError(errorMsg);
      }
    } catch {
      console.log("Erro ao buscar:", error);
      notifyError(error?.message);
    }
  };
  const handleImprimir = (itemId) => {
    if (itemId) {
      router.push(`/advertencias/imprimir/${itemId}`);
      handleClose();
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
            onClick={() => {
              if (onEdit) {
                onEdit(itemId);
                handleClose();
              }
            }}
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
