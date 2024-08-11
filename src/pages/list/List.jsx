import "./list.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const List = ({url}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const res = await axios.get(`${url}/api/food/allFood`);
    if (res.data.success) {
      setList(res.data.foodList);
    } else {
      toast.error("error fetching the data");
    }
  };

  const removeFood = async (foodId) => {
    const res = await axios.post(`${url}/api/food/delFood/`, {
      id: foodId,
    });
    
    fetchList();
    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error("error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>image</b>
          <b>name</b>
          <b>category</b>
          <b>price</b>
          <b>action</b>
        </div>
        {list &&
          list.map((item, index) => {
            return (
              <div key={index} className="list-table-format">
                <img src={`${url}/image/` + item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p className="cursor" onClick={() => removeFood(item._id)}>
                  x
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default List;
