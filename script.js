//Variables/Constantes

const tareas = [
  {
    nombre: "Terminar 2da entrega del proyecto integrador",
    completada: false,
  },
];


//Funciones
function iniciarPrograma(listaDeTareas) {
  let lista = listaDeTareas;
  const accionSeleccionada = prompt(
    "Para indicar la acción que desea realizar, selecciones:\n1. Para ver tareas\n2. Para Agregar tarea\n3.Cambiar el estado de una tarea\n4. Para filtrar tareas por estado\n5. Para eliminar una tarea\n6.Para salir del menú\n7. Para modificar descripción de una tarea"
  );

  switch (accionSeleccionada) {
    case "1":
      verTareas(lista);
      break;
    case "2":
      agregarTarea(lista);
      //   verTareas(lista);
      break;
    case "3":
      cambiarEstadoTarea(lista);
      //   verTareas(lista);
      break;
    case "4":
      lista = filtrarTareasPorEstado(lista);
      break;
    case "5":
      eliminarTarea(lista);
      break;
    case "6":
      alert("Ha salido del menú");
      verTareas(lista);
      return;
    case "7":
      modificarNombreTarea(lista);
      //   verTareas(lista);
      break;
    default:
      alert("Opción no disponible");
      //   verTareas(lista);
      break;
  }
  iniciarPrograma(lista);
}

function agregarTarea(listaDeTareas) {
  const nombreTarea = prompt(
    "Ingrese por favor la descripción de la nueva tarea"
  );

  const nuevaTarea = {
    nombre: nombreTarea,
    completada: false,
  };

  listaDeTareas.push(nuevaTarea);
}

function cambiarEstadoTarea(listaDeTareas) {
  const indiceTarea = prompt(
    "Ingrese por favor el número de la tarea que desea cambiar el estado"
  );
  const tareaEncontrada = listaDeTareas.find(
    (_, indice) => indice == Number(indiceTarea) - 1
  );

  if (tareaEncontrada) {
    tareaEncontrada.completada = !tareaEncontrada.completada;
  } else {
    alert("La tarea que intenta actualizar no existe");
  }
}

function modificarNombreTarea(listaDeTareas) {
  const indiceTarea = prompt(
    "Ingrese por favor el número de la tarea que desea editar la descripción"
  );

  const tareaEncontrada = listaDeTareas[Number(indiceTarea) - 1];

  if (tareaEncontrada) {
    const nombreEditado = prompt(
      `Usted desea modificar esta tarea: ${tareaEncontrada.nombre}`
    );
    listaDeTareas[indiceTarea - 1].nombre = nombreEditado;
  } else {
    alert("La tarea que intenta actualizar no existe");
  }
}

function filtrarTareasPorEstado(listaDeTareas) {
  let tareasFiltradas = [];
  const estado = prompt(
    "Seleccione: \n1. Para ver tareas pendientes\n2. Para ver tareas completadas"
  );
  switch (estado) {
    case "1":
      // tareasFiltradas = listaDeTareas.filter((tarea) => tarea.completada === false);
      tareasFiltradas = listaDeTareas.filter((tarea) => !tareas.completada);
      break;
    case "2":
      tareasFiltradas = listaDeTareas.filter((tareas) => tareas.completada);
      // tareasFiltradas = listaDeTareas.filter((tarea) => tarea.completada === true);
      break;

    default:
      alert("La opción seleccionada no está disponible");
      break;
  }

  return tareasFiltradas;
}

function eliminarTarea(listaDeTareas) {
  const indiceTarea = prompt(
    "Ingrese por favor el número de la tarea que desea eliminar"
  );

  const indice = Number(indiceTarea) - 1;
  listaDeTareas.splice(indice, 1);
}

function verTareas(listaDeTareas) {
  if (listaDeTareas.length > 0) {
    document.write("<ol>");

    listaDeTareas.forEach((tarea) => {
      document.write(
        `<li class="item">${tarea.nombre}: ${
          tarea.completada ? "Completada" : "Pendiente"
        }</li>`
      );
    });

    document.write("</ol>");
  } else {
    document.write("No se encontraron tareas");
  }
}

//Ejecutar las instrucciones

iniciarPrograma(tareas);
