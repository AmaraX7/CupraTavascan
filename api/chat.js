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

// Inicializar OpenAI con la clave de la API directamente en el código
const openai = new OpenAI({
    apiKey: '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'});

export default async function handler(req, res) {
    console.log('---- INICIO DE /api/chat ----');

    // Solo permitir método POST
    if (req.method !== 'POST') {
        console.log('Método no permitido:', req.method);
        return res.status(405).json({ error: 'Método no permitido', allowedMethods: ['POST'] });
    }

    try {
        console.log('---- SOLICITUD A /api/chat ----');
        console.log('Headers:', JSON.stringify(req.headers, null, 2));
        console.log('Body:', JSON.stringify(req.body, null, 2));

        // Verificar el cuerpo de la solicitud
        const { message } = req.body;
        if (!message) {
            console.log('Error: Falta el campo "message" en el body');
            return res.status(400).json({ error: 'Se requiere un campo "message" en el body' });
        }

        try {
            console.log('Enviando solicitud a OpenAI con message:', message);
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
                        content: message,
                    },
                ],
                max_tokens: 150,
                temperature: 0.7,
            });

            console.log('Respuesta de OpenAI recibida:', response.choices[0].message.content);
            return res.status(200).json({
                text: response.choices[0].message.content.trim(),
                timestamp: new Date().toISOString()
            });

        } catch (processingError) {
            console.error('Error en la API de OpenAI:', processingError.message);
            if (processingError.response) {
                console.error('Detalles del error:', processingError.response.data);
            }
            return res.status(500).json({
                error: 'Error al contactar a la API de OpenAI',
                details: processingError.message
            });
        }

    } catch (error) {
        console.error('Error no manejado en /api/chat:', error);
        return res.status(500).json({
            error: 'Error interno del servidor',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}