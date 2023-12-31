export const generateId = () => {
    return `${Date.now().toString(36)}${Math.random().toString(36).substr(2)}`
  }


export const formatDate = (date) => {
    const newDate = new Date(date);
    const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return newDate.toLocaleDateString('es-ES', options);

}

export const scrollToElement = (elementId) => {
  var element = document.getElementById(elementId);

  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.warn("Elemento con ID '" + elementId + "' no encontrado.");
  }
}