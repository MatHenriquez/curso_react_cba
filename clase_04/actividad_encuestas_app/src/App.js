import React, { useState } from "react";
// Componentes de las páginas
import Encuestas from "./components/Encuestas";

function App() {
  // Estado para rastrear las encuestas
  const encuestasDeEjemplo = [
    {
      id: 1,
      pregunta: "¿Cuál es tu color favorito?",
      opciones: ["Rojo", "Azul", "Verde"],
    },
    {
      id: 2,
      pregunta: "¿Cuál es tu comida favorita?",
      opciones: ["Pizza", "Hamburguesa", "Sushi"],
    },
  ];

  const [encuestas] = useState(encuestasDeEjemplo);

  return (
    <div className="App">
      <h1>Aplicación de Encuestas</h1>
      {/* Contenido de las páginas */}
      <Encuestas encuestas={encuestas} />
    </div>
  );
}
export default App;
