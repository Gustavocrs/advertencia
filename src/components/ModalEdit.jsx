import React from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import {Button} from "@/components/Button";

const ModalEdit = ({open, onClose, onSave, loading, isEdit, title, form}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title || (isEdit ? "Editar" : "Cadastrar")}</DialogTitle>
      <DialogContent>{form}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={onSave} loading={loading} type="submit">
          {isEdit ? "Salvar" : "Cadastrar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEdit;
