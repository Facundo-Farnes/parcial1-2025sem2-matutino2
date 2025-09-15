/*
# Ejercicio 03.

La función `showRandomDigit` está asociada al click en el display. Al ejecutarse
debe definir un valor aleatorio entre 0 y 9 y mostrar el dígito correspondiente.
*/
// Tabla que define qué segmentos se encienden para cada dígito
const digitToSegments = {
  0: ["a", "b", "c", "d", "e", "f"],
  1: ["b", "c"],
  2: ["a", "b", "g", "e", "d"],
  3: ["a", "b", "c", "d", "g"],
  4: ["f", "g", "b", "c"],
  5: ["a", "f", "g", "c", "d"],
  6: ["a", "f", "g", "c", "d", "e"],
  7: ["a", "b", "c"],
  8: ["a", "b", "c", "d", "e", "f", "g"],
  9: ["a", "b", "c", "d", "f", "g"]
};

function showRandomDigit() {
  let randomDigit = Math.floor(Math.random() * 10);

  // Apagar todos los segmentos primero
  ["a", "b", "c", "d", "e", "f", "g"].forEach(seg => {
    document.getElementById("seg-" + seg).style.background = "#030303"; // apagado
  });

  // Encender los necesarios según el número
  digitToSegments[randomDigit].forEach(seg => {
    document.getElementById("seg-" + seg).style.background = "#e0e000"; // encendido
  });

  return randomDigit;
}


