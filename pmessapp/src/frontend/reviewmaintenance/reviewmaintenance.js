import Axios from 'axios';
import React, { Component } from 'react';
import backend_url from '../../url/backend_url';
import cookie from 'react-cookies';
import frequency from '../../utility/frequencyConvert';
import {
    Button,
    Modal
} from 'antd';
import severity from '../mechanic/equipmentseverity';

class ReviewMaintenance extends Component {
    constructor() {
        super();

        this.state = {
            equipments: [],
            equipmentDetails: '',
            visibleOne: false,
            visibleTwo: false,
            visibleThree: false,
            visibleFour: false,
            reviewRemarks: '',
            reviewOk: '',
            mechanicName: '',
            maintenance_id: '',
            equipment_id: '',
            repairLogs: [],
        }

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        Axios.get(backend_url + '/maintenance/notreviewed').then(result => {
            this.setState({
                equipments: result.data.result
            })
        })
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {

        const severityColor = {
            "L": "green",
            "M": "yellow",
            "C": "red"
        }

        let repairLogsData = this.state.repairLogs.map((repairLog) => {
            return (
                <tr key={repairLog._id}>
                    <td style={{ textAlign: 'center' }}>{repairLog.part}</td>
                    <td style={{ textAlign: 'center', backgroundColor: severityColor[repairLog.severity] }}><strong>{severity[repairLog.severity]}</strong></td>
                    <td style={{ textAlign: 'center' }}>{new Date(repairLog.reviewedDate).toLocaleDateString()}</td>
                    <td style={{ textAlign: 'center' }}><a href="#" onClick={() => {
                        this.setState({
                            visibleThree: false,
                            visibleFour: true
                        })
                    }}>More</a></td>
                    <Modal
                        title={"Equipment Id: " + repairLog.equipment_id}
                        visible={this.state.visibleFour}
                        onOk={() => {
                            this.setState({
                                visibleThree: true,
                                visibleFour: false
                            })
                        }}
                        onCancel={() => {
                            this.setState({
                                visibleThree: true,
                                visibleFour: false
                            })
                        }}
                        width={1000}>
                        <div class="container">
                            <p><strong>Problem:</strong> {repairLog.problem}</p>
                            <p><strong>Corrective Action:</strong> {repairLog.correctiveAction}</p>
                            <p><strong>Mechanic Id:</strong> {repairLog.mechanic_id}</p>
                        </div>
                    </Modal>
                </tr>
            )
        })

        let data = this.state.equipments.map((equipment) => {
            return (
                <tr key={equipment._id}>
                    <td style={{ textAlign: 'center' }}>{equipment.equipment_id}</td>
                    <td style={{ textAlign: 'center' }}>
                        <a type="primary" onClick={() => {
                            Axios.get(backend_url + '/equipment/', { params: { equipment_id: equipment.equipment_id } }).then(result => {
                                this.setState({
                                    visibleOne: true,
                                    equipmentDetails: result.data.result
                                })
                            })
                        }}>
                            More Details
                        </a>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        <a type="primary" onClick={() => {
                            Axios.get(backend_url + '/repair/', { params: { maintenance_id: equipment._id } }).then(result => {
                                this.setState({
                                    visibleThree: true,
                                    repairLogs: result.data.result
                                })
                            })
                        }}>
                            View Repair Logs
                        </a>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        <Button type="primary" onClick={() => {
                            this.setState({
                                visibleTwo: true
                            })
                        }}>
                            Review Maintenance
                        </Button>
                        <Modal
                            title="Review Maintenance"
                            visible={this.state.visibleTwo}
                            onOk={() => {
                                this.setState({
                                    visibleTwo: false
                                })
                            }}
                            onCancel={() => {
                                this.setState({
                                    visibleTwo: false
                                })
                            }}
                            width={500}>
                            <form>
                                <div class="form-group">
                                    <label for="problem">Review Remarks</label>
                                    <textarea class="form-control" id="reviewRemarks" name="reviewRemarks" aria-describedby="emailHelp" placeholder="Enter review remarks" onChange={this.onChange} />
                                </div>

                                <div class="form-group">
                                    <label for="reviewOk">Is review ok ?</label>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="reviewOk" id="reviewOk" value="true" onChange={this.onChange} />
                                        <label class="form-check-label" for="reviewOk">
                                            Review Okay
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="reviewOk" id="reviewOk" value="false" onChange={this.onChange} />
                                        <label class="form-check-label" for="reviewNotOk">
                                            Review not okay
                                        </label>
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-primary" onClick={() => {
                                    const data = {
                                        maintenance_id: equipment._id,
                                        reviewRemarks: this.state.reviewRemarks,
                                        reviewOk: this.state.reviewOk,
                                        reviewedBy: cookie.load('user_id'),
                                    }
                                    Axios.patch(backend_url + '/maintenance/review', { data }).then(result => {
                                        if (result.status === 200 && result.data.success === true) {
                                            alert("Review submitted successfully");
                                        } else {
                                            alert("Review could not be submitted successfully");
                                        }
                                    })
                                }}>Submit</button>
                            </form>
                        </Modal>
                    </td>
                </tr>
            )
        });

        return (
            <div>
                <Modal
                    title={this.state.equipmentDetails.equipmentName}
                    visible={this.state.visibleOne}
                    onOk={() => {
                        this.setState({
                            visibleOne: false
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            visibleOne: false
                        })
                    }}
                    width={500}>
                    <p><strong>Equipment Id:</strong> {this.state.equipmentDetails.equipment_id}</p>
                    <p><strong>Serial No:</strong> {this.state.equipmentDetails.serialNo}</p>
                    <p><strong>Maintenance Frequency:</strong> {frequency[this.state.equipmentDetails.maintenanceFrequency]}</p>
                    <p><strong>Next due date:</strong> {new Date(this.state.equipmentDetails.dueDate).toLocaleDateString()}</p>
                </Modal>

                <Modal
                    title="View Repair Logs"
                    visible={this.state.visibleThree}
                    onOk={() => {
                        this.setState({
                            visibleThree: false
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            visibleThree: false
                        })
                    }}
                    width={1000}>
                    <div class="container">
                        <table class="table table-striped" style={{ width: "910px" }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'center' }}>Part</th>
                                    <th style={{ textAlign: 'center' }}>Severity</th>
                                    <th style={{ textAlign: 'center' }}>Reviewed Date</th>
                                    <th style={{ textAlign: 'center' }}>More Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {repairLogsData}
                            </tbody>
                        </table>
                    </div>
                </Modal>

                <div class="container">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center' }}>Equipment Id</th>
                                <th style={{ textAlign: 'center' }}>Equipment Details</th>
                                <th style={{ textAlign: 'center' }}>Repair Log</th>
                                <th style={{ textAlign: 'center' }}>Review</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ReviewMaintenance;