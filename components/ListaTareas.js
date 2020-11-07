
class ListaTareas{

constructor (tarea, key){
    this.tarea=tarea;
    this.key=key;
}

render=()=>{

let component=document.createElement('div');
component.className='listaTarea';

let descripcionCont=document.createElement('div');
descripcionCont.innerHTML=(this.tarea.text);

let fecha=document.createElement('div');
fecha.className='date';
fecha.innerHTML=(this.tarea.fecha);

let botonDelete= document.createElement('button');
botonDelete.innerHTML=('x');
botonDelete.className='styleDeleteB';

let botonAvance= document.createElement('button');
botonAvance.innerHTML=('->');
botonAvance.className='styleAvanceB';

let botonAtras= document.createElement('button');
botonAtras.innerHTML=('<-');
botonAtras.className='styleAtrasB';

//aumentamos el estado de la tarea
let avanzar=()=>{


    database.ref('tareas/'+this.key).set(
            {
            text:this.tarea.text,
            estado:this.tarea.estado==='ToDo'?'Doing': this.tarea.estado==='Doing'?'Done':'Done',
            fecha:this.tarea.fecha,
        }
    );

  }

  //mermamos el estado de la tarea
  let retroceder=()=>{

    database.ref('tareas/'+this.key).set(
        {
          text:this.tarea.text,
          estado: this.tarea.estado==='Done'?'Doing': this.tarea.estado==='Doing'? 'ToDo':'ToDo',
          fecha:this.tarea.fecha,
        }
    );

  }


  //Eliminamos la tarea 
  let eliminar=()=>{


    database.ref('tareas/'+this.key).set(null);

    console.log(this.key);

    }


botonAvance.addEventListener('click',avanzar);
botonAtras.addEventListener('click', retroceder);
botonDelete.addEventListener('click', eliminar);
component.appendChild(fecha);
component.appendChild(descripcionCont);
component.appendChild(botonDelete);
component.appendChild(botonAvance);
component.appendChild(botonAtras);

return component;
}
}