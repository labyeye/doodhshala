import React from "react";
import { useState } from "react";
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

const FormBox = styled.div`
  width: 80%;
  max-width: 400px;
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:2500/api/gaushalas/login",
        {
          email,
          password,
        }
      );

      const { token } = res.data;
      localStorage.setItem("token", token);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container>
      <Left>
        <h1>GoMilk</h1>
        <p>Fresh, trusted milk delivered directly from Gaushalas.</p>
      </Left>
      <Right>
        <FormBox as="form" onSubmit={handleLogin}>
          <Title>Welcome Back!</Title>
          <SubText>Log in to manage your orders</SubText>
          <Input
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button type="submit">Login</Button>
        </FormBox>
      </Right>
    </Container>
  );
};

export default Login;
