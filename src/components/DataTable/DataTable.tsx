import React, { useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles
} from '@material-ui/core';
import { server_calls } from '../../api'
import { useGetData } from '../../custom-hooks';
import { CharacterForm } from '../../components';
import { AuthCheck } from 'reactfire';


const useStyles = makeStyles((theme) => ({
    row_button: {
        display: 'flex',
        flexDirection: 'row',
        flexFlow: 'column wrap',
        justifyContent: 'space-between',
        margin: '0px 0px 10px 0px'
    }
}));

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'super_power', headerName: 'Super Power', width: 300 },
    { field: 'comics_appeared_in', headerName: '# of Comic Appearances', type: 'string', width: 200 },
    { field: 'description', headerName: 'Description', width: 500 },

];

interface gridData {
    data: {
        id?: string;
    }
}

const rows = [
    {
        id: "123",
        name: "Tester",
        super_power: "This is a tester character",
        comics_appeared_in: "999",
        description: "The power to test create character"
    },
    {
        id: "456",
        name: "Hulk",
        super_power: "This is testing Hulk",
        comics_appeared_in: "999",
        description: "The power to test Hulk"
    }
]

interface gridData {
    data: {
        id?: string;
    }
}

export const DataTable = () => {
    const classes = useStyles();
    let { characterData, getData } = useGetData();
    const [open, setOpen] = useState(false) //open is set to false
    let [gridData, setData] = useState<gridData>({ data: {} })
    console.log('This is characterData: ', characterData)

    //Handle Dialog Open/Close
    let handleOpen = () => {// this is for buttons (update, delete)
        setOpen(true)
    }

    let handleClose = () => {
        setOpen(false)
    }

    let deleteData = () => {
        console.log(gridData.data.id)
        server_calls.delete(gridData.data.id!)
        getData()
    }
    return (
        <main className="content" style={{ height: 400, width: '100%' }}>
            <div className={classes.row_button}>

                <AuthCheck fallback={
                    <div>
                        Sign In to Make Changes To the Database!
                </div>}>
                    <Button variant="contained" color="secondary" onClick={handleOpen}>Add Character</Button>
                    <Button variant="outlined" color="secondary" onClick={handleOpen}>Edit Character</Button>

                    {/*Dialog Pop Up begin */}
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title"></DialogTitle>
                        <DialogContent>
                            <DialogContentText>Add/Edit New Character. Please fill out all inputs.</DialogContentText>
                            <CharacterForm id={gridData.data.id!} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                        </DialogActions>

                    </Dialog>
                    <Button variant="outlined" onClick={deleteData}>Delete Character</Button>
                </AuthCheck>


            </div>


            <DataGrid rows={characterData} columns={columns} pageSize={5} checkboxSelection onRowSelected={setData}></DataGrid>
        </main>
    )
}