# Aplicativo de Desarrollo Backend

Este repositorio contiene el código fuente y la documentación para un proyecto de desarrollo backend que utiliza varias tecnologías y patrones de diseño para crear una aplicación robusta y escalable. El objetivo principal de esta aplicación es proporcionar un servidor backend para una plataforma de comercio electrónico, que incluye autenticación de usuarios, gestión de carritos de compra, manejo de productos en tiempo real y comunicación por correo electrónico con los usuarios. A continuación, se detallan los aspectos más destacados del aplicativo.

## Acceso a la Aplicación

- El aplicativo ha sido desplegado en Render y se puede acceder a través del siguiente enlace:
[https://ferreyra-bernardo-backend39750.onrender.com/](https://ferreyra-bernardo-backend39750.onrender.com/ "https://ferreyra-bernardo-backend39750.onrender.com/")
- En el siguiente enlace encontrara la documentacion referida a los modelos de cart y products:
[https://ferreyra-bernardo-backend39750.onrender.com/docs/](https://ferreyra-bernardo-backend39750.onrender.com/docs/ "https://ferreyra-bernardo-backend39750.onrender.com/docs/")

## Tecnologías Utilizadas

- **Node.js y Express**: La aplicación se ejecuta en Node.js y utiliza el marco Express para crear un servidor web robusto.

- **MongoDB y Mongoose**: Se utiliza MongoDB como base de datos y Mongoose como ODM (Object-Document Mapper) para realizar operaciones CRUD en la base de datos.

- **Handlebars**: Handlebars se utiliza para la generación de vistas y renderizado del lado del servidor.

- **Websockets**: Los websockets se emplean para la sección de chat y la actualización en tiempo real de productos.

- **Passport y JSON Web Token (JWT)**: Passport se usa para implementar estrategias de autenticación y autorización, mientras que JWT se emplea para la generación de tokens de acceso.

## Patrones de Diseño Utilizados

- **Patrón Singleton**: Se utiliza un patrón Singleton para la conexión a la base de datos MongoDB, asegurando que solo haya una instancia activa de la conexión en toda la aplicación.

- **Arquitectura por Capas**: La aplicación sigue una arquitectura por capas que incluye capa de ruteo, capa de controlador, capa de servicio y capa de persistencia para garantizar una separación clara de las responsabilidades.

- **Patrón Factory**: Se emplea el patrón Factory para la persistencia de datos utilizando MongoDB y archivos. Esto facilita la creación de objetos de acceso a datos (DAO) según el tipo de persistencia.

- **Patrón DAO (Data Access Object)**: El patrón DAO se utiliza para abstraer el acceso a la base de datos, proporcionando métodos para realizar operaciones CRUD.

- **Patrón Repository**: Se aplica el patrón de diseño Repository para separar la lógica de la base de datos de la capa de servicio, permitiendo una mayor flexibilidad en el manejo de datos.

## Comunicación con Usuarios

- **Nodemailer**: Se utiliza Nodemailer para la comunicación con los usuarios mediante el envío de correos electrónicos. Esto incluye el envío de correos para la recuperación de contraseñas y notificaciones de eliminación de productos.

## Gestión de Usuarios

La aplicación incluye un sistema de manejo de usuarios con las siguientes características:

- **Registro, Inicio de Sesión y Cierre de Sesión**: Los usuarios pueden registrarse, iniciar sesión y cerrar sesión en la aplicación. Cada usuario está asociado a un carrito de compras específico.

- **Roles de Usuario**: Los usuarios pueden tener distintos roles: "User", "Premium" o "Admin". Estos roles determinan las habilidades y restricciones de uso de la aplicación.

## Documentación Swagger

La documentación del aplicativo se encuentra disponible a través de Swagger en el endpoint `/docs`. En esta documentación, se pueden encontrar detalles sobre los modelos de "Cart" y "Products" junto con las siguientes rutas:

### Products:

#### GET
- `/api/products/mockingproducts`: Genera un mock de 50 productos utilizando Faker.
- `/api/products/`: Obtiene todos los productos utilizando paginación.
- `/api/products/:pid`: Obtiene un producto por su ID.

#### POST
- `/api/products/`: Accesible solo para admin o premium, crea un producto. Se utiliza un DTO para indicar claramente los campos necesarios.(si el usuario creador es premium crea un campo owner con el mail del propietario, caso contrario es admin por default)

#### PUT
- `/api/products/:pid`: Accesible solo por admin o premium, modifica un producto por ID en la base de datos.(el usuario premium solo podra modificar productos que sean de su propiedad)

#### DELETE
- `/api/products/:pid`: Accesible solo por admin o premium, elimina un producto por su ID.(el usuario premium solo podra eliminar productos que sean de su propiedad)

### Users:

#### GET
- `/api/session/users`: Obtiene todos los usuarios de la base de datos, filtrando los campos solicitados a través de un DTO.
- `/api/session/premium/:uid`: Convierte el rol de un usuario a premium solo si ha subido la documentación requerida y viceversa
- `/api/session/premium/logout`: Actualiza el campo de última conexión y cierra la sesión del usuario.

#### POST
- `/api/session/login`: Actualiza el campo de última conexión, genera un token y una sesión de acceso para el usuario.
- `/api/session/register`: Registra un nuevo usuario en la base de datos y crea un carrito relacionado.
- `/api/session/forgotPassword`: Permite a los usuarios solicitar un enlace para restablecer su contraseña.

#### PUT
- `/api/session/resetPassword`: Permite a los usuarios restablecer su contraseña a través de un enlace enviado por correo electrónico.

#### POST (Subida de Documentos)
- `/api/session/:uid/documents`: Permite a los usuarios subir documentos a través de Multer. Los archivos se almacenan en carpetas específicas con el ID del usuario como nombre dentro de las siguientes carpetas:
1. Documents
2. Profiles
3. Products

- se aplican validaciones en nombre y tipo de archivo aceptando solo archivos del siguiente tipo **'.jpg','.jpeg','.png','.pdf'**
- Para subir archivos a la carpeta documents , los cuales seran necesarios para cambiar el rol de usuario a premium es necesario que el nombre de los 3 archivos pedidos sea exactamente los siguientes:
		'Identificacion',
		'Comprobante de domicilio',
		'Comprobante de estado de cuenta'
- ejemplo de subida de archivo, **uploadtype** sera el que determine que tipo de archivo sera y donde se guadara (document, profile o product) y **uploads** sera el archivo en si mismo
![](https://res.cloudinary.com/dmzrvnlgb/image/upload/v1693958085/tipodearchivo_e7u4uy.jpg)

#### DELETE
- `/api/session/deleteUsers`: Ruta solo accesible para administrador, elimina usuarios con conexión inactiva por más de dos días y envía notificaciones por correo electrónico.
- `/api/session/deleteUser`: Elimina un usuario por su ID, solo accesible para el administrador.

### Carts:

#### GET
- `/api/carts/`: Obtiene todos los carritos.
- `/api/carts/:cid`: Obtiene un carrito por su ID, incluyendo los productos contenidos mediante el uso de "populate".

#### POST
- `/api/carts/`: Crea un nuevo carrito vacío.
- `/api/carts/:cid/products/:pid`: Agrega un producto al carrito, con validación para impedir que un usuario premium agregue un producto que le pertenece.
- `/api/carts/:cid/purchase`: Genera un ticket de compra, actualiza el stock de productos y envía notificaciones por correo electrónico al comprador.

#### PUT
- `/api/carts/:cid`: Modifica un carrito por su ID.
- `/api/carts/:cid/products/:pid`: Modifica un producto dentro de un carrito por su ID.

#### DELETE
- `/api/carts/:cid`: Vacia un carrito por su ID.
- `/api/carts/:cid/products/:pid`: Elimina un producto dentro de un carrito por su ID.

## Vistas

- **UsersControlPanel**:`/api/session/usersControlPanel` Vista que permite a los usuarios administradores gestionar a otros usuarios, cambiar roles y eliminar usuarios.

- **RealtimeProducts**: `/realTimeProducts`Vista que muestra los productos en tiempo real, permitiendo crear y eliminar productos.(solo accesible para usuarios premium y admin)

## Documentacion
** Para obtener más detalles sobre el funcionamiento y uso de la aplicación, consulte la documentación completa en el endpoint `/docs`. ¡Disfrute explorando el aplicativo de desarrollo backend!**:smile:


