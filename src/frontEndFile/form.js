import React, { useState } from "react";
import storage from "../DataFile/Data";

const MyForm = ({ onAdd, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    city: "",
    age: "",
  });

  const [displayMessage, setdisplayMessage] = useState("");
  const [customerList, setCustomerList] = useState([]);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendData = () => {
    const { name, email, role, city, age } = formData;
    const existingData = storage.readItem(email);
    if (existingData) {
      setdisplayMessage("Bu email ile zaten kayıt yapılmış.");
    } else {
      setdisplayMessage("Data Kaydedilirken Sabırlı Ol Lütfen");
      storage.insertItem(name, email, city, age, role);
      setCustomerList([...customerList, formData]);
      onAdd(formData);
      setdisplayMessage("Bienvenue a la Matrix!, kaydettim kaydettim rahat ol");
      setTimeout(() => {
        setdisplayMessage("");
      }, 3000);
    }
  };

  const deleteData = () => {
    const { email } = formData;
    setdisplayMessage("Data Silinirken Sabırlı Ol Lütfen");
    setTimeout(() => {
      storage.deleteItem(email);
      onDelete(email); // Callback to delete data
      setFormData({
        name: "",
        email: "",
        role: "",
        city: "",
        age: "",
      });
      setdisplayMessage("Gelin olmuş gidiyorsun...");
      setTimeout(() => {
        setdisplayMessage("");
      }, 3000);
    }, 3000); // 3000 milliseconds = 3 seconds timeout
  };

  const updateData = () => {
    const { email } = formData;
    const existingData = storage.readItem(email);
    if (existingData) {
      setdisplayMessage("Data Güncellenirken Sabırlı Ol Lütfen");
      storage.updateItem(email, formData);
      onUpdate(formData);
    } else {
      setdisplayMessage("Email ile eşleşen bir kayıt bulunamadı.");
    }
    setTimeout(() => {
      setdisplayMessage("Data Güncellendi sahip");
      setTimeout(() => {
        setdisplayMessage("");
      }, 3000);
    }, 3000);
  };

  const myMetaForm = ["name", "email", "role", "city", "age"];
  // const isDataPresent = Object.values(formData).some((value) => value !== ""); YAPAMADIM Bİ ALLAHIMM!!
  const isDataPresent = !!storage.readItem(formData.email);

  return (
    <form>
      {myMetaForm.map((fieldName, index) => (
        <div key={index}>
          <p>
            <label>
              {fieldName}:
              <input
                name={fieldName}
                type={
                  typeof formData[fieldName] === "number" ? "number" : "text"
                }
                value={formData[fieldName]}
                onChange={handleInputChange}
              />
            </label>
          </p>
        </div>
      ))}
      {isDataPresent ? (
        <>
          <button type="button" onClick={updateData}>
            Güncelle
          </button>
          <button type="button" onClick={deleteData}>
            Sil
          </button>
        </>
      ) : (
        <button type="button" onClick={sendData}>
          Kaydet
        </button>
      )}
      <div>{displayMessage}</div>
    </form>
  );
};

export default MyForm;
