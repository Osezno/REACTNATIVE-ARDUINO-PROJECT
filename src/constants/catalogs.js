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
const arduinoCodes = {
  onOFF:{
    abanico:["Abanico","3", "2"],
    focoRosa:["Foco Rosa","7","6"],
    focoAzul:["Foco Azul", "5","4"], 
  },
  BPM:{
    aumentarBPM:["-" , "+"],
  },
  patrones:{
    apagarNP:["Apagar", "a"],
    mismoColor:["Mismo color","O"],
    unoYuno:["Uno y uno","U"],
    mitadYmitad:["Mitad y mitad","M"],
    tres:["Tres","T"],
    choque:["Choque","X"],
    blink:["Parpadear","P"],
    scanner:["Scanner","S"],
    gradiante:["Gradiante","G"],
    randoms:["Aleatorio","J"],
  },
  patronesDos:{
    repeat:["R","N"],
  },
  modos:{
    onEjercicio:["Ejercicio","E", "e"],
    onDuoEstrobo:["Duo Estrobo","Z","z"],
    onEstroboRosa:["Estrobo Rosa","H", "h"],
    onEstroboAzul:["Estrobo Azúl","Q","q"],
  },
  colorSelected:{
    color1:["Color 1", "A"],
    color2:["Color 2", "B"],
    color3:["Color 3", "C"],
    color4:["Color 4","D"]
  },
  colores:{
    blanco:["Blanco","#ffffff","w"],
    otroAmarillo:["Amarillo 2","rgb(250,100,0)","Y"],
    amarillo:["Amarillo","rgb(150,150,0)","y"],
    verde:["Verde","rgb(0,150,0)","g"],
    azul:["Azul","rgb(0,0,150)","b"],
    cyan:["Cyan","rgb(0,150,150)","c"],
  },
  colores2:{
    morado:["Morado","rgb(150,0,150)","m"],
    violeta:["Violeta","rgb(150,0,250)","v"],
    naranja:["Naranja","rgb(250,50,0)","n"],
    otroNaranja:["Naranja 2","#ff5722","o"],
    rosa:["Rosa","rgb(250,0,150)","p"],
    rojo:["Rojo","rgb(150,0,0)","r"], 
  },
  colores3:{
    fosfo:["Verde Fosfo","rgb(150,250,0)","f"],
    magenta:["Amarillo 2","rgb(250,0,250)","i"],
    spring:["Amarillo","rgb(0,250,128)","k"],
    azure:["Verde","rgb(0,128,250)","ñ"],
    azul:["Azul","rgb(0,255,204)","("],
    cyan:["Cyan","rgb(255,50,50)",")"],
    fosfo:["Verde Fosfo","rgb(150,150,150)",";"]
   
  },

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
  arduino:arduinoCodes
}

export default Catalogs;