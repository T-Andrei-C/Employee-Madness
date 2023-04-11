import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EquipmentTable/EquipmentTable.jsx";

const fetchEquipment = () => {
  return fetch("/api/equipment").then((res) => res.json());
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipment/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EquipmentList = () => {
  let [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copyEquipment, setCopyEquipment] = useState(null)

  const handleDelete = (id) => {
    deleteEquipment(id);

    setEquipment((equipment) => {
      return equipment.filter((equipt) => equipt._id !== id);
    });
  };

  useEffect(() => {
    fetchEquipment()
      .then((employees) => {
        setLoading(false);
        setEquipment(employees);
        setCopyEquipment(employees);
      })
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <EquipmentTable equipment={equipment} onDelete={handleDelete} />
    </>
  );
};

export default EquipmentList;
