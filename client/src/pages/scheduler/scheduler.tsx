import React, { useState } from 'react';
import { GeneralState } from '../../store/user/models';
import { RouteComponentProps } from 'react-router-dom';
import { Form, Button, Calendar, Select, Radio } from 'antd';
import moment from 'moment';
import { getProtocol } from '../../util/api';
import './scheduler.scss';

interface Props extends RouteComponentProps {
  userState: GeneralState | undefined;
}

const URI_TIMES = 'http://127.0.0.1:8000/api/doctors/1/times/';

export const Scheduler: React.FC<Props> = () => {
  const [times, setTimes] = useState<Array<string>>([]);

  const onFinish = (values) => {
    console.log(values);
  };

  const getTimes = (date) => {
    const DATE: string = date ? date.format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
    getProtocol(URI_TIMES + DATE).then((res) => setTimes(res));
  };

  return (
    <div className="center-container">
      <div className="patient-form">
        <Form labelCol={{ span: 4 }} layout="horizontal" style={{ width: '100%' }} onFinish={onFinish}>
          <Form.Item label="Choose Date">
            <div className="site-calendar-demo-card">
              <Calendar fullscreen={false} onSelect={(d) => getTimes(d)} />
            </div>
          </Form.Item>
          <Form.Item label="Type" name="kind">
            <Radio.Group style={{ width: '100%' }}>
              <Radio.Button style={{ width: '50%' }} value="N">
                New Patient
              </Radio.Button>
              <Radio.Button style={{ width: '50%' }} value="F">
                Follow-up
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          {times.length > 0 && (
            <Form.Item label="Time" name="time">
              <Select>
                {times.map((time) => (
                  <Select.Option key={time} value={time}>
                    {time}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
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
