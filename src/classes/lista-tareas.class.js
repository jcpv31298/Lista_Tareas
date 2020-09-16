import { Tareas } from ".";

export class ListaTareas {

    constructor() {

        this.cargarLocalStorage();

    }

    nuevaTarea(tarea) {

        this.tareas.push( tarea );
        this.guardarLocalStorege();

    }

    eliminarTarea(id) {

        this.tareas = this.tareas.filter(tarea => tarea.id != id);
        this.guardarLocalStorege();

    }

    marcarCompletado(id) {

        for(const tarea of this.tareas) {

            if(tarea.id == id) {

                tarea.completado = !tarea.completado;
                this.guardarLocalStorege();
                break;

            }

        }

    }

    borrarCompletados() {

        this.tareas = this.tareas.filter(tarea => !tarea.completado);

        this.guardarLocalStorege();

    }

    guardarLocalStorege() {

        localStorage.setItem("tarea", JSON.stringify(this.tareas));

    }

    cargarLocalStorage() {

        this.tareas = (localStorage.getItem("tarea")) 
        ? JSON.parse(localStorage.getItem("tarea")) 
        : [];

        this.tareas = this.tareas.map(obj => Tareas.fromJson(obj));

    }

}