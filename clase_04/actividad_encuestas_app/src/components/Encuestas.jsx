import React from "react";

function Encuestas({ encuestas }) {
  return (
    <div>
      <h2>Encuestas Disponibles</h2>
      <ul className={encuestas}>
        {encuestas.map((encuesta) => (
          <li key={encuesta.id}>
            {encuesta.pregunta}
            <ul>
              {encuesta.opciones.map((opcion) => (
                <li key={opcion.id}>{opcion}</li>
              ))}
            </ul>
          </li>
        ))}
        <ul className="background-color: red;"></ul>
      </ul>
    </div>
  );
}

export default Encuestas;
