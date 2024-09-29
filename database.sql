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
    idUser int NOT NULL UNIQUE,
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
    FOREIGN KEY (idCategoria) REFERENCES categorias(idCategoria) ON DELETE CASCADE
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
    total decimal(10,2) DEFAULT 0, 
    idProveedor int,
    idUser INT NOT NULL,
    FOREIGN KEY (idProveedor) REFERENCES proveedores(idProveedor) ON DELETE SET NULL,
    FOREIGN KEY (idUser) REFERENCES users(idUser) ON DELETE SET NULL
);

CREATE TABLE detallesCompra (
    idDetalle int AUTO_INCREMENT PRIMARY KEY,
    idCompra int,
    idProducto int,
    cantidad int,
    precioUnitario decimal(10,2),
    FOREIGN KEY (idCompra) REFERENCES compras(idCompra) ON DELETE SET NULL,
    FOREIGN KEY (idProducto) REFERENCES productos(idProducto) ON DELETE CASCADE
);

CREATE TABLE reportes (
    idReporte int AUTO_INCREMENT PRIMARY KEY,
    idCompra int,
    fecha DATE,
    total decimal,
    idProveedor INT,
    nombreProveedor varchar(255),
    idUser INT,
    nombreUsuario varchar(150),
    FOREIGN KEY (idCompra) REFERENCES compras(idCompra) ON DELETE SET NULL,
    FOREIGN KEY (idProveedor) REFERENCES proveedores(idProveedor) ON DELETE SET NULL,
    FOREIGN KEY (idUser) REFERENCES users(idUser) ON DELETE SET NULL
);

CREATE TABLE detalleReporte (
    idDetalleReporte INT AUTO_INCREMENT PRIMARY KEY,
    idReporte int,
    idProducto INT,
    nombreProducto varchar(255) NOT NULL,
    cantidad INT,
    precioUnitario decimal(10,2),
    FOREIGN KEY (idReporte) REFERENCES reportes(idReporte) ON DELETE CASCADE,
    FOREIGN KEY (idProducto) REFERENCES productos(idProducto) ON DELETE SET NULL
);
