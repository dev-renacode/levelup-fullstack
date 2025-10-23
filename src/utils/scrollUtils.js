/**
 * Utilidades para manejar el scroll en la aplicación
 */

/**
 * Hace scroll suave al tope de la página
 * @param {number} delay - Delay en milisegundos antes de hacer scroll (opcional)
 */
export const scrollToTop = (delay = 0) => {
  if (delay > 0) {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, delay);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

/**
 * Hace scroll suave a un elemento específico
 * @param {string} elementId - ID del elemento al que hacer scroll
 * @param {number} delay - Delay en milisegundos antes de hacer scroll (opcional)
 */
export const scrollToElement = (elementId, delay = 0) => {
  const scrollToElement = () => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (delay > 0) {
    setTimeout(scrollToElement, delay);
  } else {
    scrollToElement();
  }
};

/**
 * Hace scroll suave a una posición específica
 * @param {number} top - Posición vertical en píxeles
 * @param {number} delay - Delay en milisegundos antes de hacer scroll (opcional)
 */
export const scrollToPosition = (top, delay = 0) => {
  if (delay > 0) {
    setTimeout(() => {
      window.scrollTo({ top, behavior: 'smooth' });
    }, delay);
  } else {
    window.scrollTo({ top, behavior: 'smooth' });
  }
};
