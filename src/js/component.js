import { Tareas } from "../classes";
import { listaTareas } from "../index";

// Referencias de HTML
const divTareasList = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const borrarCompletados = document.querySelector(".clear-completed");
const ulFiltros = document.querySelector(".filters");
const anchorFiltros = document.querySelectorAll(".filtro");

export const crearTareaHtml = (tarea) => {

    const tareaHtml = `
    <li class="${ (tarea.completado) ? "completed" : "" }" data-id="${ tarea.id }">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (tarea.completado) ? "checked" : "" }>
			<label>${tarea.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>
    `;

    const div = document.createElement("div");

    div.innerHTML = tareaHtml;

    divTareasList.append(div.firstElementChild);

    return div.firstElementChild;

}

// Eventos
txtInput.addEventListener("keyup", (event) => {
    if(event.keyCode === 13 && txtInput.value.length > 0) {

        const nuevaTarea = new Tareas(txtInput.value);

        listaTareas.nuevaTarea(nuevaTarea);

        crearTareaHtml( nuevaTarea );

        txtInput.value = "";

    }
});

divTareasList.addEventListener("click", (event) => {

    const nombreTarea = event.target.localName;
    const tareaElemento = event.target.parentElement.parentElement;
    const tareaId = tareaElemento.getAttribute("data-id");

    if(nombreTarea.includes("input")) {

        listaTareas.marcarCompletado(tareaId);
        tareaElemento.classList.toggle("completed");

    }

    if(nombreTarea.includes("button")) {

        listaTareas.eliminarTarea(tareaId);
        divTareasList.removeChild(tareaElemento);

    }

});

borrarCompletados.addEventListener("click", () => {

    listaTareas.borrarCompletados();

    for (let i = divTareasList.children.length-1; i >= 0; i--) {

        const elemento = divTareasList.children[i];

        if(elemento.classList.contains("completed")) {

            divTareasList.removeChild(elemento);

        }

    }

});

ulFiltros.addEventListener("click", (event) => {

    const filtro = event.target.text;

    if(!filtro) {

        return;

    }

    anchorFiltros.forEach(elem => elem.classList.remove("selected"));

    event.target.classList.add("selected");

    for(const elemento of divTareasList.children) {

        elemento.classList.remove("hidden");
        const completado = elemento.classList.contains("completed");

        switch(filtro) {
            case "Pendientes":
                if(completado) {
                    elemento.classList.add("hidden");
                }
            break;
            case "Completados":
                if(!completado) {
                    elemento.classList.add("hidden");
                }
        }

    }

});