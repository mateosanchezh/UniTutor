# UniTutor 📚✨

UniTuto es una aplicación web diseñada para digitalizar el proceso de reservas de tutorías. Basada en el sistema antiguo de tutorías de Comfenalco, UniTuto permite a los profesores y estudiantes coordinar sesiones de tutoría de manera sencilla y eficiente, ya sea de forma virtual o presencial.

## 🚀 Características

- **Registro y Autenticación**: Los usuarios pueden registrarse, iniciar sesión y gestionar sus perfiles.
- **Gestión de Tutorías**: Los profesores pueden crear reservas para sesiones de tutoría en fechas y horas específicas.
- **Reserva de Tutorías**: Los estudiantes pueden reservar tutorías disponibles en el calendario del profesor.
- **Notificaciones**: Los enlaces de Google Meet para sesiones virtuales se envían por correo electrónico 5 minutos antes de la tutoría.
- **Usuarios Administrativos**: Los usuarios con privilegios administrativos pueden:
  - Crear, editar y eliminar usuarios.
  - Gestionar todas las reservas de tutorías y editar la información relacionada.

## 🛠 Tecnologías

### Backend

- **Spring Boot**: Para el backend y la lógica de negocio.
- **Java**: Lenguaje de programación principal.
- **Bases de Datos SQL**: Para la gestión de datos
- **Google API**: Para generar enlaces de Google Meet y enviar notificaciones por correo electrónico.
- **Maven**: Para la gestión de dependencias y construcción del proyecto.

### Frontend

- **React**: Biblioteca de JavaScript para construir la interfaz de usuario.
- **JavaScript**: Lenguaje de programación para la lógica del frontend.
- **CSS**: Para el diseño y estilo de la aplicación.
- **HTML**: Para la estructura de las páginas web.

## 🌐 Uso

1. **Registro e Inicio de Sesión**: Visita `/register` para registrarte y `/login` para iniciar sesión.
2. **Gestión de Tutorías**: Los profesores pueden crear reservas en `/professor/reservations`.
3. **Reserva de Tutorías**: Los estudiantes pueden buscar y reservar tutorías en `/student/reservations`.

## 📧 Contacto

Para cualquier pregunta o comentario, puedes contactarme en [unitutor@gmail.com](mailto:unitutor@gmail.com).

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
