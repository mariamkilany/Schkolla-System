import './base.css'
import studet from '../../imge/3d-casual-life-girl-and-boy-with-backpack-reading-book.png'
import qr from '../../imge/qr.png'
import report from '../../imge/report.png'
import calender from '../../imge/casual-life-3d-blue-desk-calendar-1.png'
import qustion from '../../imge/qusetion.png'
import app from '../../imge/casual-life-3d-smarphone-display-with-instagram.png'
import info from '../../imge/3d-casual-life-statistics.png'

    
const Base = () => {
    return (
        <>
        <div className="container overflow-hidden">
            <div className="row gy-5">
                <div className="shap-sec col-md-6">
                    <div className="shape">
                    <img src={studet} alt="student"  className='student-svg'/>
                    </div>
                </div>
                <div className="disciption col-md-6">
                    <h1> Schkolla مرحبا بكم فى</h1>
                    <p className='fw-bolder mt-2'>نظام ادارة المدرسة بشكل أسهل</p>
                    <p>نحن نظام ادارة مدسي يتمتع بخصائص فريدة لجعل العمليات التعليمة و الادارية ابسط و تسهيل العمليات اليومية المعقده وفيما يلى ابرز الخدمات المقدمه من النظام</p>
                        <div className="row mt-4">
                        <div className="col-md-4 mt-3 h-100">
                            <div className="serv bg-white p-3">
                                <img src={qr} alt="qr code"/>
                                <h4 className=''>مسح الكود لاخذ الغياب</h4>
                            </div>
                    </div>
                    <div className="col-md-4 mt-3 h-100">
                            <div className="serv bg-white p-3">
                                <img src={report} alt="report"/>
                                <h4 className=''>تقارير شهرية للمتابعة </h4>
                            </div>
                    </div>
                    <div className="col-md-4 mt-3 h-100">
                            <div className="serv bg-white p-3 ">
                                <img src={calender} alt="calender"/>
                                <h4 className=''>المتابعة فى اخذ الغياب</h4>
                            </div>
                    </div>
            </div>
            <div className="row mt-2">
            <div className="col-md-4 mt-3 h-100">
                            <div className="serv bg-white p-3">
                                <img src={qustion} alt="qustion"/>
                                <h4 className=''>امكانية الاطلاع على الشكاوى</h4>
                            </div>
                    </div>
                    <div className="col-md-4 mt-3 h-100">
                            <div className="serv bg-white p-3">
                                <img src={app} alt="app"/>
                                <h4 className=''> الاحتواء على انظمة صغرى</h4>
                            </div>
                    </div>
                    <div className="col-md-4 mt-3 h-100">
                            <div className="serv bg-white p-3">
                                <img src={info} alt="info" />
                                <h4 className=''>الاطلاع على البيانات</h4>
                            </div>
                    </div>
            </div>
                </div>
            </div>
        </div>
        </>
    );
};
export default Base;