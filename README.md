# Aplicacion Demo de Adopción de Mascotas

El proyecto tambien se encuentra deployado en Firebase [deploy](my-app-adoptions-pets.web.app), para ver su comportamiento sin necesidad de correrlo localmente


## Procedimiento para poner en marcha el proyecto demo
---
### Forkeo y Clonado del Repositorio:
-  Realizar un fork del [repositorio](https://umane.emeal.nttdata.com/git/PAE/microserviciosdemo/react-vite-typescript).
-  Una vez con el repositorio Forkeado, se debe realizar el clonado para tenerlo en el ambiente local.

### Instalación de Dependencias
-  Abrir una terminal y posicionarse en la raiz de la carpeta asignada al proyecto clonado
-  Para instalar las dependencias del proyecto  debe ejecutar el comando
```
npm install 
```
### Ejecución del proyecto
-  Una vez instaladas las dependencias ejecutar en la terminal el comando
```
npm run dev
```
-  Una vez ejecutado el comando anterior podemos abrir en el navegador de nuestra preferencia la [localhost:5173](http://localhost:5173)

---

## Tecnologías utilizadas:
- _ReactJs_ 
- _Redux_
- _Axios_
- _TypeScript_
- _Material UI_

---

## Reglas del Negocio

### **_Registro de usuarios_**
- Solo se pueden registrar usuarios que hayan tenido algun tipo interacción (compras, atención medica, entre otros) con los centros que esten afiliadas en la red medica de veterinarias.
- En caso de no estar registrado en ninguna de los centros como usuario, el sistema  arroja un mensaje indicando que debe ser un usuario previo.
- Si el usuario que se registra ya existe en la base de datos al completar su correo electronico, se muestra el avatar del usuario detectado.
- El registro tiene validacion de campos, por lo cual no puede quedar ningun campo en blanco. 
- Opción de iniciar sesión si ya tiene cuenta.
    <br /><br />
    
    
  <p style="text-align: center; color: yellow; font-weight: bold;">ACLARACION:</p>
  <p style="color: white ">Al ser un proyecto DEMO, se agrego un componente acordeon que permite visualizar los usuarios validos para hacer un registro, ya que en caso contrario al no existir el usuario no le permitirá registrarse ni loguearse en la aplicación.</p>

    
---
### **_Login de usuarios_**
- Logueo de un usuario a traves de un correo y contraseñas validos.
- En caso de error en alguno de los casos anteriores se muestra un mensaje indicando que se ingresaron datos incorrectos.
- El login tiene validacion de campos, por lo cual no puede quedar ningun campo en blanco. 
- Opción de si aun no tiene cuenta, Registrarse.
<br/>

---
### **_Sección Navbar_**
- Contiene los accesos rapidos como: 
    1. *Inicio:* lleva a la pantalla de inicio
    2. *Adoptados:* muestra el listado de mascotas adoptadas.
    3. *Información:* permite seleccionar que tipo de mascotas desea ver (Perros o Gatos) y esta selección nos mostrará una sección con un select para buscar la raza que nos interese.
    
    4. *Salir:* permite finalizar la sesión del usuario.
    5. Se muestra el _nombre_ del usuario logueado.
    6. Se muestra la _foto_ del usuario logueado.
        
---
### 1. **Pagina Principal ó Inicio**    
Muestra las dos funciones principales de la aplicación, como son: 
- Registrar una mascota para que sea adoptada.        
- Adoptar una mascota, disponible en el centro veterinario.


    1. **Registra a tu Mascota:**
        - Contiene el formulario de Registro de la mascota que permite registrar los datos importantes de la mascota que se pondra en adopción, como son:        
            - Nombre
            - Tipo de mascota
            - Peso
            - Raza
            - URL con la foto de la mascota
            - Edad
            - Sexo
            - Tamaño
            - Descripción
            - Si esta vacunado
            - Si esta desparacitado
            - Si esta esterilizado
            - Correo del responsable (no editable)
            - Teléfono del responsable (editable)
            
        
    
    2. **Adopta una Mascota:**

        1. Muestra una sección de filtros:            
            - Por tipo de mascota.
            - Por raza.
            - Autocompletado que puede buscar tanto por nombre, tipo de mascota ó raza.


            
        2. Listado de mascotas, donde se muestra:        
            - Foto.
            - Nombre.
            - Raza.
            - Aviso en la parte superior si ya fue adoptado o no

            
        3. Al Clickear sobre una foto accederá al detalle de esa mascota, vera información adicional como:        
            + _Seccion de la mascota_
                - Sexo
                - Tamaño
                - Edad
                - Si esta vacunado
                - Si esta desparacitado
                - Si esta esterilizado
                
            + _Sección del hogar anterior_
                - Nombre
                - Teléfono
                - Celular
                - Correo
                - Foto
                
                
            + _Boton para confirmar la adopción_                
                - Muestra un mensaje de concientización al momento de adoptar, así como los botones de Adoptar o No a la mascota.
                
---
### 2. **Adoptados:**

Muestra un listado de las mascotas adoptadas por el usuario logueado con información relevante a cada caso como:

- La mascota adoptada (tipo de mascota, nombre, edad, sexo, raza, tamaño y foto).
- Datos de Propietario Anterior (foto, nombre, correo, teléfono y ciudad).
- Datos del Adoptante (foto, nombre, correo, teléfono y ciudad).
    
    
---    
### 3. **Información:**

Tiene dos opciones a elegir, para ver por tipos de mascota (Perros ó Gatos)

Sea cual se la selección se mostrara un campo de selección, donde vera una serie de razas y que al seleccionar una se mostraran los siguientes datos de la raza:

- ***Gatos:***    
    - Descripción
    - Temperamento
    - Peso
    - Esperanza de Vida en años
    - Adaptabilidad
    - Inteligencia
    - Amigabilidad con niños
    - Amigabilidad con extraños
    - Amigabilidad con perros
    - Problemas de salud
    - Origen
    - Codigo del país de origen
    - Colección de fotos.
    

- ***Perros:***    
    - Temperamento
    - Criado para
    - Peso
    - Altura
    - Tiempo de Vida en años
    - Grupo Racial
    - Colección de fotos.    

---       
### 4. **Salir:**

Permite la finalización de la sesión del usuario en la aplicación.

---    
### 5. **Nombre y Apellido:**

Muestra el nombre y apellido del usuario logueado.

---
### 6. **Foto:**

Muestra el avatar del usuario logueado.
