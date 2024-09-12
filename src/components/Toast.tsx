import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ToastView(props: any) {
  const [open, setOpen] = React.useState(true);
  const { success, message, setToast } = props;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    setToast(false);
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        style={{ width: "20%" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          className="toastContainer"
          severity={success ? "success" : "error"}
          style={{ textTransform: "capitalize" }}
        >
          {message}
          <a
            onClick={handleClose}
            style={{
              cursor: "pointer",
              position: "absolute",
              fontSize: "13px",
              top: "3%",
              right: "1%",
              width: "7%",
              border:'none',
              backgroundColor:"transparent",
              color: "white",
            }}
          >
            X
          </a>
        </Alert>
      </Snackbar>
    </div>
  );
}
