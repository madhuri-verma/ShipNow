import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
//apiHelper
import { USER_DELETE_URL } from "../../../../apiHelper/index";

const DeleteUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  useEffect(() => {
    const verifyToken = async () => {
      await axios
        .delete(`${USER_DELETE_URL}${token}`)
        .then((res) => {
          navigate(`/login`, {
            state: { response: res.data.result.deleted },
          });
        })
        .catch((err) => {
          navigate("/home/letter-selection", {
            state: { response: err.response.data },
          });
        });
    };

    verifyToken();
  }, [token]);

  return (
    <>
      <div className="spinner">
        <h5>Please Wait! deleting your account..</h5>
        <Spinner animation="grow" variant="info" />
      </div>
    </>
  );
};

export default DeleteUser;
