function Filters({ setFiltered }) {
  const onHandleChange = (e) => {
    setFiltered(e.target.value);
  };
  return (
    <div className="filtros sombra contenedor">
      <form action="">
        <div className="campo">
          <label htmlFor="filterCat">Filtrar Gastos</label>
          <select
            name="filterCat"
            id="filterCat"
            onChange={(e) => onHandleChange(e)}
          >
            <option value="">Todos</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="varios">Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default Filters;
