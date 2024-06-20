//Declaración de función
const cajaRegistradora = (totalCompra, efectivoEntregado, dineroEnCaja) => {
  let status = "";
  let vueltas = [];

  //1. Calcular el cambio que se le debe entregar al cliente

  const cambio = efectivoEntregado - totalCompra;
  console.log("Cambio a entregar al cliente: $" + cambio.toLocaleString());

  //2. Calcular el total de dinero que se encuentra en caja
  const totalDineroEnCaja = dineroEnCaja.reduce(
    (totalDinero, billete) =>
      totalDinero + billete.cantidad * billete.denominacion,
    0
  );

  console.log(
    "El total de dinero disponible en caja: $" +
      totalDineroEnCaja.toLocaleString()
  );

  //Cuando el cliente no ha pagado completo el total de la compra el valor almacenado en cambio será un valor negativo
  if (cambio < 0) {
    status = "El cliente no ha pagado completo el total de la compra";
  } else if (cambio === 0) {
    status = "El cliente ha pagado completo. Respuesta: Gracias por la compra";
  } else if (totalDineroEnCaja === cambio) {
    status = "Caja cerrada. Se quedó sin dinero";
    vueltas = dineroEnCaja;
  } else if (cambio > totalDineroEnCaja) {
    status = "Caja registradora sin fondos. Se le queda debiendo al cliente";
    vueltas = dineroEnCaja;
  } else if (cambio < totalDineroEnCaja) {
    //En este bloque se consideran los dos últimos escenarios
    let vuelto = cambio;
    dineroEnCaja.forEach((billete) => {
      //1. Calcular la cantidad de billetes de cada denominación que le debemos entregar al cliente para ir completando las vueltas
      const billetesNecesarios = Math.floor(vuelto / billete.denominacion);
      console.log(
        `La cantidad de billetes de ${billete.denominacion.toLocaleString()} que le debemos entregar al cliente para ir completando su cambio es de: ${billetesNecesarios}`
      );
      if (billetesNecesarios > 0) {
        const dinero = {
          denominacion: billete.denominacion,
          cantidad:
            billetesNecesarios <= billete.cantidad
              ? billetesNecesarios
              : billete.cantidad,
          //   cantidad: 0,
        };

        // if (billetesNecesarios <= billete.cantidad) {
        //   dinero.cantidad = billetesNecesarios;
        // } else {
        //   dinero.cantidad = billete.cantidad;
        // }
        vueltas.push(dinero);

        // billete.cantidad = billete.cantidad - dinero.cantidad;
        // vuelto = vuelto - billete.denominacion * dinero.cantidad;

        billete.cantidad -= dinero.cantidad;
        vuelto -= billete.denominacion * dinero.cantidad;
      }
    });

    if (vuelto > 0) {
      status =
        "La caja registradora no tiene suficiente sencillo para completar el cambio";
      console.log(
        "No se le pudo entregar al cliente: $" + vuelto.toLocaleString()
      );
    } else {
      status = "El cambio se ha entregado completo";
    }
  }

  return {
    status: status,
    vueltas: vueltas,
  };
};

//Declaración de datos de prueba
const totalCompra = 124000;
const efectivoEntregado = 150000;
const billetesEnCaja = [
  {
    denominacion: 100000,
    cantidad: 5,
  },
  {
    denominacion: 50000,
    cantidad: 5,
  },
  {
    denominacion: 20000,
    cantidad: 5,
  },
  {
    denominacion: 10000,
    cantidad: 5,
  },
  {
    denominacion: 5000,
    cantidad: 10,
  },
  {
    denominacion: 2000,
    cantidad: 5,
  },
  {
    denominacion: 1000,
    cantidad: 5,
  },
  {
    denominacion: 500,
    cantidad: 5,
  },
  {
    denominacion: 200,
    cantidad: 15,
  },
  {
    denominacion: 100,
    cantidad: 5,
  },
  {
    denominacion: 50,
    cantidad: 5,
  },
];

//Ejecutar
const caja = cajaRegistradora(totalCompra, efectivoEntregado, billetesEnCaja);
console.log(caja);
