import {create} from 'zustand';

interface usuarioState{
    nombre: String, 
    correo: String,
    contrasenia: String,
    setNombre: (nombre: String) => void,
    setCorreo: (correo: String) => void,
    setContrasenia: (contrasenia: String) => void,
    
}

export const useUsuarioStore = create<usuarioState>((set)=>({
    nombre: "",
    correo: "",
    contrasenia: "",
    setNombre: (nombre) => set({nombre}),
    setCorreo: (correo) => set({correo}),
    setContrasenia: (contrasenia) => set({contrasenia})

}))

