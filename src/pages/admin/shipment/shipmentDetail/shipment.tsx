import axios from "axios";
import { useState, useEffect } from "react";
import { ADMIN_SHIPMENT_DETAIL_URL } from "../../../../apiHelper";
//CSS
import styles from "../../../user/accountSetting/setting.module.scss";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import ToastView from "../../../../components/Toast";
//apiHelper

const ShipmentDetail: React.FC = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(false);
  const { id } = useParams();
  const [shipment, setShipment] = useState({
    fromCity: "",
    fromPostal: "",
    payment: "",
    serviceName: "",
    status: "",
    toCity: "",
    toPostal: "",
  });

  const token = sessionStorage.getItem("token");
  const fetchData = async () => {
    try {
      await axios
        .get(`${ADMIN_SHIPMENT_DETAIL_URL}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res)
          setShipment({ ...res.data.result[0] });
        })
        .catch((err) => {
          setToast(true);
          setSuccess(false);
          setMessage(err.data.response.error);
        });
    } catch (error) {
      setToast(true);
      setSuccess(false);
      setMessage("Something is wrong!");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`${styles.container}`}>
      <form className={`${styles.content} d-flex-r `}>
        <div className={`${styles.info}`}>
          <h4>Shipment</h4>
          {shipment && (
            <div>
              <p>From City: {shipment.fromCity}</p>
              <p>From Postal: {shipment.fromPostal}</p>
              <p>Payment: {shipment.payment}</p>
              <p>Service Name: {shipment.serviceName}</p>
              <p>Status: {shipment.status}</p>
              <p>To Postal: {shipment.toCity}</p>
              <p>To Postal: {shipment.toPostal}</p>
            </div>
          )}
          <NavLink to={"/admin/all-shipment"}>View All Shipment</NavLink>
        </div>
      </form>
      {toast ? (
        <ToastView message={message} success={success} setToast={setToast} />
      ) : (
        ""
      )}
    </div>
  );
};
export default ShipmentDetail;
