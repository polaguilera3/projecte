let bolas = [];
 
//Numero de bolas
var numero = 0;
 
//Estado simulacion
 
var simulacion = true;
 
//variables de las bolas 
let xdirection = 1; 
let ydirection = 1;
let rad = 60;
 
//indice contagio
let indiceContagio = 100;
 
// dimension caja
let cajax = 0;
let cajay = 0;
 
//CRONO------
//variables cronometre
var count = 0;
var time = 0;
//variables crono h / m / s
var second = 0;
var minute = 0;
var hour = 0;
var clear;
 
function setup() {
}
//****************************************************
//--------FUNCION DE EJECUCION PROGRAMA ------------
function draw() {
    if (simulacion) {
        if(cajay > 0) {
            createCanvas(cajax,cajay);
            background(220);
            for (let u = 0; u < bolas.length; u++){
                bolas[u].move();
                bolas[u].show();
                contacto();
                estado();
            }
        }
    }else{
        stop();
 
    }
}
//****************************************************
//Funcion crear divs para las bolas 
function creadiv(n){
    var divinicial = document.getElementById('divs');
    var divsecond = document.createElement("div");
    divsecond.setAttribute("id","divsecond");
    divinicial.appendChild(divsecond);
    for(let i = 0; i < n; i++){
        var div = document.createElement("div");
        var id = String("movi"+i);
        div.setAttribute("id",id);
        divsecond.appendChild(div);
    }
}
 
//Creacion bolas 
function numBolas(){
    reStart();
    bolas = [];
    numero =document.getElementById('numero').value;
    //creacion divs 
    creadiv(numero);
    for(let y = 0; y < numero ; y++){
        let p1 = (Math.random()>=0.5)? 1 : -1;
        let p2 = (Math.random()>=0.5)? 1 : -1;
        bolas[y] = new Bola(y,random(300),random(300),p1,p2,0);
  }
  //----- Cronometro -------
  start();
 
}
 
 
//Objeto bola
class Bola {
    constructor(id,x,y ,xd,yd,ca){
        this.id = id;
        this.x = x;
        this.y = y;
        this.xd = xd;
        this.yd = yd;
        //carga virica
        this.ca = ca;
        //No infectado 0
        //Infectado 1
        this.estado = 0;
        //tiempo infectado
        this.tim = "";
    }
    //Movimiento bola
    move(){
        //velocidad
        this.x = this.x + 2 * this.xd;
        this.y = this.y + 2  * this.yd;
        //cambio de direccion
        if (this.x > width - rad || this.x < rad) {
             this.xd *= -1;
        }
        if (this.y > height - rad || this.y < rad) {
            this.yd *= -1;
        }
        let htmlp = '';
    
        htmlp = String("movi"+this.id);
 
        let estadoShow = "";
 
        if (this.estado == 1) {
            estadoShow = "CONTAGIADO";
            //le agregamos el tiempo
        }else{
            estadoShow ="No contagiado";
            this.tim = time;
        }
 
        return document.getElementById(htmlp).innerHTML = "X: " + this.x.toFixed(2) + " Y: " + this.y.toFixed(2) + " Carga: "+this.ca+ " ESTADO: "+estadoShow +" tiempo: "+this.tim;
 
    }
    //Mostrar bola
    show(){
        let c; 
        if(this.ca > indiceContagio){
            this.estado = 1;
            c = color(255, 0, 0);
            fill(c);
            noStroke();
            ellipse(this.x,this.y, 50,50);
        }else{
            c = color(23, 32, 42);
            fill(c);
            noStroke();
            ellipse(this.x,this.y, 50,50);
        }
    }
 
}
 
//Obtener tamaño caja
function caja (){
    cajax =document.getElementById('cx').value;
    cajay =document.getElementById('cy').value;
 
}
 
//Funcion para mirar si las bolas se tocan 
//En caso de tocar añadir carga virica
function contacto(){
    for(let i = 0; i< bolas.length; i++){
        for(let u = 0; u < bolas.length; u++){
            if(u != i){
                var xi = (bolas[i].x).toFixed(0);
                var xu = (bolas[u].x).toFixed(0);
                var yi = (bolas[i].y).toFixed(0);
                var yu = (bolas[u].y).toFixed(0);
                if(xi == xu||xi+10 == xu || xi-10 == xu){
                    //console.log("entra x");
                    bolas[i].ca = bolas[i].ca +1;
                    bolas[u].ca = bolas[u].ca +1;
 
                    /*
                    if(yi == yu||yi+50 == yu || yi-50 == yu){
                        console.log("entra del todo");
                    }
                    */
 
                }
                if(yi == yu||yi+10 == yu || yi-10 == yu){
                    //console.log("entra y");
                    bolas[i].ca = bolas[i].ca +1;
                    bolas[u].ca = bolas[u].ca +1;
 
                }
            }
        }
    }
}
 
//Con esta funcion miramos el estado de contagio del conjunto
function estado(){
    let sumaContagiados = 0;
    for(let i = 0; i< bolas.length; i++){
        if (bolas[i].estado == 1) {
            sumaContagiados = sumaContagiados +1;
        }
 
    }
    //Llamara a funcion para crear grafico 
    estadistica(sumaContagiados);
    if (sumaContagiados == numero) {
        document.getElementById('inf').innerHTML = "TODOS INFECTADOS"
        //Paramos simulacion
        simulacion = false;
    }
 
 
 
}
//Funcion creacion de la grafica de contagiados
function estadistica(num){
    console.log("CONTAGIADOS: "+num);
 
}
//Funcion restart del programa 
function reStart(){
    simulacion = true;
    bolas = [];
    time = 0;
    second = 0;
    minute = 0;
    hour = 0;
 
    document.getElementById('clock').innerHTML = '00:00:00';
    document.getElementById('inf').innerHTML = '';
 
    
    if (document.getElementById('divsecond')) {
        var elemento = document.getElementById('divs');
        var child = document.getElementById('divsecond');
        var antiguoHijo = elemento.removeChild(child);
    }
 
}
 
//--------CRONOMETRO------------------
//Iniciar cronometre
function start(){
    clear = setInterval(ValueCount,1000)
}
 
//Parar cronometre
function stop(){
    clearInterval(clear);
}
 
//Obtenir el temps i mostrar-lo
function ValueCount(){
    count = count + 1;
    //pasem el temps en segons a HH/MM/SS
    time = secondsToString(count);
    document.getElementById('clock').innerHTML = time;
}
 
//Funció per obtenir format cronometre (HH/MM/SS)
function secondsToString(seconds) {
  hour = Math.floor(seconds / 3600);
  hour = (hour < 10)? '0' + hour : hour;
  minute = Math.floor((seconds / 60) % 60);
  minute = (minute < 10)? '0' + minute : minute;
  second = seconds % 60;
  second = (second < 10)? '0' + second : second;
  return hour + ':' + minute + ':' + second;
}
 
//EXPERIMENTO FORM *************************
 
function prueba(){
    var num = document.getElementById('numero').value;
    var docu = document.getElementById('form');
    var form = document.createElement('form');
    var separador = document.createElement('br');
    for(let i=0; i < num; i++){
        var edat = document.createElement('input');
        edat.type = "text";
        edat.id = "edat";
        edat.placeholder = "edat";
        form.appendChild(edat);
        form.appendChild(separador);
    }
    docu.appendChild(form);
}