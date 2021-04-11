import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col, Row } from 'antd';
import FieldInput from 'components/Custom/FieldInput';
import FieldSelect from 'components/Custom/FieldSelect';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const commonSchema = {
  name: yup
    .string()
    .trim()
    .required('Vui lòng Nhập tên nhân viên.')
    .max(50, 'Tên tối đa 50 ký tự'),
  age: yup
    .date()
    .typeError('Vui lòng Nhập ngày sinh.')
    .required('Vui lòng nhập ngày sinh.')
    .max(new Date(), 'Ngày sinh không hợp lệ.')
    .min(new Date('1900-01-01'), 'Ngày sinh không hợp lệ.'),
  address: yup
    .string()
    .trim()
    .required('Vui lòng nhập địa chỉ')
    .max(200, 'Tối đa 200 ký tự'),
  phone: yup
    .string()
    .trim()
    .matches(/^\d{9,11}$/gi, 'Số điện thoại không hợp lệ.'),
  department: yup.number().min(1, 'Vui lòng chọn phòng ban.'),
};

const doctorSchema = {
  speciality: yup.number().min(1, 'Vui lòng chọn chuyên môn bác sĩ'),
  experience: yup
    .number()
    .typeError('Vui lòng nhập số năm kinh nghiệm.')
    .required('Vui lòng nhập số năm kinh nghiệm.'),
};

// fake data
const departmentOptions = [
  { value: 1, title: 'Phòng tài vụ' },
  { value: 2, title: 'Phòng tiếp tân' },
  { value: 3, title: 'Phòng bảo vệ' },
  { value: 4, title: 'Phòng chăm sóc' },
];

const specialityOptions = [
  { value: 1, title: 'Phòng tài vụ' },
  { value: 2, title: 'Phòng tiếp tân' },
  { value: 3, title: 'Phòng bảo vệ' },
  { value: 4, title: 'Phòng chăm sóc' },
];

// fn : main
function AddStaff({ isDoctor }) {
  // yup schema
  const schemaObject = isDoctor
    ? { ...commonSchema, ...doctorSchema }
    : { ...commonSchema };
  const schema = yup.object().shape(schemaObject);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const nameInputRef = useRef(null);

  // on submit
  const onSubmitForm = (data) => {
    console.log(('data', data));
  };

  // auto focus
  useEffect(() => {
    if (nameInputRef.current) nameInputRef.current.focus();
  }, []);

  // rendering ...
  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Row gutter={[24, 32]}>
        {/* name */}
        <Col span={24} md={12}>
          <FieldInput
            name="name"
            register={(e) => {
              register(e, { required: true });
              nameInputRef.current = e;
            }}
            errors={errors.name}
            maxLength={50}
            placeholder="Tên nhân viên"
          />
        </Col>

        {/* age */}
        <Col span={24} md={12}>
          <FieldInput
            name="age"
            register={register}
            errors={errors.age}
            defaultValue="1970-01-01"
            type="date"
            placeholder="Ngày sinh"
          />
        </Col>

        {/* address */}
        <Col span={24} md={12}>
          <FieldInput
            name="address"
            register={register}
            errors={errors.address}
            placeholder="Nhập địa chỉ"
            maxLength={200}
          />
        </Col>

        {/* Phone */}
        <Col span={24} md={12}>
          <FieldInput
            name="phone"
            register={register}
            errors={errors.phone}
            placeholder="Nhập số điện thoại"
            maxLength={11}
          />
        </Col>

        {/* department */}
        <Col span={24} md={12}>
          <FieldSelect
            name="department"
            options={departmentOptions}
            register={register}
            errors={errors.department}
            placeholder="Chọn phòng ban"
            defaultValPlaceholder={0}
          />
        </Col>

        {/* If the doctor is displayed as follows */}
        {isDoctor && (
          <>
            {/* speciality of doctor */}
            <Col span={24} md={12}>
              <FieldSelect
                name="speciality"
                register={register}
                errors={errors.speciality}
                placeholder="Chọn chuyên môn bác sĩ"
                defaultValPlaceholder={0}
                options={specialityOptions}
              />
            </Col>

            {/* number of experience */}
            <Col span={24} md={12}>
              <FieldInput
                name="experience"
                register={register}
                errors={errors.experience}
                placeholder="Năm kinh nghiệm"
                type="number"
                min={0}
                max={60}
              />
            </Col>
          </>
        )}

        {/* submit */}
        <Col span={24} md={12}>
          <Button
            className="w-100"
            htmlType="submit"
            type="primary"
            size="large">
            Thêm nhân viên
          </Button>
        </Col>
      </Row>
    </form>
  );
}

AddStaff.propTypes = {
  isDoctor: PropTypes.bool,
};

AddStaff.defaultProps = {
  isDoctor: false,
};

export default AddStaff;
