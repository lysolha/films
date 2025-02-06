import { useState } from "react";

const useFetch = (url, options) => {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const formatObjectToString = (obj) => {
    return Object.entries(obj)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}: [${value.join(", ")}]`; // Для массивов
        } else if (typeof value === "object" && value !== null) {
          return `${key}: { ${formatObjectToString(value)} }`; // Для вложенных объектов
        }
        return `${key}: ${value}`;
      })
      .join(", ");
  };

  const fetchFunction = async (newOptions = {}) => {
    setError(null);
    try {
      const response = await fetch(url, { ...options, ...newOptions });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.status == 0) {
        const errorText = formatObjectToString(result.error.fields);
        setError(errorText);
      }

      setStatus(result.status);
      setData(result);

      const data = await result.data;
      if (data) {
        setData(data);
      }
    } catch (err) {
      setError(err);
    } finally {
      setToggle(!toggle);
    }
  };

  return { data, status, toggle, error, fetchFunction };
};

export default useFetch;
