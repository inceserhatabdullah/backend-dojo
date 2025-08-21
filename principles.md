# Single Responsibility Principle (SRP) – Tek Sorumluluk Prensibi

**Tanım:**  
Bir sınıfın veya fonksiyonun sadece **tek bir sorumluluğu** olmalıdır. Yani bir sınıfın değişmesi için **tek bir neden** olmalı.

❌ Kötü Örnek
```ts
class User {
  constructor(public name: string, public email: string) {}

  saveToDatabase() {
    // DB kaydetme işlemi
    console.log("Saving user to database...");
  }

  sendEmail() {
    // Email gönderme işlemi
    console.log("Sending welcome email...");
  }
}
```

👉 Burada User hem database işini yapıyor hem de email gönderiyor.
Yani iki sorumluluk aynı sınıfta.

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

👉 Artık sorumluluklar ayrıldı:

UserRepository → veri tabanı

EmailService → email gönderme

User → sadece kullanıcıyı temsil ediyor.

# Open/Closed Principle (OCP) – Açık/Kapalı Prensibi
Tanım:
Bir sınıf genişletmeye açık, değişikliğe kapalı olmalıdır.
Yeni özellik eklemek için var olan kodu değiştirmemeliyiz, genişletmeliyiz.

❌ Kötü Örnek
```ts
class Payment {
  process(type: string) {
    if (type === "credit") {
      console.log("Processing credit card payment...");
    } else if (type === "paypal") {
      console.log("Processing PayPal payment...");
    }
  }
}
```
👉 Yeni bir ödeme yöntemi (örn: Bitcoin) eklemek için bu sınıfı değiştirmemiz gerekir.

✅ İyi Örnek
```ts
interface PaymentMethod {
  process(): void;
}

class CreditCardPayment implements PaymentMethod {
  process() {
    console.log("Processing credit card payment...");
  }
}

class PayPalPayment implements PaymentMethod {
  process() {
    console.log("Processing PayPal payment...");
  }
}

class PaymentProcessor {
  process(payment: PaymentMethod) {
    payment.process();
  }
}
```

👉 Artık yeni bir ödeme yöntemi eklemek için sadece PaymentMethod arayüzünü implemente etmek yeterli.
Mevcut kodu değiştirmedik, genişlettik.

# Liskov Substitution Principle (LSP) – Liskov’un Yerine Geçme Prensibi
Tanım:
Türeyen sınıflar, temel sınıfların yerine sorunsuz kullanılabilmelidir.

❌ Kötü Örnek
```ts
class Bird {
  fly() {
    console.log("Flying...");
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error("Penguins can't fly!");
  }
}
```

👉 Penguin, Bird sınıfından türedi ama fly() metodunu bozuldu.
Yani Bird yerine Penguin kullanılamıyor → LSP ihlali.

✅ İyi Örnek
```ts
abstract class Bird {
  abstract move(): void;
}

class Sparrow extends Bird {
  move() {
    console.log("Flying...");
  }
}

class Penguin extends Bird {
  move() {
    console.log("Swimming...");
  }
}
```

👉 Bird artık “hareket eden kuş”u temsil ediyor.
Serçe uçar, penguen yüzer → LSP korunmuş oldu.

# Interface Segregation Principle (ISP) – Arayüzlerin Ayrılması Prensibi
Tanım:
Kullanıcılar ihtiyaç duymadıkları metotlara bağımlı olmamalıdır.
Büyük arayüzler yerine küçük, odaklı arayüzler kullanılmalı.

❌ Kötü Örnek
```ts
interface Worker {
  work(): void;
  eat(): void;
}

class Human implements Worker {
  work() { console.log("Working..."); }
  eat() { console.log("Eating..."); }
}

class Robot implements Worker {
  work() { console.log("Working..."); }
  eat() { throw new Error("Robots don't eat!"); }
}
```

👉 Robot, aslında eat metoduna ihtiyaç duymuyor ama implement etmek zorunda kalıyor.

✅ İyi Örnek
```ts
interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}

class Human implements Workable, Eatable {
  work() { console.log("Working..."); }
  eat() { console.log("Eating..."); }
}

class Robot implements Workable {
  work() { console.log("Working..."); }
}
```

👉 Arayüzler bölündü, herkes sadece ihtiyaç duyduğu kadarını implement ediyor.

# Dependency Inversion Principle (DIP) – Bağımlılığın Ters Çevrilmesi
Tanım:
Yüksek seviyeli modüller, düşük seviyeli modüllere değil, soyutlamalara (interface/abstract) bağlı olmalıdır.

❌ Kötü Örnek
```ts
class MySQLDatabase {
  save(data: string) {
    console.log("Saving to MySQL: " + data);
  }
}

class UserService {
  db = new MySQLDatabase();

  saveUser(user: string) {
    this.db.save(user);
  }
}
```

👉 UserService doğrudan MySQLDatabase’e bağımlı.
Başka bir veritabanı (Postgres, Mongo) kullanmak istersek kodu değiştirmek zorundayız.

✅ İyi Örnek
```ts
interface Database {
  save(data: string): void;
}

class MySQLDatabase implements Database {
  save(data: string) {
    console.log("Saving to MySQL: " + data);
  }
}

class MongoDatabase implements Database {
  save(data: string) {
    console.log("Saving to MongoDB: " + data);
  }
}

class UserService {
  constructor(private db: Database) {}

  saveUser(user: string) {
    this.db.save(user);
  }
}
```

👉 UserService, artık Database arayüzüne bağımlı.
İstediğimiz veritabanını inject ederek kullanabiliriz.

🎯 Özet
```
SRP: Tek sorumluluk → class/fonksiyon tek bir iş yapmalı

OCP: Değişikliğe kapalı, genişletmeye açık → mevcut kodu değiştirmeden yeni özellik eklenebilmeli

LSP: Alt sınıflar, üst sınıfın yerine geçebilmeli

ISP: Büyük arayüzler yerine küçük, odaklı arayüzler olmalı

DIP: Yüksek seviye modüller soyutlamalara bağımlı olmalı
```