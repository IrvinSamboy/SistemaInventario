import knex from "knex";

// Obtener todos los empleados
export const getEmpleados = async (req, res) => {
    try {
        const empleados = await knex('inventario_empleados').select('*');
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener empleados',
            error
        });
    }
};

// Obtener un empleado por ID
export const getEmpleadoById = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const empleado = await knex('inventario_empleados').where('idEmpleado', id).first();
        if (!empleado) {
            return res.status(404).json({
                message: 'Empleado no encontrado'
            });
        }
        res.status(200).json(empleado);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener empleado',
            error
        });
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
            idUser
        } = req.body;
        const nuevoEmpleado = await knex('inventario_empleados').insert({
            nombre,
            apellido,
            direccion,
            telefono,
            email,
            fecha_contratacion,
            idUser
        });
        res.status(201).json({
            message: 'Empleado creado exitosamente',
            nuevoEmpleado
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear empleado',
            error
        });
    }
};

// Actualizar un empleado
export const updateEmpleado = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            nombre,
            apellido,
            direccion,
            telefono,
            email,
            fecha_contratacion,
            idUser
        } = req.body;
        const empleadoActualizado = await knex('inventario_empleados').where('idEmpleado', id).update({
            nombre,
            apellido,
            direccion,
            telefono,
            email,
            fecha_contratacion,
            idUser
        });
        if (!empleadoActualizado) {
            return res.status(404).json({
                message: 'Empleado no encontrado'
            });
        }
        res.status(200).json({
            message: 'Empleado actualizado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar empleado',
            error
        });
    }
};

// Eliminar un empleado
export const deleteEmpleado = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const empleadoEliminado = await knex('inventario_empleados').where('idEmpleado', id).del();
        if (!empleadoEliminado) {
            return res.status(404).json({
                message: 'Empleado no encontrado'
            });
        }
        res.status(200).json({
            message: 'Empleado eliminado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar empleado',
            error
        });
    }
};