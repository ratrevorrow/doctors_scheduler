import React from 'react';
import { Form, Radio, Button, Input } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Routine } from 'redux-saga-routines';
import { RootState } from '../../store/models';
import * as actions from '../../store/actions';

type UserForm = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

const roles = {
  PATIENT: 'PATIENT',
  DOCTOR: 'DOCTOR',
  RECEPTIONIST: 'RECEPTIONIST',
};

const CreateUser: React.FC<{ createUser: Routine }> = ({ createUser }) => {
  const onFinish = (values) => {
    if (!values.role) values.role = roles.PATIENT;
    createUser(values);
  };

  return (
    <div className="center-container">
      <Form labelCol={{ span: 4 }} layout="horizontal" style={{ width: '60%' }} onFinish={onFinish}>
        <Form.Item label="First Name" name="firstName">
          <Input size="large" placeholder="Bob" prefix={<UserOutlined />} autoFocus />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName">
          <Input size="large" placeholder="Vance" prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input size="large" placeholder="abcd1234@yahoo.com" prefix={<MailOutlined />} />
        </Form.Item>
        <Form.Item label="User Type" name="role">
          <Radio.Group style={{ width: '100%' }} value="PATIENT" size="large">
            <Radio.Button style={{ width: '33.33%' }} value="PATIENT">
              Patient
            </Radio.Button>
            <Radio.Button style={{ width: '33.33%' }} value="DOCTOR">
              Doctor
            </Radio.Button>
            <Radio.Button style={{ width: '33.33%' }} value="RECEPTIONIST">
              RECEPTIONIST
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label=" ">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {
  createUser: actions.createUser.createUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
