import { useState } from "react";
import Mensaje from "./Mensaje";
export default function NewBudget({ presupuesto, setPresupuesto, setValid }) {
  const [mensaje, setMensaje] = useState("");
  const handleChange = (e) => {
    setPresupuesto(e.target.value);
  };

  const handlePresupuesto = (e) => {
    e.preventDefault();
    if (!Number(presupuesto) || presupuesto < 0) {
      setMensaje("No es un presupuesto válido");
      return
    } 
    setMensaje('')
    setValid(true);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handlePresupuesto} action="" className="formulario">
        <div className="campo">
          <label htmlFor="presupuesto">Definir presupuesto</label>
          <input
            type="number"
            name=""
            placeholder="0"
            value={presupuesto}
            onChange={(e) => handleChange(e)}
            id="presupuesto"
            className="nuevo-presupuesto"
          />
          <input type="submit" value="Añadir" />
          {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </div>
      </form>
    </div>
  );
}
