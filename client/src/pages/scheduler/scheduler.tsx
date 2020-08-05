import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/models';
import { UserState } from '../../store/signin/models';
import { RouteComponentProps } from 'react-router-dom';
import { Form, Radio, Select, DatePicker, Button } from 'antd';
import moment from 'moment';

import './scheduler.scss';

interface Props extends RouteComponentProps {
  userState: UserState;
}

const FORMAT = 'YYYY-MM-DD HH:mm';

const Scheduler: React.FC<Props> = () => {
  const [date, setDate] = useState<moment.Moment | null>(null);
  function range(start, end) {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  function disabledDateTime() {
    return {
      disabledHours: () => [...range(0, 9), ...range(17, 24)],
      disabledMinutes: () => [...range(1, 15), ...range(16, 30), ...range(31, 45), ...range(46, 60)],
    };
  }
  const dateTimeChanged = (m: moment.Moment | null) => {
    setDate(m);
  };
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onBlur = (elem: React.FocusEvent<HTMLInputElement>) => {
    const value = moment(elem.target.value, FORMAT);
    if (value && value.isValid()) {
      dateTimeChanged(value);
    }
  };
  return (
    <div className="center-container">
      <div className="patient-form">
        <Form labelCol={{ span: 4 }} layout="horizontal" style={{ width: '100%' }} onFinish={onFinish}>
          <Form.Item label="DatePicker">
            <DatePicker
              format={FORMAT}
              disabledDate={disabledDate}
              disabledTime={disabledDateTime}
              showTime={{ hideDisabledOptions: true }}
              showNow={false}
              value={date}
              style={{ width: '100%' }}
              onBlur={onBlur}
              onChange={dateTimeChanged}
            />
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
