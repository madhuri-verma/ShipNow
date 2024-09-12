import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
//css
import styles from "./home.module.scss";
//assets
import background from "../../assets/homeBackground.jpg";
//react-icons
import { BsEnvelope } from "react-icons/bs";
import { LuPackage2 } from "react-icons/lu";
//nav-layout
import Layout from "../../layout/NavLayout";
//components
import ToastView from "../../components/Toast";
import { LetterSelectionGuest } from "./letterSelectionGuest";
import { PackageSelectionGuest } from "./packageSelectionGuest";

const Home = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [letterActive, setLetterActive] = useState(true);
  const [packageActive, setPackageActive] = useState(false);
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      const { response } = state;
      setSuccess(true);
      setToast(true);
      setMessage(response);
    }
  }, [state]);
  return (
    <Layout>
      <div
        className={`${styles.container}`}
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className={`${styles.overlay}`}></div>
        <div className={`${styles.shipmentContainer}`}>
          <div className={`${styles.heading}`}>
            <h3>Book a shipment instantly</h3>
            <pre>
              The fast and easy shipping solution for your business. Get your
              quote in seconds today
            </pre>
          </div>
          <div className={`${styles.shipmentForm} `}>
            <ul>
              <button
                className={`${isActive ? styles.active : ""}`}
                onClick={() => {
                  setLetterActive(true);
                  setPackageActive(false);
                  setIsActive(true);
                }}
              >
                <BsEnvelope /> Letter
              </button>
              <button
                className={isActive ? "" : styles.active}
                onClick={() => {
                  setLetterActive(false);
                  setPackageActive(true);
                  setIsActive(false);
                }}
              >
                <LuPackage2 /> Package
              </button>
            </ul>
            {letterActive && <LetterSelectionGuest />}
            {packageActive && <PackageSelectionGuest />}
            {/* <Outlet /> */}
          </div>
        </div>
        {toast ? (
          <ToastView message={message} success={success} setToast={setToast} />
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
};

export default Home;
