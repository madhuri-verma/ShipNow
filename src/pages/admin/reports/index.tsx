import { useEffect, useState } from "react";
import axios from "axios";
//apiHelper
import { ADMIN_REPORT } from "../../../apiHelper";
//css
import styles from "../../user/saved-quote/saved-quote.module.scss";

const Reports = () => {
  const token = sessionStorage.getItem("token");
  const [report, setReport] = useState({
    totalUser: "",
    totalShipment: "",
    totalTransection:"",
    totalAmount:""
  });
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      await axios
        .get(ADMIN_REPORT, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res)
          setReport({
            ...res.data.report,
          });
        })
        .catch((error) => {});
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`${styles.container} p-2`}>
      <h5>Reports</h5>
      <div className={`${styles.tableContainer}`}>
        {message ? <h5>{message}</h5> : ""}
        {report && (
          <div>
            <p>Total Users: {report.totalUser}</p>
            <p>Total Shipments: {report.totalShipment}</p>
            <p>Total Transactions: {report.totalTransection}</p>
            <p>Total Amount: {report.totalAmount}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
