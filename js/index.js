//variables
const descripcion= document.getElementById('descripcion');
const bTarea= document.getElementById('bTarea');
const tareasToDoCont=document.getElementById('tareasToDoCont');
const tareasDoingCont= document.getElementById('tareasDoingCont');
const tareasDoneCont= document.getElementById('tareasDoneCont');
let hoy;

//Database
const database= firebase.database();

subir=()=>{

    let referencia=database.ref('tareas').push();

    hoy =new Date();

    objetoTarea={
        text:descripcion.value,
        estado:'ToDo',
        fecha: hoy.getFullYear()+ "."+ hoy.getMonth()+ "."+hoy.getDate(),
    }

    referencia.set(objetoTarea);
}



database.ref('tareas').on('value',
function (data){

    tareasToDoCont.innerHTML= '';
    tareasDoingCont.innerHTML= '';
    tareasDoneCont.innerHTML= '';

data.forEach(

    tarea=>{

        let valor= tarea.val();
        let lista= new ListaTareas(valor,tarea.key);

        if(valor.estado==='ToDo'){
            tareasToDoCont.appendChild(lista.render());
        }

        if(valor.estado==='Doing'){
            tareasDoingCont.appendChild(lista.render());
        }

        if(valor.estado==='Done'){
            tareasDoneCont.appendChild(lista.render());
        }
        
    });

});


bTarea.addEventListener('click', subir);