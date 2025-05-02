import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  max-width: 700px;
  margin: 40px auto;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;
const Title = styled.h2`
  margin-bottom: 1rem;
`;
const Label = styled.label`
  margin-top: 1rem;
  display: block;
  font-weight: 600;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 0.5rem;
`;
const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin-top: 1rem;
`;
const Button = styled.button`
  background: #769fcd;
  color: white;
  padding: 10px 16px;
  margin-top: 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const SettingsPage = () => {
  const [gaushala, setGaushala] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:2500/api/gaushalas/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGaushala(res.data);
    };
    fetchProfile();
  }, []);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("photo", file);
    const token = localStorage.getItem("token");
    await axios.put("http://localhost:2500/api/gaushalas/update-photo", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    window.location.reload();
  };

  if (!gaushala) return <Container>Loading...</Container>;

  return (
    <Container>
      <Title>Gaushala Settings</Title>
      <Label>Gaushala Name</Label>
      <Input value={gaushala.gaushalaName} disabled />
      <Label>Owner Name</Label>
      <Input value={gaushala.ownerName} disabled />
      <Label>Email</Label>
      <Input value={gaushala.email} disabled />
      <Label>Phone</Label>
      <Input value={gaushala.phone} disabled />
      <Label>Milk Capacity</Label>
      <Input value={gaushala.milkCapacity} disabled />
      <Label>Photo</Label>
      {gaushala.photo && <ImagePreview src={gaushala.photo} alt="Gaushala Photo" />}
      <Input type="file" onChange={handlePhotoUpload} />
      <Button onClick={() => alert("Feature to edit other fields coming soon")}>Save Changes</Button>
    </Container>
  );
};

export default SettingsPage;
