const { OpenAI } = require('openai');

// Información del Cupra Tavascan para el contexto
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

// Inicializar OpenAI con la clave de la API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ reply: 'Método no permitido.' });
    }

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ reply: 'Por favor, envía una consulta.' });
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: `
                        Eres un asistente virtual especializado en el Cupra Tavascan. Responde de manera concisa y amigable en español.
                        Información sobre el Cupra Tavascan:
                        - Modelo: ${cupraTavascanInfo.modelo}
                        - Precio: ${cupraTavascanInfo.precio}
                        - Autonomía: ${cupraTavascanInfo.autonomia}
                        - Batería: ${cupraTavascanInfo.bateria}
                        - Potencia: ${cupraTavascanInfo.potencia}
                        - Aceleración: ${cupraTavascanInfo.aceleracion}
                        - Colores disponibles: ${cupraTavascanInfo.colores.join(', ')}
                        - Garantía: ${cupraTavascanInfo.garantia}
                        - Carga: ${cupraTavascanInfo.carga}
                        - Equipamiento: ${cupraTavascanInfo.equipamiento}
                    `,
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            max_tokens: 150,
            temperature: 0.7,
        });

        res.status(200).json({ reply: response.choices[0].message.content.trim() });
    } catch (err) {
        console.error('Error en la API de OpenAI:', err);
        res.status(500).json({ reply: 'Error al contactar a la API. Inténtalo de nuevo.' });
    }
};
