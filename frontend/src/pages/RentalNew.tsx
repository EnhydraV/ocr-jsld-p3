import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { rentalsAPI } from '../services/api';

interface RentalFormState {
  name: string;
  surface: string;
  price: string;
  description: string;
  picture: File | null;
}

const EMPTY_FORM: RentalFormState = {
  name: '',
  surface: '',
  price: '',
  description: '',
  picture: null,
};

export default function RentalNew() {
  const navigate = useNavigate();
  const [form, setForm] = useState<RentalFormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, picture: e.target.files?.[0] ?? null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.picture) {
      setError('Veuillez sélectionner une photo.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await rentalsAPI.create({
        name: form.name,
        surface: parseFloat(form.surface),
        price: parseFloat(form.price),
        description: form.description,
        picture: form.picture,
      });
      navigate('/');
    } catch {
      setError('Erreur lors de la création de la location.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-primary hover:underline flex items-center gap-2"
      >
        ← Retour
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Ajouter une location
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Surface (m²)
            </label>
            <input
              type="number"
              name="surface"
              value={form.surface}
              onChange={handleChange}
              required
              min="1"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prix (€ / mois)
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Photo
          </label>
          <input
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleFile}
            required
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white hover:file:bg-primary/90"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {submitting ? 'Création...' : 'Créer la location'}
        </button>
      </form>
    </div>
  );
}