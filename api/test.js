// Este es un archivo de prueba simplificado para verificar que las API routes funcionan
// Crear en pages/api/test.js

export default function handler(req, res) {
    console.log('TEST API EJECUTADA:', new Date().toISOString());
    console.log('MÉTODO:', req.method);
    console.log('QUERY:', JSON.stringify(req.query));
    console.log('BODY:', JSON.stringify(req.body));
    
    // Responder con información de diagnóstico
    res.status(200).json({
      message: 'API de prueba funcionando correctamente',
      method: req.method,
      query: req.query,
      body: req.body,
      env_check: process.env.OPENAI_API_KEY ? 'API_KEY está configurada' : 'API_KEY NO está configurada',
      timestamp: new Date().toISOString()
    });
  }