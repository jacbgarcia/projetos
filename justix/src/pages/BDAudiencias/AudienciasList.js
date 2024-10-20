// src/pages/Tribunais/TribunaisListPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AudienciasListPageO from '../../components/BD/AudienciasListPage';


const AudienciasListPage = () => {
  const navigate = useNavigate();

  const handleEdit = (tribunal) => {
    navigate('/juiz/edit', { state: { tribunal } });
  };

  const handleNew = () => {
    navigate('/juiz/new');
  };

  return (
    <div>
      <h2>Lista de Juizes</h2>
      <button onClick={handleNew}>Novo Juiz</button>
      <AudienciasListPageO onEdit={handleEdit} />
    </div>
  );
};

export default AudienciasListPage;
