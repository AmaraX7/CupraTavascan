const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();

// Configurar CORS para permitir solo solicitudes desde localhost (o tu dominio de producción)
app.use(cors({
    origin: 'http://localhost:5500', // Ajusta según el puerto donde sirves el HTML
}));
app.use(express.json());

// Inicializar OpenAI con la clave de la API
const openai = new OpenAI({
    apiKey: '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'
});
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

// Endpoint para manejar las consultas del chatbot
app.post('/chat', async (req, res) => {
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
                        Eres un asistente virtual especializado en el Cupra Tavascan. Responde de manera concisa y amigable.
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

        res.json({ reply: response.choices[0].message.content.trim() });
    } catch (err) {
        console.error('Error en la API de OpenAI:', err);
        res.status(500).json({ reply: 'Error al contactar a la API. Inténtalo de nuevo.' });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));