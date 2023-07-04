
import MoreinfoStudnt from '../../components/Moreinfo/MoreinfoStudnt'
import AddStudent from '../../components/popupComponents/AddStudent';
import Student from '../../components/ShowData/Student'
export default function Students() {
    return <>
    <Student link={'student/getAllStudents'} />
    <AddStudent/>
    </>;
}