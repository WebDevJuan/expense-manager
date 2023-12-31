// components
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ListSpends from "./components/ListSpends";
import Filters from "./components/Filters";

// helpers
import { scrollToElement } from "./utils.jsx/utils";

// img
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
// import { scrollToElement } from "./utils.jsx/utils";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto") ?? 0)
  );
  const [spends, setSpends] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );
  const [valid, setValid] = useState(false);
  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [editSpend, setEditSpend] = useState({});
  const [filtered, setFiltered] = useState("");
  const [listFiltered, setListFiltered] = useState([]);

  useEffect(() => {
    if (Object.keys(editSpend).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimateModal(true);
      }, 300);
    }
  }, [editSpend]);

  const handleNewSpending = () => {
    // scrollToElement("planificador")
    setModal(true);
    setTimeout(() => {
      setAnimateModal(true);
    }, 300);
  };

  const removeSpend = (id) => {
    setSpends((prevArray) => prevArray.filter((obj) => obj.id !== id));
  };

  const saveSpend = (spendSaved, objEdiatable) => {
    if (objEdiatable) {
      setSpends((prevArray) =>
        prevArray.map((obj) => (obj.id === spendSaved.id ? spendSaved : obj))
      );
    } else {
      setSpends([...spends, spendSaved]);
    }
    // Cerrar el modal después de meter un gasto
    setAnimateModal(false);
    setTimeout(() => {
      setModal(false);
    }, 300);
    setEditSpend({});
  };

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(spends) ?? []);
  }, [spends]);

  useEffect(() => {
    if (Number(localStorage.getItem("presupuesto")) > 0) {
      setValid(true);
    }
  }, []);

  useEffect(() => {
    if (filtered !== "") {
      const spendsFil = spends.filter((sp) => sp.categoria === filtered);
      setListFiltered(spendsFil);
      scrollToElement("listadoGastos");
    } else {
      setListFiltered(spends);
    }
  }, [filtered, spends]);

  console.log(listFiltered);

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        spends={spends}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        valid={valid}
        setValid={setValid}
        setSpends={setSpends}
      />

      {valid && (
        <>
          <Filters setFiltered={setFiltered} filtered={filtered} />
          <main>
            <ListSpends
              spends={listFiltered}
              setEditSpend={setEditSpend}
              removeSpend={removeSpend}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNewSpending}
            />
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          saveSpend={saveSpend}
          editSpend={editSpend}
          setEditSpend={setEditSpend}
        />
      )}
    </div>
  );
}

export default App;
