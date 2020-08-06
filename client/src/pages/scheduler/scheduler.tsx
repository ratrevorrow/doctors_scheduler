import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/models';
import { UserState } from '../../store/signin/models';
import { RouteComponentProps } from 'react-router-dom';
import { Form, Button, Calendar, Select, Radio } from 'antd';
import moment from 'moment';
import { getProtocol } from '../../util/api';

import './scheduler.scss';

interface Props extends RouteComponentProps {
  userState: UserState;
}

const Scheduler: React.FC<Props> = () => {
  const [date, setDate] = useState<moment.Moment | null>(null);

  const onFinish = (values) => {
    getProtocol('http://127.0.0.1:8000/api/doctors/1/times/' + date?.format('YYYY-MM-DD')).then((res) =>
      console.log(res),
    );
    console.log(date?.format('YYYY-MM-DD'));
  };

  function onPanelChange(value, mode) {
    console.log(value, mode);
  }

  return (
    <div className="center-container">
      <div className="patient-form">
        <Form labelCol={{ span: 4 }} layout="horizontal" style={{ width: '100%' }} onFinish={onFinish}>
          <Form.Item label="Date Picker" name="date">
            <div className="site-calendar-demo-card">
              <Calendar fullscreen={false} onPanelChange={onPanelChange} onSelect={setDate} />
            </div>
          </Form.Item>
          <Form.Item label="kind" name="kind">
            <Radio.Group style={{ width: '100%' }}>
              <Radio.Button style={{ width: '50%' }} value="N">
                New Patient
              </Radio.Button>
              <Radio.Button style={{ width: '50%' }} value="F">
                Follow-up
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Time">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 12 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({ userState: { ...state.signin } });

export default connect(mapStateToProps)(Scheduler);
