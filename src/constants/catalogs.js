const pageInfo = {
  logo: "img/logo.png",
  cover: "img/cover.jpg",
  icon: "img/icon.png",
  nombre: "<project>",
  welcomeMessage: "<welcome-message>",
  slogan: "Lorem Ipsum dolor amet",
  footerMessage: "© 2020 appName.",
}

const errors = {
  default: "Faltan datos",
  mail: "El email no es valido",
  mailUnavalible: "El email ya existe en nuestra base de datos",
  password: "El password es incorrecto",
  passwordReq: "El password no es seguro",
  passwordEq: "El password no es igual",
  name: "Nombre incorrecto",
  invalidName: "El nombre no es valido",
  invalidNumber:"El numero no es valido",
  //for login password?
  noUser: "El usuario no existe en el sistema",
  session: "Sesión invalida",
  denied: "Permisos insuficientes",
  estatus: "Tu cuenta esta desabilitada",
  recovery: "Tu token expiro o es incorrecto",
  serverError: "Estamos experimentando problemas, nuestros tecnicos estan trabajando para resolverlos."
}

const success = {
  userUpdated: "¡Usuario actualizado exitosamente!",
  login: "Sesión exitosa...",
  verified: "Sesión verificada...",
  logout: "Sesión cerrada.",
  recovery: "Contraseña actualizada.",
  emailSend: "¡Correo enviado! revisa tu bandeja de entrada."
}

const pages = {
  account: "Mi cuenta",
  dashboard: "Dashboard",
  profile: "Perfíl",
  users: "Usuarios",
  newUser: "Nuevo usuario",
  reports: "Reportes",
}

const toast = { open:true, message: "", success:false }

const inputs = {
    // buttons
    load:"Cargando",
    update:"Actualizar información",
    changePassword:"Cambiar contraseña",
    updatePassword:"Solicitar correo",
    login:"Iniciar sesión",
    // Labels
    password:"Contraseña",
    confirmPassword:"Confirmar Contraseña",
    name:"Nombre",
    tel:"Telefóno",
    email:"Correo",
    status:"Estatus",
    rol:"Rol",
}

const rol = {
  "1":"Admin",
  "2":"Manager",
  "3":"Associate"
}

const estatus = {
  "2":"Activo",
  "3":"Pendiente",
  "4":"Suspendido",
  "5":"Eliminado"
}

const Catalogs = {
  vertical:'bottom',
  horizontal:'center',
  inputStr:inputs,
  pageInfo: pageInfo,
  errors:errors,
  success: success,
  rol:rol,
  estatus:estatus,
  pages:pages,
  toast:toast,
}

export default Catalogs;