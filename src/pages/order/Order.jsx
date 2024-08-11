import { useState } from "react";
import "./order.css";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    const res = await axios.get(url + "/api/order/list");
    if (res.data.success) {
      setOrders(res.data.data);
    } else {
      toast("error");
    }
  };

  const statusHandler = async (event, orderId) => {
    const selectedStatus = event?.target?.value;

    if (!selectedStatus) {
      console.error('Selected status is undefined');
      return;
    }
    
    console.log(event);
    const res = await axios.post(url + "/api/order/status", {
      status: selectedStatus,
      orderId,
    });
    if (res.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
    statusHandler();
  }, []);

  return (
    <div className="order add">
      <h2>Orders Page</h2>
      <div className="order-list">
        {orders.map((orders, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {" "}
                {orders.items.map((item, index) => {
                  if (index === orders.items.length - 1) {
                    return item.name + "x" + item.quantity;
                  } else {
                    return item.name + "x" + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {orders.address.firstname + " " + orders.address.lastname}
              </p>
              <div className="order-item-address">
                {orders.address.street}
                <p>
                  {orders.address.city +
                    " " +
                    orders.address.state +
                    " " +
                    orders.address.country +
                    " " +
                    orders.address.zipcode}
                </p>
              </div>
              <p className="order-item0-phone">{orders.address.phone}</p>
            </div>
            <p>Items:{orders.items.length}</p>
            <p>${orders.amounnt}</p>
            <select
              onChange={(event) => statusHandler(event, orders._id)}
              value={orders.status}
            >
              <option value="food processing">food processing</option>
              <option value="out for delivery">out for delivery</option>
              <option value="delivered">delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
