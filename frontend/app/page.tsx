'use client';

import React, { useState } from 'react';

// 1. Mendefinisikan tipe data (Interface) untuk form agar TypeScript tidak bingung
interface StudentFormData {
  Hours_Studied: number;
  Attendance: number;
  Parental_Involvement: string;
  Access_to_Resources: string;
  Extracurricular_Activities: string;
  Sleep_Hours: number;
  Previous_Scores: number;
  Motivation_Level: string;
  Internet_Access: string;
  Tutoring_Sessions: number;
  Family_Income: string;
  Teacher_Quality: string;
  School_Type: string;
  Peer_Influence: string;
  Physical_Activity: number;
  Learning_Disabilities: string;
  Parental_Education_Level: string;
  Distance_from_Home: string;
  Gender: string;
}

export default function Home() {
  // 2. Memasang tipe data ke dalam state
  const [formData, setFormData] = useState<StudentFormData>({
    Hours_Studied: 0,
    Attendance: 0,
    Parental_Involvement: 'Medium',
    Access_to_Resources: 'Medium',
    Extracurricular_Activities: 'No',
    Sleep_Hours: 7,
    Previous_Scores: 0,
    Motivation_Level: 'Medium',
    Internet_Access: 'Yes',
    Tutoring_Sessions: 0,
    Family_Income: 'Medium',
    Teacher_Quality: 'Medium',
    School_Type: 'Public',
    Peer_Influence: 'Neutral',
    Physical_Activity: 2,
    Learning_Disabilities: 'No',
    Parental_Education_Level: 'High School',
    Distance_from_Home: 'Near',
    Gender: 'Male',
  });

  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 3. Memberikan tipe 'React.ChangeEvent' untuk event dari input HTML
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const targetValue = e.target.type === 'number' ? parseInt(value) || 0 : value;
    
    setFormData({
      ...formData,
      [name]: targetValue,
    });
  };

  // 4. Memberikan tipe 'React.FormEvent' untuk event submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Gagal mengambil data dari server backend.');
      }

      const result = await response.json();
      if (result.status === 'success') {
        setPrediction(result.predicted_exam_score);
      }
    } catch (err: unknown) {
      // 5. Memeriksa tipe error sebelum menampilkannya
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Terjadi kesalahan sistem.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-sky-100">
      {/* Header Banner */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-sky-200">
              S
            </div>
            <span className="font-semibold text-lg tracking-tight text-slate-900">
              Edu<span className="text-sky-600">Predict</span>
            </span>
          </div>
          <span className="text-xs bg-sky-50 text-sky-700 font-medium px-2.5 py-1 rounded-full border border-sky-100">
            AI Model Active
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Prediksi Performa Nilai Ujian Siswa
          </h1>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
            Masukkan data profil akademis dan latar belakang siswa untuk mengestimasi hasil skor ujian akhir menggunakan kecerdasan buatan.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Bagian 1: Akademik Utama */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-sky-600 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-sky-600 rounded-full inline-block"></span>
                Performa & Aktivitas Akademik
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Nilai Ujian Sebelumnya (0-100)</label>
                  <input type="number" name="Previous_Scores" min="0" max="100" value={formData.Previous_Scores} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Tingkat Kehadiran (0-100%)</label>
                  <input type="number" name="Attendance" min="0" max="100" value={formData.Attendance} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Total Jam Belajar Mandiri</label>
                  <input type="number" name="Hours_Studied" min="0" value={formData.Hours_Studied} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Jumlah Sesi Tutoring / Les</label>
                  <input type="number" name="Tutoring_Sessions" min="0" value={formData.Tutoring_Sessions} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Tingkat Motivasi Belajar</label>
                  <select name="Motivation_Level" value={formData.Motivation_Level} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all">
                    <option value="Low">Rendah (Low)</option>
                    <option value="Medium">Sedang (Medium)</option>
                    <option value="High">Tinggi (High)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Kualitas Tenaga Pengajar</label>
                  <select name="Teacher_Quality" value={formData.Teacher_Quality} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all">
                    <option value="Low">Kurang (Low)</option>
                    <option value="Medium">Cukup (Medium)</option>
                    <option value="High">Sangat Baik (High)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bagian 2: Fasilitas & Lingkungan Eksternal */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-sky-600 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-sky-600 rounded-full inline-block"></span>
                Fasilitas & Lingkungan Sosial
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Akses ke Fasilitas Belajar</label>
                  <select name="Access_to_Resources" value={formData.Access_to_Resources} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all">
                    <option value="Low">Terbatas (Low)</option>
                    <option value="Medium">Memadai (Medium)</option>
                    <option value="High">Sangat Lengkap (High)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Akses Jaringan Internet</label>
                  <select name="Internet_Access" value={formData.Internet_Access} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all">
                    <option value="Yes">Ada (Yes)</option>
                    <option value="No">Tidak Ada (No)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Pengaruh Teman Sebaya</label>
                  <select name="Peer_Influence" value={formData.Peer_Influence} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all">
                    <option value="Negative">Negatif</option>
                    <option value="Neutral">Netral</option>
                    <option value="Positive">Positif</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Mengikuti Ekstrakurikuler?</label>
                  <select name="Extracurricular_Activities" value={formData.Extracurricular_Activities} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all">
                    <option value="Yes">Ya</option>
                    <option value="No">Tidak</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Tipe Sekolah</label>
                  <select name="School_Type" value={formData.School_Type} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all">
                    <option value="Public">Negeri (Public)</option>
                    <option value="Private">Swasta (Private)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Jarak Rumah ke Sekolah</label>
                  <select name="Distance_from_Home" value={formData.Distance_from_Home} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all">
                    <option value="Near">Dekat (Near)</option>
                    <option value="Moderate">Sedang (Moderate)</option>
                    <option value="Far">Jauh (Far)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bagian 3: Kebiasaan Sehari-hari & Latar Belakang */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-sky-600 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-sky-600 rounded-full inline-block"></span>
                Gaya Hidup & Latar Belakang Keluarga
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Jam Tidur (Per Malam)</label>
                  <input type="number" name="Sleep_Hours" min="0" max="24" value={formData.Sleep_Hours} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Durasi Aktivitas Fisik (Jam/Minggu)</label>
                  <input type="number" name="Physical_Activity" min="0" value={formData.Physical_Activity} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Keterlibatan Orang Tua</label>
                  <select name="Parental_Involvement" value={formData.Parental_Involvement} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all">
                    <option value="Low">Kurang (Low)</option>
                    <option value="Medium">Cukup (Medium)</option>
                    <option value="High">Sangat Aktif (High)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Tingkat Pendapatan Keluarga</label>
                  <select name="Family_Income" value={formData.Family_Income} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all">
                    <option value="Low">Rendah (Low)</option>
                    <option value="Medium">Menengah (Medium)</option>
                    <option value="High">Tinggi (High)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Pendidikan Terakhir Orang Tua</label>
                  <select name="Parental_Education_Level" value={formData.Parental_Education_Level} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all">
                    <option value="High School">SMA / Sederajat</option>
                    <option value="College">Diploma / Sarjana</option>
                    <option value="Postgraduate">Pascasarjana (S2/S3)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Memiliki Hambatan Belajar?</label>
                  <select name="Learning_Disabilities" value={formData.Learning_Disabilities} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all">
                    <option value="No">Tidak Ada (No)</option>
                    <option value="Yes">Ada (Yes)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Jenis Kelamin</label>
                  <select name="Gender" value={formData.Gender} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all">
                    <option value="Male">Laki-laki (Male)</option>
                    <option value="Female">Perempuan (Female)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tombol Submit */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white font-medium px-8 py-3 rounded-xl transition-all shadow-lg shadow-sky-200 active:scale-[0.98]"
              >
                {loading ? 'Sedang Memproses...' : 'Hitung Estimasi Nilai'}
              </button>
            </div>
          </form>
        </div>

        {/* Komponen Penampil Hasil Prediksi */}
        {(prediction !== null || error || loading) && (
          <div className="mt-8 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 p-6 text-center animate-fade-in">
            {loading && (
              <div className="flex flex-col items-center py-6">
                <div className="w-10 h-10 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin"></div>
                <p className="mt-3 text-sm text-slate-500">Menganalisis profil siswa...</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-rose-50 text-rose-700 text-sm rounded-xl border border-rose-100">
                ⚠️ {error}
              </div>
            )}

            {prediction !== null && !loading && (
              <div className="py-4">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Hasil Estimasi Ujian</p>
                <div className="mt-2 flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-extrabold tracking-tight text-sky-600">{prediction}</span>
                  <span className="text-xl font-semibold text-slate-400">/ 100</span>
                </div>
                <p className="mt-4 text-xs text-emerald-600 bg-emerald-50 inline-block px-3 py-1 rounded-full font-medium border border-emerald-100">
                  ✓ Berhasil diprediksi oleh Model
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}