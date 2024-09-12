import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
//apiHelper
import { ADMIN_ALL_USER_URL, ADMIN_USER_DELETE_URL } from "../../../apiHelper";
//css
import styles from "../../user/saved-quote/saved-quote.module.scss";
//components
import ToastView from "../../../components/Toast";

const AllUser = () => {
  const token = sessionStorage.getItem("token");
  const [user, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(false);
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      await axios
        .get(ADMIN_ALL_USER_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUsers(res.data.result);
        })
        .catch((error) => {
          setToast(true);
          setSuccess(false);
          setMessage("Something is Wrong!");
        });
    } catch (error) {
      setToast(true);
      setSuccess(false);
      setMessage("Something is Wrong!");
    }
  };
  useEffect(() => {
    if (location.state) {
      const { response } = location.state;
      setSuccess(true);
      setToast(true);
      setMessage(response);
    }
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios
        .delete(`${ADMIN_USER_DELETE_URL}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setToast(true);
          setSuccess(true);
          setMessage(res.data.result.successful);
          fetchData();
        })
        .catch((error) => {
          setToast(true);
          setSuccess(false);
          setMessage("something is wrong");
        });
    } catch (error) {
      setToast(true);
      setSuccess(false);
      setMessage("something is wrong!!");
    }
  };

  return (
    <div className={`${styles.container} p-2`}>
      <h5>All Users</h5>
      <div className={`${styles.tableContainer}`}>
        <Table className={`${styles.table}`} responsive>
          <thead>
            <tr>
              <th>User Id</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Company Name</th>
              <th>Phone Number</th>
              <th>Verification</th>
              <th>Last logged In</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {user
              ? user.map((item: any, index) => {
                  return (
                    <tr key={item._id}>
                      <td>
                        <a href="">{item._id}</a>
                      </td>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.companyName}</td>
                      <td>{item.number}</td>
                      <td>{item.verification ? "yes" : "no"}</td>
                      <td>{item.lastLoggedIn}</td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => {
                            navigate(`/admin/all-users/update/${item._id}`);
                          }}
                        >
                          Update
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
          {toast ? (
            <ToastView
              message={message}
              success={success}
              setToast={setToast}
            />
          ) : (
            ""
          )}
        </Table>
      </div>
    </div>
  );
};

export default AllUser;
