USE ECOMMERCE

CREATE TABLE Categories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX) NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);


SET IDENTITY_INSERT Categories ON;

INSERT INTO Categories (id, name, description, createdAt, updatedAt)
VALUES 
(1, 'Electronicos', 'Dispositivos electronicosre', '2025-06-22 16:41:21.303', '2025-06-24 10:08:39.273'),

(9, 'Hogar', 'Articulos del hogar', '2025-06-24 00:16:08.227', '2025-06-24 00:16:08.227'),

(10, 'COMPUTADORAS', 'test', '2025-06-24 10:07:19.397', '2025-06-24 10:07:29.037');

SET IDENTITY_INSERT Categories OFF;

CREATE TABLE Products (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX) NULL,
    price DECIMAL(10,2) NOT NULL,
    sku NVARCHAR(50) NOT NULL UNIQUE,
    stock INT NOT NULL,
    image NVARCHAR(255),
    categoryId INT NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Products_Categories FOREIGN KEY (categoryId)
        REFERENCES Categories(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);



SET IDENTITY_INSERT Products ON;

INSERT INTO Products (
  id, name, description, price, sku, stock, image, categoryId, createdAt, updatedAt
) VALUES
(1, 'Auriculares', 'cargando imagen', 599.99, 'SMT1001', 5, '/uploads/1750781464687-Untitled.jpg', 1, '2025-06-22 16:41:21.310', '2025-06-24 12:14:28.207'),

(2, 'Alfombra', 'para casa', 19.99, 'TSH2002', 3, '/uploads/1750781626542-Untitled.jpg', 1, '2025-06-22 16:41:21.310', '2025-06-24 13:14:46.050'),

(3, 'fdasf', 'fdsafdas', 1.00, 'fdafdsafdas', 2, '/uploads/1750749371140-Untitled.jpg', 1, '2025-06-24 01:16:11.243', '2025-06-24 01:16:11.243'),

(8, 'Computadora Gamer', 'Procesador i9 32GB memoria RAM DDR4', 323.00, '34543gfdgfd', 32, '/uploads/1750798184724-images (1).jfif', 9, '2025-06-24 09:42:32.803', '2025-06-24 14:49:44.800'),

(10, 'Aceite Castrol', 'Aceite 20w-50 marca castrol', 300.00, 'ADE554345434345', 32, '/uploads/1750798279547-175184.jpg', 1, '2025-06-24 09:52:19.367', '2025-06-24 14:51:19.600'),

(11, 'Kit de herramientas', 'Gran variedad de dados y herramientas para tu vehiculo', 223.00, 'FDS345454354', 32, '/uploads/1750798365189-images (3).jfif', 9, '2025-06-24 10:07:09.863', '2025-06-24 14:52:45.243');

SET IDENTITY_INSERT Products OFF;


CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    names NVARCHAR(100) NOT NULL,
    lastNames NVARCHAR(100) NOT NULL,
    email NVARCHAR(150) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    rol NVARCHAR(50) NOT NULL DEFAULT 'admin', 
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);



SET IDENTITY_INSERT Users ON;

INSERT INTO Users (
  id, names, lastNames, email, password, rol, createdAt, updatedAt
) VALUES
(1, 'MARCO GARCIA', 'GARCIA QUINTI', 'MARCO@GMAIL.COM', '$2b$10$cso5mm1l/eIoxFfXbqbsFeOzEuJG1FcO6XKtMV4X77wCEYY9rwqj6', 'ADMIN', '2025-06-22 22:24:04.400', '2025-06-22 22:24:04.400'),

(2, 'fdsafafd', 'fdsfdsafdas', 'MARCO2@GMAIL.COM', '$2b$10$4UnY.JbTNlThRWG9dRN2C.Cf8tyuQRBwYprirWPvsFodLo3lbyNlG', 'COLABORADOR', '2025-06-24 12:09:18.970', '2025-06-24 12:09:18.970'),

(3, 'colaborador', 'colaborador apellidos', 'COLABORADOR@GMAIL.COM', '$2b$10$yjnoueAl3/yXKQrCZ7vNqOK5ymUvFy92clBZCOb7/qT.HRjSi6LCi', 'COLABORADOR', '2025-06-24 12:10:38.280', '2025-06-24 12:10:38.280');

SET IDENTITY_INSERT Users OFF;
