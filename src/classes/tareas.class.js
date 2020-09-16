export class Tareas {

    static fromJson({id,tarea,completado,creado}) {

        const tempTarea = new Tareas(tarea);

        tempTarea.id = id;
        tempTarea.completado = completado;
        tempTarea.creado = creado;

        return tempTarea;
    }

    constructor( tarea ) {

        this.tarea = tarea;
        
        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();
        
    }

}