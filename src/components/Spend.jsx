import { formatDate } from "../utils.jsx/utils";
// swipeable
import {
  LeadingActions,
  SwipeAction,
  SwipeableList,
  SwipeableListItem,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

// icons
import IconoAhorro from "../img/icono_ahorro.svg";
import IconoCasa from "../img/icono_casa.svg";
import IconoComida from "../img/icono_comida.svg";
import IconoGastos from "../img/icono_gastos.svg";
import IconoOcio from "../img/icono_ocio.svg";
import IconoSalud from "../img/icono_salud.svg";
import IconoSuscripciones from "../img/icono_suscripciones.svg";

const dictionaryIcons = {
  ahorro: IconoAhorro,
  comida: IconoComida,
  casa: IconoCasa,
  varios: IconoGastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  suscripciones: IconoSuscripciones,
};

export default function Spend({ spend, setEditSpend, removeSpend }) {
  const leadingActions = () => (
  <LeadingActions>
    <SwipeAction onClick={() => setEditSpend(spend)}>
      Editar
    </SwipeAction>
  </LeadingActions>
  )
  const trailingActions = () =>(
    <TrailingActions>
      <SwipeAction onClick={() => removeSpend(spend.id)}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
    )

  return (
    <SwipeableList>
      <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={dictionaryIcons[spend.categoria]} alt="icono del gasto" />
            <div className="descripcion-gasto">
              <p className="categoria">{spend.categoria}</p>
              <p className="nombre-gasto">{spend.nombre}</p>
              <p className="fecha-gasto">
                <span>{formatDate(spend.fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">{spend.cantidad} €</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}
