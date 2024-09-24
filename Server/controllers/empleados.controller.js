import {db} from "../models/db.js";

// Obtener todos los empleados
export const getEmpleados = async (req, res) => {
    try {
        const empleados = await db.select('*').from('empleados')
        if(empleados.length === 0) return res.status(404).json({message: "No hay empleados en el sistema"})
        res.status(200).json({message: empleados});
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
};

// Obtener un empleado por ID
export const getEmpleadoById = async (req, res) => {
    try {
        const {id} = req.params;
        const empleado = await db.select('*').where('idEmpleado', id).from('empleados').first();
        if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado'});
        res.status(200).json(empleado);
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
};

// Crear un nuevo empleado
export const createEmpleado = async (req, res) => {
    try {
        const {
            nombre,
            apellido,
            direccion,
            telefono,
            email,
            fecha_contratacion,
            idUser,
            foto
        } = req.body;
        if(!nombre, !apellido, !direccion, !telefono, !email, !fecha_contratacion, !idUser) return res.status(400).json({message: "Uno o más campos vacios"})
        const newEmpleado = await db('empleados').insert({
            nombre,
            apellido,
            direccion,
            telefono,
            email,
            fecha_contratacion,
            idUser,
            foto
        });
        if(!newEmpleado) return res.status(500).json({message: "Ocurrió un error a la hora de crear un empleado"})
        res.status(201).json({message: 'Empleado creado exitosamente',});
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
};

// Actualizar un empleado
export const updateEmpleado = async (req, res) => {
    try {
        const {id} = req.params;
        const empleadoExists = await db.select('*').where('idEmpleado', id).from('empleados').first()
        if (!empleadoExists) return res.status(404).json({ message: 'Empleado no encontrado'});
        const {
            nombre = empleadoExists.nombre,
            apellido = empleadoExists.apellido,
            direccion = empleadoActualizado.direccion,
            telefono = empleadoExists.telefono,
            email = empleadoExists.email,
            fecha_contratacion = empleado.fecha_contratacion,
            idUser = empleadoExists.fecha_contratacion,
            foto = empleadoExists.foto
        } = req.body;
        const empleadoActualizado = await db('empleados').where('idEmpleado', id).update({
            nombre,
            apellido,
            direccion,
            telefono,
            email,
            fecha_contratacion,
            idUser,
            foto
        });
        if (!empleadoActualizado) return res.status(404).json({message: 'Empleado no encontrado'});
        res.status(200).json({message: 'Empleado actualizado exitosamente'});
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
};

// Eliminar un empleado
export const deleteEmpleado = async (req, res) => {
    try {
        const {id} = req.params;
        const empleadoExists = await db.select('*').where('idEmpleado', id).from('empleados').first()
        if (!empleadoExists) return res.status(404).json({ message: 'Empleado no encontrado'});
        await db('empleados').where('idEmpleado', id).del();
        res.status(200).json({message: 'Empleado eliminado exitosamente'});
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
};