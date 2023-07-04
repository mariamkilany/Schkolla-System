import React, { useEffect, useState, useContext } from "react";
import "./table.css";
import TableSetting from "../popupComponents/TableSetting";
import AuthContext from "../shared/AuthContext";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import AddTableCell from "../popupComponents/AddTableCell";
import UpdateTableCell from "../popupComponents/UpdateTableCell";
import { Button } from "react-bootstrap";
import Loading from "../../pages/Loading/Loading";

function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
}

function addMinutes(time, minsToAdd) {
  function D(J) {
    return (J < 10 ? "0" : "") + J;
  }
  var piece = time.split(":");
  var mins = piece[0] * 60 + +piece[1] + +minsToAdd;

  return D(((mins % (24 * 60)) / 60) | 0) + ":" + D(mins % 60);
}

function TimeTable({ subjectToTeacher }) {
  const { refresh, setref } = useContext(AuthContext);
  const [cells, setCells] = useState([]);
  const { fetchData, loading } = useAxios();
  const [config, setConfig] = useState({});
  const [lessonNum, setLessonNum] = useState(0);
  const params = useParams();
  let color = localStorage.getItem("stagecolor");
  if (color === "green") {
    color = "#63D0B4";
  } else if (color === "pink") {
    color = "#FDBAB1";
  } else if (color === "blue") {
    color = "#254C71";
  }
  const time = useRef([]);
  const finalTime = useRef(null);

  useEffect(() => {
    fetchData("get", `tableCellRouter/getWeekTableById/${params.classId}`).then(
      (res) => {
        setConfig(res);
        for (let i = 0; i < res.lessonNum; i++) {
          if (i === 0) {
            time.current[i] = `${tConvert(res.startTime)} - ${tConvert(
              addMinutes(res.startTime, res.duration)
            )}`;
            finalTime.current = addMinutes(res.startTime, res.duration);
          } else {
            time.current[i] = `${tConvert(finalTime.current)} - ${tConvert(
              addMinutes(finalTime.current, res.duration)
            )}`;
            finalTime.current = addMinutes(finalTime.current, res.duration);
          }
        }
        setLessonNum(res.lessonNum);
      }
    );
    fetchData(
      "get",
      `tableCellRouter/getCellsInTableByClassId/${params.classId}`
    ).then((res) => {
      setCells(res);
    });
  }, [refresh]);

  const handleDelete = async (id, link) => {
    fetchData("delete", `tableCellRouter/${link}/${id}`).then(() => {
      setref(!refresh);
    });
  };

  const days = [
    "السبت",
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
  ];
  const lessons = [
    "الأولى",
    "الثانية",
    "الثالثة",
    "الرابعة",
    "الخامسة",
    "السادسة",
    "السابعة",
    "الثامنة",
    "التاسعة",
    "العاشرة",
  ];
  if (loading) return <Loading />;
  return (
    <div className="container">
      {config ? (
        <>
          <div className="timetable-img text-center">
            <img src="img/content/timetable.png" alt="" />
          </div>
          <div className="table-responsive">
            <table className="table table-bordered timetable text-center">
              {
                <thead>
                  <tr className="bg-light-gray">
                    <th className="text-uppercase">الوقت</th>
                    {lessons.map((lesson, indx) =>
                      indx <= lessonNum ? <th>{lesson}</th> : <></>
                    )}
                  </tr>
                </thead>
              }
              <tbody>
                {Array.from(
                  { length: config?.lastDay - config?.firstDay + 1 },
                  (_, index1) => {
                    return (
                      <tr>
                        <th className="align-middle bg-light-gray">
                          {days[parseInt(index1 + parseInt(config?.firstDay))]}
                        </th>
                        {cells.map((cell) => {
                          if (cell.day === index1 + parseInt(config?.firstDay))
                            return (
                              <td className="w3-center w3-animate-left ">
                                <span
                                  style={{ backgroundColor: color }}
                                  className=" table-sub padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13"
                                >
                                  {cell.subject}
                                </span>
                                <div className="font-size13 text-light-gray">
                                  {cell.teacher}
                                </div>
                                <div className="font-size13 text-secondary">
                                  {cell.time}
                                </div>
                                <div className="d-flex justify-content-around">
                                  <UpdateTableCell
                                    subjectToTeacher={subjectToTeacher}
                                    cellData={cell}
                                  />
                                  <Button
                                    variant="danger"
                                    className="table-pop"
                                    onClick={() => {
                                      handleDelete(cell._id, "deleteCellById");
                                    }}
                                  >
                                    حذف
                                  </Button>
                                </div>
                              </td>
                            );
                        })}
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            <Button
              variant="danger"
              style={{ marginRight: "10px" }}
              onClick={() => {
                handleDelete(config._id, "deleteWeekTableById");
                handleDelete(params.classId, "deleteWeekTableCellsByClassId");
              }}
            >
              حذف الجدول بالكامل
            </Button>
            <AddTableCell
              subjectToTeacher={subjectToTeacher}
              currTime={time.current}
            />
          </div>
        </>
      ) : (
        <>
          <TableSetting />
        </>
      )}
    </div>
  );
}

export default TimeTable;
