import { useState, useEffect } from "react";
// grafica circular
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ControlBudget({
  presupuesto,
  setPresupuesto,
  setSpends,
  setValid,
  spends = [],
}) {
  const [disponible, setDisponible] = useState(0);
  const [spended, setSpended] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const resetApp = () => {
    const result = confirm('¿Quieres reiniciar presupuesto y gastos?')
    if(result){
      setPresupuesto(0);
      setSpends([]);
      setValid(false);
    }
  };

  const formatEuro = (cantidad) => {
    const formatoEuro = new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    });
    return formatoEuro.format(cantidad);
  };
  useEffect(() => {
    const totalSpended = spends.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );

    setSpended(totalSpended);
    setDisponible(presupuesto - totalSpended);
    const newPercentage = ((presupuesto - disponible) / presupuesto) * 100;

    setTimeout(() => {
      setPercentage(newPercentage);
    }, 500);
  }, [spends, presupuesto, disponible]);

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: `${disponible > 0 ? "#3B82F6" : "#b02323"}`,
            trailColor: "#F5F5F5",
            textColor: "#3B82F6",
          })}
          value={percentage}
          text={`${percentage.toFixed(2)}% Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button type="button" className="reset-app" onClick={resetApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {formatEuro(presupuesto)}
        </p>
        <p>
          <span>Disponible: </span> {formatEuro(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatEuro(spended)}
        </p>
      </div>
    </div>
  );
}
