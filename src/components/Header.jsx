// components
import NewBudget from "./NewBudget";
import ControlBudget from "./ControlBudget";
export default function Header({
  presupuesto,
  setPresupuesto,
  valid,
  setValid,
  spends,
  setSpends,
}) {
  return (
    <header id="planificador">
      <h1 className="encabezado">Planificador de gastos</h1>
      {valid ? (
        <ControlBudget
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setSpends={setSpends}
          setValid={setValid}
          spends={spends}
        />
      ) : (
        <NewBudget
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setValid={setValid}
        />
      )}
    </header>
  );
}
