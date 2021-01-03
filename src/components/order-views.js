/** @format */

import React, { useState } from "react";
import {
  makeStyles,
  Button,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  main: {
    // overflow: 'auto',
  },
  paperPlayer: {
    margin: "5px",
    display: "flex",
    justifyContent: "space-between",
  },
  paperDelivery: {
    margin: "5px",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#6BC277",
  },
  paperBottom: {
    margin: "5px",
    display: "flex",
    justifyContent: "space-between",
  },
  title: {},
  labels: {
    margin: "8px",
  },
  customerName: {
    margin: "8px",
    minWidth: "300px",
    maxWidth: "300px",
  },
}));

const OrderViews = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState();

  const handleClickOpen = (order) => {
    setOpen(true);
    setCurrentOrder(order);
  };

  const handleClose = (ready) => {
    if (ready === true) {
      props.deleteOrder(currentOrder);
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div>
      <div className={classes.main}>
        {props.data.length === 0 ? (
          <Paper className={classes.paperPlayer}>
            <Typography className={classes.labels} variant="h6">
              No Open Orders
            </Typography>
          </Paper>
        ) : null}

        {props.data.map((Label, index) => (
          <Paper
            className={
              props.data[index].type === 0
                ? classes.paperPlayer
                : classes.paperDelivery
            }
            key={index}
            elevation={3}
          >
            <Typography className={classes.customerName} variant="h6">
              {props.data[index].customer}
            </Typography>
            <Typography className={classes.labels} variant="h6">
              Cost: ${numberWithCommas(props.data[index].cost)}
            </Typography>
            <Button
              variant="outlined"
              className={classes.labels}
              onClick={() => props.cookOrder(props.data[index])}
            >
              Cook
            </Button>
            <Button
              variant="outlined"
              className={classes.labels}
              color="secondary"
              onClick={() => handleClickOpen(props.data[index])}
            >
              Delete
            </Button>
          </Paper>
        ))}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Delete Order Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this order?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleClose(true)}
            >
              Yes
            </Button>
            <Button variant="outlined" onClick={() => handleClose(false)}>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
//onClick={() => props.deleteOrder(props.data[index])}
export default OrderViews;
