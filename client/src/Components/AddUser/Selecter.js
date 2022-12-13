import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getDepartment } from "../../Service/DepartmentService";

function Selects(props) {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const getAPI = async () => {
      const data = await getDepartment();
      if (data) {
        setDepartments(data);
      }
    };

    getAPI();
  }, []);

  const departmentOption = [];

  departments.map((dp, index) => [
    departmentOption.push({ value: dp._id, label: dp.name }),
  ]);

  const handleDepartment = (value) => {
    props.handleDepartment(value);
  };

  //   const onKeyEnter = (e) => {
  //     if (e.key === "Enter") {
  //       e.preventDefault();
  //     }
  //   };

  return (
    <>
      <Select
        styles={{
          menu: (provided) => ({
            ...provided,
            zIndex: 9999,
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            background: state.isFocused ? "#2A3038" : "#2A3038",
            borderColor: state.isFocused ? "#191c24" : "#191c24",
          }),
          input: (baseStyles, state) => ({
            ...baseStyles,
            color: "#fff",
          }),
          singleValue: (baseStyles, state) => ({
            ...baseStyles,
            color: "#fff",
          }),
          menuList: (baseStyles, state) => ({
            ...baseStyles,
            background: state.isFocused ? "#2A3038" : "#2A3038",
            borderColor: state.isFocused ? "#191c24" : "#191c24",
            color: "#fff",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isSelected && "#00ac4a",
            ":hover": {
              backgroundColor: "#0078c1",
            },
          }),
        }}
        noOptionsMessage={(e) => "Không có dữ liệu!!!"}
        // isClearable
        placeholder="Chọn bộ phận..."
        maxMenuHeight="300px"
        name="color"
        value={props.departments}
        defaultValue={{
          value: props.departments.value,
          label: props.departments.label,
        }}
        onChange={handleDepartment}
        options={departmentOption}
        //   onKeyDown={onKeyEnter}
      />
    </>
  );
}

export default Selects;
