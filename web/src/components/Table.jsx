import React from "react";
import "../styles/tabla.css";

/**
 * Componente de tabla reutilizable con paginación
 * @param {Array} items - Array de objetos con los datos de la tabla
 * @param {Array} keys - Array con las keys que se mostrarán en el orden especificado
 * @param {string|null} url_next - URL para la página siguiente (null para disabled)
 * @param {string|null} url_previous - URL para la página anterior (null para disabled)
 * @param {Function} onPageChange - Callback que recibe la URL para cargar nueva página
 */
const Table = ({ items = [], keys = [], url_next = null, url_previous = null, onPageChange, loading = false }) => {
    const handlePageChange = (url) => {
        if (url && onPageChange) {
            onPageChange(url);
        }
    };

    return (
        <>
            <div className="table-container">
                {loading && (
                    <div className="loading-overlay">
                        <div className="spinner"></div>
                        <p>Cargando...</p>
                    </div>
                )}
                <table className="custom-table">
                    <thead>
                        <tr>
                            {keys.map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? (
                            items.map((item, index) => (
                                <tr key={index}>
                                    {keys.map((key) => (
                                        <td key={key}>{item[key] !== undefined ? item[key] : "-"}</td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={keys.length} className="no-data">
                                    No hay datos disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="pagination-controls">
                <button className="pagination-btn" onClick={() => handlePageChange(url_previous)} disabled={!url_previous || loading}>
                    Anterior
                </button>
                <button className="pagination-btn" onClick={() => handlePageChange(url_next)} disabled={!url_next || loading}>
                    Siguiente
                </button>
            </div>
        </>
    );
};

export default Table;
