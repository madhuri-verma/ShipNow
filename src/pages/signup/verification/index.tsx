import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
//apiHelper
import { EMAIL_VERIFICATION } from "../../../apiHelper";

const Verification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const verifyToken = async () => {
    try {
      await axios
        .get(`${EMAIL_VERIFICATION}${token}`)
        .then((res) => {
          console.log(res, "res-ver");
          navigate("/login", {
            state: { response: res.data.result.message },
          });
        })
        .catch((err) => {
          console.log(err, "err-ver");
          navigate("/home", {
            state: { response: err.message },
          });
        });
    } catch (error) {
      navigate("/home", {
        state: { response: "Something went Wrong!" },
      });
    }
  };
  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <>
      <div className="spinner">
        <h5>Please Wait! Verifying Your Email..</h5>
        <Spinner animation="grow" variant="info" />
      </div>
    </>
  );
};

export default Verification;
