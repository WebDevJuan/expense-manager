// components
import Spend from "./Spend";

export default function ListSpends({ spends, setEditSpend, removeSpend }) {
  const arrayReverse = spends.reverse();
  return (
    <div className="listado-gastos contenedor">
      {spends ? <h2 id="listadoGastos">Listado gastos</h2> : <h2>No hay gastos</h2>}
      {arrayReverse.map((spend) => {
        return (
          <Spend
            key={spend.id}
            spend={spend}
            setEditSpend={setEditSpend}
            removeSpend={removeSpend}
          />
        );
      })}
    </div>
  );
}
