import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// @ts-expect-error: Suppressing expected error on the next line due to it being in development
import createCourse from 'app/api/add-course/route';


export default function FormDialog() {
    
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

    async function newCourse(c_name: any, instructor_id: number) {
        console.log("i go here")
        await createCourse(c_name, instructor_id);

}

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create course
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const c_name = formJson.c_name;
            newCourse(c_name, 1);
            console.log(c_name);
            handleClose();
          },
        }}
      >
        <DialogTitle>New course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of the course you wish to create:
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="c_name"
            label="Course name"
            type="c_name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
