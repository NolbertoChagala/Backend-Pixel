# 🎨 Pixel Studio – Landing Page con Formulario de Contacto

Este es el **Backend** de la landing page de Pixel Studio, una página moderna, minimalista y responsiva construida con **React + Vite**. Incluye un formulario de contacto que se conecta con un backend en Node.js para almacenar los datos en una base de datos MySQL.

---

## 🧩 Tecnologías utilizadas en el Backend

- Node.js  
- Sequelize (ORM)  
- MySQL (gestionado con phpMyAdmin o XAMPP)

---

## 📦 Requisitos previos

- Node.js v16+ y npm  
- MySQL instalado y corriendo (ej. con phpMyAdmin o XAMPP)  
- Git (opcional)

--

## 🚀 Pasos para correr el backend

### Nota:
### Para correr el proyecto debes encender tu XAMPP y ver que te funcione el phpmyadmin, el backend se encarga de crear la base de datos y las tabla.

### 1. Clonar el repositorio
```bash
git clone https://github.com/NolbertoChagala/Backend-Pixel.git
```
## 2.- Entras a la carpeta correspondiente
```bash
cd PixelStudio
```
## 3.- Instalas todas las dependencias del proyecto
```bash
npm install
```
## 4.- Creas tus variables de entorno, según tus accesos.
```bash
DB_HOST=localhost
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
PORT=
```
## 4.- Inicializas el proyecto
```bash
node index.js
```