
# 🛒 Commerce Backend

Este es el backend de una aplicación de comercio electrónico desarrollado con Node.js, Express, TypeORM y SQL Server.

---

## 🚀 Guía de Instalación

### ✅ Requisitos

- Node.js (v14 o superior)
- npm o yarn
- SQL Server (2019 o superior)
- SQL Server Management Studio (u otro cliente)
- Git

---

### 🔧 Pasos para configurar

#### 1. Clonar el repositorio

```bash
git clone https://github.com/your-username/commerce_backend.git
cd commerce_backend
git fetch
git checkout master
```
2. **Instalar Dependencias**

```bash
npm install --force
yarn install
```

5. **Abre SQL Server Management Studio o cualquier cliente SQL y ejecuta**

```code
CREATE DATABASE ECOMMERCE;
GO
```

6. **Ejecutar la base de datos la cual se encuentra en el archivo BD_STRUCTURE.sql en la raiz del proyecto**

7. **Actualizar valores de archivo .env**
```code
DB_TYPE=mssql
DB_HOST=GTLTECMGARCIA\\SQLEXPRESS
DB_PORT=1433
DB_USERNAME=admin
DB_PASSWORD=123
DB_NAME=ECOMMERCE
JWT_SECRET=MARCOPC303GARCIA9903
PORT=3000
ORIGIN=http://localhost:3001
```


4. **Iniciar la Aplicacion**
```bash
npm run dev
yarn dev
```
