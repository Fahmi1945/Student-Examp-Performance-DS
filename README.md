# 🎓 Student Performance Predictive Analytics

![Python](https://img.shields.io/badge/Python-3.8%2B-blue?logo=python) ![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-Latest-orange?logo=scikitlearn) ![Pandas](https://img.shields.io/badge/Pandas-Data%20Analysis-red?logo=pandas)

Proyek ini bertujuan untuk membedah faktor-faktor yang memengaruhi keberhasilan akademik siswa menggunakan dataset berisi 6.607 catatan siswa. Kami membangun pipeline analitik mulai dari pembersihan data hingga implementasi **Ensemble Learning** untuk prediksi hasil ujian.

## 🚀 Ringkasan Proyek

Berdasarkan kerangka kerja **CRISP-DM**, proyek ini menjawab tantangan institusi pendidikan dalam melakukan intervensi dini bagi siswa yang berisiko secara akademik.

### 🔍 Temuan Utama (Insights)
1. **Attendance is King**: Kehadiran di kelas memiliki korelasi terkuat (~0.57) terhadap nilai akhir.
2. **Study Habit**: Jam belajar mandiri merupakan prediktor kedua yang paling signifikan.
3. **Social Factors**: Akses internet dan dukungan orang tua memberikan dampak positif yang stabil pada distribusi nilai tengah.

## 🛠️ Tech Stack
- **Data Handling**: Pandas, NumPy
- **Visualization**: Seaborn, Matplotlib
- **Machine Learning**: Scikit-Learn (Linear Regression, Random Forest, SVM, Naive Bayes)
- **Preprocessing**: StandardScaler, LabelEncoder

## 📊 Performa Model

Kami menguji dua pendekatan utama untuk memberikan hasil yang komprehensif:

| Model | Task | Metric | Result |
| :--- | :--- | :--- | :--- |
| **Linear Regression** | Regression | R-Squared | **0.6888** |
| **Random Forest** | Regression | R-Squared | 0.6547 |
| **Ensemble (SVM + NB)** | Classification | Accuracy | **91.45%** |

> **Catatan**: Model Ensemble berhasil mencapai akurasi di atas 90% dalam mengklasifikasikan siswa yang membutuhkan bantuan tambahan (nilai < 70).

## 📂 Struktur Data
Dataset mencakup 20 kolom, termasuk:
- **Fitur Perilaku**: `Hours_Studied`, `Attendance`, `Tutoring_Sessions`.
- **Fitur Lingkungan**: `Internet_Access`, `Parental_Involvement`, `School_Type`.
- **Target**: `Exam_Score` (0 - 100).

## 🛠️ Cara Penggunaan
1. Pastikan file `StudentPerformanceFactors.csv` tersedia di direktori kerja.
2. Jalankan notebook untuk melihat visualisasi distribusi dan korelasi.
3. Model akan melatih data secara otomatis dengan pembagian 80:20 (Train:Test).

---
*Dibuat untuk optimasi pendidikan berbasis data.*