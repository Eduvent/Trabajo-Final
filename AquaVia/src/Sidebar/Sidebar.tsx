import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, Drawer, FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useContext, useState } from "react";
import './Sidebar.css';
import { AquaViaContext } from '../Context/AquiaViaContextType';
import { Sector } from '../Model/sector';
import { ApiService } from '../Service/apiService';

export function Sidebar() {
    const [open, setOpen] = useState(false);
    const api = new ApiService();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const { provinces, sectors, currentProvince, currentSector, setCurrentProvince, setCurrentSector } = useContext(AquaViaContext);

    const DrawerList = (
        <Box className='list'>
            <FormControl fullWidth variant='filled'>
                <InputLabel>Seleccionar departamento</InputLabel>
                <Select
                    onChange={(e) => {
                        const selectedProvince = e.target.value as string;
                        setCurrentProvince(selectedProvince);
                    }}

                    value={currentProvince || undefined}
                >
                    {
                        provinces.map((province: string) =>
                            <MenuItem key={province} value={province} >
                                {province}
                            </MenuItem>)
                    }
                </Select>
            </FormControl >

            <FormControl fullWidth variant='filled'>
                <InputLabel>Seleccionar punto crítico</InputLabel>
                <Select
                    onChange={(e) => {
                        const selectedSector = e.target.value as string;
                        setCurrentSector(sectors.find((sector) => sector.name === selectedSector) as Sector);
                    }}

                    value={currentSector?.name || undefined}>
                    {
                        currentProvince
                            ? sectors.map((sector: Sector) =>
                                <MenuItem key={sector.name} value={sector.name}>
                                    {sector.name}
                                </MenuItem>)
                            : <MenuItem disabled>Departamento no seleccionado</MenuItem>
                    }
                </Select>
            </FormControl>

            <Button variant='contained' className='list__button'
                onClick={() => {
                    const data = { Sector: currentSector };

                    api.getDistance(data).then(res => console.log(res))
                }}
            >Buscar ruta óptima</Button>
        </Box >
    );

    return (
        <>
            <Tooltip title='Mostrar opciones'>
                <IconButton onClick={toggleDrawer(true)} size='large' className='sidebar__button'>
                    <MenuIcon fontSize='inherit' />
                </IconButton>
            </Tooltip>

            <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
                {DrawerList}
            </Drawer>
        </>


    );
};