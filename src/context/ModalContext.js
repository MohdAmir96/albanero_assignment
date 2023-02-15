import { createContext, useState, useContext } from "react";
import Papa from "papaparse";
export const ModalContext = createContext();
function ModalProvider({ children }) {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [showDownloadBtn, setShownLoadBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleFileUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event) => {
      const csvData = event.target.result;
      const rows = csvData.split("\n");
      const headers = rows[0].split(",");
      const data = [];
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(",");
        if (row.length === headers.length) {
          const obj = {};
          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = row[j];
          }
          data.push(obj);
        }
      }
      console.log(data);
      setData(data);
      setHeaders(headers);
      setShownLoadBtn(true);
      setLoading(false);
    };
  };

  const handleDownload = () => {
    const csvData = Papa.unparse({
      fields: headers,
      data: data,
    });
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleDelete = (index) => {
    setData(data.filter((item, i) => i !== index));
  };
  const handleEdit = (index) => {
    setEditRow(index);
    setModalData(data[index]);
    setShowModal(true);
  };
  const handleHeaderEdit = (index) => {
    setEditRow(index);
    setModalData(headers[index]);
    setShowModal(true);
  };

  const handleSave = () => {
    setData(
      data.map((row, i) => {
        if (i === editRow) {
          return modalData;
        }
        return row;
      })
    );
    setShowModal(false);
  };

  const handleModalDataChange = (e) => {
    console.log(e.target);
    setModalData({
      ...modalData,
      [e.target.name]: e.target.value,
    });
  };
  const handleHeaderModalDataChange = (e) => {
    console.log(e.target);
    setModalData({
      ...modalData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ModalContext.Provider
      value={{
        data,
        setData,
        headers,
        setHeaders,
        editRow,
        setEditRow,
        showModal,
        setShowModal,
        modalData,
        setModalData,
        handleDelete,
        handleDownload,
        handleEdit,
        handleFileUpload,
        handleModalDataChange,
        handleSave,
        showDownloadBtn,
        handleHeaderEdit,
        loading,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
export function useModalContext() {
  return useContext(ModalContext);
}
