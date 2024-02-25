
import logo from "./logo.svg";
import "./App.css";
import MyForm from "./frontEndFile/form";
import storage from "./DataFile/Data";
import { useEffect, useState } from "react";

function App() {
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    const custList = storage.readAllItems();
    console.log(custList)
    setCustomerList(custList);
  }, []);

  const deleteCustomer = (email) => {
    storage.deleteItem(email);
    const updatedList = customerList.filter(
      (customer) => customer.email !== email
    );
    setCustomerList(updatedList);
  };

  const updateCustomer = (updatedCustomer) => {
    const updatedList = customerList.map((customer) => {
      if (customer.email === updatedCustomer.email) {
        return updatedCustomer;
      }
      return customer;
    });
    setCustomerList(updatedList);
  };

  const addCustomer = (newCustomer) => {
    storage.insertItem(
      newCustomer.name,
      newCustomer.email,
      newCustomer.city,
      newCustomer.age,
      newCustomer.role
    );
    setCustomerList([...customerList, newCustomer]);
  };

  return (
    <div className="App">
      <MyForm
        onDelete={deleteCustomer}
        onUpdate={updateCustomer}
        onAdd={addCustomer}
      />
    </div>
  );
}

export default App;
