/**
 * EJERCICIO DE PARCIAL: SISTEMA DE GESTIÓN DE BIBLIOTECA UNIVERSITARIA
 *
 * OBJETIVO: Implementar un sistema que permita gestionar los préstamos de libros
 * en una biblioteca universitaria, aplicando conceptos avanzados de manipulación
 * de objetos y arrays en JavaScript.
 *
 * INSTRUCCIONES:
 * 1. Analiza la estructura de datos proporcionada
 * 2. Implementa todas las funciones requeridas
 * 3. Prueba tus funciones con los datos de ejemplo y los casos de prueba proporcionados
 * 4. NO modifiques la estructura base de los objetos, solo añade las funcionalidades solicitadas
 */

// Importamos los datos desde el archivo JSON usando ES6 import
import bibliotecaData from "./datos_biblioteca.json" with { type: "json" };

// Hacemos una copia profunda de los datos para no alterar el JSON original
const biblioteca = structuredClone(bibliotecaData);

/**
 * 1. Función para prestar un libro
 *
 * Implementa una función que gestione el proceso de préstamo de un libro a un estudiante.
 * Deberás realizar las validaciones necesarias y actualizar los registros correspondientes.
 *
 * @param {number} idLibro - ID del libro a prestar
 * @param {number} idEstudiante - ID del estudiante que pide prestado
 * @param {string} fechaPrestamo - Fecha del préstamo (formato YYYY-MM-DD)
 * @return {boolean|string} - true si se realizó el préstamo, mensaje de error si no
 */
function prestarLibro(idLibro, idEstudiante, fechaPrestamo) {
  // Buscar el libro por id
  const libro = biblioteca.libros.find((l) => l.id === idLibro);
  if (!libro) return "Libro no encontrado";

  // Verificar disponibilidad
  if (!libro.disponible) return "El libro no está disponible para préstamo";

  // Buscar el estudiante por id
  const estudiante = biblioteca.estudiantes.find((e) => e.id === idEstudiante);
  if (!estudiante) return "Estudiante no encontrado";

  // Registrar el préstamo
  libro.disponible = false;
  libro.prestamos = libro.prestamos || [];
  libro.prestamos.push({
    idEstudiante,
    fechaPrestamo,
  });

  estudiante.prestamos = estudiante.prestamos || [];
  estudiante.prestamos.push({
    idLibro,
    fechaPrestamo,
  });

  return true;
}

/**
 * 2. Función para buscar libros
 *
 * Desarrolla una función de búsqueda flexible que permita encontrar libros
 * según diversos criterios como título, autor, categoría y disponibilidad.
 *
 * @param {object} criterios - Objeto con los criterios de búsqueda
 * @return {array} - Array con los libros que cumplen los criterios
 */
function buscarLibros(criterios) {
  return biblioteca.libros.filter((libro) => {
    for (let key in criterios) {
      if (criterios[key] === undefined) continue;

      if (key === "titulo" || key === "autor") {
        if (
          typeof libro[key] !== "string" ||
          !libro[key].toLowerCase().includes(criterios[key].toLowerCase())
        ) {
          return false;
        }
      } else {
        if (libro[key] !== criterios[key]) {
          return false;
        }
      }
    }
    return true;
  });
}

// ==========================
// CASOS DE PRUEBA
// ==========================
console.log("Probando préstamo de libro:");
console.log(prestarLibro(1, 3, "2025-09-13"));

console.log("\nBuscando libros de programación disponibles:");
console.log(buscarLibros({ categoria: "Programación", disponible: true }));
