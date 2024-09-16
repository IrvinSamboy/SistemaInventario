create table roles (
    idRol int PRIMARY KEY AUTO_INCREMENT,
   	nombre varchar(150) NOT NULL
);

create table users(
	idUser int PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(150) NOT NULL UNIQUE,
    contraseña varchar(150) NOT NULL,
    idRol int NOT NULL,
    FOREIGN KEY (idRol) REFERENCES roles(idRol)
);

create table empleados (
    idEmpleado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    direccion VARCHAR(255),
    telefono VARCHAR(15) UNIQUE, 
    email VARCHAR(255) UNIQUE,
    fecha_contratacion DATE,
    foto varchar(255),
    idUser int NOT NULL,
    FOREIGN KEY (idUser) REFERENCES users(idUser)
);

create table categorias (
    idCategoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(255) NOT NULL
);

CREATE TABLE productos (
	idProducto INT AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(255) NOT NULL,
    descripcion varchar(255) NOT NULL,
    stock int NOT NULL,
    foto varchar(255),
    precioCompra decimal(10,2) NOT NULL,
    precioVenta decimal(10,2) NOT NULL,
    idCategoria int NOT NULL,
    FOREIGN KEY (idCategoria) REFERENCES categorias(idCategoria)
);

CREATE TABLE proveedores (
	idProveedor int AUTO_INCREMENT PRIMARY KEY,
  	nombre varchar(255) NOT NULL UNIQUE,
    direccion varchar(255) NOT NULL,
    telefono varchar(13) NOT NULL UNIQUE,
    email varchar(150) NOT NULL UNIQUE
);

CREATE TABLE compras (
	idCompra int AUTO_INCREMENT PRIMARY KEY,
  	fecha DATE,
    total decimal(10,2),
   	idProveedor int,
    idUser INT,
    FOREIGN KEY (idProveedor) REFERENCES proveedores(idProveedor),
    FOREIGN KEY (idUser) REFERENCES users(idUser)
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