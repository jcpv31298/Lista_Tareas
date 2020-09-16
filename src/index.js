import "./styles.css";
import { Tareas, ListaTareas } from "./classes";
import { crearTareaHtml } from "./js/component";

export const listaTareas = new ListaTareas();

listaTareas.tareas.forEach(tarea => crearTareaHtml(tarea));