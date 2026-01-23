//
//Solo se crea el estado del user, pero
//se deben crear estados para: Tareas, total tareas (un array general para ver cuales estan hechas)
//Y la misma interface de Tareas se usará para crear una nueva
//NOTA: no olividar que para la interface Tarea debe tener los métodos de set para cambiar los campos 

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

