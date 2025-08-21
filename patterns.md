# Singleton Pattern

**Amaç:**  
Bir sınıfın sadece **tek bir instance’ının** oluşmasını garanti eder.

**Kullanım Alanı:**  
Database connection, global config, cache, logger.

❌ Kötü Örnek
```typescript
class Database {
  connect() {
    console.log("Connected to database");
  }
}

const db1 = new Database();
db1.connect();

const db2 = new Database();
db2.connect();

console.log(db1 === db2); // false → farklı instance!
```

👉 Her new Database() çağrısında yeni bir bağlantı açılıyor, backend’de gereksiz yük yaratır.

✅ İyi Örnek
```ts
class Database {
  private static instance: Database;

  private constructor() {
    console.log("New Database connection created!");
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  query(sql: string) {
    console.log(`Running SQL: ${sql}`);
  }
}

// Usage
const db1 = Database.getInstance();
const db2 = Database.getInstance();

console.log(db1 === db2); // true → aynı instance
```

# Factory Pattern

**Amaç:**
Nesne yaratmayı merkezi bir noktadan yönetmek, “new” kullanımını soyutlamak.

**Kullanım Alanı:**
UI component, farklı database driver seçimi, API client oluşturma.

❌ Kötü Örnek
```ts
class Circle {}
class Square {}

const shapeType = "circle";
let shape;
if (shapeType === "circle") {
  shape = new Circle();
} else if (shapeType === "square") {
  shape = new Square();
}
```

✅ İyi Örnek
```ts
interface Shape {
  draw(): void;
}

class Circle implements Shape {
  draw() {
    console.log("Drawing a Circle");
  }
}

class Square implements Shape {
  draw() {
    console.log("Drawing a Square");
  }
}

class ShapeFactory {
  static createShape(type: string): Shape {
    if (type === "circle") return new Circle();
    if (type === "square") return new Square();
    throw new Error("Unknown shape type");
  }
}

// Usage
const circle = ShapeFactory.createShape("circle");
circle.draw();
```

# Observer Pattern

**Amaç:**
Bir nesnede olan değişikliği diğer nesnelere otomatik bildirmek.

**Kullanım Alanı:**
Event-driven sistem, notification, Redux store, event emitter.

❌ Kötü Örnek
```ts
class User {
  constructor(public name: string) {}
}

const user = new User("Alice");
// Notification kodu her değişiklikte manuel tekrar yazılıyor
console.log(`${user.name} was created`);
```

✅ İyi Örnek
```ts
interface Observer {
  update(message: string): void;
}

class Subject {
  private observers: Observer[] = [];

  subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  notify(message: string) {
    this.observers.forEach(o => o.update(message));
  }
}

class UserObserver implements Observer {
  constructor(private name: string) {}
  update(message: string) {
    console.log(`${this.name} received: ${message}`);
  }
}

// Usage
const subject = new Subject();
const obs1 = new UserObserver("Alice");
const obs2 = new UserObserver("Bob");

subject.subscribe(obs1);
subject.subscribe(obs2);

subject.notify("New event!");
```

# Strategy Pattern

**Amaç:**
Farklı algoritmaları runtime’da değiştirebilmek.

**Kullanım Alanı:**
Ödeme yöntemleri, sıralama algoritmaları, AI davranışları.

❌ Kötü Örnek
```ts
function pay(amount: number, method: string) {
  if (method === "credit") console.log(`Paid ${amount} with credit card`);
  else if (method === "paypal") console.log(`Paid ${amount} with PayPal`);
}
```

✅ İyi Örnek
```ts
interface PaymentStrategy {
  pay(amount: number): void;
}

class CreditCardPayment implements PaymentStrategy {
  pay(amount: number) {
    console.log(`Paid ${amount} with Credit Card`);
  }
}

class PayPalPayment implements PaymentStrategy {
  pay(amount: number) {
    console.log(`Paid ${amount} with PayPal`);
  }
}

class PaymentProcessor {
  constructor(private strategy: PaymentStrategy) {}

  process(amount: number) {
    this.strategy.pay(amount);
  }
}

// Usage
const processor = new PaymentProcessor(new CreditCardPayment());
processor.process(100);
```

# Adapter Pattern

**Amaç:**  
Uyumsuz interface’leri birbirine uyumlu hale getirmek.

**Kullanım Alanı:**  
API dönüşümleri, eski-yeni sistem entegrasyonu, üçüncü parti kütüphane entegrasyonu.

❌ Kötü Örnek
```typescript
class OldPrinter {
  printText(text: string) {
    console.log("Old Printer: " + text);
  }
}

const oldPrinter = new OldPrinter();
oldPrinter.printText("Hello");
// Yeni sistem print() methodu bekliyor → uyumsuz
```

✅ İyi Örnek
```ts
interface ModernPrinter {
  print(text: string): void;
}

class PrinterAdapter implements ModernPrinter {
  constructor(private oldPrinter: OldPrinter) {}

  print(text: string) {
    this.oldPrinter.printText(text);
  }
}

// Usage
const oldPrinter = new OldPrinter();
const adapter = new PrinterAdapter(oldPrinter);
adapter.print("Hello World");
```

# Repository Pattern
**Amaç:**
Data access (veritabanı) katmanını soyutlamak.

**Kullanım Alanı:**
Backend servislerinde DB erişimi, unit-test kolaylığı.

❌ Kötü Örnek
```ts
class UserService {
  async createUser(name: string) {
    // DB logic doğrudan burada
    console.log(`Inserting ${name} to MongoDB`);
  }
}
```

✅ İyi Örnek
```ts
interface User {
  name: string;
}

class UserRepository {
  async insert(user: User) {
    console.log(`Inserting ${user.name} to DB`);
  }
}

class UserService {
  constructor(private repo: UserRepository) {}

  async createUser(name: string) {
    await this.repo.insert({ name });
  }
}
```


# Decorator Pattern
**Amaç:**
Var olan objelerin davranışını runtime’da ekleyerek değiştirmek.

**Kullanım Alanı:**
Middleware, logging, auth, validation.

❌ Kötü Örnek
```ts
class Notifier {
  send(message: string) {
    console.log(`Sending message: ${message}`);
  }
}
// Logging yapmak için her yerde ayrı kod yazılıyor
```

✅ İyi Örnek
```ts
class Notifier {
  send(message: string) {
    console.log(`Sending message: ${message}`);
  }
}

class NotifierWithLogging {
  constructor(private notifier: Notifier) {}

  send(message: string) {
    console.log("Logging before sending");
    this.notifier.send(message);
  }
}

// Usage
const notifier = new Notifier();
const decorated = new NotifierWithLogging(notifier);
decorated.send("Hello World");
```


🎯 Özet
| Pattern    | Amaç                                      | Kullanım Alanı                                 |
| ---------- | ----------------------------------------- | ---------------------------------------------- |
| Singleton  | Tek instance garanti                      | DB connection, config, logger                  |
| Factory    | Nesne üretimini soyutla                   | API client, UI component, driver               |
| Observer   | Değişiklikleri aboneye bildir             | Event-driven system, notification              |
| Strategy   | Algoritmaları runtime’da değiştir         | Ödeme yöntemleri, sıralama                     |
| Adapter    | Uyumsuz interface’leri bağla              | API dönüşümleri, eski-yeni sistem entegrasyonu |
| Repository | Data access katmanını soyutla             | DB erişimi, unit-test kolaylığı                |
| Decorator  | Objelerin davranışını runtime’da değiştir | Middleware, logging, auth                      |
