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

# Separation of Concerns (SoC)
**Amaç:**  
Kodun farklı sorumlulukları ayrı katmanlarda olmalı. Tek bir sınıf/fonksiyon birden fazla iş yapmamalı.

❌ Kötü Örnek
```typescript
class User {
  constructor(public name: string, public email: string) {}

  saveToDatabase() {
    console.log("Saving user to database...");
  }

  sendEmail() {
    console.log("Sending welcome email...");
  }
}
```
👉 User sınıfı hem veri tutuyor hem DB işini hem de email işini yapıyor.


✅ İyi Örnek
```ts
class User {
  constructor(public name: string, public email: string) {}
}

class UserRepository {
  save(user: User) {
    console.log("Saving user to database...");
  }
}

class EmailService {
  sendWelcomeEmail(user: User) {
    console.log(`Sending email to ${user.email}`);
  }
}
```

# Law of Demeter (Don’t talk to strangers)

**Amaç:**
Bir nesne sadece kendi direkt bağımlılarına mesaj göndermeli, derin zincirlerden kaçın.

❌ Kötü Örnek
```ts
user.address.city.getName(); // user → address → city → getName
```

✅ İyi Örnek
```ts
class User {
  constructor(private address: Address) {}
  getCityName() {
    return this.address.getCityName();
  }
}

class Address {
  constructor(private city: City) {}
  getCityName() {
    return this.city.name;
  }
}

// Usage
user.getCityName(); // zincir yok
```

# Tell, Don’t Ask

**Amaç:**
Nesnelere veri sormak yerine onlara ne yapmaları gerektiğini söyle. Böylece encapsulation korunur.

❌ Kötü Örnek
```ts
const balance = account.getBalance();
if (balance > 100) {
  account.withdraw(50);
}
```

✅ İyi Örnek
```ts
account.withdrawIfSufficient(50);

class Account {
  private balance = 200;
  withdrawIfSufficient(amount: number) {
    if (this.balance >= amount) {
      this.balance -= amount;
    } else {
      throw new Error("Insufficient funds");
    }
  }
}
```

# Fail Fast

**Amaç:**
Hatalar mümkün olan en erken aşamada tespit edilmeli. Böylece debug kolaylaşır ve sistem güvenli olur.

❌ Kötü Örnek
```ts
function divide(a: number, b: number) {
  return a / b; // b = 0 olabilir, hata geç farkedilir
}
```

✅ İyi Örnek
```ts
function divide(a: number, b: number) {
  if (b === 0) throw new Error("Division by zero!");
  return a / b;
}
```


🎯 Özet – Clean Code Temel Kurallar
| Konu                   | Amaç                                                       |
| --------------------   | ----------------------------------------------------       |
| KISS                   | Kod basit ve anlaşılır olsun                               |
| DRY                    | Tekrarlayan kodlardan kaçın                                |
| Anlamlı İsimlendirme   | Değişken ve fonksiyon isimleri ne yaptığını anlatsın       |
| Küçük Fonksiyonlar     | Fonksiyonlar tek iş yapsın, kısa olsun                     |
| Magic Number/String    | Sabit değerler için anlamlı isim kullan                    |
| Self-Explanatory Kod   | Kod yorumlara ihtiyaç bırakmasın                           |     
| Separation of Concerns | Kodun sorumluluklarını ayrı katmanlara ayır                |
| Law of Demeter         | Nesne sadece direkt bağımlılarına mesaj göndermeli         |
| Tell, Don’t Ask        | Nesnelere ne yapacaklarını söyle, veriyi çekip işlem yapma |
| Fail Fast              | Hataları erken tespit et ve hızlıca uyar                   |