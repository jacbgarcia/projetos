import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ForunsFormPageO = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const forumAtivo = location.state?.forum || null;

  const [formData, setFormData] = useState({
    nome: '',
    cidade: '',
    estado: '',
    endereco: '',
    cep: '',
    avaliacao_media: 0
  });

  useEffect(() => {
    if (forumAtivo) {
      setFormData(forumAtivo);
    }
  }, [forumAtivo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (forumAtivo) {
        await axios.put(`http://localhost:3001/foruns/${forumAtivo.id_forum}`, formData);
      } else {
        await axios.post('http://localhost:3001/foruns', formData);
      }
      navigate('/foruns');
    } catch (err) {
      console.error('Erro ao salvar fórum:', err);
    }
  };

  const handleCancel = () => {
    navigate('/foruns');
  };

  return (
    <div>
      <h3>{forumAtivo ? 'Editar Fórum' : 'Novo Fórum'}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Cidade:</label>
          <input
            type="text"
            value={formData.cidade}
            onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Estado:</label>
          <input
            type="text"
            value={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Endereço:</label>
          <input
            type="text"
            value={formData.endereco}
            onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
          />
        </div>
        <div>
          <label>CEP:</label>
          <input
            type="text"
            value={formData.cep}
            onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
          />
        </div>
        <div>
          <label>Avaliação Média:</label>
          <input
            type="number"
            value={formData.avaliacao_media}
            onChange={(e) => setFormData({ ...formData, avaliacao_media: e.target.value })}
            step="0.01"
            min="0"
            max="10"
            required
          />
        </div>
        <button type="submit">
          {forumAtivo ? 'Salvar Alterações' : 'Criar Fórum'}
        </button>
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default ForunsFormPageO;