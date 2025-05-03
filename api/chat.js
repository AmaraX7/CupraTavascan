// Información del Cupra Tavascan
const cupraTavascanInfo = {
    modelo: 'Cupra Tavascan',
    precio: 'desde 49,900€',
    autonomia: 'hasta 510 km (WLTP)',
    bateria: '77 kWh',
    potencia: 'hasta 340 CV (250 kW)',
    aceleracion: '0 a 100 km/h en 5,6 segundos',
    colores: ['Dusk Blue', 'Dark Aluminium', 'Fiord Blue'],
    garantia: '3 años o 100.000 km (vehículo), 8 años o 160.000 km (batería)',
    carga: 'carga rápida DC de hasta 135 kW, del 10% al 80% en aproximadamente 30 minutos',
    equipamiento: 'pantalla táctil de 15", sistema de navegación, conectividad Apple CarPlay y Android Auto, asistentes de conducción avanzados',
  };
  
  export default function handler(req, res) {
    // Solo permitir solicitudes POST
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Método no permitido' });
    }
  
    try {
      // Obtener el mensaje del usuario
      const { message } = req.body;
      
      // Verificar que el mensaje sea válido
      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return res.status(400).json({ error: 'El campo "message" es inválido o está vacío' });
      }
  
      // Convertir el mensaje a minúsculas para hacer la comparación más sencilla
      const mensajeLowerCase = message.toLowerCase().trim();
      
      // Variable para almacenar la respuesta
      let respuesta = '';
  
      // Respuestas predefinidas basadas en palabras clave en la pregunta
      if (mensajeLowerCase.includes('precio') || mensajeLowerCase.includes('cuesta') || mensajeLowerCase.includes('vale')) {
        respuesta = `El Cupra Tavascan está disponible ${cupraTavascanInfo.precio}.`;
      }
      else if (mensajeLowerCase.includes('autonomía') || mensajeLowerCase.includes('autonomia') || mensajeLowerCase.includes('batería') || mensajeLowerCase.includes('bateria') || mensajeLowerCase.includes('kilómetros') || mensajeLowerCase.includes('km')) {
        respuesta = `El Cupra Tavascan ofrece una autonomía de ${cupraTavascanInfo.autonomia} y cuenta con una batería de ${cupraTavascanInfo.bateria}.`;
      }
      else if (mensajeLowerCase.includes('potencia') || mensajeLowerCase.includes('cv') || mensajeLowerCase.includes('caballos') || mensajeLowerCase.includes('kw')) {
        respuesta = `El Cupra Tavascan ofrece una potencia de ${cupraTavascanInfo.potencia}.`;
      }
      else if (mensajeLowerCase.includes('aceleración') || mensajeLowerCase.includes('aceleracion') || mensajeLowerCase.includes('0 a 100') || mensajeLowerCase.includes('rápido') || mensajeLowerCase.includes('rapido')) {
        respuesta = `El Cupra Tavascan tiene una ${cupraTavascanInfo.aceleracion}.`;
      }
      else if (mensajeLowerCase.includes('color') || mensajeLowerCase.includes('colores')) {
        respuesta = `El Cupra Tavascan está disponible en los siguientes colores: ${cupraTavascanInfo.colores.join(', ')}.`;
      }
      else if (mensajeLowerCase.includes('garantía') || mensajeLowerCase.includes('garantia')) {
        respuesta = `La garantía del Cupra Tavascan es de ${cupraTavascanInfo.garantia}.`;
      }
      else if (mensajeLowerCase.includes('carga') || mensajeLowerCase.includes('cargar') || mensajeLowerCase.includes('tiempo')) {
        respuesta = `El Cupra Tavascan tiene ${cupraTavascanInfo.carga}.`;
      }
      else if (mensajeLowerCase.includes('equipamiento') || mensajeLowerCase.includes('pantalla') || mensajeLowerCase.includes('navegador') || mensajeLowerCase.includes('apple') || mensajeLowerCase.includes('android')) {
        respuesta = `El equipamiento del Cupra Tavascan incluye ${cupraTavascanInfo.equipamiento}.`;
      }
      else if (mensajeLowerCase.includes('característica') || mensajeLowerCase.includes('caracteristicas') || mensajeLowerCase.includes('especificaciones') || mensajeLowerCase.includes('información') || mensajeLowerCase.includes('informacion')) {
        // Dar información general sobre el vehículo
        respuesta = `El ${cupraTavascanInfo.modelo} es un SUV eléctrico con un precio ${cupraTavascanInfo.precio}, una autonomía de ${cupraTavascanInfo.autonomia}, batería de ${cupraTavascanInfo.bateria} y potencia de ${cupraTavascanInfo.potencia}. Ofrece ${cupraTavascanInfo.carga}.`;
      }
      else if (mensajeLowerCase.includes('hola') || mensajeLowerCase.includes('buenos días') || mensajeLowerCase.includes('buenas tardes') || mensajeLowerCase.includes('saludos')) {
        respuesta = `¡Hola! Soy el asistente virtual de Cupra. ¿En qué puedo ayudarte con el Cupra Tavascan?`;
      }
      else {
        // Respuesta por defecto si no se encuentra ninguna coincidencia
        respuesta = `Lo siento, no tengo información específica sobre esa consulta. El Cupra Tavascan es un SUV eléctrico con una autonomía de hasta 510 km, potencia de hasta 340 CV y un precio desde 49,900€. ¿Hay algo específico que quieras saber sobre su precio, autonomía, equipamiento o características?`;
      }
  
      // Devolver la respuesta
      return res.status(200).json({ 
        text: respuesta,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      return res.status(500).json({ error: 'Error en el servidor', details: error.message });
    }
  }