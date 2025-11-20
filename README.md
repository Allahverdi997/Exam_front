
Exam Angular Frontend

Layihə haqqında
Bu layihə imtahan sistemi üçün hazırlanmış bir Angular frontend tətbiqidir. Layihə vasitəsilə şagirdlərin qeydiyyatı, dərslərin idarəsi, imtahan nəticələrinin əlavə və redaktəsi həyata keçirilir. Layihə Bootstrap 5 ilə dizayn edilmiş, SweetAlert2 ilə bildirişlər göstərilir və backend ilə HTTP servislər vasitəsilə əlaqə qurur.

Texnologiyalar
- Angular 13+
- TypeScript
- Bootstrap 5
- RxJS
- SweetAlert2
- HTML5 / CSS3
- Angular Forms (Reactive Forms)
- HTTPClient

Quraşdırma
1. Repo-nu klonlayın:
    git clone <repo-linki>
    cd exam_front_app

2. Asılılıqları quraşdırın:
    npm install

3. Angular serveri işə salın:
    ng serve

4. Tətbiqə daxil olun:
    http://localhost:4200

Layihənin Strukturı
src/
 ├─ app/
 │   ├─ components/
 │   │   ├─ sidebar/        # Yan menyu komponenti
 │   │   ├─ student/        # Şagirdlər üçün list/add/update modal
 │   │   ├─ lesson/         # Dərslər üçün list/add/update modal
 │   │   └─ exam-result/    # İmtahan nəticələri
 │   ├─ services/
 │   │   └─ exam-service.ts # Backend ilə API çağırışları
 │   ├─ models/             # TypeScript modellər
 │   └─ app-routing.module.ts
 └─ assets/
     └─ logo.png

Əsas Funksionallıqlar

Sidebar / Navigation
- Dashboard yüklənəndə default olaraq imtahan nəticələri göstərilir.
- Yan menyu vasitəsilə Şagirdlər, Dərslər, İmtahan nəticələri arasında keçid edilir.
- Sidebar mobil və desktop üçün uyğun dizaynlıdır.

Şagirdlər
- Şagird listi table formatında göstərilir.
- Yeni şagird əlavə etmək üçün modal istifadə olunur.
- Şagird redaktəsi modal ilə edilir.
- Reactive Forms ilə validation təmin olunub.

Dərslər
- Dərs listi göstərilir.
- Yeni dərs əlavə və mövcud dərsləri redaktə etmək mümkündür.
- Dərslər üçün validasiya mövcuddur.

İmtahan Nəticələri
- Dərs və şagird seçərək imtahan nəticəsi əlavə edilir.
- Exam Date yalnız bu gün və sonrakı gün ola bilər.
- Qiymət 0–10 arasında olmalıdır.
- Table-da pagination və scroll dəstəyi var.

Loading / Feedback
- Əməliyyatlar zamanı spinner göstərilir.
- Success və error bildirişləri SweetAlert2 vasitəsilə göstərilir.

Custom Validators
- todayOrFutureValidator – tarix yalnız bu gün və gələcək ola bilər.

Backend API
- GET, POST, PUT əməliyyatları üçün servis layer istifadə olunur.
- JWT token ilə authentication mümkündür.

Pagination
- Table-larda server və client tərəfli pagination var.
- 15-dən çox məlumat olanda scroll avtomatik görünür.

Validasiya Mesajları
- Şagird və dərs formalarında required, maxLength və min/max validasiyaları var.
- İmtahan nəticəsində examDate validasiyası və examValue 0–10 aralığı təmin edilir.

