import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: "Segoe UI", sans-serif;
`;

const Left = styled.div`
  flex: 1;
  background: linear-gradient(to bottom, #769fcd, #b9d7ea);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
  color: #fff;
`;

const Right = styled.div`
  flex: 1;
  background: #f7fbfc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormBox = styled.form`
  width: 90%;
  max-width: 450px;
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const SubText = styled.p`
  color: #7f8c8d;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 1rem;
  border-radius: 25px;
  border: 1px solid #d6e6f2;
  background: #fff;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 1rem;
  border-radius: 25px;
  border: 1px solid #d6e6f2;
  background: #fff;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  background-color: #769fcd;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background-color: #5a87b2;
  }
`;

const Register = () => {
  const navigate = useNavigate(); // inside the Register component

  const [formData, setFormData] = useState({
    gaushalaName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    milkCapacity: "",
    breedType: "",
    deliveryRadius: "",
    aadharNumber: "",
    locationUrl: "",
    password: "",
  });
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post("http://localhost:2500/api/gaushalas/register", formData);
      alert(res.data.message || "Registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error("REG ERROR:", err.response?.data || err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };
  
  

  return (
    <Container>
      <Left>
        <h1>GoMilk</h1>
        <p>The most trusted Gaushala-powered milk delivery service.</p>
      </Left>
      <Right>
        <FormBox onSubmit={handleSubmit}>
          <Title>Hello!</Title>
          <SubText>Sign Up to Get Started</SubText>

          <Input
            name="gaushalaName"
            placeholder="Gaushala Name"
            onChange={handleChange}
          />
          <Input
            name="ownerName"
            placeholder="Owner/Manager Name"
            onChange={handleChange}
          />
          <Input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />
          <Input
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
          />
          <Input
            name="address"
            placeholder="Full Address"
            onChange={handleChange}
          />
          <Input
            name="milkCapacity"
            placeholder="Milk Capacity (Litres/day)"
            onChange={handleChange}
          />
          <Select name="breedType" onChange={handleChange}>
            <option value="">Select Cow Breed</option>
            <option value="Gir">Gir</option>
            <option value="Sahiwal">Sahiwal</option>
            <option value="Tharparkar">Tharparkar</option>
            <option value="Other">Other</option>
          </Select>
          <Input
            name="deliveryRadius"
            placeholder="Delivery Radius (KM)"
            onChange={handleChange}
          />
          <Input
            name="aadharNumber"
            placeholder="Aadhar Number"
            onChange={handleChange}
          />

          <Input
            name="locationUrl"
            placeholder="Google Maps Location URL"
            onChange={handleChange}
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <Button type="submit">Register</Button>
        </FormBox>
      </Right>
    </Container>
  );
};

export default Register;
