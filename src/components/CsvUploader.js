import React, { useState } from "react";
import "./CsvUploader.css";
import { useModalContext } from "../context/ModalContext";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function CsvUploader() {
  const [headerEdit, setHeaderEdit] = useState(false);

  const {
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
  } = useModalContext();
  console.log(">>>>>>>>", headers);

  return (
    <div className="csv-upload-container">
      <h2>CSV Uploader</h2>
      <div
        style={{
          width: "95%",
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "10px",
        }}
      >
        <input
          style={{ marginBottom: "20px" }}
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
        />
        {showDownloadBtn && (
          <button
            style={{ marginTop: "20px" }}
            className="btn"
            onClick={handleDownload}
          >
            Download CSV
          </button>
        )}
      </div>

      {
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={header}>{header} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={header}>{row[header]}</td>
                ))}
                <td style={{ width: "150px" }}>
                  <span onClick={() => handleEdit(index)}>
                    <FaRegEdit
                      style={{
                        scale: "1.5",
                        margin: "10px",
                        cursor: "pointer",
                      }}
                    />
                  </span>
                  <span onClick={() => handleDelete(index)}>
                    <MdDelete
                      style={{
                        scale: "1.5",
                        margin: "10px",
                        cursor: "pointer",
                      }}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }

      {showModal && (
        <div className="edit_modal">
          {headers.map((header) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px",
              }}
              key={header}
            >
              <label htmlFor={header}>{header}:</label>

              <input
                type="text"
                name={header}
                id={header}
                value={modalData[header]}
                onChange={handleModalDataChange}
                style={{
                  marginLeft: "5px",
                  outline: "none",
                  width: "200px",
                  height: "20px",
                }}
              />
            </div>
          ))}
          <button className="btn" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
    </div>
  );
}
export default CsvUploader;
