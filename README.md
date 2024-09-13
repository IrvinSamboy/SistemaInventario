# Sistema de inventario

Este es un sistema de inventario que permitirá a la empresa gestionar sus productos pudiendo categorizarlos para una mejor organización de los mismo, podrá gestionar proveedores y las compras que se le realizan a los mismos y tener un registro de los empleados para poder tener un seguimientos de las compras que estos han registrado en el sistema. Además, incorpora una gestión de usuarios y roles, donde cada usuario tendrá un empleado asignado para administrar los accesos a distintas funcionalidades del sistema.

## Tablas del sistema

### Tabla empleados

Esta tabla almacena la información personal de los empleados que forman parte de la empresa.

idEmpleado: Identificador único del empleado (Clave primaria).  
nombre: Nombre del empleado.  
apellido: Apellido del empleado.  
direccion: Dirección del empleado.  
telefono: Teléfono del empleado.  
email: Correo electrónico del empleado.  
fecha_contratacion: Fecha de contratación del empleado.

### Tabla roles

La tabla roles se utiliza para definir los diferentes roles que tendrán los usuarios dentro del sistema.

idRol: Identificador único del rol (Clave primaria).  
nombre: Nombre del rol.

El sistema por defecto tendrá 3 roles:  
usuario: Podrá administrar las compras realizadas a los proveedores y podrá administrar productos y categoria de productos.  
gerente: Tendrá todos los permisos que tiene el rol usuario y aparte podrá administrar los proveedores y los empleados.  
administrador: Tendrá todos los permisos que tiene el rol gerente y aparte podrá administrar los usuarios.

### Tabla usuarios

Esta tabla almacena la información de los usuarios que pueden acceder al sistema. Cada usuario está asociado a un rol específico.

idUser: Identificador único del usuario (Clave primaria).  
nombre: Nombre del usuario.  
contraseña: Contraseña encriptada del usuario.  
idRol: Identificador del rol asociado (Clave foránea de la tabla roles).  
idEmpleado: Identificador del empleado asociado (Clave foránea de la tabla empleados)

### Tabla categorias

Esta tabla contiene las diferentes categorías a las que pueden pertenecer los productos.

idCategoria: Identificador único de la categoría (Clave primaria).  
nombre: Nombre de la categoría.

### Tabla productos 

En esta tabla se almacenan los productos gestionados en el sistema

idProducto: Identificador único del producto (Clave primaria).
nombre : Nombre del producto.  
descripcion: Descripción del producto.  
stock: Cantidad disponible en inventario.  
precioCompra: Precio de compra del producto.  
precioVenta: Precio de venta del producto.  
idCategoria: Identificador de la categoría a la que pertenece el producto (Clave foránea de la tabla categorias).

### Tabla proveedores

La tabla proveedores contiene los datos de los proveedores que suministran los productos a la empresa.

idProveedo: Identificador único del proveedor (Clave primaria).
nombre: Nombre del proveedor.  
direccion: Dirección del proveedor.  
telefono: Teléfono del proveedor.  
email: Correo electrónico del proveedor.

### Tabla compras

Esta tabla registra las compras realizadas por la empresa. Cada compra está asociada a un proveedor y a un usuario.

idCompra: Identificador único de la compra (Clave primaria).  
fecha: Fecha en la que se realizó la compra.  
total: Monto total de la compra.  
idProveedor: Identificador del proveedor (Clave foránea de la tabla proveedores).  
idUsuario: Identificador del usuario (Clave foránea de la tabla usuarios).

### Tabla detalles compras 

Registra los detalles de cada compra, incluyendo los productos adquiridos, la cantidad y el precio unitario de cada uno.

idDetalle: Identificador único del detalle de compra (Clave primaria).  
idCompra: Identificador de la compra (Clave foránea de la tabla compras).  
idProducto: Identificador del producto adquirido (Clave foránea de la tabla productos).  
cantidad: Cantidad del producto adquirido.  
precioUnitario: Precio unitario del producto al momento de la compra.

## Funcionalidad del sistema

### Gestionar roles y usuarios para acceder al sistema.

La administración de roles y usuarios permite controlar quién puede acceder al sistema y qué funciones pueden ejecutar según su rol.

#### Funcionalidades:  
Gestión de roles: Permite definir y administrar los diferentes roles del sistema, como Administrador, Generte o Usuario.  
Asignación de roles: Cada usuario tendrá un rol asignado, que determinará los permisos que tiene dentro del sistema.  
Registro y autenticación de usuarios: El sistema permite registrar nuevos usuarios con una contraseña y su correspondiente rol. Al iniciar sesión, se verifica su identidad y se otorgan permisos de acuerdo con su rol.

### Gestión de Empleados

Permite registrar, consultar, actualizar y eliminar información sobre los empleados. Esta funcionalidad es importante para identificar a las personas que gestionan las compras y el inventario.

#### Funcionalidades:  
Registro de empleados: Registro de datos personales como nombre, apellido, dirección, teléfono, email y fecha de contratación.
Actualización de información de empleados: Tanto los gerentes como el administrador pueden actualizar la información de contacto o detalles personales cuando sea necesario.
Consultar empleados: Permite visualizar un listado de los empleados actuales de la organización
Eliminación de empleados: Permite eliminar algún empleado de ser necesario

