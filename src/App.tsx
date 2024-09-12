import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//CSS
import "./App.scss";
import { AllRoutes } from "./AllRoutes";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const stripePromise = loadStripe(
    "pk_test_51Nyp2MSEFNfmm69lzDSjhXtfV6mvTGiRubm5kMYqz1RsU2fWCgkkLxCfXs1qdPV79IcrG46549AxFexHwP2gjZ3U00BbuT7I2p"
  );
  return (
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </Elements>
  );
}

export default App;
