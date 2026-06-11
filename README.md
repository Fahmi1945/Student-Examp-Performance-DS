# 📊 Predictive Analysis of Student Performance Factors & Exam Score Optimization

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue.svg)](https://www.python.org/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-Machine%20Learning-orange.svg)](https://scikit-learn.org/)
[![Pandas](https://img.shields.io/badge/Pandas-Data%20Analysis-150458.svg)](https://pandas.pydata.org/)
[![Status](https://img.shields.io/badge/Status-Completed-success.svg)]()

Repositori ini berisi analisis komprehensif mengenai faktor-faktor yang paling memengaruhi nilai ujian siswa. Menggunakan **6.607 data siswa** dan metodologi **CRISP-DM**, proyek ini menerapkan model *Machine Learning* untuk menemukan variabel dominan penentu kesuksesan akademik dan memberikan rekomendasi yang dapat ditindaklanjuti (*actionable insights*) bagi sekolah dan orang tua.

---

## 🎯 Business Understanding & Objective
Ketidakpastian mengenai faktor dominan (internal vs eksternal) yang memengaruhi nilai ujian sering kali menyebabkan keterlambatan intervensi akademik. 
Tujuan dari proyek ini adalah:
1. Mengidentifikasi variabel kritis penentu nilai ujian dari 19 fitur pendukung yang ada.
2. Membangun model regresi prediktif dengan tingkat akurasi (R²) minimal 70% dan tingkat eror (MAE & RMSE) yang rendah.
3. Memberikan *Proactive Early Warning* untuk mengoptimalkan performa siswa.

---

## 📂 Dataset Information
* **Jumlah Data:** 6.607 Baris, 20 Kolom
* **Target Variable:** `Exam_Score` (Rentang nilai valid 0 - 100)
* **Validasi Data:** Meliputi penanganan *missing values* (Modus untuk data kategorikal) dan perbaikan anomali data (Capping nilai > 100).
* **Rasio Train-Test Split:** 80% Data Latih / 20% Data Uji

---

## ⚙️ Model Evaluation & Komparasi

Tiga algoritma *Machine Learning* diuji untuk mencari model paling optimal dalam memprediksi nilai siswa. 

| Algoritma | R-Squared (R²) | MAE | RMSE |
| :--- | :---: | :---: | :---: |
| Linear Regression | 0.7275 | 0.4776 | 2.0301 |
| **Random Forest Regressor** | **0.8204** | **0.6880** | **1.6480** |
| Support Vector Regression (SVR) | 0.7239 | 0.4595 | 2.0435 |

> **Kesimpulan Model:** **Random Forest Regressor** dipilih sebagai model final karena secara signifikan melampaui target minimum R² (berhasil memetakan 82% variasi data) dan memiliki tingkat eror RMSE terendah tanpa mengalami indikasi *overfitting*.

---

## 🔍 Feature Importance (Temuan Detektif Data)
Berdasarkan ekstraksi bobot fitur dari model Random Forest yang telah di-*tuning*, ditemukan **2 Faktor Emas** penentu nilai ujian:
1. **Attendance (0.44)** - Tingkat kehadiran adalah prediktor nomor #1 yang paling berkorelasi kuat dengan nilai.
2. **Hours Studied (0.27)** - Jumlah jam belajar mandiri menjadi prediktor terkuat kedua.
3. **Previous Scores (0.08)** - Riwayat nilai sebelumnya memegang peran penting dalam memetakan tren siswa.
4. **Access to Resources (0.04)** - Faktor eksternal penyokong performa.

---

## 💡 Actionable Insights (Rekomendasi)
Analisis prediktif ini menghasilkan tiga langkah intervensi strategis:
- 🎯 **Peringatan Dini:** Pantau secara ketat siswa dengan persentase absen buruk dan riwayat nilai sebelumnya yang rendah.
- 📚 **Manajemen Waktu:** Pihak sekolah dan orang tua perlu mendorong serta memfasilitasi kampanye penambahan jam belajar mandiri secara konsisten.
- 🤝 **Bimbingan Ekstra:** Menyediakan sesi *tutoring* khusus bagi siswa di zona rentan terbukti mampu mendongkrak performa secara terukur.

---

## 💻 Tech Stack
* **Bahasa Pemrograman:** Python
* **Data Manipulation & Analisis:** Pandas, NumPy
* **Machine Learning:** Scikit-Learn (Linear Regression, RandomForestRegressor, SVR)
* **Visualisasi Data:** Matplotlib, Seaborn
* **Desain UI/Infografis:** Figma

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

1. **Clone repositori ini**
```bash
   git clone [https://github.com/username-anda/Student-Examp-Performance-DS.git](https://github.com/username-anda/Student-Examp-Performance-DS.git)
   cd Student-Examp-Performance-DS

```

2. **Buat Virtual Environment (Opsional namun disarankan)**

```bash
   python -m venv env
   source env/bin/activate  # Untuk Linux/Mac
   env\Scripts\activate     # Untuk Windows

```

3. **Install Dependencies**

```bash
   pip install pandas numpy scikit-learn matplotlib seaborn jupyter

```

4. **Jalankan Jupyter Notebook**

```bash
   jupyter notebook UAS_DS.ipynb

```

---

*Disusun untuk Kepentingan Analisis Akademik & Pengembangan Pendidikan © 2026*

```

```