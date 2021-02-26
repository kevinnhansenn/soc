import '../style/student.scss'

const Student = () => {
    return <div className='vw-100 vh-100 student'>
        <div className="d-flex justify-content-between p-3" style={{ height: '10vh' }}>
            <div className='bg-info'>
                This is title <i className='bi-volume-up'></i>
            </div>
            <div className="btn btn-outline-danger">
                <i className='bi-volume-up'></i>
            </div>
        </div>
    </div>
}

export default Student;
