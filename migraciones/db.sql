CREATE TABLE Roles (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL
);

CREATE TABLE Usuarios (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    RolID INT,
    FOREIGN KEY (RolID) REFERENCES Roles(ID)
);

CREATE TABLE Categorias (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Descripcion TEXT
);

CREATE TABLE Productos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Descripcion TEXT,
    Precio DECIMAL(10, 2) NOT NULL,
    CantidadStock INT NOT NULL,
    CategoriaID INT,
    FOREIGN KEY (CategoriaID) REFERENCES Categorias(ID)
);

CREATE TABLE Ventas (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    UsuarioID INT,
    Fecha DATE NOT NULL,
    Total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(ID)
);

CREATE TABLE DetalleVentas (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    VentaID INT,
    ProductoID INT,
    Cantidad INT NOT NULL,
    Precio DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (VentaID) REFERENCES Ventas(ID),
    FOREIGN KEY (ProductoID) REFERENCES Productos(ID)
);
