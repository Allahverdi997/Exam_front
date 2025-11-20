Exam Angular Frontend

Layihə haqqında

Bu layihə imtahan sistemi üçün hazırlanmış bir Angular frontend tətbiqidir. Layihə vasitəsilə şagirdlərin qeydiyyatı, dərslərin idarəsi, imtahan nəticələrinin əlavə və redaktəsi həyata keçirilir. Layihə Bootstrap 5 ilə dizayn edilmiş, SweetAlert2 ilə bildirişlər göstərilir və backend ilə HTTP servislər vasitəsilə əlaqə qurur.

Texnologiyalar

Angular 13+

TypeScript

Bootstrap 5

RxJS

SweetAlert2

HTML5 / CSS3

Angular Forms (Reactive Forms)

HTTPClient

Quraşdırma

Repo-nu klonlayın:

git clone <repo-linki>
cd exam_front_app


Asılılıqları quraşdırın:

npm install


Angular serveri işə salın:

ng serve


Tətbiqə daxil olun:

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

Dashboard yüklənəndə default olaraq İmtahan nəticələri göstərilir.

Yan menyu vasitəsilə Şagirdlər, Dərslər, İmtahan nəticələri arasında keçid edilir.

Sidebar mobil və desktop üçün uyğun dizaynlıdır, açılıb bağlananda layout avtomatik tənzimlənir.

Şagirdlər

Şagirdlərin listi table şəklində göstərilir.

Yeni şagird əlavə etmək üçün modal istifadə olunur.

Şagird redaktəsi modal vasitəsilə həyata keçirilir.

Reactive Forms ilə validation təmin olunub (required, maxLength, min/max).

Dərslər

Dərs listi göstərilir, yeni dərs əlavə və mövcud dərsi redaktə etmək mümkündür.

Dərslər üçün validasiya mövcuddur (kod, adı, müəllim adı/soyadı, sinif).

İmtahan Nəticələri

Dərs və şagird seçərək imtahan nəticəsi əlavə etmək mümkündür.

Exam Date yalnız bu gün və sonrakı gün ola bilər (custom validator ilə).

Qiymət 0-10 arasında olmalıdır.

Table-da pagination və scroll dəstəyi var.

Loading / Feedback

Əməliyyatlar zamanı spinner göstərilir.

Error və success mesajları SweetAlert2 vasitəsilə göstərilir.

Custom Validators

todayOrFutureValidator – seçilmiş tarix yalnız bu gün və gələcək ola bilər.

Reactive Forms validation messages HTML-də göstərilir.

Backend API

Servis layer (examService) vasitəsilə GET, POST, PUT əməliyyatları həyata keçirilir.

JWT token ilə authentication mümkündür (localStorage vasitəsilə saxlanılır).

Pagination

Table-larda server və client tərəfdə pagination dəstəyi mövcuddur.

Scroll əlavə edilib ki, 15-dən çox məlumat olduqda table-da scrollbar görünsün.

Validasiya Mesajları

Şagird və dərs formaları üçün required, maxLength, min/max validasiyaları göstərilir.

İmtahan nəticəsində examDate yalnız bugünkü və gələcək tarix ola bilər, examValue 0-10 aralığında olmalıdır.

Validation mesajları modal form içində dinamik göstərilir.
