import React from 'react';
import {Route, Redirect} from 'react-router-dom';
const pageNotFoundRedirect = ({component: Component, ...props}) => {

  const url_departamentos = ["amazonas", "ancash", "apurimac", "arequipa", "ayacucho", "cajamarca", "callao", "cusco", "huancavelica", "huanuco", "ica", "junin", "la-libertad", "lambayeque", "lima", "loreto", "madre-de-dios", "moquegua", "pasco", "piura", "puno", "san-martin", "tacna","tumbes", "ucayali"];

  const pathDepartamento = window.location.pathname.slice(14);

  return (
    <Route {...props} render={props => url_departamentos.includes(pathDepartamento)
      ?
      <Component {...props}></Component>
      :
      <Redirect to="/pagenotfound"></Redirect>
    }></Route>
  )
}
export default pageNotFoundRedirect