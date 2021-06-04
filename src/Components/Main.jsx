import React, {PureComponent} from 'react'
import {Button, Modal, Tab, Nav} from 'react-bootstrap'
import * as moment from 'jalali-moment'

moment.locale('fa')

class Main extends PureComponent {
    state = {
        modal: false,
        done: false,
        error: false,
        day: '16',
        month: 'خرداد',
        time: ''
    }
    //testing for error and going from main modal to final modal
    setData() {
        if (this.state.time === '') {
            this.setState({
                modal: false,
                error: true
            })
        } else {
            this.setState({
                modal: false,
                done: true
            })
        }
    }
    //for deleting data and hiding main modal
    setFalse() {
        this.setState({
            modal: false,
            day: '16',
            month: 'خرداد',
            time: ''
        })
    }
    //setting the time
    setTime(time) {
        this.setState({
            time: time
        })
    }
    //setting day and month
    setDay(day, month) {
        this.setState({
            day: day,
            month: month
        })
    }

    render() {
        const contents = []
        const tabs = []
        const times = []
        const time = 540
        //producing times
        for (let index = 0; index < 27; index++) {
            const hour = parseInt((index * 30 + time) / 60) < 10 ? '0' + parseInt((index * 30 + time) / 60) : parseInt((index * 30 + time) / 60)
            const minute = (index * 30 + time) % 60 === 0 ? '0' + (index * 30 + time) % 60 : (index * 30 + time) % 60
            times.push(
                <div className='col-xl-2 my-1 text-center'>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Button variant={this.state.time === hour + ' : ' + minute ? 'success' : 'outline-success'}
                            className='btn-time text-right border-0 py-1'
                            onClick={this.setTime.bind(this, hour + ' : ' + minute)}>
                        <span>
                            {hour + ' : ' + minute}
                        </span>
                    </Button>
                </div>
            )
        }
        //producing tab links
        for (let index1 = 1; index1 < 8; index1++) {
            if (moment().locale('en').add(index1, 'day').weekday() !== 5) {
                tabs.push(
                    <Nav.Item className='mx-3'
                              onClick={this.setDay.bind(this, moment().add(index1, 'day').format('D'),
                                  moment().add(index1, 'day').format('MMMM'))}>
                        <Nav.Link eventKey={index1} className='btn-day text-center'>
                            <p className='mb-2'>
                                {moment.weekdays(moment().locale('en').add(index1, 'day').weekday())}
                            </p>
                            <h5>
                                {moment().add(index1, 'day').format('D')}
                            </h5>
                            <p className='mb-2'>
                                {moment().add(index1, 'day').format('MMMM')}
                            </p>
                        </Nav.Link>
                    </Nav.Item>
                )
            }
        }
        //producing tab contents
        for (let index2 = 1; index2 < 8; index2++) {
            if (moment().locale('en').add(index2, 'day').weekday() !== 5) {
                contents.push(
                    <Tab.Pane eventKey={index2}>
                        <div className='row mx-4' dir='ltr'>
                            {times}
                        </div>
                    </Tab.Pane>
                )
            }
        }
        return (
            <div className='main-body p-5'>
                <div className='row' dir='ltr'>
                    <div className='col-xl-3 col-lg-4 col-sm-6 col-12'>
                        <div className='card m-4 custom-card'>
                            <div className='card-body py-4 px-2 d-flex flex-column align-items-center'>
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" className='mb-4'>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M22.5858 2.58579C23.3668 1.80474 24.6332 1.80474 25.4142 2.58579L43.4142 20.5858C43.7893 20.9609 44 21.4696 44 22V42C44 43.1046 43.1046 44 42 44H28C26.8954 44 26 43.1046 26 42V30H22V42C22 43.1046 21.1046 44 20 44H6C4.89543 44 4 43.1046 4 42V22C4 21.4696 4.21071 20.9609 4.58578 20.5858L22.5858 2.58579Z"
                                          fill="url(#paint0_linear)"/>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M28.8771 11.2179C30.8183 10.4139 32.8988 10 35 10C37.1011 10 39.1817 10.4139 41.1229 11.2179C43.0641 12.022 44.828 13.2006 46.3137 14.6863C47.0947 15.4673 47.0947 16.7337 46.3137 17.5147C45.5326 18.2958 44.2663 18.2958 43.4853 17.5147C42.6908 16.7203 41.7903 16.0429 40.8112 15.501C40.9345 15.9801 41 16.4824 41 17C41 20.3137 38.3137 23 35 23C31.6863 23 29 20.3137 29 17C29 16.4824 29.0655 15.9801 29.1888 15.501C28.2097 16.0429 27.3092 16.7203 26.5147 17.5147C25.7337 18.2958 24.4673 18.2958 23.6863 17.5147C22.9052 16.7337 22.9052 15.4673 23.6863 14.6863C25.172 13.2006 26.9358 12.022 28.8771 11.2179ZM35 15C33.8954 15 33 15.8954 33 17C33 18.1046 33.8954 19 35 19C36.1046 19 37 18.1046 37 17C37 15.8954 36.1046 15 35 15Z"
                                          fill="#121921"/>
                                    <path
                                        d="M21.4142 9.41421C22.1953 8.63317 22.1953 7.36684 21.4142 6.58579C20.6332 5.80474 19.3668 5.80474 18.5858 6.58579L5.17157 20C4.42142 20.7501 4 21.7676 4 22.8284V41.5C4 42.8807 5.11929 44 6.5 44H19.5C20.8807 44 22 42.8807 22 41.5V30H26V41.5C26 42.8807 27.1193 44 28.5 44H41.5C42.8807 44 44 42.8807 44 41.5V28C44 26.8954 43.1046 26 42 26C40.8954 26 40 26.8954 40 28V40H30V28.5C30 27.1193 28.8807 26 27.5 26H20.5C19.1193 26 18 27.1193 18 28.5V40H8V22.8284L21.4142 9.41421Z"
                                        fill="#121921"/>
                                    <defs>
                                        <linearGradient id="paint0_linear" x1="3.78937" y1="44.2213" x2="46.181"
                                                        y2="3.84828" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#121921" stopOpacity="0.32"/>
                                            <stop offset="1" stopColor="#121921" stopOpacity="0">

                                            </stop>
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <p className='text-center mb-3'>
                                    اگر این خانه مناسب شرایط شماست از آن بازدید کنید
                                </p>
                                <Button className='btn-custom py-2' onClick={() => {
                                    this.setState({modal: true})
                                }}>
                                    ثبت درخواست بازدید
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                {/*main modal for choosing date and time */}
                <Modal show={this.state.modal} onHide={this.setFalse.bind(this)} dialogClassName="modal-70w">
                    <Modal.Header>
                        <Modal.Title style={{fontSize: '16px'}}>هماهنگی بازدید</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className='text-center'>برای هماهنگی بازدید روز و ساعت را انتخاب کنید</p>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="1">
                            <Nav variant="pills" className="flex-row justify-content-center mb-4">
                                {tabs}
                            </Nav>
                            <Tab.Content>
                                {contents}
                            </Tab.Content>
                        </Tab.Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" className='mx-auto btn-done'
                                onClick={
                                    this.setData.bind(this)
                                }>
                            ثبت روز و ساعت
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/*final modal for showing reserved time */}
                <Modal show={this.state.done} onHide={() => {
                    this.setState({done: false})
                }}>
                    <Modal.Header>
                        <Modal.Title style={{fontSize: '16px'}}>ثبت هماهنگی بازدید</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className='text-center mb-4'>
                            رزرو شما برای تاریخ زیر ثبت شد
                        </p>
                        <h5 className='text-center'>
                            {this.state.day + this.state.month}
                        </h5>
                        <h5 className='text-center' dir='ltr'>{this.state.time}</h5>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" className='mx-auto' onClick={() => {
                            this.setState({done: false})
                        }}>
                            اتمام
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/*error modal for showing errors */}
                <Modal show={this.state.error} onHide={() => {
                    this.setState({error: false, modal: true})
                }}>
                    <Modal.Header>
                        <Modal.Title style={{fontSize: '16px'}}>بروز خطا</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className='text-center mb-4'>
                            هیچ زمانی برای بازدید انتخاب نشده است
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" className='mx-auto' onClick={() => {
                            this.setState({error: false, modal: true})
                        }}>
                            انتخاب زمان
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Main;