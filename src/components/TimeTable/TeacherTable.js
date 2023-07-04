import React, { useEffect, useState } from "react";
import "./table.css";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import Loading from "../../pages/Loading/Loading";

function TeacherTable() {
  const days = [
    "السبت",
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
  ];
  const [cells, setCells] = useState([]);
  const params = useParams();
  // console.log("ppppp",params)
  const { fetchData, loading } = useAxios();
  useEffect(() => {
    fetchData("get", `teacher/getTeacherTable/${params.teacherId}`).then(
      (res) => {
        setCells(res);
      }
    );
  }, []);
  if (loading) return <Loading />;
  return (
    <div className="container">
      <div className="timetable-img text-center">
        <img src="img/content/timetable.png" alt="" />
      </div>
      <div className="table-responsive">
        <table className="table table-bordered timetable text-center">
          <tbody>
            {Array.from({ length: 7 }, (_, index1) => {
              return (
                <tr>
                  <th className="align-middle bg-light-gray">{days[index1]}</th>
                  {cells.map((cell) => {
                    if (cell.day === index1)
                      return (
                        <td className="w3-center w3-animate-left ">
                          <span
                            style={{ backgroundColor: "#254C71" }}
                            className=" table-sub padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13"
                          >
                            {cell.subjectName}
                          </span>
                          <div className="font-size13 text-secondary">
                            المرحلة:{cell.gradeName}{" "}
                          </div>
                          <div className="font-size13 text-secondary">
                            الفصل:{cell.className}{" "}
                          </div>
                          <div className="font-size13 text-secondary">
                            {cell.time}
                          </div>
                        </td>
                      );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeacherTable;
