import MoreinfoStudent from "../../components/Moreinfo/MoreinfoStudnt";
import DeletePopup from "../../components/popupComponents/DeletePopup";
import UpdateStudent from "../../components/popupComponents/UpdateStudent";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
export default function ShowStudent() {
  const [studentData, setStudentData] = useState({});
  const params = useParams();
  const { fetchData, data, loading } = useAxios();
  useEffect(() => {
    fetchData("get", `student/getStudentById/${params.stuId}`).then((res) =>
      setStudentData(res)
    );
  }, []);
  if (loading) return <Loading />;
  return (
    <>
      <div className="container">
        <div className="row mb-4 teacher-row1 gy-4">
          <div className="col-sm-3 btn-container ">
            <DeletePopup
              name={` الطالب / ة ${studentData.name}`}
              id={studentData._id}
              link={"student/deleteStudent/"}
            />
            <UpdateStudent studentData={studentData} />
          </div>
          <div className="col-sm-6 d-flex justify-content-center flex-column align-items-end presonal">
            <h2>{studentData.name}</h2>
            <h5>{studentData.nationalId}</h5>
          </div>
          <div className="col-sm-3 img-cont">
            <img
              src={studentData.imgUrl}
              alt="student_photo"
              className="photo-cont"
            />
          </div>
        </div>
        <div class="d-flex row teacher-row-2 align-items-start gy-4">
          <MoreinfoStudent props={studentData} />
        </div>
      </div>
    </>
  );
}
