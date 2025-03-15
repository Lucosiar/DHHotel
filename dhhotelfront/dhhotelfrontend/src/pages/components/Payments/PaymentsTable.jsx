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

    <div className="container-specific m-5">
      <button className="buttons-specific">Crear nuevo pago</button>
      <button className="buttons-specific">Editar pago</button>
      <button className="buttons-specific">Editar estado</button>
      <button className="buttons-specific">Eliminar pago</button>
    </div>

    <table className="w-full border-0">
      <thead className="bg-indigo-700 text-white rounded-t-lg">
        <tr>
          <th className="p-2 first:rounded-tl-lg last:rounded-tr-lg border-0">Cantidad</th>
          <th className="p-2 border-0">Fecha de Pago</th>
          <th className="p-2 border-0">Método</th>
          <th className="p-2 border-0">Estado</th>
          <th className="p-2 border-0">Nombre cliente</th>
          <th className="p-2 last:rounded-tr-lg border-0">Apellido cliente</th>
        </tr>
      </thead>
      <tbody className="bg-gray-800 text-white">
        {payments.map((payment) => (
          <tr key={payment.idPayment}>
            <td className="border-0">{payment.amount}</td>
            <td className="border-0">{payment.paymentDate}</td>
            <td className="border-0">{payment.paymentMethod}</td>
            <td className="border-0">
              <div>
                <span
                  className="status-circle"
                  style={{
                    backgroundColor:
                      payment.state === "confirmada"
                        ? "green"
                        : payment.state === "pendiente"
                        ? "yellow"
                        : "red",
                  }}
                ></span> 
                {payment.state}
              </div>
            </td>
            <td className="border-0">{payment.user_name}</td>
            <td className="border-0">{payment.client_lastname}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default PaymentsTable;