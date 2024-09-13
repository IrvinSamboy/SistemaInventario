create table roles (
    idRol int PRIMARY KEY AUTO_INCREMENT,
   	nombre varchar(150) NOT NULL
);

create table users(
	idUser int PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(150) NOT NULL,
    contraseña varchar(150) NOT NULL,
    idRol int NOT NULL,
    FOREIGN KEY (idRol) REFERENCES roles(idRol)
);

create table empleados (
    idEmpleado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    direccion VARCHAR(255),
    telefono VARCHAR(15), 
    email VARCHAR(255),
    fecha_contratacion DATE
);

create table categorias (
    idCategoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(255) NOT NULL
);

CREATE TABLE productos (
	idProducto INT AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(255) NOT NULL,
    descripcion varchar(255) NOT NULL,
    stock int,
    precioCompra decimal(10,2),
    precioVenta decimal(10,2),
    idCategoria int,
    FOREIGN KEY (idCategoria) REFERENCES categorias(idCategoria)
);

CREATE TABLE proveedores (
	idProveedor int AUTO_INCREMENT PRIMARY KEY,
  	nombre varchar(255),
    direccion varchar(255),
    telefono varchar(13),
    email varchar(150)
);

CREATE TABLE compras (
	idCompra int AUTO_INCREMENT PRIMARY KEY,
  	fecha DATE,
    total decimal(10,2),
   	idProveedor int,
    FOREIGN KEY (idProveedor) REFERENCES proveedores(idProveedor)
);

CREATE TABLE detallesCompra (
	idDetalle int AUTO_INCREMENT PRIMARY KEY,
    idCompra int,
    idProducto int,
    cantidad int,
    precioUnitario decimal(10,2),
    FOREIGN KEY (idCompra) REFERENCES compras(idCompra),
    FOREIGN KEY (idProducto) REFERENCES productos(idProducto)
)