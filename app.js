"use strict"
const COMBINACIONES_GANADORAS=[
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
]

let victoria = false;
let tablas = false;

let turno = 0;

const CASILLAS_VALIDAS = ['1','2','3','4','5','6','7','8','9'];
const FICHAS = ['X','O'];



function comprobarCasillaValida(casilla){
    let contenido= casilla.textContent;
    return CASILLAS_VALIDAS.includes(contenido); 
}

function comprobarTablas(casilla){
    if(turno==8){
        return true;
    }

    return false;
}

function comprobarVictoria(){
    for(let combinacion of COMBINACIONES_GANADORAS){
        let a=document.getElementById(`casilla-${combinacion[0]}`);
        let b=document.getElementById(`casilla-${combinacion[1]}`);
        let c=document.getElementById(`casilla-${combinacion[2]}`);

        //si encuentro combinacion ganadora
        if((a.textContent===b.textContent)&&(a.textContent===c.textContent)){
            a.style.backgroundColor="#cd69e7";
            b.style.backgroundColor="#cd69e7";
            c.style.backgroundColor="#cd69e7";
            return true;
        }
    }
    //si no la encuentro
    return false
}

function comprobarFinDeJuego(casilla){
    const numeroCasilla=casilla.textContent;

    if(comprobarVictoria()){
        let mensajes=document.getElementById("mensajes");
        mensajes.textContent="Gana "+FICHAS[turno%2];
        finalizarJuego();
        return;
    }
    if(comprobarTablas()){
        let mensajes=document.getElementById("mensajes");
        mensajes.textContent="Empate pringao";
        finalizarJuego();
        return;
    }
}

function finalizarJuego(){
    for (let i=1;i<=9;i++) {
        let casilla=document.getElementById(`casilla-${i}`);//las comillas estas se llaman interpolacion de caracteres
        //let casilla=document.querySelector(`#${i}`);
        casilla.removeEventListener('click',casillaOnClick);
    }
}

function casillaOnClick(event){
    let casilla=event.target;
    console.log("CLIC EN "+casilla.textContent);

    if(comprobarCasillaValida(casilla)){
        casilla.textContent=FICHAS[turno%2];
        comprobarFinDeJuego(casilla);
        turno++;
    }

    if(!comprobarVictoria()){
        let impTur=document.getElementById("turnoAct");
        turnoAct.textContent="Turno de "+FICHAS[turno%2];
    }
    else{
        turnoAct.textContent="";
    }
}

function main(){
    for(let i=1; i <= 9; i++){
        let casilla = document.getElementById(`casilla-${i}`);
        //let casilla = document.querySelector(`#casilla-${i}`);
        casilla.addEventListener('click', casillaOnClick);
    }
    let impTur=document.getElementById("turnoAct");
    turnoAct.textContent="Turno de X";
};

main();