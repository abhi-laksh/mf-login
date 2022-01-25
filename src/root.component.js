import Form from "./components/Form";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";

export default function Root(props) {
  return (
    <BrowserRouter>
      <Form
      />
    </BrowserRouter>

  );
}
