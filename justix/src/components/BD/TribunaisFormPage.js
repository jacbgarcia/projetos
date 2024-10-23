import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const TribunaisFormPageO = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tribunalAtivo = location.state?.tribunal || null;

  const [formData, setFormData] = useState({
    nome: '',
    cidade: '',
    estado: '',
    endereco: '',
    cep: '',
    avaliacao_media: 0
  });

  const [imagemFile, setImagemFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (tribunalAtivo) {
      setFormData(tribunalAtivo);
      if (tribunalAtivo.imagem) {
        setPreviewUrl(`http://localhost:3001/uploads/tribunais/${tribunalAtivo.imagem}`);
      }
    }
  }, [tribunalAtivo]);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagemFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitFormData = new FormData();
      
      // Adiciona todos os campos do formulário ao FormData
      Object.keys(formData).forEach(key => {
        submitFormData.append(key, formData[key]);
      });

      // Adiciona a imagem apenas se uma nova imagem foi selecionada
      if (imagemFile) {
        submitFormData.append('imagem', imagemFile);
      }

      if (tribunalAtivo) {
        await axios.put(
          `http://localhost:3001/tribunais/${tribunalAtivo.id_tribunal}`,
          submitFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      } else {
        await axios.post(
          'http://localhost:3001/tribunais',
          submitFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }
      navigate('/admin/dashboard/tribunais');
    } catch (err) {
      console.error('Erro ao salvar tribunal:', err);
    }
  };

  const handleCancel = () => {
    navigate('/admin/dashboard/tribunais');
  };

  return (
    <div>
      <h3>{tribunalAtivo ? 'Editar Tribunal' : 'Novo Tribunal'}</h3>
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
        <div>
          <label>Foto:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagemChange}
          />
          {previewUrl && (
            <div>
              <img 
                src={previewUrl} 
                alt="Preview" 
                style={{ maxWidth: '200px', marginTop: '10px' }}
              />
            </div>
          )}
        </div>
        <button type="submit">
          {tribunalAtivo ? 'Salvar Alterações' : 'Criar Tribunal'}
        </button>
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default TribunaisFormPageO;