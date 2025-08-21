# Kıss (Keep it Simple, stupid!)
**Amaç:**  
Kod basit, anlaşılır ve gereksiz karmaşıklıktan uzak olmalı.

❌ Kötü Örnek
```typescript
function calculateArea(width: number, height: number, unit?: string) {
  if (unit) {
    if (unit === "cm") return width * height;
    else if (unit === "m") return (width * height) * 10000;
    else throw new Error("Invalid unit");
  }
  return width * height;
}
```

✅ İyi Örnek
```ts
function calculateAreaInCm(widthCm: number, heightCm: number) {
  return widthCm * heightCm;
}

function calculateAreaInM(widthM: number, heightM: number) {
  return widthM * heightM * 10000;
}
```

# DRY (Don't Repeat Yourself)
**Amaç:**
Tekrarlayan kodlardan kaçın, ortak işlevleri fonksiyon veya sınıfa taşı.

❌ Kötü Örnek
```ts
function getUserFullName1(user: { firstName: string; lastName: string }) {
  return user.firstName + " " + user.lastName;
}

function getUserFullName2(customer: { firstName: string; lastName: string }) {
  return customer.firstName + " " + customer.lastName;
}
```

✅ İyi Örnek
```ts
function getFullName(person: { firstName: string; lastName: string }) {
  return `${person.firstName} ${person.lastName}`;
}
```


🎯 Özet – Clean Code Temel Kurallar
| Konu                 | Amaç                                                 |
| -------------------- | ---------------------------------------------------- |
| KISS                 | Kod basit ve anlaşılır olsun                         |
| DRY                  | Tekrarlayan kodlardan kaçın                          |
| Anlamlı İsimlendirme | Değişken ve fonksiyon isimleri ne yaptığını anlatsın |
| Küçük Fonksiyonlar   | Fonksiyonlar tek iş yapsın, kısa olsun               |
| Magic Number/String  | Sabit değerler için anlamlı isim kullan              |
| Self-Explanatory Kod | Kod yorumlara ihtiyaç bırakmasın                     |