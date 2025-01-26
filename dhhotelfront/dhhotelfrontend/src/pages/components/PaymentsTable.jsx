import React, { useEffect, useState } from "react";

const PaymentsTable = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/payments/");
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  return (
    <div className="table-container">
      <h2>Pagos</h2>
      <div className="container-specific">
        <button className="buttons-specific">Crear nuevo pago</button>
        <button className="buttons-specific">Editar pago</button>
        <button className="buttons-specific">Editar estado</button>
        <button className="buttons-specific">Eliminar pago</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Fecha de Pago</th>
            <th>Método</th>
            <th>Estado</th>
            <th>Nombre cliente</th>
            <th>Apellido cliente</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.idPayment}>
              <td>{payment.amount}</td>
              <td>{payment.paymentDate}</td>
              <td>{payment.paymentMethod}</td>
              <td>{payment.state}</td>
              <td>{payment.user_name}</td>
              <td>{payment.client_lastname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsTable;