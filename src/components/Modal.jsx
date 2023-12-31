import { useState, useEffect } from "react";
// components
import Mensaje from "./Mensaje";
// img
import CerrarBtn from "../img/cerrar.svg";
// utils
import { generateId } from "../utils.jsx/utils";

const initialForm = {
  nombre: "",
  cantidad: 0,
  categoria: "",
};
 function Modal({
  setModal,
  animateModal,
  setAnimateModal,
  saveSpend,
  editSpend,
  setEditSpend,
}) {
  const [data, setData] = useState(initialForm);
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios");
      setTimeout(() => {
        setMensaje("");
      }, 5000);
      return;
    }

    setMensaje("");

    const newDate = new Date();

    const objEdiatable = Object.keys(editSpend).length > 0;
    const newObj = () => {
      if (objEdiatable) {
        return {
          nombre: data.nombre,
          cantidad: Number(data.cantidad),
          categoria: data.categoria,
          fecha: newDate,
          id: editSpend.id,
        };
      } else {
        return {
          nombre: data.nombre,
          cantidad: Number(data.cantidad),
          categoria: data.categoria,
          fecha: newDate,
          id: generateId(),
        };
      }
    };
    saveSpend(newObj(), objEdiatable);
  };

  const { nombre, cantidad, categoria } = data;

  const ocultarModal = () => {
    setAnimateModal(false);
    setTimeout(() => {
      setModal(false);
    }, 300);
    setEditSpend({});
  };

  // useeffect que se utiliza para inf el gasto editable
  useEffect(() => {
    if (Object.keys(editSpend).length > 0) {
      setData({
        nombre: editSpend.nombre,
        cantidad: editSpend.cantidad,
        categoria: editSpend.categoria,
      });
    }
  }, []);

  return (
    <div className="modal">
      <div className="cerrar-modal" onClick={ocultarModal}>
        <img src={CerrarBtn} alt="cerrar modal" />
      </div>
      <form
        id="formualario"
        onSubmit={handleSubmit}
        action=""
        className={`formulario ${animateModal ? "animar" : "cerrar"}`}
      >
        <legend>{editSpend.nombre ? "Editar gasto" : "Añadir gasto"}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Titulo</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Gasto"
            value={nombre}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            name="cantidad"
            id="cantidad"
            value={cantidad}
            placeholder="100"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoría</label>
          <select
            name="categoria"
            id="categoria"
            value={categoria}
            onChange={(e) => handleChange(e)}
          >
            <option value="">--Seleccione</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="varios">Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input type="submit" value="Añadir gasto" />
      </form>
    </div>
  );
}


export default Modal;